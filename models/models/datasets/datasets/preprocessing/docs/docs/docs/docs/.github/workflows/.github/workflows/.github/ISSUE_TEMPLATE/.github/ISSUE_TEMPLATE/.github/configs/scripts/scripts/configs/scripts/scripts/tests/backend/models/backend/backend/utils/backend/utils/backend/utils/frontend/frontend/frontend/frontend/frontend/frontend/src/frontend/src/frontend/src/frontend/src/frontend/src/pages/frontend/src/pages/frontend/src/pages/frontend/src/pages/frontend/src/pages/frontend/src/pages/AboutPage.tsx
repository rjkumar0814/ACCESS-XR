/******************************************************************************
 * ACCESS-XR
 * About Page
 ******************************************************************************/

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Link,
    Stack,
    Typography,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";

const technologies = [
    "React",
    "TypeScript",
    "Material UI",
    "FastAPI",
    "PyTorch",
    "OpenCV",
    "ONNX",
    "Docker",
    "REST API",
    "Extended Reality",
    "Computer Vision",
    "Speech Recognition",
    "Multimodal AI",
];

export default function AboutPage() {

    return (

        <Box>

            <Typography
                variant="h4"
                gutterBottom
            >

                About ACCESS-XR

            </Typography>

            <Typography
                color="text.secondary"
                paragraph
            >

                ACCESS-XR is a unified multimodal intelligent
                communication framework designed to improve
                accessibility within Extended Reality (XR)
                environments by integrating gesture recognition,
                speech recognition, and multimodal decision
                fusion into a single platform.

            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                Research Motivation

            </Typography>

            <Card sx={{ mb: 4 }}>

                <CardContent>

                    <Typography paragraph>

                        Existing XR communication systems often
                        rely on a single interaction modality,
                        limiting accessibility for users with
                        diverse communication requirements.
                        ACCESS-XR addresses this limitation by
                        combining complementary modalities to
                        provide more robust and inclusive
                        interaction.

                    </Typography>

                </CardContent>

            </Card>

            <Typography
                variant="h5"
                gutterBottom
            >

                System Architecture

            </Typography>

            <Grid
                container
                spacing={2}
                sx={{ mb: 4 }}
            >

                <Grid item xs={12} md={3}>

                    <Card>

                        <CardContent>

                            <Typography
                                fontWeight={700}
                            >

                                Gesture Module

                            </Typography>

                            <Typography
                                color="text.secondary"
                            >

                                Image-based gesture recognition

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={3}>

                    <Card>

                        <CardContent>

                            <Typography
                                fontWeight={700}
                            >

                                Speech Module

                            </Typography>

                            <Typography
                                color="text.secondary"
                            >

                                Automatic speech recognition

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={3}>

                    <Card>

                        <CardContent>

                            <Typography
                                fontWeight={700}
                            >

                                Fusion Engine

                            </Typography>

                            <Typography
                                color="text.secondary"
                            >

                                Reliability-aware multimodal fusion

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid item xs={12} md={3}>

                    <Card>

                        <CardContent>

                            <Typography
                                fontWeight={700}
                            >

                                XR Interface

                            </Typography>

                            <Typography
                                color="text.secondary"
                            >

                                Real-time immersive interaction

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                Technology Stack

            </Typography>

            <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 4 }}
            >

                {

                    technologies.map((technology) => (

                        <Chip

                            key={technology}

                            label={technology}

                            color="primary"

                            variant="outlined"

                        />

                    ))

                }

            </Stack>

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                Publication

            </Typography>

            <Card sx={{ mb: 4 }}>

                <CardContent>

                    <Typography paragraph>

                        <strong>Title</strong>

                    </Typography>

                    <Typography paragraph>

                        ACCESS-XR: A Unified Multimodal System for
                        Inclusive and Accessible Communication in
                        Extended Reality

                    </Typography>

                    <Typography color="text.secondary">

                        Springer Publication

                    </Typography>

                </CardContent>

            </Card>

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                Citation

            </Typography>

            <Card sx={{ mb: 4 }}>

                <CardContent>

                    <Typography
                        component="pre"
                        sx={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "monospace",
                        }}
                    >

{`@article{accessxr2026,
  title={ACCESS-XR: A Unified Multimodal System for Inclusive and Accessible Communication in Extended Reality},
  author={Authors},
  journal={Springer},
  year={2026}
}`}

                    </Typography>

                </CardContent>

            </Card>

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                License

            </Typography>

            <Typography paragraph>

                This project is distributed under the MIT License.

            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography
                variant="h5"
                gutterBottom
            >

                Resources

            </Typography>

            <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
            >

                <Button

                    variant="contained"

                    startIcon={<GitHubIcon />}

                    component={Link}

                    href="#"

                    target="_blank"

                >

                    GitHub Repository

                </Button>

                <Button

                    variant="outlined"

                    startIcon={<ArticleIcon />}

                    component={Link}

                    href="#"

                    target="_blank"

                >

                    Springer Article

                </Button>

                <Button

                    variant="outlined"

                    startIcon={<SchoolIcon />}

                    component={Link}

                    href="#"

                    target="_blank"

                >

                    Project Website

                </Button>

            </Stack>

        </Box>

    );

}
