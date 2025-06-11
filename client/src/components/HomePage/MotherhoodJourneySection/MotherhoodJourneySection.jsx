import React, { useRef, useState } from 'react';
import {
    Typography,
    Container, Box,
    Chip,
    useTheme, alpha, Avatar, Button,
    CardMedia, Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import {
    PregnantWoman,
    BabyChangingStation,
    Fastfood,
    DirectionsWalk,
    Psychology,
    Cottage,
    School,
    ArrowDownward,
    Close
} from '@mui/icons-material';

const journeyData = [
    {
        time: "3 Tháng đầu",
        icon: <PregnantWoman />,
        title: "Mang thai diệu kỳ",
        description: "Chăm sóc bản thân, làm quen với những thay đổi đầu tiên của cơ thể.",
        image: "/images/1.png",
        details: "Trong 3 tháng đầu, mẹ nên chú ý đến việc nghỉ ngơi và chế độ dinh dưỡng hợp lý. Đây là giai đoạn thai kỳ dễ bị tác động nhất."
    },
    {
        time: "0-6 Tháng",
        icon: <BabyChangingStation />,
        title: "Chào đón Sơ sinh",
        description: "Kiến thức về giấc ngủ, dinh dưỡng và sự gắn kết những ngày đầu.",
        image: "/images/2.png",
        details: "Giai đoạn sơ sinh cần chú ý đến nếp sinh hoạt, lịch bú ngủ của bé, và giữ vệ sinh đúng cách."
    },
    {
        time: "6-12 Tháng",
        icon: <Fastfood />,
        title: "Bé tập Ăn dặm",
        description: "Xây dựng thực đơn đa dạng, giúp bé khám phá thế giới ẩm thực.",
        image: "/images/3.png",
        details: "Hãy bắt đầu từ các thực phẩm mềm, đơn giản. Quan sát phản ứng và tránh ép bé ăn quá nhiều."
    },
    {
        time: "1-2 Tuổi",
        icon: <DirectionsWalk />,
        title: "Bước chân đầu đời",
        description: "Đồng hành cùng con trong giai đoạn phát triển thể chất và ngôn ngữ.",
        image: "/images/4.png",
        details: "Hãy để bé tự do khám phá nhưng luôn trong sự giám sát. Khuyến khích nói chuyện và chơi sáng tạo."
    },
    {
        time: "2-3 Tuổi",
        icon: <Psychology />,
        title: "Khủng hoảng tuổi lên 2",
        description: "Thấu hiểu và định hướng cảm xúc, tính cách của con.",
        image: "/images/5.png",
        details: "Tránh la mắng và thay vào đó dùng phương pháp đồng cảm, giúp bé học cách diễn đạt cảm xúc."
    },
    {
        time: "3+ Tuổi",
        icon: <Cottage />,
        title: "Bé đến nhà trẻ",
        description: "Chuẩn bị tâm lý và kỹ năng cho con bước vào môi trường mới.",
        image: "/images/6.png",
        details: "Dạy bé kỹ năng tự phục vụ, vệ sinh và làm quen với bạn mới. Cho bé đến tham quan trước khi nhập học."
    },
    {
        time: "4-5 Tuổi",
        icon: <School />,
        title: "Khởi đầu học tập",
        description: "Giới thiệu kỹ năng tiền học đường, tính tự lập, và khám phá.",
        image: "/images/7.png",
        details: "Bé cần học cách cầm bút, nhận biết mặt chữ, và làm quen với khái niệm thời gian, quy tắc."
    }
];

const JourneyCard = ({ index, data, onOpen }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                mb: 20,
                width: '100%',
                perspective: 1000,
            }}
        >
            <motion.div
                initial={{ opacity: 0, rotateY: -45, scale: 0.8 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    duration: 0.8,
                    delay: index * 0.15
                }}
                whileHover={{
                    rotateX: -5,
                    rotateY: index % 2 === 0 ? 5 : -5,
                    scale: 1.05
                }}
                style={{
                    width: 'calc(50% - 40px)',
                    transformStyle: 'preserve-3d'
                }}
            >
                <Box
                    sx={{
                        p: 0,
                        borderRadius: '16px',
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        textAlign: 'center',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        overflow: 'hidden',
                        transition: 'all 0.4s ease',
                        transform: 'translateZ(30px)',
                        backdropFilter: 'blur(8px)',
                        backgroundImage: `radial-gradient(circle at top left, ${alpha('#fff', 0.05)} 0%, transparent 80%)`,
                        '&:hover': {
                            boxShadow: '0 30px 50px rgba(0,0,0,0.4)',
                        }
                    }}
                    onClick={() => onOpen(data)}
                >
                    <CardMedia
                        component="img"
                        image={data.image}
                        alt={data.title}
                        sx={{ height: 200, objectFit: 'cover' }}
                    />
                    <Box sx={{ p: { xs: 2, md: 3 } }}>
                        <Chip
                            avatar={<Avatar sx={{ bgcolor: 'primary.main', transform: 'translateZ(20px)' }}>{React.cloneElement(data.icon, { sx: { color: '#fff' } })}</Avatar>}
                            label={data.time}
                            sx={{ mb: 2, fontSize: '1rem', fontWeight: 600, p: 2.2 }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {data.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            {data.description}
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};


export const MotherhoodJourneySection = () => {
    const theme = useTheme();
    const journeyContainerRef = useRef(null);
    const [openItem, setOpenItem] = useState(null);




    const handleStartClick = () => {
        const target = journeyContainerRef.current;
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1800;
        let start = null;

        const easeInOutQuad = function (t) {
            return t < 0.5
                ? 2 * t * t
                : -1 + (4 - 2 * t) * t;
        };

        const step = function (timestamp) {
            if (start === null) start = timestamp;
            const progress = timestamp - start;
            const percent = Math.min(progress / duration, 1);
            window.scrollTo(0, startPosition + distance * easeInOutQuad(percent));
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };

    return (
        <Box sx={{ backgroundColor: theme.palette.background.default, color: 'text.primary' }}>
            <Container maxWidth="md" sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 12 }}>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                        Khám phá Hành Trình Làm Mẹ
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, maxWidth: '600px' }}>
                        Mỗi bước đi đều là một kỳ diệu. Hãy cùng chúng tôi lật mở từng trang trong cuốn nhật ký thiêng liêng này.
                    </Typography>
                    <Button variant="contained" size="large" endIcon={<ArrowDownward />} onClick={handleStartClick}>
                        Bắt đầu hành trình
                    </Button>
                </motion.div>
            </Container>
            <Box ref={journeyContainerRef} sx={{ position: 'relative', py: 20 }}>
                <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '4px', bgcolor: alpha(theme.palette.grey[500], 0.3), zIndex: 0 }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: 'secondary.main', position: 'sticky', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${alpha(theme.palette.secondary.main, 0.6)}, 0 0 40px ${alpha(theme.palette.secondary.main, 0.3)}`, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}>
                        <span role="img" aria-label="marker" style={{ fontSize: 20 }}>👶</span>
                    </Box>
                </Box>
                <Container maxWidth="md">
                    {journeyData.map((item, index) => (
                        <JourneyCard
                            key={item.title}
                            index={index}
                            data={item}
                            onOpen={setOpenItem}
                        />
                    ))}
                </Container>
            </Box>
            <Dialog
                open={!!openItem}
                onClose={() => setOpenItem(null)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    component: motion.div,
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.8 },
                    transition: { duration: 0.4, ease: 'easeInOut' },
                    style: {
                        borderRadius: 20,
                        boxShadow: '0 0 40px rgba(255, 140, 203, 0.5)',
                        background: 'radial-gradient(circle at top left, #fff6fb, #fff)',
                        overflow: 'hidden',
                        position: 'relative'
                    }
                }}
            >
                {/* Starfall effect */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        overflow: 'hidden',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                >
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -50, x: Math.random() * 300 }}
                            animate={{ opacity: [0, 1, 0], y: [0, 300] }}
                            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                            style={{
                                position: 'absolute',
                                width: 2,
                                height: 10,
                                backgroundColor: 'rgba(255,255,255,0.8)',
                                borderRadius: 4,
                                filter: 'blur(1px)'
                            }}
                        />
                    ))}
                </Box>

                <DialogTitle sx={{ position: 'relative', fontWeight: 'bold', fontSize: '1.4rem', color: 'primary.main', zIndex: 1 }}>
                    {openItem?.title}
                    <IconButton onClick={() => setOpenItem(null)} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                    <CardMedia
                        component="img"
                        image={openItem?.image}
                        alt={openItem?.title}
                        sx={{ borderRadius: 2, mb: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                    />
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem' }}>
                        {openItem?.details}
                    </Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
};
