import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container, Box,
    Chip,
    useTheme, alpha, Avatar
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import {
    Menu as MenuIcon,
    PregnantWoman,
    BabyChangingStation,
    Fastfood,
    DirectionsWalk,
    Psychology,
    Cottage
} from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';

export const MotherhoodJourneySection = () => {
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