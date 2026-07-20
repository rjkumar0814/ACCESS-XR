/******************************************************************************
 * ACCESS-XR
 * Root Application Component
 ******************************************************************************/

import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Toolbar,
    Typography,
} from "@mui/material";

import {
    Link,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Home from "@/pages/Home";
import GesturePage from "@/pages/GesturePage";
import SpeechPage from "@/pages/SpeechPage";
import PredictionPage from "@/pages/PredictionPage";
import AboutPage from "@/pages/AboutPage";
import ApiPage from "@/pages/ApiPage";

function NavigationBar() {

    return (

        <AppBar
            position="static"
            color="inherit"
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700,
                    }}
                >
                    ACCESS-XR
                </Typography>

                <Button
                    component={Link}
                    to="/"
                    color="inherit"
                >
                    Home
                </Button>

                <Button
                    component={Link}
                    to="/gesture"
                    color="inherit"
                >
                    Gesture
                </Button>

                <Button
                    component={Link}
                    to="/speech"
                    color="inherit"
                >
                    Speech
                </Button>

                <Button
                    component={Link}
                    to="/prediction"
                    color="inherit"
                >
                    Prediction
                </Button>

                <Button
                    component={Link}
                    to="/api"
                    color="inherit"
                >
                    API
                </Button>

                <Button
                    component={Link}
                    to="/about"
                    color="inherit"
                >
                    About
                </Button>

            </Toolbar>

        </AppBar>

    );

}

function Footer() {

    return (

        <Box

            component="footer"

            sx={{

                mt: 8,

                py: 3,

                borderTop: "1px solid",

                borderColor: "divider",

                textAlign: "center",

            }}

        >

            <Typography
                variant="body2"
                color="text.secondary"
            >

                © 2026 ACCESS-XR

            </Typography>

            <Typography
                variant="caption"
                color="text.secondary"
            >

                A Unified Multimodal System for Inclusive and
                Accessible Communication in Extended Reality

            </Typography>

        </Box>

    );

}

export default function App() {

    return (

        <>

            <CssBaseline />

            <NavigationBar />

            <Container
                maxWidth="xl"
                sx={{
                    py: 4,
                    minHeight: "80vh",
                }}
            >

                <Routes>

                    <Route

                        path="/"

                        element={<Home />}

                    />

                    <Route

                        path="/gesture"

                        element={<GesturePage />}

                    />

                    <Route

                        path="/speech"

                        element={<SpeechPage />}

                    />

                    <Route

                        path="/prediction"

                        element={<PredictionPage />}

                    />

                    <Route

                        path="/api"

                        element={<ApiPage />}

                    />

                    <Route

                        path="/about"

                        element={<AboutPage />}

                    />

                    <Route

                        path="*"

                        element={

                            <Navigate
                                to="/"
                                replace
                            />

                        }

                    />

                </Routes>

            </Container>

            <Footer />

        </>

    );

}
