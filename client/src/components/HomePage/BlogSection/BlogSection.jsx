import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Button, Container, Box, Card, CardMedia, CardContent,
    Chip, Alert,
    alpha, CircularProgress
} from '@mui/material';
import {
    Menu as MenuIcon,
    ArrowForwardIos,
} from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const MotionBox = motion(Box);
export const BlogSection = () => {
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