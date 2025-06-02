import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Button, Container, Box, Card, CardMedia, CardContent,
    Chip, Alert,
    alpha, CircularProgress
} from '@mui/material';
import {
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
    const DEFAULT_BLOG_IMAGE_URL = 'https://placehold.co/870x870/E5A3B3/FFF7F5?text=MomUni+Blog';
    const getCategoryColor = (category) => {
        const categoryStr = String(category).toLowerCase();
        const colors = {
            'giấc ngủ': 'primary',
            'dinh dưỡng': 'secondary',
            'phát triển': 'success',
            'sức khỏe': 'warning',
            'ăn dặm': 'info',
            'tâm lý': 'error',
        };
        return colors[categoryStr] || 'default';
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('blog');
                if (response.data && Array.isArray(response.data.blogs)) {
                    const processedPosts = response.data.blogs.map(post => ({
                        ...post,
                        category: (post.tags && post.tags.length > 0) ? post.tags[0] : "Tin tức",
                    }));
                    setBlogPosts(processedPosts);
                } else {
                    console.warn("API did not return the expected 'blogs' array:", response.data);
                    setBlogPosts([]);
                    setError('Dữ liệu bài viết không hợp lệ.');
                }
            } catch (err) {
                setError('Không thể tải danh sách bài viết. Vui lòng thử lại sau.');
                console.error("Error fetching blogs:", err);
                setBlogPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10, minHeight: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
                <Alert severity="error" sx={{ justifyContent: 'center' }}>{error}</Alert>
            </Container>
        );
    }

    if (blogPosts.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    Hiện chưa có bài viết nào để hiển thị.
                </Typography>
            </Container>
        );
    }

    return (
        <MotionBox sx={{ py: { xs: 6, md: 10 }, overflow: 'hidden' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants}>
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" gutterBottom sx={{ mb: { xs: 4, md: 8 }, fontWeight: 700, color: 'primary.dark' }}>
                    Từ Blog của MomUni
                </Typography>
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    grabCursor={true}
                    loop={blogPosts.length > (blogPosts.length >= 3 ? 3 : blogPosts.length)}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={blogPosts.length > 1}
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                        600: { slidesPerView: 2, spaceBetween: 20 },
                        900: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    style={{ paddingBottom: '50px', paddingTop: '10px' }}
                >
                    {blogPosts.map((post) => {
                        const imageUrl = (post.images && Array.isArray(post.images) && post.images.length > 0 && post.images[0].url)
                            ? post.images[0].url
                            : DEFAULT_BLOG_IMAGE_URL;

                        return (
                            <SwiperSlide key={post._id || post.slug} style={{ height: 'auto', display: 'flex' }}>
                                <Card sx={{
                                    width: '100%', height: '100%', borderRadius: '16px',
                                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    boxShadow: (theme) => `0px 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: (theme) => `0px 12px 24px ${alpha(theme.palette.primary.main, 0.25)}`,
                                    },
                                    '&:hover .blog-card-media': { transform: 'scale(1.08)' }
                                }}>
                                    <Box sx={{ overflow: 'hidden', height: 200, position: 'relative' }}>
                                        <CardMedia
                                            component="img"
                                            className="blog-card-media"
                                            sx={{
                                                height: '100%', width: '100%', objectFit: 'cover',
                                                transition: 'transform 0.4s ease-in-out',
                                            }}
                                            image={imageUrl}
                                            alt={post.title || "Blog post image"}
                                            onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_BLOG_IMAGE_URL; }}
                                        />
                                    </Box>
                                    <CardContent sx={{
                                        flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column'
                                    }}>
                                        <Chip
                                            label={post.category || "Tin tức"}
                                            color={getCategoryColor(post.category || "Tin tức")}
                                            size="small"
                                            sx={{ mb: 1.5, alignSelf: 'flex-start', opacity: 0.9, fontWeight: 500 }}
                                        />
                                        <Typography variant="h6" component="div" sx={{
                                            mb: 1, fontSize: '1.1rem', lineHeight: 1.4, fontWeight: 600, color: 'text.primary',
                                            display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
                                            overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '2.8em'
                                        }}>
                                            {post.title || "Tiêu đề bài viết"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{
                                            mb: 2, flexGrow: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3, overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '4.2em'
                                        }}>
                                            {post.excerpt || post.summary || "Khám phá những thông tin hữu ích và cập nhật mới nhất về chủ đề này..."}
                                        </Typography>
                                        <Button
                                            component="a"
                                            href={`blog/${post.slug}`}
                                            size="small" variant="text" color="primary"
                                            endIcon={<ArrowForwardIos sx={{ fontSize: '0.8rem' }} />}
                                            sx={{ mt: 'auto', alignSelf: 'flex-start', fontWeight: 600, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                                        >
                                            Đọc thêm
                                        </Button>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Container>
        </MotionBox>
    );
};
