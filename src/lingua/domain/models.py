"""Small, framework-free models shared across Lingua layers."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import StrEnum
from uuid import uuid4


class LanguageStatus(StrEnum):
    """Evidence state for one capability, not a quality claim."""

    CANDIDATE = "candidate"
    EVALUATION = "evaluation"
    SUPPORTED = "supported"
    RESTRICTED = "restricted"


class SegmentState(StrEnum):
    PARTIAL = "partial"
    STABLE = "stable"
    FINAL = "final"


class SessionState(StrEnum):
    CREATED = "created"
    LISTENING = "listening"
    PAUSED = "paused"
    STOPPED = "stopped"
    FAILED = "failed"


@dataclass(frozen=True, slots=True)
class AudioFrame:
    """Transient capture metadata. Audio payload remains adapter-owned in memory."""

    session_id: str
    sequence: int
    captured_at: datetime
    sample_rate_hz: int
    sample_count: int

    def __post_init__(self) -> None:
        if self.sequence < 0:
            raise ValueError("audio sequence must be non-negative")
        if self.sample_rate_hz <= 0 or self.sample_count <= 0:
            raise ValueError("audio frame must have a positive sample rate and sample count")


@dataclass(frozen=True, slots=True)
class AudioChunk:
    """A transient ASR interval assembled from one or more audio frames."""

    session_id: str
    sequence: int
    start_ms: int
    end_ms: int
    frame_sequences: tuple[int, ...]

    def __post_init__(self) -> None:
        if self.sequence < 0 or self.start_ms < 0 or self.end_ms < self.start_ms:
            raise ValueError("audio chunk interval must be ordered and non-negative")
        if not self.frame_sequences:
            raise ValueError("audio chunk needs at least one frame")


@dataclass(frozen=True, slots=True)
class LanguageProfile:
    tag: str
    display_name: str
    asr_status: LanguageStatus
    translation_status: LanguageStatus
    evidence_note: str
    evaluated_at: datetime | None = None

    def __post_init__(self) -> None:
        if not self.tag or self.tag != self.tag.lower():
            raise ValueError("language tag must be non-empty lowercase text")
        if not self.display_name.strip():
            raise ValueError("display name is required")
        if not self.evidence_note.strip():
            raise ValueError("evidence note is required")


@dataclass(frozen=True, slots=True)
class CaptionHypothesis:
    session_id: str
    sequence: int
    start_ms: int
    end_ms: int
    text: str
    source_language: str | None
    language_confidence: float | None
    state: SegmentState = SegmentState.PARTIAL

    def __post_init__(self) -> None:
        if self.sequence < 0 or self.start_ms < 0 or self.end_ms < self.start_ms:
            raise ValueError("caption interval must be ordered and non-negative")
        if self.language_confidence is not None and not 0 <= self.language_confidence <= 1:
            raise ValueError("language confidence must be between 0 and 1")
        if not self.text.strip():
            raise ValueError("caption text is required")


@dataclass(frozen=True, slots=True)
class CaptionSegment:
    session_id: str
    sequence: int
    start_ms: int
    end_ms: int
    source_text: str
    source_language: str | None
    state: SegmentState
    translation_text: str | None = None
    id: str = field(default_factory=lambda: str(uuid4()))

    def __post_init__(self) -> None:
        if self.state is SegmentState.PARTIAL:
            raise ValueError("persisted caption segments must be stable or final")
        if self.sequence < 0 or self.start_ms < 0 or self.end_ms < self.start_ms:
            raise ValueError("caption interval must be ordered and non-negative")
        if not self.source_text.strip():
            raise ValueError("source text is required")


@dataclass(frozen=True, slots=True)
class SessionRecord:
    output_language: str
    model_id: str
    state: SessionState = SessionState.CREATED
    id: str = field(default_factory=lambda: str(uuid4()))
    started_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    ended_at: datetime | None = None
    mean_caption_latency_ms: float | None = None
    degraded_reason: str | None = None

    def __post_init__(self) -> None:
        if not self.output_language or self.output_language != self.output_language.lower():
            raise ValueError("output language must be a non-empty lowercase tag")
        if not self.model_id.strip():
            raise ValueError("model id is required")
        if self.mean_caption_latency_ms is not None and self.mean_caption_latency_ms < 0:
            raise ValueError("caption latency cannot be negative")
