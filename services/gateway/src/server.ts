import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { WebSocketServer } from 'ws';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'gateway' });
});

// Create HTTP server to attach WebSocket
const server = http.createServer(app);

// WebSocket server for realtime streaming
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws, req) => {
  console.log(`WS client connected from ${req.socket.remoteAddress}`);

  ws.on('message', (message: Buffer) => {
    const text = message.toString();
    console.log('Received:', text);
    // Echo back for now; later this will forward to AI services
    ws.send(JSON.stringify({ type: 'echo', payload: text }));
  });

  ws.on('close', () => {
    console.log('WS client disconnected');
  });

  ws.on('error', (err) => {
    console.error('WS error:', err);
  });
});

server.listen(PORT, () => {
  console.log(`Gateway listening on http://localhost:${PORT}`);
  console.log(`WebSocket endpoint ws://localhost:${PORT}/ws`);
});