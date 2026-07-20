/******************************************************************************
 * ACCESS-XR
 * Global Material UI Theme
 ******************************************************************************/

import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "light",

        primary: {

            main: "#1976d2",

            light: "#42a5f5",

            dark: "#1565c0",

            contrastText: "#ffffff",

        },

        secondary: {

            main: "#26a69a",

            light: "#4db6ac",

            dark: "#00796b",

            contrastText: "#ffffff",

        },

        success: {

            main: "#2e7d32",

        },

        warning: {

            main: "#ed6c02",

        },

        error: {

            main: "#d32f2f",

        },

        info: {

            main: "#0288d1",

        },

        background: {

            default: "#f5f7fa",

            paper: "#ffffff",

        },

        text: {

            primary: "#1f2937",

            secondary: "#6b7280",

        },

    },

    typography: {

        fontFamily: [

            "Inter",

            "Roboto",

            "Helvetica",

            "Arial",

            "sans-serif",

        ].join(","),

        h1: {

            fontWeight: 700,

            fontSize: "2.75rem",

        },

        h2: {

            fontWeight: 700,

            fontSize: "2.25rem",

        },

        h3: {

            fontWeight: 600,

            fontSize: "1.9rem",

        },

        h4: {

            fontWeight: 600,

            fontSize: "1.6rem",

        },

        h5: {

            fontWeight: 600,

            fontSize: "1.35rem",

        },

        h6: {

            fontWeight: 600,

            fontSize: "1.15rem",

        },

        body1: {

            fontSize: "1rem",

            lineHeight: 1.7,

        },

        body2: {

            fontSize: "0.95rem",

            lineHeight: 1.6,

        },

        button: {

            fontWeight: 600,

            textTransform: "none",

        },

    },

    spacing: 8,

    shape: {

        borderRadius: 12,

    },

    breakpoints: {

        values: {

            xs: 0,

            sm: 600,

            md: 900,

            lg: 1200,

            xl: 1536,

        },

    },

    components: {

        MuiAppBar: {

            styleOverrides: {

                root: {

                    boxShadow: "none",

                    borderBottom: "1px solid #e5e7eb",

                },

            },

        },

        MuiButton: {

            defaultProps: {

                disableElevation: true,

            },

            styleOverrides: {

                root: {

                    borderRadius: 10,

                    paddingLeft: 20,

                    paddingRight: 20,

                    fontWeight: 600,

                },

            },

        },

        MuiCard: {

            styleOverrides: {

                root: {

                    borderRadius: 16,

                    boxShadow:
                        "0 4px 16px rgba(0,0,0,0.08)",

                },

            },

        },

        MuiPaper: {

            styleOverrides: {

                root: {

                    borderRadius: 12,

                },

            },

        },

        MuiTextField: {

            defaultProps: {

                variant: "outlined",

                fullWidth: true,

            },

        },

        MuiOutlinedInput: {

            styleOverrides: {

                root: {

                    borderRadius: 10,

                },

            },

        },

        MuiContainer: {

            defaultProps: {

                maxWidth: "xl",

            },

        },

        MuiChip: {

            styleOverrides: {

                root: {

                    fontWeight: 600,

                },

            },

        },

        MuiTooltip: {

            defaultProps: {

                arrow: true,

            },

        },

    },

});

export default theme;
