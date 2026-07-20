/******************************************************************************
 * ACCESS-XR
 * Gesture Recognition Page
 ******************************************************************************/

import { useRef, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface PredictionResult {

    label: string;

    confidence: number;

}

export default function GesturePage() {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState<File | null>(null);

    const [preview, setPreview] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [result, setResult] =
        useState<PredictionResult | null>(null);

    const handleFile = (file: File) => {

        setImage(file);

        setPreview(URL.createObjectURL(file));

        setResult(null);

        setError("");

    };

    const handleUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        if (!event.target.files?.length) {

            return;

        }

        handleFile(event.target.files[0]);

    };

    const handleDrop = (
        event: React.DragEvent<HTMLDivElement>
    ) => {

        event.preventDefault();

        if (event.dataTransfer.files.length > 0) {

            handleFile(event.dataTransfer.files[0]);

        }

    };

    const predict = async () => {

        if (!image) {

            setError("Please upload an image.");

            return;

        }

        setLoading(true);

        setError("");

        setResult(null);

        try {

            const formData = new FormData();

            formData.append("file", image);

            const response = await fetch(

                "http://localhost:8000/api/gesture/predict",

                {

                    method: "POST",

                    body: formData,

                }

            );

            if (!response.ok) {

                throw new Error("Prediction failed.");

            }

            const prediction =
                await response.json();

            setResult({

                label: prediction.label,

                confidence: prediction.confidence,

            });

        }

        catch (err) {

            setError(

                err instanceof Error

                    ? err.message

                    : "Unexpected error."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Box>

            <Typography
                variant="h4"
                gutterBottom
            >

                Gesture Recognition

            </Typography>

            <Typography
                color="text.secondary"
                paragraph
            >

                Upload a gesture image for
                real-time recognition.

            </Typography>

            <Card>

                <CardContent>

                    <Box

                        sx={{

                            border: "2px dashed",

                            borderColor: "divider",

                            borderRadius: 2,

                            p: 5,

                            textAlign: "center",

                            cursor: "pointer",

                        }}

                        onDrop={handleDrop}

                        onDragOver={(e) =>
                            e.preventDefault()
                        }

                        onClick={() =>
                            fileInputRef.current?.click()
                        }

                    >

                        <CloudUploadIcon
                            sx={{
                                fontSize: 60,
                                mb: 2,
                            }}
                        />

                        <Typography>

                            Drag & Drop an image

                        </Typography>

                        <Typography
                            color="text.secondary"
                        >

                            or click to browse

                        </Typography>

                        <input

                            hidden

                            type="file"

                            accept="image/*"

                            ref={fileInputRef}

                            onChange={handleUpload}

                        />

                    </Box>

                    {

                        preview && (

                            <Box
                                sx={{
                                    mt: 4,
                                    textAlign: "center",
                                }}
                            >

                                <img

                                    src={preview}

                                    alt="Preview"

                                    style={{

                                        maxWidth: "100%",

                                        maxHeight: 350,

                                        borderRadius: 12,

                                    }}

                                />

                            </Box>

                        )

                    }

                    <Divider sx={{ my: 4 }} />

                    <Stack
                        direction="row"
                        spacing={2}
                    >

                        <Button

                            variant="contained"

                            startIcon={
                                <PhotoCameraIcon />
                            }

                            onClick={predict}

                            disabled={loading}

                        >

                            Predict Gesture

                        </Button>

                    </Stack>

                    {

                        loading && (

                            <Box
                                sx={{
                                    mt: 4,
                                    textAlign: "center",
                                }}
                            >

                                <CircularProgress />

                            </Box>

                        )

                    }

                    {

                        error && (

                            <Alert
                                severity="error"
                                sx={{ mt: 3 }}
                            >

                                {error}

                            </Alert>

                        )

                    }

                    {

                        result && (

                            <Alert
                                severity="success"
                                sx={{ mt: 3 }}
                            >

                                <Typography>

                                    <strong>
                                        Gesture:
                                    </strong>{" "}

                                    {result.label}

                                </Typography>

                                <Typography>

                                    <strong>
                                        Confidence:
                                    </strong>{" "}

                                    {(
                                        result.confidence * 100
                                    ).toFixed(2)}

                                    %

                                </Typography>

                            </Alert>

                        )

                    }

                </CardContent>

            </Card>

        </Box>

    );

}
