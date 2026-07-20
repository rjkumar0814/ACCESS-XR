/******************************************************************************
 * ACCESS-XR
 * Home Page
 ******************************************************************************/

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Link,
} from "react-router-dom";

const metrics = [

    {
        title: "Gesture Recognition",
        value: "Real-time",
    },

    {
        title: "Speech Recognition",
        value: "Multilingual",
    },

    {
        title: "Fusion Pipeline",
        value: "Multimodal",
    },

    {
        title: "XR Integration",
        value: "Supported",
    },

];

const modules = [

    {

        title: "Gesture Recognition",

        description:
            "Recognize sign language and hand gestures from image or video streams.",

        route: "/gesture",

    },

    {

        title: "Speech Recognition",

        description:
            "Convert spoken language into text using deep learning speech models.",

        route: "/speech",

    },

    {

        title: "Multimodal Prediction",

        description:
            "Fuse gesture and speech information for robust communication.",

        route: "/prediction",

    },

];

export default function Home() {

    return (

        <Box>

            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    borderRadius: 4,
                    textAlign: "center",
                    mb: 5,
                }}
            >

                <Typography
                    variant="h3"
                    fontWeight={700}
                    gutterBottom
                >

                    ACCESS-XR

                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >

                    A Unified Multimodal System for Inclusive and
                    Accessible Communication in Extended Reality

                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        maxWidth: 900,
                        mx: "auto",
                        mb: 4,
                    }}
                >

                    ACCESS-XR integrates gesture recognition,
                    speech recognition, and multimodal fusion
                    into a unified intelligent communication
                    platform designed for immersive Extended
                    Reality environments.

                </Typography>

                <Stack

                    direction="row"

                    spacing={2}

                    justifyContent="center"

                    flexWrap="wrap"

                >

                    <Button

                        component={Link}

                        to="/prediction"

                        variant="contained"

                        size="large"

                    >

                        Start Prediction

                    </Button>

                    <Button

                        component={Link}

                        to="/gesture"

                        variant="outlined"

                        size="large"

                    >

                        Gesture Demo

                    </Button>

                </Stack>

            </Paper>

            <Typography
                variant="h4"
                gutterBottom
            >

                System Modules

            </Typography>

            <Grid
                container
                spacing={3}
                sx={{ mb: 6 }}
            >

                {

                    modules.map((module) => (

                        <Grid

                            item

                            xs={12}

                            md={4}

                            key={module.title}

                        >

                            <Card>

                                <CardContent>

                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                    >

                                        {module.title}

                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        paragraph
                                    >

                                        {module.description}

                                    </Typography>

                                    <Button

                                        component={Link}

                                        to={module.route}

                                        variant="contained"

                                    >

                                        Open

                                    </Button>

                                </CardContent>

                            </Card>

                        </Grid>

                    ))

                }

            </Grid>

            <Typography
                variant="h4"
                gutterBottom
            >

                Supported Modalities

            </Typography>

            <Stack

                direction="row"

                spacing={2}

                flexWrap="wrap"

                sx={{ mb: 6 }}

            >

                <Chip label="Gesture Recognition" />

                <Chip label="Speech Recognition" />

                <Chip label="Multimodal Fusion" />

                <Chip label="XR Interaction" />

                <Chip label="Accessibility" />

                <Chip label="Real-Time Inference" />

            </Stack>

            <Typography
                variant="h4"
                gutterBottom
            >

                Platform Highlights

            </Typography>

            <Grid
                container
                spacing={3}
            >

                {

                    metrics.map((metric) => (

                        <Grid

                            item

                            xs={12}

                            sm={6}

                            md={3}

                            key={metric.title}

                        >

                            <Card>

                                <CardContent>

                                    <Typography
                                        variant="h5"
                                        fontWeight={700}
                                    >

                                        {metric.value}

                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                    >

                                        {metric.title}

                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>

                    ))

                }

            </Grid>

        </Box>

    );

}
