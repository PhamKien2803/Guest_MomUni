import React, { useRef } from 'react';
import {
    Typography,
    Container, Box, Grid,
    Paper, useTheme, alpha
} from '@mui/material';
import {
    Menu as MenuIcon,
    FavoriteBorder,
    Restaurant,
    ChildCare,
    LocalHospital,
    Spa,
    School,
} from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const MotionBox = motion(Box);
export const FeaturesSection = () => {
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