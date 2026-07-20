/******************************************************************************
 * ACCESS-XR
 * Centralized API Service
 ******************************************************************************/

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from "axios";

/* -------------------------------------------------------------------------- */
/* Configuration                                                               */
/* -------------------------------------------------------------------------- */

const BASE_URL =

    import.meta.env.VITE_API_BASE_URL ??

    "http://localhost:8000";

/* -------------------------------------------------------------------------- */
/* Axios Instance                                                              */
/* -------------------------------------------------------------------------- */

const api: AxiosInstance = axios.create({

    baseURL: BASE_URL,

    timeout: 30000,

    headers: {

        "Content-Type": "application/json",

    },

});

/* -------------------------------------------------------------------------- */
/* Request Interceptor                                                         */
/* -------------------------------------------------------------------------- */

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("access_token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

/* -------------------------------------------------------------------------- */
/* Response Interceptor                                                        */
/* -------------------------------------------------------------------------- */

api.interceptors.response.use(

    (response: AxiosResponse) => response,

    (error: AxiosError) => {

        if (error.response?.status === 401) {

            console.warn("Unauthorized request.");

        }

        if (error.response?.status === 500) {

            console.error("Internal server error.");

        }

        return Promise.reject(error);

    }

);

/* -------------------------------------------------------------------------- */
/* Interfaces                                                                  */
/* -------------------------------------------------------------------------- */

export interface HealthResponse {

    status: string;

    version: string;

}

export interface GestureResponse {

    prediction: string;

    confidence: number;

}

export interface SpeechResponse {

    transcript: string;

    confidence: number;

    language: string;

}

export interface PredictionResponse {

    prediction: string;

    confidence: number;

    processing_time: number;

    metadata: Record<string, unknown>;

}

/* -------------------------------------------------------------------------- */
/* Health API                                                                  */
/* -------------------------------------------------------------------------- */

export async function getHealth() {

    const response =

        await api.get<HealthResponse>(

            "/health"

        );

    return response.data;

}

/* -------------------------------------------------------------------------- */
/* Gesture API                                                                 */
/* -------------------------------------------------------------------------- */

export async function predictGesture(

    file: File

) {

    const formData = new FormData();

    formData.append(

        "file",

        file

    );

    const response =

        await api.post<GestureResponse>(

            "/gesture",

            formData,

            {

                headers: {

                    "Content-Type":

                        "multipart/form-data",

                },

            }

        );

    return response.data;

}

/* -------------------------------------------------------------------------- */
/* Speech API                                                                  */
/* -------------------------------------------------------------------------- */

export async function recognizeSpeech(

    file: File

) {

    const formData = new FormData();

    formData.append(

        "file",

        file

    );

    const response =

        await api.post<SpeechResponse>(

            "/speech",

            formData,

            {

                headers: {

                    "Content-Type":

                        "multipart/form-data",

                },

            }

        );

    return response.data;

}

/* -------------------------------------------------------------------------- */
/* Multimodal Prediction                                                       */
/* -------------------------------------------------------------------------- */

export async function predictMultimodal(

    image: File,

    audio: File

) {

    const formData = new FormData();

    formData.append(

        "image",

        image

    );

    formData.append(

        "audio",

        audio

    );

    const response =

        await api.post<PredictionResponse>(

            "/prediction",

            formData,

            {

                headers: {

                    "Content-Type":

                        "multipart/form-data",

                },

            }

        );

    return response.data;

}

/* -------------------------------------------------------------------------- */
/* Generic Utilities                                                           */
/* -------------------------------------------------------------------------- */

export async function get<T>(

    endpoint: string

): Promise<T> {

    const response =

        await api.get<T>(endpoint);

    return response.data;

}

export async function post<T>(

    endpoint: string,

    payload: unknown

): Promise<T> {

    const response =

        await api.post<T>(

            endpoint,

            payload

        );

    return response.data;

}

export async function put<T>(

    endpoint: string,

    payload: unknown

): Promise<T> {

    const response =

        await api.put<T>(

            endpoint,

            payload

        );

    return response.data;

}

export async function remove<T>(

    endpoint: string

): Promise<T> {

    const response =

        await api.delete<T>(endpoint);

    return response.data;

}

export default api;
