# AI Orchestration Service (FastAPI)

This service will handle TTS, voice cloning, lip-sync inference (LatentSync), and media composition.

## Quickstart

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health`: Health check
- `POST /tts`: Text-to-speech (stub)
- `POST /lip-sync`: Lip-sync (stub)

## Environment

See `.env.example` for environment variables.