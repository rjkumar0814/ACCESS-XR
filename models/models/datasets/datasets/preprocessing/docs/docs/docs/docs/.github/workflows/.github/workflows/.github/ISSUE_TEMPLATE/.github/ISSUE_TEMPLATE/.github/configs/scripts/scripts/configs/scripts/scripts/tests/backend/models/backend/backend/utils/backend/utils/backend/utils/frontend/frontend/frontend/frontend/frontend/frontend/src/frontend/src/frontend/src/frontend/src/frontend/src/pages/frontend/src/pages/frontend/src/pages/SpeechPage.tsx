/******************************************************************************
 * ACCESS-XR
 * Speech Recognition Page
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
import MicIcon from "@mui/icons-material/Mic";

interface SpeechResult {

    transcript: string;

    confidence: number;

    language?: string;

}

export default function SpeechPage() {

    const inputRef =
        useRef<HTMLInputElement>(null);

    const [audioFile, setAudioFile] =
        useState<File | null>(null);

    const [audioUrl, setAudioUrl] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [result, setResult] =
        useState<SpeechResult | null>(null);

    const handleFile = (file: File) => {

        setAudioFile(file);

        setAudioUrl(URL.createObjectURL(file));

        setError("");

        setResult(null);

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

        if (!audioFile) {

            setError("Please upload an audio file.");

            return;

        }

        setLoading(true);

        setResult(null);

        setError("");

        try {

            const formData = new FormData();

            formData.append("file", audioFile);

            const response = await fetch(

                "http://localhost:8000/api/speech/predict",

                {

                    method: "POST",

                    body: formData,

                }

            );

            if (!response.ok) {

                throw new Error(

                    "Speech recognition failed."

                );

            }

            const prediction =
                await response.json();

            setResult({

                transcript:
                    prediction.transcript,

                confidence:
                    prediction.confidence,

                language:
                    prediction.language,

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

                Speech Recognition

            </Typography>

            <Typography
                color="text.secondary"
                paragraph
            >

                Upload an audio recording for
                automatic speech recognition.

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

                        onClick={() =>
                            inputRef.current?.click()
                        }

                        onDrop={handleDrop}

                        onDragOver={(e) =>
                            e.preventDefault()
                        }

                    >

                        <CloudUploadIcon

                            sx={{

                                fontSize: 60,

                                mb: 2,

                            }}

                        />

                        <Typography>

                            Drag & Drop Audio

                        </Typography>

                        <Typography
                            color="text.secondary"
                        >

                            WAV, MP3, FLAC or M4A

                        </Typography>

                        <input

                            hidden

                            type="file"

                            accept=".wav,.mp3,.flac,.m4a,audio/*"

                            ref={inputRef}

                            onChange={handleUpload}

                        />

                    </Box>

                    {

                        audioUrl && (

                            <Box
                                sx={{
                                    mt: 4,
                                }}
                            >

                                <Typography
                                    gutterBottom
                                >

                                    Audio Preview

                                </Typography>

                                <audio

                                    controls

                                    style={{
                                        width: "100%",
                                    }}

                                    src={audioUrl}

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

                            startIcon={<MicIcon />}

                            onClick={predict}

                            disabled={loading}

                        >

                            Transcribe Audio

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

                                        Transcript:

                                    </strong>

                                </Typography>

                                <Typography
                                    paragraph
                                >

                                    {result.transcript}

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
