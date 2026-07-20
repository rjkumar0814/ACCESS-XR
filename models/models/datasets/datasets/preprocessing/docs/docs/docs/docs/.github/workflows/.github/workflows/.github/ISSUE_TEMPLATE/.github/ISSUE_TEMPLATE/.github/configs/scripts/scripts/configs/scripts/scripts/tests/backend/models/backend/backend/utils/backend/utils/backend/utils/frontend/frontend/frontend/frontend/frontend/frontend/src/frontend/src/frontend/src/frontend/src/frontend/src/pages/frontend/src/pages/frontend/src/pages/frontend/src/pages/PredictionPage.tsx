/******************************************************************************
 * ACCESS-XR
 * Multimodal Prediction Page
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
    Grid,
    Stack,
    Typography,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PsychologyIcon from "@mui/icons-material/Psychology";

interface PredictionResponse {

    gesture: string;

    speech: string;

    final_prediction: string;

    confidence: number;

    language?: string;

}

export default function PredictionPage() {

    const imageInputRef =
        useRef<HTMLInputElement>(null);

    const audioInputRef =
        useRef<HTMLInputElement>(null);

    const [imageFile, setImageFile] =
        useState<File | null>(null);

    const [audioFile, setAudioFile] =
        useState<File | null>(null);

    const [imagePreview, setImagePreview] =
        useState("");

    const [audioPreview, setAudioPreview] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [result, setResult] =
        useState<PredictionResponse | null>(null);

    const uploadImage = (

        event: React.ChangeEvent<HTMLInputElement>

    ) => {

        if (!event.target.files?.length) {

            return;

        }

        const file = event.target.files[0];

        setImageFile(file);

        setImagePreview(URL.createObjectURL(file));

    };

    const uploadAudio = (

        event: React.ChangeEvent<HTMLInputElement>

    ) => {

        if (!event.target.files?.length) {

            return;

        }

        const file = event.target.files[0];

        setAudioFile(file);

        setAudioPreview(URL.createObjectURL(file));

    };

    const predict = async () => {

        if (!imageFile || !audioFile) {

            setError(

                "Please upload both an image and an audio file."

            );

            return;

        }

        setLoading(true);

        setError("");

        setResult(null);

        try {

            const formData = new FormData();

            formData.append("image", imageFile);

            formData.append("audio", audioFile);

            const response = await fetch(

                "http://localhost:8000/api/prediction/predict",

                {

                    method: "POST",

                    body: formData,

                }

            );

            if (!response.ok) {

                throw new Error(

                    "Multimodal prediction failed."

                );

            }

            const prediction =
                await response.json();

            setResult(prediction);

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

                Multimodal Prediction

            </Typography>

            <Typography
                color="text.secondary"
                paragraph
            >

                Upload both gesture and speech inputs
                to perform multimodal fusion.

            </Typography>

            <Grid
                container
                spacing={3}
            >

                <Grid
                    item
                    xs={12}
                    md={6}
                >

                    <Card>

                        <CardContent>

                            <Typography
                                variant="h6"
                                gutterBottom
                            >

                                Gesture Image

                            </Typography>

                            <Button

                                fullWidth

                                variant="outlined"

                                startIcon={
                                    <CloudUploadIcon />
                                }

                                onClick={() =>
                                    imageInputRef.current?.click()
                                }

                            >

                                Upload Image

                            </Button>

                            <input

                                hidden

                                type="file"

                                accept="image/*"

                                ref={imageInputRef}

                                onChange={uploadImage}

                            />

                            {

                                imagePreview && (

                                    <Box
                                        mt={3}
                                    >

                                        <img

                                            src={imagePreview}

                                            alt="Gesture"

                                            style={{

                                                width: "100%",

                                                borderRadius: 12,

                                            }}

                                        />

                                    </Box>

                                )

                            }

                        </CardContent>

                    </Card>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                >

                    <Card>

                        <CardContent>

                            <Typography
                                variant="h6"
                                gutterBottom
                            >

                                Speech Audio

                            </Typography>

                            <Button

                                fullWidth

                                variant="outlined"

                                startIcon={
                                    <CloudUploadIcon />
                                }

                                onClick={() =>
                                    audioInputRef.current?.click()
                                }

                            >

                                Upload Audio

                            </Button>

                            <input

                                hidden

                                type="file"

                                accept=".wav,.mp3,.flac,.m4a,audio/*"

                                ref={audioInputRef}

                                onChange={uploadAudio}

                            />

                            {

                                audioPreview && (

                                    <Box
                                        mt={3}
                                    >

                                        <audio

                                            controls

                                            style={{

                                                width: "100%",

                                            }}

                                            src={audioPreview}

                                        />

                                    </Box>

                                )

                            }

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Divider sx={{ my: 4 }} />

            <Stack
                direction="row"
                spacing={2}
            >

                <Button

                    variant="contained"

                    size="large"

                    startIcon={
                        <PsychologyIcon />
                    }

                    onClick={predict}

                    disabled={loading}

                >

                    Run Multimodal Prediction

                </Button>

            </Stack>

            {

                loading && (

                    <Box
                        textAlign="center"
                        mt={4}
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
                        sx={{ mt: 4 }}
                    >

                        <Typography>

                            <strong>

                                Gesture:

                            </strong>{" "}

                            {result.gesture}

                        </Typography>

                        <Typography>

                            <strong>

                                Speech:

                            </strong>{" "}

                            {result.speech}

                        </Typography>

                        {

                            result.language && (

                                <Typography>

                                    <strong>

                                        Language:

                                    </strong>{" "}

                                    {result.language}

                                </Typography>

                            )

                        }

                        <Typography>

                            <strong>

                                Final Prediction:

                            </strong>{" "}

                            {result.final_prediction}

                        </Typography>

                        <Typography>

                            <strong>

                                Fusion Confidence:

                            </strong>{" "}

                            {(

                                result.confidence * 100

                            ).toFixed(2)}

                            %

                        </Typography>

                    </Alert>

                )

            }

        </Box>

    );

}
