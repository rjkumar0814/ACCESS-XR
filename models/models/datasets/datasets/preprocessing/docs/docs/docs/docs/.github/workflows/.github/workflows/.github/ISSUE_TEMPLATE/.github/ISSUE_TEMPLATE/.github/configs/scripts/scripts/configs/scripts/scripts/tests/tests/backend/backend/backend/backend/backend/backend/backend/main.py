from backend.middleware import register_middleware

app = FastAPI(
    title="ACCESS-XR API",
    version="1.0.0",
)

register_middleware(app)
