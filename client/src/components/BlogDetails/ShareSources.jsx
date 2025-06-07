import React from "react";
import { Box, Tooltip, IconButton, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import {
    Facebook,
    LocalMall,
    Storefront,
} from "@mui/icons-material";

const MotionIconButton = motion(IconButton);

const shareItems = [
    {
        label: "Shopee",
        color: "#ee4d2d",
        iconType: "image",
        iconSrc: "/assets/icons/shopee.png", // Đường dẫn tới ảnh bạn vừa upload
        href: "https://shopee.vn",
    },
    {
        label: "Lazada",
        color: "#1a9cb7",
        iconType: "icon",
        icon: <LocalMall />,
        href: "https://lazada.vn",
    },
    {
        label: "Facebook",
        color: "#1877f2",
        iconType: "icon",
        icon: <Facebook />,
        href: "https://facebook.com",
    },
    {
        label: "Tiki",
        color: "#189eff",
        iconType: "icon",
        icon: <Storefront />,
        href: "https://tiki.vn",
    },
];

const ShareSources = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: 16,
                transform: "translateY(-50%)",
                zIndex: 1200,
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                gap: 1.5,
            }}
        >
            {shareItems.map((item, index) => (
                <Tooltip title={item.label} placement="right" arrow key={index}>
                    <MotionIconButton
                        component="a"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        sx={{
                            backgroundColor: item.color,
                            color: "#fff",
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            boxShadow: `0 4px 10px ${item.color}66`,
                            overflow: "hidden",
                            p: 0,
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: item.color,
                            },
                        }}
                    >
                        {item.iconType === "image" ? (
                            <Avatar
                                src={item.iconSrc}
                                alt={item.label}
                                sx={{ width: 28, height: 28, bgcolor: "transparent" }}
                            />
                        ) : (
                            item.icon
                        )}
                    </MotionIconButton>
                </Tooltip>
            ))}
        </Box>
    );
};

export default ShareSources;
