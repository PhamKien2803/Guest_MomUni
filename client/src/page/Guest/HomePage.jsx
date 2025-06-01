import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import {
    createTheme, ThemeProvider, CssBaseline, AppBar, Toolbar, Typography,
    Button, Container, Box, Card, CardMedia, CardContent, Grid, Link,
    IconButton, Chip, TextField, Alert, Snackbar,
    Paper, Stack, Divider, useTheme, alpha, CircularProgress, Avatar
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { LoadingButton } from '@mui/lab';
import {
    Menu as MenuIcon,
    ArrowForwardIos,
    FavoriteBorder,
    Restaurant,
    ChildCare,
    LocalHospital,
    Spa,
    School,
    Facebook,
    Instagram,
    Twitter,
    Send,
    PregnantWoman,
    BabyChangingStation,
    Fastfood,
    DirectionsWalk,
    Psychology,
    Cottage
} from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



const elegantTheme = createTheme({
    palette: {
        primary: { main: '#E5A3B3', light: '#fce4ec' },
        secondary: { main: '#A0C4B8' },
        background: { default: '#FFF7F5', paper: '#FFFFFF' },
        text: { primary: '#5D4037', secondary: '#8D6E63' },
        success: { main: '#A0C4B8' },
        warning: { main: '#FFDAB9' },
        info: { main: '#B2DFDB' },
        error: { main: '#FFCDD2' },
    },
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '3.2rem' },
        h2: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '3rem' },
        h3: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '2.2rem' },
        h4: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.8rem' },
        h5: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.5rem' },
        h6: { fontWeight: 700 },
        subtitle1: { fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 400 },
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: 50, textTransform: 'none', fontWeight: 700, padding: '10px 25px' } } },
        MuiChip: { styleOverrides: { root: { borderRadius: 8, fontWeight: 700 } } }
    },
});

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const MotionBox = motion(Box);
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


const Header = () => {
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

const FallingPetalsJS = () => {
    const canvasRef = useRef(null);
    const petalsArray = useRef([]);
    const animationFrameId = useRef(null);
    const petalEmojis = ["🌸", "💮", "💖"];

    const createPetal = (canvas) => {
        const size = Math.random() * 10 + 8;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height * 0.5,
            size: size,
            speedY: Math.random() * 0.5 + 0.5,
            speedX: Math.random() * 0.5 - 0.25,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            character: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
            opacity: Math.random() * 0.5 + 0.5,
        };
    };

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const currentWidth = canvas.offsetWidth;
        const currentHeight = canvas.offsetHeight;

        if (currentWidth > 0 && currentHeight > 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petalsArray.current.forEach((petal, index) => {
                petal.y += petal.speedY;
                petal.x += petal.speedX;
                petal.rotation += petal.rotationSpeed;

                ctx.save();
                ctx.translate(petal.x * (canvas.width / currentWidth), petal.y * (canvas.height / currentHeight) + petal.size / 2);
                ctx.rotate((petal.rotation * Math.PI) / 180);
                ctx.globalAlpha = petal.opacity;
                ctx.font = `${petal.size}px Arial`;
                ctx.fillText(petal.character, -petal.size / 2, petal.size / 2);
                ctx.restore();

                if (petal.y * (canvas.height / currentHeight) > currentHeight + petal.size) {
                    petalsArray.current[index] = createPetal({ width: currentWidth, height: currentHeight });
                    petalsArray.current[index].y = -petal.size - Math.random() * 20;
                }
                if (petal.x * (canvas.width / currentWidth) > currentWidth + petal.size) petal.x = -petal.size / (canvas.width / currentWidth);
                if (petal.x * (canvas.width / currentWidth) < -petal.size) petal.x = (currentWidth + petal.size) / (canvas.width / currentWidth);
            });
        }
        animationFrameId.current = requestAnimationFrame(animate);
    }, []);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        let timer;

        const setCanvasDimensions = () => {
            const dpr = window.devicePixelRatio || 1;
            const newWidth = canvas.offsetWidth;
            const newHeight = canvas.offsetHeight;

            if (canvas.width !== newWidth * dpr || canvas.height !== newHeight * dpr) {
                canvas.width = newWidth * dpr;
                canvas.height = newHeight * dpr;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.scale(dpr, dpr);
                }
            }

            if (petalsArray.current.length === 0 && newWidth > 0 && newHeight > 0) {
                const numberOfPetals = 25;
                for (let i = 0; i < numberOfPetals; i++) {
                    petalsArray.current.push(createPetal({ width: newWidth, height: newHeight }));
                }
            }
        };

        const startAnimation = () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = requestAnimationFrame(animate);
        }

        setCanvasDimensions();
        timer = setTimeout(startAnimation, 100);

        window.addEventListener('resize', setCanvasDimensions);

        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            clearTimeout(timer);
        };
    }, [animate]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        />
    );
};

