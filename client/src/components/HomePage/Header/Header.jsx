import { useState, useEffect, useCallback, useRef } from 'react';

import {
    AppBar, Toolbar, Typography,
    Button, Container, Box,
    IconButton,
    useTheme
} from '@mui/material';
import {
    Menu as MenuIcon,
} from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const PulsatingHeartsAnimation = ({
    size = 30,
    motherHeartChar = "💖",
    childHeartChar = "💗"
}) => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);
    const timeRef = useRef(0);
    const theme = useTheme();

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const canvasWidth = canvas.width / dpr;
        const canvasHeight = canvas.height / dpr;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        timeRef.current += 0.05;

        const motherBaseSize = size * 0.65;
        const motherPulseFactor = 1 + 0.08 * Math.sin(timeRef.current);
        const motherCurrentSize = motherBaseSize * motherPulseFactor;
        ctx.font = `${motherCurrentSize}px Arial`;
        ctx.fillStyle = theme.palette.primary.main;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(motherHeartChar, canvasWidth / 2, canvasHeight / 2);

        const childBaseSize = motherBaseSize * 0.5;
        const childPulseFactor = 1 + 0.1 * Math.sin(timeRef.current + 0.8);
        const childCurrentSize = childBaseSize * childPulseFactor;
        ctx.font = `${childCurrentSize}px Arial`;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(childHeartChar, canvasWidth / 2, canvasHeight / 2 * 0.98);

        animationFrameId.current = requestAnimationFrame(animate);
    }, [size, motherHeartChar, childHeartChar, theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;

        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        canvas.width = size * dpr;
        canvas.height = size * dpr;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        animationFrameId.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [animate, size]);

    return <canvas ref={canvasRef} aria-label="Pulsating hearts animation" />;
};

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const handleNavigateToBlog = () => {
        navigate('/blog');
    };
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AppBar position="sticky" elevation={scrolled ? 4 : 0} sx={{ backgroundColor: scrolled ? 'rgba(255, 247, 245, 0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', transition: 'background-color 0.3s ease, box-shadow 0.3s ease', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexGrow: 1, pl: { xs: 1, md: 0 } }}>
                        <PulsatingHeartsAnimation size={28} />
                        <Typography variant="h6" component="div" sx={{ fontFamily: '"Lora", serif', color: 'text.primary' }}>
                            MomUni
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <Button variant="text" sx={{ color: 'text.primary' }}>Trang Chủ</Button>
                        <Button variant="text" sx={{ color: 'text.primary' }} onClick={handleNavigateToBlog}>
                            Blog
                        </Button>
                        <Button variant="text" sx={{ color: 'text.primary' }}>Chủ đề</Button>
                        <Button variant="contained" color="primary">Liên hệ</Button>
                    </Box>
                    <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary', pr: { xs: 1, md: 0 } }}><MenuIcon /></IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};