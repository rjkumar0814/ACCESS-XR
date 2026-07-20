/******************************************************************************
 * ACCESS-XR
 * File Utility Functions
 ******************************************************************************/

export interface FileMetadata {

    name: string;

    type: string;

    size: number;

    lastModified: number;

}

export function formatFileSize(

    bytes: number

): string {

    if (bytes === 0) {

        return "0 Bytes";

    }

    const units = [

        "Bytes",

        "KB",

        "MB",

        "GB",

        "TB",

    ];

    const index = Math.floor(

        Math.log(bytes) / Math.log(1024)

    );

    return `${(

        bytes /

        Math.pow(1024, index)

    ).toFixed(2)} ${units[index]}`;

}

export function validateMimeType(

    file: File,

    allowedTypes: string[]

): boolean {

    if (allowedTypes.length === 0) {

        return true;

    }

    return allowedTypes.some((type) =>

        file.type.startsWith(type)

    );

}

export function validateFileSize(

    file: File,

    maxSizeMB: number

): boolean {

    return (

        file.size <=

        maxSizeMB * 1024 * 1024

    );

}

export function getFileMetadata(

    file: File

): FileMetadata {

    return {

        name: file.name,

        type: file.type,

        size: file.size,

        lastModified: file.lastModified,

    };

}

export function fileToBase64(

    file: File

): Promise<string> {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () =>

            resolve(

                reader.result as string

            );

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}

export async function computeSHA256(

    file: File

): Promise<string> {

    const buffer =

        await file.arrayBuffer();

    const hashBuffer =

        await crypto.subtle.digest(

            "SHA-256",

            buffer

        );

    const hashArray =

        Array.from(

            new Uint8Array(hashBuffer)

        );

    return hashArray

        .map((byte) =>

            byte

                .toString(16)

                .padStart(2, "0")

        )

        .join("");

}

export function downloadFile(

    filename: string,

    content: string,

    mimeType = "text/plain"

): void {

    const blob = new Blob(

        [content],

        {

            type: mimeType,

        }

    );

    const url =

        URL.createObjectURL(blob);

    const link =

        document.createElement("a");

    link.href = url;

    link.download = filename;

    link.click();

    URL.revokeObjectURL(url);

}

export function loadImageDimensions(

    file: File

): Promise<{

    width: number;

    height: number;

}> {

    return new Promise((resolve, reject) => {

        const image = new Image();

        const url =

            URL.createObjectURL(file);

        image.onload = () => {

            resolve({

                width: image.width,

                height: image.height,

            });

            URL.revokeObjectURL(url);

        };

        image.onerror = reject;

        image.src = url;

    });

}

export function loadAudioDuration(

    file: File

): Promise<number> {

    return new Promise((resolve, reject) => {

        const audio =

            document.createElement("audio");

        const url =

            URL.createObjectURL(file);

        audio.preload = "metadata";

        audio.onloadedmetadata = () => {

            resolve(audio.duration);

            URL.revokeObjectURL(url);

        };

        audio.onerror = reject;

        audio.src = url;

    });

}

export function isImage(

    file: File

): boolean {

    return file.type.startsWith("image/");

}

export function isAudio(

    file: File

): boolean {

    return file.type.startsWith("audio/");

}

export function isVideo(

    file: File

): boolean {

    return file.type.startsWith("video/");

}
