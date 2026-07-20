/******************************************************************************
 * ACCESS-XR
 * File Upload Hook
 ******************************************************************************/

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

export interface UseUploadOptions {

    accept?: string[];

    maxFileSizeMB?: number;

}

export interface UseUploadReturn {

    file: File | null;

    previewUrl: string | null;

    progress: number;

    uploading: boolean;

    error: string | null;

    setFile: (file: File | null) => void;

    handleFile: (file: File) => boolean;

    clear: () => void;

    simulateUpload: () => Promise<void>;

    cancelUpload: () => void;

}

export default function useUpload(

    options: UseUploadOptions = {}

): UseUploadReturn {

    const {

        accept = [],

        maxFileSizeMB = 20,

    } = options;

    const [file, setFileState] =
        useState<File | null>(null);

    const [previewUrl, setPreviewUrl] =
        useState<string | null>(null);

    const [progress, setProgress] =
        useState(0);

    const [uploading, setUploading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const intervalRef =
        useRef<number>();

    const validate = useCallback(

        (file: File): boolean => {

            if (

                file.size >

                maxFileSizeMB * 1024 * 1024

            ) {

                setError(

                    `Maximum file size is ${maxFileSizeMB} MB.`

                );

                return false;

            }

            if (

                accept.length > 0 &&

                !accept.some((type) =>

                    file.type.startsWith(type)

                )

            ) {

                setError("Unsupported file type.");

                return false;

            }

            setError(null);

            return true;

        },

        [accept, maxFileSizeMB]

    );

    const setFile = useCallback(

        (selectedFile: File | null) => {

            if (previewUrl) {

                URL.revokeObjectURL(previewUrl);

            }

            if (!selectedFile) {

                setFileState(null);

                setPreviewUrl(null);

                return;

            }

            setFileState(selectedFile);

            if (

                selectedFile.type.startsWith("image/") ||

                selectedFile.type.startsWith("audio/") ||

                selectedFile.type.startsWith("video/")

            ) {

                setPreviewUrl(

                    URL.createObjectURL(selectedFile)

                );

            }

        },

        [previewUrl]

    );

    const handleFile = useCallback(

        (selectedFile: File) => {

            if (!validate(selectedFile)) {

                return false;

            }

            setFile(selectedFile);

            return true;

        },

        [validate, setFile]

    );

    const simulateUpload = async () => {

        setUploading(true);

        setProgress(0);

        await new Promise<void>((resolve) => {

            intervalRef.current = window.setInterval(() => {

                setProgress((value) => {

                    if (value >= 100) {

                        window.clearInterval(intervalRef.current);

                        resolve();

                        return 100;

                    }

                    return value + 10;

                });

            }, 150);

        });

        setUploading(false);

    };

    const cancelUpload = () => {

        if (intervalRef.current) {

            clearInterval(intervalRef.current);

        }

        setUploading(false);

        setProgress(0);

    };

    const clear = () => {

        cancelUpload();

        setFile(null);

        setError(null);

    };

    useEffect(() => {

        return () => {

            if (previewUrl) {

                URL.revokeObjectURL(previewUrl);

            }

            if (intervalRef.current) {

                clearInterval(intervalRef.current);

            }

        };

    }, [previewUrl]);

    return {

        file,

        previewUrl,

        progress,

        uploading,

        error,

        setFile,

        handleFile,

        clear,

        simulateUpload,

        cancelUpload,

    };

}
