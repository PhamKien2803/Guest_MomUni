import { FallingPetalsJS } from "../FallingPetalsJS/FallingPetalsJS";
import { useState, useEffect } from 'react';
import {
    Typography,
    Button, Container, Box, Grid,
    Stack
} from '@mui/material';
import {
    Menu as MenuIcon,
    FavoriteBorder,
} from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';

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

export const HeroSection = () => {
    const heroMessages = [
        { title: "MomUni: Chào Đón Điều Kỳ Diệu.", subtitle: "Cùng bạn khám phá hành trình làm mẹ, từ những bỡ ngỡ đầu tiên đến niềm hạnh phúc vô bờ." },
        { title: "Kiến Thức Vàng Cho Mẹ Thông Thái.", subtitle: "Nơi mỗi câu hỏi được giải đáp, mỗi lo lắng được sẻ chia, giúp mẹ tự tin hơn mỗi ngày." },
        { title: "Yêu Thương Chắp Cánh Ước Mơ Con.", subtitle: "Đồng hành cùng sự phát triển của bé yêu, từ những bước chân đầu đời đến khám phá thế giới." },
        { title: "MomUni: Cộng Đồng Của Những Trái Tim.", subtitle: "Kết nối, học hỏi và lan tỏa niềm vui làm mẹ trong một không gian ấm áp và thấu hiểu." },
        {
            title: "Mẹ Hạnh Phúc, Con An Nhiên.",
            subtitle: "Hãy chăm sóc bản thân, bởi sức khỏe và niềm vui của mẹ là nền tảng vững chắc nhất cho con."
        },
        {
            title: "Tỏa Sáng Vẻ Đẹp Của Mẹ.",
            subtitle: "Gợi ý những bí quyết làm đẹp, yoga và phục hồi sức khỏe để mẹ luôn rạng rỡ và tràn đầy năng lượng."
        },
        {
            title: "Mỗi Cột Mốc, Một Niềm Tự Hào.",
            subtitle: "Theo dõi và thấu hiểu từng giai đoạn phát triển của con, từ nụ cười đầu tiên đến khi con vững bước."
        },
        {
            title: "Nuôi Dưỡng Thiên Tài Tí Hon.",
            subtitle: "Khơi dậy tiềm năng vô hạn trong con với các phương pháp giáo dục sớm khoa học và đầy cảm hứng."
        },

        {
            title: "Khoảnh Khắc Diệu Kỳ Cùng Con.",
            subtitle: "Ghi lại và trân trọng từng khoảnh khắc, từ tiếng cười trong veo đến những cái ôm ấm áp không rời."
        },
        {
            title: "Lắng Nghe Trái Tim Con Trẻ.",
            subtitle: "Trở thành người bạn đồng hành tin cậy, giúp con thể hiện cảm xúc và xây dựng một tâm hồn khỏe mạnh."
        },

        {
            title: "Cẩm Nang Cho Mẹ Hiện Đại.",
            subtitle: "Tất cả trong một: Từ dinh dưỡng, sức khỏe, tâm lý đến các mẹo vặt giúp hành trình làm mẹ dễ dàng hơn."
        }
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
                                sx={{ whiteSpace: 'nowrap' }}
                            />
                            <TypewriterText
                                key={`subtitle-${currentMessageIndex}`}
                                text={currentMessage.subtitle}
                                variant="subtitle1"
                                component="p"
                                color="text.secondary"
                                sx={{ my: 1 }}
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