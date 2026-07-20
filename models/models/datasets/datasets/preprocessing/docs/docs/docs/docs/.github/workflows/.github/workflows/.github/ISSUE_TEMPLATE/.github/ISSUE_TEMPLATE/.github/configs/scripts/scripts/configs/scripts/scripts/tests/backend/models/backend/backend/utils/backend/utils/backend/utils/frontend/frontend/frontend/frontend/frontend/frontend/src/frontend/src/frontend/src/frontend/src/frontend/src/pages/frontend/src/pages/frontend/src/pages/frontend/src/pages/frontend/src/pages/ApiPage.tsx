/******************************************************************************
 * ACCESS-XR
 * API Documentation Page
 ******************************************************************************/

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Link,
    Stack,
    Typography,
} from "@mui/material";

interface ApiEndpoint {

    method: string;

    path: string;

    description: string;

}

const endpoints: ApiEndpoint[] = [

    {

        method: "GET",

        path: "/api/health",

        description:
            "Backend health status.",

    },

    {

        method: "POST",

        path: "/api/gesture/predict",

        description:
            "Gesture recognition inference.",

    },

    {

        method: "POST",

        path: "/api/speech/predict",

        description:
            "Speech recognition inference.",

    },

    {

        method: "POST",

        path: "/api/prediction/predict",

        description:
            "Multimodal fusion prediction.",

    },

];

export default function ApiPage() {

    return (

        <Box>

            <Typography
                variant="h4"
                gutterBottom
            >

                REST API Documentation

            </Typography>

            <Typography
                color="text.secondary"
                paragraph
            >

                ACCESS-XR exposes a RESTful API built with
                FastAPI for gesture recognition, speech
                recognition, and multimodal inference.

            </Typography>

            <Stack
                direction="row"
                spacing={2}
                sx={{ mb: 4 }}
            >

                <Button

                    variant="contained"

                    component={Link}

                    href="http://localhost:8000/docs"

                    target="_blank"

                >

                    Swagger UI

                </Button>

                <Button

                    variant="outlined"

                    component={Link}

                    href="http://localhost:8000/redoc"

                    target="_blank"

                >

                    ReDoc

                </Button>

            </Stack>

            <Typography
                variant="h5"
                gutterBottom
            >

                Available Endpoints

            </Typography>

            {

                endpoints.map((endpoint) => (

                    <Card
                        key={endpoint.path}
                        sx={{ mb: 2 }}
                    >

                        <CardContent>

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >

                                <Chip

                                    label={endpoint.method}

                                    color={
                                        endpoint.method === "GET"
                                            ? "success"
                                            : "primary"
                                    }

                                />

                                <Typography
                                    fontFamily="monospace"
                                >

                                    {endpoint.path}

                                </Typography>

                            </Stack>

                            <Typography
                                sx={{ mt: 2 }}
                                color="text.secondary"
                            >

                                {endpoint.description}

                            </Typography>

                        </CardContent>

                    </Card>

                ))

            }

            <Divider sx={{ my: 5 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                Example Request

            </Typography>

            <Card>

                <CardContent>

                    <Typography
                        component="pre"
                        sx={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "monospace",
                        }}
                    >

{`curl -X POST \\
http://localhost:8000/api/gesture/predict \\
-F "file=@gesture.jpg"`}

                    </Typography>

                </CardContent>

            </Card>

            <Divider sx={{ my: 5 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                Example JSON Response

            </Typography>

            <Card>

                <CardContent>

                    <Typography
                        component="pre"
                        sx={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "monospace",
                        }}
                    >

{`{
  "label": "Hello",
  "confidence": 0.9874
}`}

                    </Typography>

                </CardContent>

            </Card>

            <Divider sx={{ my: 5 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                HTTP Status Codes

            </Typography>

            <Card>

                <CardContent>

                    <Typography>

                        <strong>200 OK</strong> — Successful request

                    </Typography>

                    <Typography>

                        <strong>400 Bad Request</strong> — Invalid input

                    </Typography>

                    <Typography>

                        <strong>404 Not Found</strong> — Endpoint unavailable

                    </Typography>

                    <Typography>

                        <strong>422 Validation Error</strong> — Request validation failed

                    </Typography>

                    <Typography>

                        <strong>500 Internal Server Error</strong> — Unexpected server error

                    </Typography>

                </CardContent>

            </Card>

            <Divider sx={{ my: 5 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                Backend Information

            </Typography>

            <Card>

                <CardContent>

                    <Typography>

                        Framework: FastAPI

                    </Typography>

                    <Typography>

                        API Style: REST

                    </Typography>

                    <Typography>

                        Response Format: JSON

                    </Typography>

                    <Typography>

                        Authentication: Configurable (JWT/API Key)

                    </Typography>

                    <Typography>

                        OpenAPI Specification: Supported

                    </Typography>

                </CardContent>

            </Card>

        </Box>

    );

}
