/******************************************************************************
 * ACCESS-XR
 * Reusable Result Card
 ******************************************************************************/

import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    LinearProgress,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface ResultCardProps {

    title: string;

    prediction: string;

    confidence: number;

    transcript?: string;

    gesture?: string;

    language?: string;

    processingTime?: number;

    modelVersion?: string;

    metadata?: Record<string, string | number>;

    error?: string;

}

export default function ResultCard({

    title,

    prediction,

    confidence,

    transcript,

    gesture,

    language,

    processingTime,

    modelVersion,

    metadata,

    error,

}: ResultCardProps) {

    const [copied, setCopied] =
        useState(false);

    const resultObject = {

        title,

        prediction,

        confidence,

        transcript,

        gesture,

        language,

        processingTime,

        modelVersion,

        metadata,

    };

    const copyToClipboard = async () => {

        await navigator.clipboard.writeText(

            JSON.stringify(

                resultObject,

                null,

                2

            )

        );

        setCopied(true);

    };

    const downloadJson = () => {

        const blob = new Blob(

            [

                JSON.stringify(

                    resultObject,

                    null,

                    2

                ),

            ],

            {

                type: "application/json",

            }

        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "prediction_result.json";

        link.click();

        URL.revokeObjectURL(url);

    };

    if (error) {

        return (

            <Alert severity="error">

                {error}

            </Alert>

        );

    }

    return (

        <>

            <Card>

                <CardContent>

                    <Stack

                        direction="row"

                        spacing={1}

                        alignItems="center"

                        mb={2}

                    >

                        <CheckCircleIcon
                            color="success"
                        />

                        <Typography
                            variant="h5"
                        >

                            {title}

                        </Typography>

                    </Stack>

                    <Divider
                        sx={{ mb: 3 }}
                    />

                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >

                        Prediction

                    </Typography>

                    <Typography
                        variant="h6"
                        gutterBottom
                    >

                        {prediction}

                    </Typography>

                    {

                        gesture && (

                            <>

                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >

                                    Gesture

                                </Typography>

                                <Typography
                                    paragraph
                                >

                                    {gesture}

                                </Typography>

                            </>

                        )

                    }

                    {

                        transcript && (

                            <>

                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                >

                                    Transcript

                                </Typography>

                                <Typography
                                    paragraph
                                >

                                    {transcript}

                                </Typography>

                            </>

                        )

                    }

                    {

                        language && (

                            <Chip

                                label={`Language: ${language}`}

                                color="primary"

                                sx={{ mb: 2 }}

                            />

                        )

                    }

                    <Typography
                        variant="subtitle2"
                        gutterBottom
                    >

                        Confidence

                    </Typography>

                    <LinearProgress

                        variant="determinate"

                        value={
                            confidence * 100
                        }

                        sx={{

                            height: 10,

                            borderRadius: 5,

                            mb: 1,

                        }}

                    />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {(

                            confidence * 100

                        ).toFixed(2)}

                        %

                    </Typography>

                    <Divider
                        sx={{ my: 3 }}
                    />

                    <Stack spacing={1}>

                        {

                            processingTime !==
                                undefined && (

                                <Typography>

                                    <strong>

                                        Processing Time:

                                    </strong>{" "}

                                    {processingTime} ms

                                </Typography>

                            )

                        }

                        {

                            modelVersion && (

                                <Typography>

                                    <strong>

                                        Model Version:

                                    </strong>{" "}

                                    {modelVersion}

                                </Typography>

                            )

                        }

                    </Stack>

                    {

                        metadata && (

                            <Box mt={3}>

                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                >

                                    Metadata

                                </Typography>

                                {

                                    Object.entries(
                                        metadata
                                    ).map(

                                        ([

                                            key,

                                            value,

                                        ]) => (

                                            <Typography
                                                key={key}
                                            >

                                                <strong>

                                                    {key}

                                                </strong>

                                                : {value}

                                            </Typography>

                                        )

                                    )

                                }

                            </Box>

                        )

                    }

                </CardContent>

                <CardActions>

                    <Button

                        startIcon={
                            <ContentCopyIcon />
                        }

                        onClick={
                            copyToClipboard
                        }

                    >

                        Copy JSON

                    </Button>

                    <Button

                        startIcon={
                            <DownloadIcon />
                        }

                        onClick={
                            downloadJson
                        }

                    >

                        Download JSON

                    </Button>

                </CardActions>

            </Card>

            <Snackbar

                open={copied}

                autoHideDuration={2000}

                onClose={() =>
                    setCopied(false)
                }

                message="Copied to clipboard"

            />

        </>

    );

}
