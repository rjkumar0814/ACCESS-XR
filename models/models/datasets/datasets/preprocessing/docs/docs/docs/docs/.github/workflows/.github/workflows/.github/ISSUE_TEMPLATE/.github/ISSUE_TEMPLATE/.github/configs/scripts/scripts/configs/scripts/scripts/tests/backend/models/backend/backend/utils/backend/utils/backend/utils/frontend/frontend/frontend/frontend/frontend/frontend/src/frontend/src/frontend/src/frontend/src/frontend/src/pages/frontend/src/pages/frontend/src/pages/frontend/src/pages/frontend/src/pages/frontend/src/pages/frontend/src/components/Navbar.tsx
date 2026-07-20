/******************************************************************************
 * ACCESS-XR
 * Responsive Navigation Bar
 ******************************************************************************/

import { useState } from "react";

import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import {
    Link,
    useLocation,
} from "react-router-dom";

const navigationItems = [

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

export default function Navbar() {

    const location = useLocation();

    const [mobileOpen, setMobileOpen] =
        useState(false);

    const toggleDrawer = () => {

        setMobileOpen((previous) => !previous);

    };

    const drawer = (

        <Box
            sx={{
                width: 260,
            }}
            role="navigation"
            aria-label="Mobile navigation"
        >

            <Typography
                variant="h6"
                sx={{
                    p: 2,
                    fontWeight: 700,
                }}
            >

                ACCESS-XR

            </Typography>

            <List>

                {

                    navigationItems.map((item) => (

                        <ListItemButton

                            key={item.path}

                            component={Link}

                            to={item.path}

                            selected={
                                location.pathname ===
                                item.path
                            }

                            onClick={() =>
                                setMobileOpen(false)
                            }

                        >

                            <ListItemText
                                primary={item.label}
                            />

                        </ListItemButton>

                    ))

                }

            </List>

        </Box>

    );

    return (

        <>

            <AppBar
                position="sticky"
                color="inherit"
                elevation={0}
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

                    <Box

                        sx={{

                            display: {

                                xs: "none",

                                md: "flex",

                            },

                            gap: 1,

                        }}

                    >

                        {

                            navigationItems.map((item) => (

                                <Button

                                    key={item.path}

                                    component={Link}

                                    to={item.path}

                                    color={
                                        location.pathname ===
                                        item.path

                                            ? "primary"

                                            : "inherit"
                                    }

                                    variant={
                                        location.pathname ===
                                        item.path

                                            ? "contained"

                                            : "text"
                                    }

                                >

                                    {item.label}

                                </Button>

                            ))

                        }

                    </Box>

                    <IconButton

                        edge="end"

                        color="inherit"

                        aria-label="Open navigation menu"

                        onClick={toggleDrawer}

                        sx={{

                            display: {

                                xs: "flex",

                                md: "none",

                            },

                        }}

                    >

                        <MenuIcon />

                    </IconButton>

                </Toolbar>

            </AppBar>

            <Drawer

                anchor="right"

                open={mobileOpen}

                onClose={toggleDrawer}

            >

                {drawer}

            </Drawer>

        </>

    );

}
