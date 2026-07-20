/******************************************************************************
 * ACCESS-XR
 * Main Entry Point
 *
 * Bootstraps the React application.
 ******************************************************************************/

import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { SnackbarProvider } from "notistack";

import App from "./App";

import theme from "./theme";

import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
).render(

    <React.StrictMode>

        <ThemeProvider theme={theme}>

            <CssBaseline />

            <SnackbarProvider

                maxSnack={3}

                autoHideDuration={3000}

                anchorOrigin={{

                    vertical: "bottom",

                    horizontal: "right",

                }}

            >

                <BrowserRouter>

                    <App />

                </BrowserRouter>

            </SnackbarProvider>

        </ThemeProvider>

    </React.StrictMode>

);
