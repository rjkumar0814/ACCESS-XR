/******************************************************************************
 * ACCESS-XR
 * Application Footer
 ******************************************************************************/

import {
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";

import {
    Link as RouterLink,
} from "react-router-dom";

const quickLinks = [

    {
        label: "Home",
        path: "/",
    },

    {
        label: "Gesture",
        path: "/gesture",
    },

    {
        label: "Speech",
        path: "/speech",
    },

    {
        label: "Prediction",
        path: "/prediction",
    },

    {
        label: "API",
        path: "/api",
    },

    {
        label: "About",
        path: "/about",
    },

];

export default function Footer() {

    const currentYear =
        new Date().getFullYear();

    return (

        <Box

            component="footer"

            sx={{

                mt: 8,

                bgcolor: "background.paper",

                borderTop: 1,

                borderColor: "divider",

            }}

        >

            <Container
                maxWidth="xl"
            >

                <Grid

                    container

                    spacing={4}

                    sx={{

                        py: 5,

                    }}

                >

                    <Grid
                        item
                        xs={12}
                        md={5}
                    >

                        <Typography

                            variant="h6"

                            fontWeight={700}

                            gutterBottom

                        >

                            ACCESS-XR

                        </Typography>

                        <Typography
                            color="text.secondary"
                        >

                            A Unified Multimodal System for
                            Inclusive and Accessible
                            Communication in Extended Reality.

                        </Typography>

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={3}
                    >

                        <Typography

                            variant="subtitle1"

                            fontWeight={600}

                            gutterBottom

                        >

                            Quick Links

                        </Typography>

                        <Stack spacing={1}>

                            {

                                quickLinks.map((item) => (

                                    <Link

                                        key={item.path}

                                        component={RouterLink}

                                        to={item.path}

                                        underline="hover"

                                        color="inherit"

                                    >

                                        {item.label}

                                    </Link>

                                ))

                            }

                        </Stack>

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={4}
                    >

                        <Typography

                            variant="subtitle1"

                            fontWeight={600}

                            gutterBottom

                        >

                            Resources

                        </Typography>

                        <Stack

                            direction="row"

                            spacing={1}

                        >

                            <IconButton

                                component={Link}

                                href="#"

                                target="_blank"

                                aria-label="GitHub Repository"

                            >

                                <GitHubIcon />

                            </IconButton>

                            <IconButton

                                component={Link}

                                href="#"

                                target="_blank"

                                aria-label="Research Publication"

                            >

                                <ArticleIcon />

                            </IconButton>

                            <IconButton

                                component={RouterLink}

                                to="/"

                                aria-label="Home"

                            >

                                <HomeIcon />

                            </IconButton>

                        </Stack>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                            sx={{ mt: 2 }}

                        >

                            License: MIT

                        </Typography>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                        >

                            Version: 1.0.0

                        </Typography>

                    </Grid>

                </Grid>

                <Divider />

                <Box

                    sx={{

                        py: 2,

                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center",

                        flexWrap: "wrap",

                        gap: 2,

                    }}

                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        © {currentYear} ACCESS-XR.
                        All rights reserved.

                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        Built with React, TypeScript,
                        Material UI, FastAPI and PyTorch.

                    </Typography>

                </Box>

            </Container>

        </Box>

    );

}
