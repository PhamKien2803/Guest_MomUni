import {
    createTheme,
    alpha
} from "@mui/material";

const paletteConfig = {
    primary: { main: "#E5A3B3", light: "#F8C8D4", dark: "#BF8A9B" },
    secondary: { main: "#A0C4B8", light: "#C0D8D0", dark: "#7FA99F" },
    background: { default: "#FFF7F5", paper: "#FFFFFF" },
    text: { primary: "#4A4A4A", secondary: "#757575", disabled: "#BDBDBD" },
};

export const elegantTheme = createTheme({
    palette: paletteConfig,
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: {
            fontFamily: '"Lora", serif',
            fontWeight: 700,
            fontSize: "2.6rem",
            color: paletteConfig.text.primary,
            lineHeight: 1.3,
            marginBottom: "0.5em",
        },
        h2: {
            fontFamily: '"Lora", serif',
            fontWeight: 700,
            fontSize: "2rem",
            color: "#3E2723",
            marginTop: "1.8em",
            marginBottom: "0.8em",
        },
        h3: {
            fontFamily: '"Lora", serif',
            fontWeight: 600,
            fontSize: "1.6rem",
            color: "#4E342E",
            marginTop: "1.5em",
            marginBottom: "0.6em",
        },
        h4: {
            fontFamily: '"Lora", serif',
            fontWeight: 600,
            fontSize: "1.4rem",
            color: "#5D4037",
        },
        h5: {
            fontFamily: '"Lora", serif',
            fontWeight: 600,
            fontSize: "1.2rem",
            color: "#4E342E",
        },
        h6: {
            fontWeight: 700,
            fontSize: "1.1rem",
            color: paletteConfig.text.primary,
        },
        subtitle1: {
            fontSize: "1rem",
            lineHeight: 1.6,
            fontWeight: 400,
            color: paletteConfig.text.secondary,
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.8,
            color: paletteConfig.text.primary,
            wordBreak: "break-word",
            overflowWrap: "break-word",
        },
        body2: {
            fontSize: "0.9rem",
            lineHeight: 1.6,
            color: paletteConfig.text.secondary,
        },
        caption: {
            fontSize: "0.875rem",
            color: alpha(paletteConfig.text.secondary, 0.9),
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "8px 22px",
                    boxShadow: "none",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    fontWeight: 600,
                    padding: "6px 12px",
                    fontSize: "0.875rem",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: `0 10px 25px ${alpha(paletteConfig.primary.main, 0.15)}`,
                    },
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    "&.Mui-selected": {
                        backgroundColor: paletteConfig.primary.main,
                        color: "white",
                        "&:hover": {
                            backgroundColor: paletteConfig.primary.dark,
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    padding: "24px",
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                size: "small",
            },
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: alpha(paletteConfig.primary.main, 0.03),
                    },
                },
            },
        },
    },
});

export const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
    },
};
export const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};