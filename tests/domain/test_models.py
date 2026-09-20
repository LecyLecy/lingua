import unittest

from datetime import datetime, timezone

from lingua.domain import (
    AudioChunk,
    AudioFrame,
    CaptionSegment,
    LanguageProfile,
    LanguageStatus,
    SegmentState,
)


class LanguageProfileTests(unittest.TestCase):
    def test_profile_requires_evidence_note(self) -> None:
        with self.assertRaises(ValueError):
            LanguageProfile(
                tag="id",
                display_name="Indonesian",
                asr_status=LanguageStatus.EVALUATION,
                translation_status=LanguageStatus.CANDIDATE,
                evidence_note=" ",
            )


class CaptionSegmentTests(unittest.TestCase):
    def test_partial_segment_cannot_be_persisted(self) -> None:
        with self.assertRaises(ValueError):
            CaptionSegment(
                session_id="session-1",
                sequence=0,
                start_ms=0,
                end_ms=1000,
                source_text="Selamat pagi",
                source_language="id",
                state=SegmentState.PARTIAL,
            )


class AudioModelTests(unittest.TestCase):
    def test_chunk_requires_frame_reference(self) -> None:
        with self.assertRaises(ValueError):
            AudioChunk(
                session_id="session-1",
                sequence=0,
                start_ms=0,
                end_ms=1000,
                frame_sequences=(),
            )

    def test_frame_accepts_capture_metadata_without_audio_payload(self) -> None:
        frame = AudioFrame(
            session_id="session-1",
            sequence=0,
            captured_at=datetime.now(timezone.utc),
            sample_rate_hz=16_000,
            sample_count=1_600,
        )
        self.assertEqual(frame.sample_rate_hz, 16_000)


if __name__ == "__main__":
    unittest.main()
