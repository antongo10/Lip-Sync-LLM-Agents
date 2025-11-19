from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="AI Orchestration Service", version="0.1.0")


class TTSRequest(BaseModel):
    text: str
    voice_id: str | None = None


class LipSyncRequest(BaseModel):
    audio_url: str
    avatar_id: str


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai"}


@app.post("/tts")
def tts(req: TTSRequest):
    # TODO: Integrate TTS engine (e.g., ElevenLabs, Coqui, or custom)
    return {"status": "not_implemented", "message": "TTS pipeline pending"}


@app.post("/lip-sync")
def lip_sync(req: LipSyncRequest):
    # TODO: Integrate LatentSync lip-sync model and return media or animation params
    return {"status": "not_implemented", "message": "Lip-sync pipeline pending"}