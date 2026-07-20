/******************************************************************************
 * ACCESS-XR
 * Error Boundary
 ******************************************************************************/

import React, {
    ErrorInfo,
    ReactNode,
} from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    Typography,
} from "@mui/material";

import BugReportIcon from "@mui/icons-material/BugReport";
import RefreshIcon from "@mui/icons-material/Refresh";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface ErrorBoundaryProps {

    children: ReactNode;

}

interface ErrorBoundaryState {

    hasError: boolean;

    error?: Error;

    errorInfo?: ErrorInfo;

    expanded: boolean;

}

export default class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {

    constructor(props: ErrorBoundaryProps) {

        super(props);

        this.state = {

            hasError: false,

            expanded: false,

        };

    }

    static getDerivedStateFromError(
        error: Error
    ): Partial<ErrorBoundaryState> {

        return {

            hasError: true,

            error,

        };

    }

    componentDidCatch(

        error: Error,

        errorInfo: ErrorInfo

    ): void {

        console.error(

            "ACCESS-XR Error Boundary",

            error,

            errorInfo

        );

        this.setState({

            errorInfo,

        });

        /*
        Optional integration:

        Sentry.captureException(error);

        axios.post("/api/log/error", {
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
        });
        */

    }

    reloadApplication = () => {

        window.location.reload();

    };

    toggleDetails = () => {

        this.setState((previous) => ({

            expanded: !previous.expanded,

        }));

    };

    render() {

        if (!this.state.hasError) {

            return this.props.children;

        }

        return (

            <Box

                sx={{

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    minHeight: "80vh",

                    p: 4,

                }}

            >

                <Card

                    sx={{

                        maxWidth: 850,

                        width: "100%",

                    }}

                >

                    <CardContent>

                        <Box
                            textAlign="center"
                            mb={3}
                        >

                            <BugReportIcon

                                color="error"

                                sx={{

                                    fontSize: 72,

                                    mb: 2,

                                }}

                            />

                            <Typography
                                variant="h4"
                                gutterBottom
                            >

                                Something went wrong

                            </Typography>

                            <Typography
                                color="text.secondary"
                            >

                                ACCESS-XR encountered an
                                unexpected application error.

                            </Typography>

                        </Box>

                        <Alert
                            severity="error"
                            sx={{ mb: 3 }}
                        >

                            {this.state.error?.message ??
                                "Unknown application error."}

                        </Alert>

                        <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                        >

                            <Button

                                variant="contained"

                                startIcon={<RefreshIcon />}

                                onClick={
                                    this.reloadApplication
                                }

                            >

                                Reload Application

                            </Button>

                            <Button

                                variant="outlined"

                                onClick={
                                    this.toggleDetails
                                }

                                endIcon={

                                    this.state.expanded

                                        ? <ExpandLessIcon />

                                        : <ExpandMoreIcon />

                                }

                            >

                                Error Details

                            </Button>

                        </Box>

                        {

                            process.env.NODE_ENV ===
                                "development" && (

                                <Collapse
                                    in={
                                        this.state.expanded
                                    }
                                >

                                    <Box mt={4}>

                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                        >

                                            Stack Trace

                                        </Typography>

                                        <Box

                                            component="pre"

                                            sx={{

                                                overflowX:
                                                    "auto",

                                                background:
                                                    "#f5f5f5",

                                                p: 2,

                                                borderRadius: 2,

                                                fontSize:
                                                    "0.85rem",

                                                whiteSpace:
                                                    "pre-wrap",

                                            }}

                                        >

{this.state.error?.stack}

                                        </Box>

                                        <Typography
                                            variant="h6"
                                            sx={{ mt: 3 }}
                                        >

                                            Component Stack

                                        </Typography>

                                        <Box

                                            component="pre"

                                            sx={{

                                                overflowX:
                                                    "auto",

                                                background:
                                                    "#f5f5f5",

                                                p: 2,

                                                borderRadius: 2,

                                                fontSize:
                                                    "0.85rem",

                                                whiteSpace:
                                                    "pre-wrap",

                                            }}

                                        >

{this.state.errorInfo?.componentStack}

                                        </Box>

                                    </Box>

                                </Collapse>

                            )

                        }

                    </CardContent>

                </Card>

            </Box>

        );

    }

}
