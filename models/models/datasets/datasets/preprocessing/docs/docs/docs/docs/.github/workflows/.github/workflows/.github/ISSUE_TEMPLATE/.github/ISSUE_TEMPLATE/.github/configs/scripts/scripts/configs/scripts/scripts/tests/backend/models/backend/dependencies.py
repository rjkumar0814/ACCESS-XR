from backend.models.loader import model_loader

gesture_model = model_loader.load_gesture_model(
    config.gesture.checkpoint
)

speech_model = model_loader.load_speech_model(
    config.speech.model_name
)
