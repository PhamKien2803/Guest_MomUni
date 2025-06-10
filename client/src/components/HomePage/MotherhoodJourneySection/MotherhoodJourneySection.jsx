import React, { useRef } from 'react';
import {
    Typography,
    Container, Box,
    Chip,
    useTheme, alpha, Avatar, Button
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    PregnantWoman,
    BabyChangingStation,
    Fastfood,
    DirectionsWalk,
    Psychology,
    Cottage,
    ArrowDownward
} from '@mui/icons-material';

// --- DỮ LIỆU ---
const journeyData = [
    { time: "3 Tháng đầu", icon: <PregnantWoman />, title: "Mang thai diệu kỳ", description: "Chăm sóc bản thân, làm quen với những thay đổi đầu tiên của cơ thể." },
    { time: "0-6 Tháng", icon: <BabyChangingStation />, title: "Chào đón Sơ sinh", description: "Kiến thức về giấc ngủ, dinh dưỡng và sự gắn kết những ngày đầu." },
    { time: "6-12 Tháng", icon: <Fastfood />, title: "Bé tập Ăn dặm", description: "Xây dựng thực đơn đa dạng, giúp bé khám phá thế giới ẩm thực." },
    { time: "1-2 Tuổi", icon: <DirectionsWalk />, title: "Bước chân đầu đời", description: "Đồng hành cùng con trong giai đoạn phát triển thể chất và ngôn ngữ." },
    { time: "2-3 Tuổi", icon: <Psychology />, title: "Khủng hoảng tuổi lên 2", description: "Thấu hiểu và định hướng cảm xúc, tính cách của con." },
    { time: "3+ Tuổi", icon: <Cottage />, title: "Bé đến nhà trẻ", description: "Chuẩn bị tâm lý và kỹ năng cho con bước vào môi trường mới." },
];

// --- COMPONENT THẺ HÀNH TRÌNH (QUAN TRỌNG) ---
// Mỗi thẻ sẽ tự quản lý animation của chính nó
const JourneyCard = ({ index, data, theme }) => {
    const ref = useRef(null); // Ref riêng cho mỗi thẻ

    // THEO DÕI SCROLL CỦA CHÍNH THẺ NÀY
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"] // Bắt đầu khi top thẻ chạm đáy màn hình, kết thúc khi đáy thẻ chạm top màn hình
    });

    // Biến đổi animation dựa trên tiến trình scroll của thẻ
    // Khi thẻ ở giữa màn hình (progress = 0.5), hiệu ứng sẽ đạt đỉnh
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.7, 1, 1, 0.7]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.4, 1, 1, 0.4]);
    const x = useTransform(scrollYProgress, [0, 0.4, 0.6, 1],
        index % 2 === 0 ? ['-100%', '0%', '0%', '-100%'] : ['100%', '0%', '0%', '100%']
    );
    const boxShadow = useTransform(scrollYProgress,
        [0.3, 0.5, 0.7],
        [`0px 0px 0px ${alpha(theme.palette.primary.main, 0)}`, `0px 0px 40px ${alpha(theme.palette.primary.main, 0.7)}`, `0px 0px 0px ${alpha(theme.palette.primary.main, 0)}`]
    );

    return (
        <Box
            ref={ref}
            sx={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                mb: 20, // Khoảng cách giữa các thẻ
                width: '100%',
            }}
        >
            <motion.div
                style={{
                    scale,
                    opacity,
                    x,
                    boxShadow,
                    width: 'calc(50% - 40px)', // Thẻ chiếm gần 1 nửa màn hình
                }}
            >
                <Box
                    sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: '16px',
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: alpha(theme.palette.grey[500], 0.2),
                        textAlign: 'center',
                    }}
                >
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{React.cloneElement(data.icon, { sx: { color: '#fff' } })}</Avatar>}
                        label={data.time}
                        sx={{ mb: 2, fontSize: '1rem', fontWeight: 600, p: 2.2 }}
                    />
                    <Typography variant="h5" color="text.primary" sx={{ fontWeight: 600 }}>
                        {data.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        {data.description}
                    </Typography>
                </Box>
            </motion.div>
        </Box>
    );
};


// --- COMPONENT CHÍNH ---
export const MotherhoodJourneySection = () => {
    const theme = useTheme();
    const journeyContainerRef = useRef(null);

    const handleStartClick = () => {
        journeyContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <Box sx={{ backgroundColor: theme.palette.background.default, color: 'text.primary' }}>
            {/* --- Section Mở đầu --- */}
            <Container
                maxWidth="md"
                sx={{
                    minHeight: '80vh', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 12
                }}
            >
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                        Khám phá Hành Trình Làm Mẹ
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, maxWidth: '600px' }}>
                        Mỗi bước đi đều là một kỳ diệu. Hãy cùng chúng tôi lật mở từng trang trong cuốn nhật ký thiêng liêng này.
                    </Typography>
                    <Button
                        variant="contained" size="large"
                        endIcon={<ArrowDownward />} onClick={handleStartClick}
                    >
                        Bắt đầu hành trình
                    </Button>
                </motion.div>
            </Container>

            {/* --- Section Hành trình Chính --- */}
            <Box ref={journeyContainerRef} sx={{ position: 'relative', py: 20 }}>
                {/* ĐƯỜNG ĐI CỐ ĐỊNH Ở GIỮA */}
                <Box sx={{
                    position: 'absolute',
                    top: 0, bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    bgcolor: alpha(theme.palette.grey[500], 0.3),
                    zIndex: 0,
                }}>
                    <Box sx={{
                        width: 24, height: 24, borderRadius: '50%',
                        bgcolor: 'secondary.main',
                        position: 'sticky', // Dính vào giữa màn hình
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span role="img" aria-label="marker">👶</span>
                    </Box>
                </Box>

                {/* CONTAINER CHỨA CÁC THẺ */}
                <Container maxWidth="md">
                    {journeyData.map((item, index) => (
                        <JourneyCard
                            key={item.title}
                            index={index}
                            data={item}
                            theme={theme}
                        />
                    ))}
                </Container>
            </Box>
        </Box>
    );
};