const TypewriterText = ({ text, variant, component = "div", sx, charDelay = 0.05, initialDelay = 0, color = "text.primary" }) => {
    const characters = Array.from(text);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: initialDelay,
                staggerChildren: charDelay,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0, y: "50%" },
        visible: {
            opacity: 1,
            y: "0%",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <Typography variant={variant} component={component} sx={sx} color={color}>
            <motion.span
                style={{ display: 'inline-block', overflow: 'hidden' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                aria-label={text}
            >
                {characters.map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`}
                        variants={charVariants}
                        style={{ display: 'inline-block', willChange: 'opacity, transform' }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.span>
        </Typography>
    );
};

const HeroSection = () => {
    const heroMessages = [
        { title: "MomUni: Chào Đón Điều Kỳ Diệu.", subtitle: "Cùng bạn khám phá hành trình làm mẹ, từ những bỡ ngỡ đầu tiên đến niềm hạnh phúc vô bờ." },
        { title: "Kiến Thức Vàng Cho Mẹ Thông Thái.", subtitle: "Nơi mỗi câu hỏi được giải đáp, mỗi lo lắng được sẻ chia, giúp mẹ tự tin hơn mỗi ngày." },
        { title: "Yêu Thương Chắp Cánh Ước Mơ Con.", subtitle: "Đồng hành cùng sự phát triển của bé yêu, từ những bước chân đầu đời đến khám phá thế giới." },
        { title: "MomUni: Cộng Đồng Của Những Trái Tim.", subtitle: "Kết nối, học hỏi và lan tỏa niềm vui làm mẹ trong một không gian ấm áp và thấu hiểu." }
    ];
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % heroMessages.length);
        }, 7000);

        return () => clearInterval(intervalId);
    }, [heroMessages.length]);

    const currentMessage = heroMessages[currentMessageIndex];

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 12 }, minHeight: '80vh', display: 'flex', alignItems: 'center', textAlign: { xs: 'center', md: 'left' } }}>
            <FallingPetalsJS />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={10} lg={8}>
                        <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
                            <TypewriterText
                                key={`title-${currentMessageIndex}`}
                                text={currentMessage.title}
                                variant="h1"
                                component="h1"
                                initialDelay={0.1}
                                charDelay={0.05}
                            />
                            <TypewriterText
                                key={`subtitle-${currentMessageIndex}`}
                                text={currentMessage.subtitle}
                                variant="subtitle1"
                                component="p"
                                color="text.secondary"
                                sx={{ my: 1, maxWidth: '600px' }}
                                initialDelay={currentMessage.title.length * 0.05 + 0.3}
                                charDelay={0.02}
                            />
                            <motion.div
                                key={`button-${currentMessageIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: currentMessage.title.length * 0.05 + currentMessage.subtitle.length * 0.02 + 0.5 }}
                            >
                                <Button variant="contained" color="primary" size="large" endIcon={<FavoriteBorder />}>
                                    Khám Phá Ngay
                                </Button>
                            </motion.div>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

// --- Dán COMPONENT MỚI VÀO ĐÂY ---

const FeaturesSection = () => {
    const theme = useTheme();
    const featuresData = [
        { icon: <Restaurant />, title: "Dinh dưỡng", description: "Công thức cho mẹ và bé." },
        { icon: <ChildCare />, title: "Phát triển", description: "Cột mốc quan trọng." },
        { icon: <LocalHospital />, title: "Sức khỏe", description: "Phòng và trị bệnh." },
        { icon: <Spa />, title: "Làm đẹp", description: "Rạng rỡ mỗi ngày." },
        { icon: <School />, title: "Giáo dục sớm", description: "Nền tảng tương lai." },
        { icon: <FavoriteBorder />, title: "Tâm lý", description: "Thấu hiểu & sẻ chia." },
    ];

    const FeatureCard = ({ icon, title, description }) => {
        const cardRef = useRef(null);

        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            const { left, top, width, height } = cardRef.current.getBoundingClientRect();
            // Lấy vị trí chuột tương đối với card
            const x = e.clientX - left;
            const y = e.clientY - top;

            const rotateX = (y - height / 2) / (height / 2) * -10;
            const rotateY = (x - width / 2) / (width / 2) * 10;

            cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            cardRef.current.style.transition = 'transform 0.1s linear';
        };

        const handleMouseLeave = () => {
            if (!cardRef.current) return;
            cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            cardRef.current.style.transition = 'transform 0.4s ease';
        };

        return (
            <MotionBox
                ref={cardRef}
                component={Paper}
                elevation={4}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    backgroundColor: alpha('#ffffff', 0.7),
                    backdropFilter: 'blur(5px)',
                    cursor: 'pointer',
                    willChange: 'transform',
                    transition: 'all 0.4s ease',
                    '&:hover .feature-icon-wrapper': {
                        transform: 'scale(1.15)',
                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                    }
                }}
            >
                <Box
                    className="feature-icon-wrapper"
                    sx={{
                        width: 72, height: 72, borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mb: 2.5,
                        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
                    }}
                >
                    {React.cloneElement(icon, { sx: { fontSize: 36, color: 'primary.main' } })}
                </Box>
                <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: '2.5em' }}>
                    {description}
                </Typography>
            </MotionBox>
        );
    };

    return (
        <MotionBox sx={{ py: 10, backgroundColor: theme.palette.background.default }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" color="text.primary" gutterBottom>
                    Khám phá mọi khía cạnh
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, fontWeight: 400, maxWidth: '600px', margin: 'auto auto 64px auto' }}>
                    Những chủ đề được quan tâm nhất, giúp mẹ tự tin và vững vàng trên mọi chặng đường.
                </Typography>
                <Grid container spacing={3.5} justifyContent="center">
                    {featuresData.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3.5} key={index}>
                            <FeatureCard {...feature} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MotionBox>
    );
};

