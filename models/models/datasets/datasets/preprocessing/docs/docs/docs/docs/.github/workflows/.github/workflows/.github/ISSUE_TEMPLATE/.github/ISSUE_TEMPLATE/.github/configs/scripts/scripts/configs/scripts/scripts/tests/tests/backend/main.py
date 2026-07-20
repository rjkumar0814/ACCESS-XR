from fastapi import FastAPI

app = FastAPI(title="ACCESS-XR API")


@app.get("/")
def root():
    return {"message": "ACCESS-XR API"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/predict")
def predict():
    return {"detail": "Input required"}
