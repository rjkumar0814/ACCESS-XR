/******************************************************************************
 * ACCESS-XR
 * Reusable Upload Card Component
 ******************************************************************************/

import { useRef, useState } from "react";

import {
    Alert,
    Box,
    Card,
    CardContent,
    LinearProgress,
    Typography,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export interface UploadCardProps {

    title: string;

    description?: string;

    accept: string;

    maxFileSizeMB?: number;

    preview?: boolean;

    onFileSelect: (file: File) => void;

}

export default function UploadCard({

    title,

    description,

    accept,

    maxFileSizeMB = 20,

    preview = true,

    onFileSelect,

}: UploadCardProps) {

    const inputRef =
        useRef<HTMLInputElement>(null);

    const [file, setFile] =
        useState<File | null>(null);

    const [previewUrl, setPreviewUrl] =
        useState("");

    const [error, setError] =
        useState("");

    const [dragging, setDragging] =
        useState(false);

    const validateFile = (

        selectedFile: File

    ): boolean => {

        const maxBytes =
            maxFileSizeMB * 1024 * 1024;

        if (selectedFile.size > maxBytes) {

            setError(

                `Maximum file size is ${maxFileSizeMB} MB.`

            );

            return false;

        }

        setError("");

        return true;

    };

    const processFile = (

        selectedFile: File

    ) => {

        if (!validateFile(selectedFile)) {

            return;

        }

        setFile(selectedFile);

        onFileSelect(selectedFile);

        if (preview) {

            setPreviewUrl(

                URL.createObjectURL(selectedFile)

            );

        }

    };

    const handleInput = (

        event: React.ChangeEvent<HTMLInputElement>

    ) => {

        if (!event.target.files?.length) {

            return;

        }

        processFile(event.target.files[0]);

    };

    const handleDrop = (

        event: React.DragEvent<HTMLDivElement>

    ) => {

        event.preventDefault();

        setDragging(false);

        if (!event.dataTransfer.files.length) {

            return;

        }

        processFile(event.dataTransfer.files[0]);

    };

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >

                    {title}

                </Typography>

                {

                    description && (

                        <Typography
                            color="text.secondary"
                            paragraph
                        >

                            {description}

                        </Typography>

                    )

                }

                <Box

                    onClick={() =>
                        inputRef.current?.click()
                    }

                    onDragOver={(event) => {

                        event.preventDefault();

                        setDragging(true);

                    }}

                    onDragLeave={() =>
                        setDragging(false)
                    }

                    onDrop={handleDrop}

                    sx={{

                        border: "2px dashed",

                        borderColor: dragging

                            ? "primary.main"

                            : "divider",

                        bgcolor: dragging

                            ? "action.hover"

                            : "background.default",

                        borderRadius: 2,

                        textAlign: "center",

                        cursor: "pointer",

                        py: 6,

                        transition: "0.2s",

                    }}

                >

                    <CloudUploadIcon

                        sx={{

                            fontSize: 60,

                            color: "primary.main",

                            mb: 2,

                        }}

                    />

                    <Typography>

                        Drag & Drop

                    </Typography>

                    <Typography
                        color="text.secondary"
                    >

                        or click to browse

                    </Typography>

                </Box>

                <input

                    hidden

                    ref={inputRef}

                    type="file"

                    accept={accept}

                    onChange={handleInput}

                />

                {

                    file && (

                        <Box mt={3}>

                            <Typography>

                                <strong>Name:</strong>{" "}

                                {file.name}

                            </Typography>

                            <Typography>

                                <strong>Size:</strong>{" "}

                                {(

                                    file.size / 1024 / 1024

                                ).toFixed(2)}

                                {" MB"}

                            </Typography>

                        </Box>

                    )

                }

                {

                    preview &&
                    previewUrl &&
                    file?.type.startsWith("image/") && (

                        <Box mt={3}>

                            <img

                                src={previewUrl}

                                alt="Preview"

                                style={{

                                    width: "100%",

                                    borderRadius: 10,

                                }}

                            />

                        </Box>

                    )

                }

                {

                    preview &&
                    previewUrl &&
                    file?.type.startsWith("audio/") && (

                        <Box mt={3}>

                            <audio

                                controls

                                style={{

                                    width: "100%",

                                }}

                                src={previewUrl}

                            />

                        </Box>

                    )

                }

                {

                    file && (

                        <LinearProgress

                            variant="determinate"

                            value={100}

                            sx={{

                                mt: 3,

                            }}

                        />

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

            </CardContent>

        </Card>

    );

}