// --- ✨ NEW COMPONENT: HORIZONTAL & AUTOMATIC MOTHERHOOD JOURNEY ✨ ---
const MotherhoodJourneySection = () => {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    const journeyData = [
        {
            time: "3 Tháng đầu",
            icon: <PregnantWoman />,
            title: "Mang thai diệu kỳ",
            description: "Chăm sóc bản thân, làm quen với những thay đổi đầu tiên của cơ thể.",
        },
        {
            time: "0-6 Tháng",
            icon: <BabyChangingStation />,
            title: "Chào đón Sơ sinh",
            description: "Kiến thức về giấc ngủ, dinh dưỡng và sự gắn kết những ngày đầu.",
        },
        {
            time: "6-12 Tháng",
            icon: <Fastfood />,
            title: "Bé tập Ăn dặm",
            description: "Xây dựng thực đơn đa dạng, giúp bé khám phá thế giới ẩm thực.",
        },
        {
            time: "1-2 Tuổi",
            icon: <DirectionsWalk />,
            title: "Bước chân đầu đời",
            description: "Đồng hành cùng con trong giai đoạn phát triển thể chất và ngôn ngữ.",
        },
        {
            time: "2-3 Tuổi",
            icon: <Psychology />,
            title: "Khủng hoảng tuổi lên 2",
            description: "Thấu hiểu và định hướng cảm xúc, tính cách của con.",
        },
        {
            time: "3+ Tuổi",
            icon: <Cottage />,
            title: "Bé đến nhà trẻ",
            description: "Chuẩn bị tâm lý và kỹ năng cho con bước vào môi trường mới.",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % journeyData.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [journeyData.length]);

    const currentMilestone = journeyData[currentIndex];

    const pulsatingGlowKeyframes = `
  @keyframes pulsatingGlow {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 ${alpha(theme.palette.primary.main, 0.7)};
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 0 10px 10px ${alpha(theme.palette.primary.main, 0)};
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 ${alpha(theme.palette.primary.main, 0)};
    }
  }
`;

    return (
        <Box sx={{ py: 12, backgroundColor: theme.palette.background.default, overflow: 'hidden' }}>
            <style>{pulsatingGlowKeyframes}</style>

            <Container maxWidth="md">
                <Typography variant="h3" align="center" color="text.primary" gutterBottom>
                    Hành Trình Làm Mẹ
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, fontWeight: 400 }}>
                    Mỗi giai đoạn là một chương mới đầy yêu thương và những cột mốc đáng nhớ.
                </Typography>

                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ position: 'relative', height: '50px', mb: 4 }}>
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '5%', right: '5%',
                            height: '4px', bgcolor: alpha(theme.palette.primary.main, 0.2),
                            transform: 'translateY(-50%)',
                        }} />

                        <Box sx={{
                            position: 'absolute', top: '50%', left: '5%', right: '5%',
                            display: 'flex', justifyContent: 'space-between',
                            transform: 'translateY(-50%)',
                        }}>
                            {journeyData.map((_, index) => (
                                <Box key={index} sx={{
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.main',
                                    border: `3px solid ${theme.palette.background.default}`,
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    transform: index === currentIndex ? 'scale(1.2)' : 'scale(0.8)',
                                    opacity: index === currentIndex ? 1 : 0.6,

                                    // 2. Áp dụng animation cho mốc hiện tại
                                    animation: index === currentIndex
                                        ? `pulsatingGlow 2s infinite ease-in-out`
                                        : 'none',
                                }} />
                            ))}
                        </Box>

                        <motion.div
                            animate={{ left: `calc(${(currentIndex / (journeyData.length - 1)) * 90}% + 5%)` }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            style={{
                                position: 'absolute', top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 32, height: 32, borderRadius: '50%',
                                backgroundColor: theme.palette.secondary.main,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            }}
                        >
                            <span role="img" aria-label="baby" style={{ fontSize: '18px' }}>👶</span>
                        </motion.div>
                    </Box>

                    <Box sx={{ minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Chip
                                    avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{React.cloneElement(currentMilestone.icon, { sx: { color: '#fff' } })}</Avatar>}
                                    label={currentMilestone.time}
                                    sx={{ mb: 2, fontSize: '1rem', fontWeight: 600, p: 2.2 }}
                                />
                                <Typography variant="h5" color="text.primary" sx={{ fontWeight: 600 }}>
                                    {currentMilestone.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: '500px', mx: 'auto' }}>
                                    {currentMilestone.description}
                                </Typography>
                            </motion.div>
                        </AnimatePresence>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};


