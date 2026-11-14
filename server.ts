import 'dotenv/config';
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const PORT = Number(process.env.PORT || 3000);

function loadTmdbTokens(): string[] {
  const tokens: string[] = [];
  if (process.env.TMDB_READ_TOKEN && process.env.TMDB_READ_TOKEN.trim()) {
    tokens.push(process.env.TMDB_READ_TOKEN.trim());
  }

  try {
    const attachmentPath = path.resolve(
      __dirname,
      'public/assets/aistudio/apitmdb_d25e65f6.md'
    );
    if (fs.existsSync(attachmentPath)) {
      const content = fs.readFileSync(attachmentPath, 'utf-8');
      const jwtMatches = content.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g);
      if (jwtMatches) {
        for (const t of jwtMatches) {
          if (!tokens.includes(t)) tokens.push(t);
        }
      }
    }
  } catch {
    // ignore file read fallback errors
  }

  return tokens;
}

const TMDB_TOKENS = loadTmdbTokens();

async function fetchTmdb(endpointPath: string): Promise<unknown> {
  if (TMDB_TOKENS.length === 0 && !process.env.TMDB_API_KEY) {
    throw new Error('TMDB credentials not configured');
  }

  let lastError: Error | null = null;

  for (const token of TMDB_TOKENS) {
    try {
      const url = `${TMDB_BASE_URL}${endpointPath}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        return await response.json();
      }
      if (response.status === 401 || response.status === 429) {
        lastError = new Error(`TMDB responded with ${response.status}`);
        continue;
      }
      const errText = await response.text();
      throw new Error(`TMDB error ${response.status}: ${errText}`);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  if (process.env.TMDB_API_KEY) {
    const sep = endpointPath.includes('?') ? '&' : '?';
    const url = `${TMDB_BASE_URL}${endpointPath}${sep}api_key=${encodeURIComponent(process.env.TMDB_API_KEY)}`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (response.ok) {
      return await response.json();
    }
  }

  throw lastError ?? new Error('Failed to fetch TMDB data');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Genres list for TV Series
  app.get('/api/tmdb/genres', async (_req: Request, res: Response) => {
    try {
      const data = await fetchTmdb('/genre/tv/list?language=pt-BR');
      res.json(data);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Erro ao buscar gêneros no TMDB',
      });
    }
  });

  // 2. Discover / Search / Curated TV Series lists
  app.get('/api/tmdb/series', async (req: Request, res: Response) => {
    try {
      const category = String(req.query.category || 'popular');
      const genre = req.query.genre ? String(req.query.genre) : '';
      const query = req.query.query ? String(req.query.query).trim() : '';
      const page = Math.max(1, Number(req.query.page || 1));

      let endpoint = '';

      if (query) {
        endpoint = `/search/tv?language=pt-BR&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
      } else if (genre) {
        endpoint = `/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=${encodeURIComponent(genre)}&page=${page}&include_adult=false`;
      } else {
        switch (category) {
          case 'trending':
            endpoint = `/trending/tv/week?language=pt-BR&page=${page}`;
            break;
          case 'top_rated':
            endpoint = `/tv/top_rated?language=pt-BR&page=${page}`;
            break;
          case 'on_the_air':
            endpoint = `/tv/on_the_air?language=pt-BR&page=${page}`;
            break;
          case 'kids':
            endpoint = `/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=10762&page=${page}&include_adult=false`;
            break;
          case 'animation':
            endpoint = `/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=16&page=${page}&include_adult=false`;
            break;
          case 'family':
            endpoint = `/discover/tv?language=pt-BR&sort_by=popularity.desc&with_genres=10751&page=${page}&include_adult=false`;
            break;
          case 'popular':
          default:
            endpoint = `/tv/popular?language=pt-BR&page=${page}`;
            break;
        }
      }

      const data = await fetchTmdb(endpoint);
      res.json(data);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Erro ao buscar séries no TMDB',
      });
    }
  });

  // 3. Full Series Details (synopsis, seasons, cast/credits, videos, content_ratings, recommendations)
  app.get('/api/tmdb/series/:id', async (req: Request, res: Response) => {
    try {
      const seriesId = Number(req.params.id);
      if (!Number.isFinite(seriesId) || seriesId <= 0) {
        res.status(400).json({ error: 'ID de série inválido' });
        return;
      }

      const data = await fetchTmdb(
        `/tv/${seriesId}?language=pt-BR&append_to_response=credits,videos,content_ratings,recommendations`
      );
      res.json(data);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Erro ao carregar detalhes da série',
      });
    }
  });

  // 4. Season Episodes Details
  app.get('/api/tmdb/series/:id/season/:seasonNumber', async (req: Request, res: Response) => {
    try {
      const seriesId = Number(req.params.id);
      const seasonNumber = Number(req.params.seasonNumber);
      if (!Number.isFinite(seriesId) || seriesId <= 0 || !Number.isFinite(seasonNumber) || seasonNumber < 0) {
        res.status(400).json({ error: 'Parâmetros de temporada inválidos' });
        return;
      }

      const data = await fetchTmdb(
        `/tv/${seriesId}/season/${seasonNumber}?language=pt-BR`
      );
      res.json(data);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Erro ao carregar episódios da temporada',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`M+ Kids server running on http://localhost:${PORT}`);
  });
}

startServer();