const BlogSection = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getCategoryColor = (category) => {
        const colors = {
            'Giấc ngủ': 'primary',
            'Dinh dưỡng': 'secondary',
            'Phát triển': 'success',
            'Sức khỏe': 'warning',
            'Ăn dặm': 'info',
            'Tâm lý': 'error',
        };
        return colors[category] || 'primary';
    };
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('blog');
                setBlogPosts(response.data.blogs);
                setError(null);
            } catch (err) {
                setError('Không thể tải danh sách bài viết. Vui lòng thử lại sau.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <MotionBox sx={{ py: 10, overflow: 'hidden' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" gutterBottom sx={{ mb: 8 }}>
                    Từ Blog của MomUni
                </Typography>
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    grabCursor={true}
                    loop={blogPosts.length > 3}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                        600: { slidesPerView: 2, spaceBetween: 20 },
                        900: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    style={{ paddingBottom: '50px', paddingTop: '10px' }}
                >
                    {blogPosts.map((post) => (
                        <SwiperSlide key={post._id} style={{ height: 'auto' }}>
                            <Card sx={{
                                width: '100%', height: '100%', borderRadius: '16px',
                                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: (theme) => `0px 12px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                                },
                                '&:hover .blog-card-media': { transform: 'scale(1.08)' }
                            }}>
                                <Box sx={{ overflow: 'hidden', height: 200 }}>
                                    <CardMedia
                                        component="img"
                                        className="blog-card-media"
                                        sx={{
                                            height: '100%', width: '100%', objectFit: 'cover',
                                            transition: 'transform 0.4s ease-in-out',
                                        }}
                                        image={post.imageUrl || 'https://via.placeholder.com/870x870.png?text=MomUni'}
                                        alt={post.title}
                                    />
                                </Box>
                                <CardContent sx={{
                                    flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column'
                                }}>
                                    <Chip label={post.category} color={getCategoryColor(post.category)} size="small" sx={{ mb: 1.5, alignSelf: 'flex-start', opacity: 0.9 }} />
                                    <Typography variant="h6" component="div" sx={{
                                        mb: 1, fontSize: '1.1rem', lineHeight: 1.4, fontWeight: 600, color: 'text.primary',
                                        display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
                                        overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '2.8em'
                                    }}>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        mb: 2, flexGrow: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3, overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '4.5em'
                                    }}>
                                        {post.excerpt || "Khám phá những thông tin hữu ích và cập nhật mới nhất về chủ đề này..."}
                                    </Typography>
                                    <Button
                                        size="small" variant="text" color="primary"
                                        endIcon={<ArrowForwardIos sx={{ fontSize: '0.8rem' }} />}
                                        sx={{ mt: 'auto', alignSelf: 'flex-start', fontWeight: 600, '&:hover': { bgcolor: 'transparent' } }}
                                    >
                                        Đọc thêm
                                    </Button>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </MotionBox>
    );
};


const FooterWithForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', topic: '', question: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('expert-form/create', formData);
            if (response.status === 201) {
                setSnackbar({ open: true, message: 'Cảm ơn bạn! Chúng tôi sẽ sớm liên hệ.', severity: 'success' });
                setFormData({ name: '', email: '', phone: '', topic: '', question: '' });
            } else {
                setSnackbar({ open: true, message: response.data.message || 'Có lỗi xảy ra, vui lòng thử lại.', severity: 'error' });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Oops! Có lỗi xảy ra khi gửi form.';
            setSnackbar({ open: true, message: errorMessage, severity: 'error' });
            console.error(err);
        }
        setIsSubmitting(false);
    };

    return (
        <Box component="footer" sx={{ backgroundColor: 'secondary.main', color: 'white', pt: 12, pb: 6, mt: 10, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: `linear-gradient(to bottom, ${elegantTheme.palette.background.default}, ${elegantTheme.palette.secondary.main})`, zIndex: 0 }} />
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Paper elevation={8} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 8, mt: -24 }}>
                    <Typography variant="h3" component="h2" align="center" color="text.primary" gutterBottom>Kết nối với MomUni</Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>Có bất kỳ câu hỏi hay góp ý nào? Hãy cho chúng tôi biết nhé!</Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Tên của bạn" name="name" value={formData.name} onChange={handleInputChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Số điện thoại" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Chủ đề câu hỏi" name="topic" value={formData.topic} onChange={handleInputChange} required />
                                </Grid>
                            </Grid>
                            <TextField fullWidth label="Lời nhắn của bạn" name="question" value={formData.question} onChange={handleInputChange} required multiline rows={4} />
                            <LoadingButton type="submit" loading={isSubmitting} endIcon={<Send />} variant="contained" color="primary" size="large" sx={{ mt: 1 }}>Gửi Lời Nhắn</LoadingButton>
                        </Stack>
                    </Box>
                </Paper>
                <Grid container spacing={4} justifyContent="center" textAlign="center">
                    <Grid item xs={12}>
                        <Typography variant="h5" sx={{ fontFamily: '"Lora", serif', mb: 2, color: 'white' }}>MomUni</Typography>
                        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                            <Link href="#" color="inherit" underline="hover">Blog</Link>
                            <Link href="#" color="inherit" underline="hover">Về chúng tôi</Link>
                            <Link href="#" color="inherit" underline="hover">Điều khoản</Link>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton href="#" aria-label="Facebook" sx={{ color: 'white' }}><Facebook /></IconButton>
                            <IconButton href="#" aria-label="Instagram" sx={{ color: 'white' }}><Instagram /></IconButton>
                            <IconButton href="#" aria-label="Twitter" sx={{ color: 'white' }}><Twitter /></IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} align="center">© {new Date().getFullYear()} MomUni. All rights reserved.</Typography>
            </Container>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};


export default function HomePage2() {
    return (
        <ThemeProvider theme={elegantTheme}>
            <CssBaseline />
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <MotherhoodJourneySection />
                <BlogSection />
            </main>
            <FooterWithForm />
        </ThemeProvider>
    );
}