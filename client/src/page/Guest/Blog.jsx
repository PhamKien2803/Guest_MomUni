import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
    createTheme, ThemeProvider, CssBaseline, Typography,
    Container, Box, Grid, Link,
    TextField, MenuItem,
    Paper, useTheme, alpha, Pagination, Breadcrumbs,
    InputAdornment, CircularProgress, Alert, Chip as MuiChip
} from '@mui/material';
import {
    Search as SearchIcon,
    LocalOffer as TagIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BlogCard } from './../../components/Blog/BlogCard/BlogCard';
import { BlogPageFooter } from '../../components/Blog/BlogPageFooter/BlogPageFooter';

const paletteConfig = {
    primary: { main: '#E5A3B3', light: '#F8C8D4', dark: '#BF8A9B' },
    secondary: { main: '#A0C4B8', light: '#C0D8D0', dark: '#7FA99F' },
    background: { default: '#FFF7F5', paper: '#FFFFFF' },
    text: { primary: '#4A4A4A', secondary: '#757575', disabled: '#BDBDBD' },
};

const elegantTheme = createTheme({
    palette: paletteConfig,
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2.8rem', color: paletteConfig.text.primary },
        h2: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2.2rem', color: '#3E2723' },
        h3: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.8rem', color: '#4E342E' },
        h4: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.4rem', color: '#5D4037' },
        h5: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.2rem', color: '#4E342E' },
        h6: { fontWeight: 700, fontSize: '1rem' },
        subtitle1: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 400, color: paletteConfig.text.secondary },
        body1: { fontSize: '1rem', lineHeight: 1.7 },
        body2: { fontSize: '0.9rem', lineHeight: 1.6, color: paletteConfig.text.secondary },
        caption: { fontSize: '0.8rem', color: alpha(paletteConfig.text.primary, 0.8) }
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: '8px', textTransform: 'none', fontWeight: 600, padding: '8px 22px', boxShadow: 'none' } } },
        MuiChip: { styleOverrides: { root: { borderRadius: '16px', fontWeight: 600, padding: '6px 12px', fontSize: '0.875rem' } } },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.07)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 10px 25px ${alpha(paletteConfig.primary.main, 0.15)}`,
                    },
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    '&.Mui-selected': {
                        backgroundColor: paletteConfig.primary.main,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: paletteConfig.primary.dark,
                        }
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                }
            }
        }
    },
});

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const MotionBox = motion(Box);

export default function BlogPageEvaStyle() {
    const theme = useTheme();
    const [blogPostsData, setBlogPostsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("Tất cả");

    const postsPerPage = 6;
    const DEFAULT_AUTHOR_NAME = "MomUni Team";
    const DEFAULT_AUTHOR_IMAGE = "/assets/images/momuni-default-avatar.png";
    const DEFAULT_CATEGORY_NAME = "Chung";
    const DEFAULT_POST_IMAGE_URL = 'https://placehold.co/600x400/E5A3B3/FFF7F5?text=MomUni';

    useEffect(() => {
        const fetchAllBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('blog');
                if (response.data && Array.isArray(response.data.blogs)) {
                    const processedBlogs = response.data.blogs.map(post => ({
                        ...post,
                        excerpt: post.summary || post.excerpt || "Nội dung đang được cập nhật...",
                        author: DEFAULT_AUTHOR_NAME,
                        authorImage: DEFAULT_AUTHOR_IMAGE,
                        category: (Array.isArray(post.tags) && post.tags.length > 0) ? post.tags[0] : DEFAULT_CATEGORY_NAME,
                        tags: Array.isArray(post.tags) ? post.tags : [],
                        averageRating: typeof post.averageRating === 'number' ? post.averageRating : 0,
                        images: (post.images && post.images.length > 0 && post.images[0].url)
                            ? post.images
                            : [{ url: DEFAULT_POST_IMAGE_URL, caption: "Ảnh mặc định" }]
                    }));
                    setBlogPostsData(processedBlogs);
                } else {
                    setBlogPostsData([]);
                }
            } catch (err) {
                console.error("Lỗi khi tải danh sách blog:", err);
                setError(err.response?.data?.message || "Không thể tải danh sách bài viết.");
                if (err.response && err.response.status === 404) {
                    setError("Hiện tại chưa có bài viết nào để hiển thị.");
                }
                setBlogPostsData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAllBlogs();
    }, []);

    const allTags = useMemo(() => {
        if (!blogPostsData || blogPostsData.length === 0) return ["Tất cả"];
        const tagsSet = new Set();
        blogPostsData.forEach(post => {
            if (Array.isArray(post.tags)) {
                post.tags.forEach(tag => tagsSet.add(tag));
            }
        });
        return ["Tất cả", ...Array.from(tagsSet).sort()];
    }, [blogPostsData]);

    const latestPostsForCarousel = useMemo(() => {
        if (!blogPostsData || blogPostsData.length === 0) return [];
        return [...blogPostsData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [blogPostsData]);

    const filteredAndSortedPosts = useMemo(() => {
        return blogPostsData
            .filter(post =>
                selectedTag === "Tất cả" || (Array.isArray(post.tags) && post.tags.includes(selectedTag))
            )
            .filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
            );
    }, [blogPostsData, selectedTag, searchQuery]);

    const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
    const currentDisplayPosts = filteredAndSortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    if (loading) {
        return (
            <ThemeProvider theme={elegantTheme}>
                <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress color="primary" sx={{ mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">Đang tải danh sách bài viết...</Typography>
                </Box>
            </ThemeProvider>
        );
    }
    if (error) {
        return (
            <ThemeProvider theme={elegantTheme}>
                <CssBaseline />
                <Container sx={{ py: 4, textAlign: 'center' }}>
                    <Alert severity="error" sx={{ justifyContent: 'center' }}>Lỗi: {error}</Alert>
                </Container>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={elegantTheme}>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 0 }}>
                <MotionBox initial="hidden" animate="visible" variants={sectionVariants}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, fontSize: '0.9rem' }}>
                        <Link underline="hover" color="inherit" href="/">Trang chủ</Link>
                        <Typography color="text.primary">Blog</Typography>
                    </Breadcrumbs>
                    <Typography variant="h1" gutterBottom align="center" sx={{ mb: 5 }}>
                        MomUni Blog
                    </Typography>
                </MotionBox>

                <MotionBox
                    component={Paper}
                    elevation={0}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    sx={{
                        p: 2, mb: 5, borderRadius: '16px',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: 'blur(5px)'
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth variant="outlined" size="small"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                                    sx: { borderRadius: '12px', backgroundColor: alpha(theme.palette.common.white, 0.5) }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select fullWidth size="small"
                                value={selectedTag}
                                onChange={(e) => { setSelectedTag(e.target.value); setCurrentPage(1); }}
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: alpha(theme.palette.common.white, 0.5) },
                                    '& .MuiSelect-select': { display: 'flex', alignItems: 'center' }
                                }}
                                SelectProps={{ MenuProps: { sx: { '& .MuiPaper-root': { borderRadius: '12px', mt: 1 } } } }}
                                displayEmpty
                                renderValue={(selected) => {
                                    if (selected === "Tất cả") {
                                        return <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}><TagIcon sx={{ mr: 1, fontSize: '1.2rem' }} />Lọc theo Tags</Box>;
                                    }
                                    return selected;
                                }}
                            >
                                {allTags.map((tag) => (
                                    <MenuItem key={tag} value={tag}>
                                        {tag === "Tất cả" ?
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}><FilterListIcon sx={{ mr: 1, fontSize: '1.2rem', color: 'text.secondary' }} />Tất cả Tags</Box>
                                            : tag
                                        }
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </MotionBox>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <MotionBox initial="hidden" animate="visible" variants={sectionVariants} transition={{ delay: 0.1 }}>
                            <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
                                {selectedTag === "Tất cả" ? "Tất cả bài viết" : `Bài viết với tag "${selectedTag}"`}
                            </Typography>
                            <Grid container spacing={3}>
                                {currentDisplayPosts.length > 0 ? (
                                    currentDisplayPosts.map((post) => (
                                        <Grid item xs={12} sm={6} md={4} key={post._id || post.slug}>
                                            <BlogCard post={post} small={false} />
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Paper sx={{ p: 4, textAlign: 'center', mt: 2, backgroundColor: alpha(theme.palette.background.default, 0.7) }}>
                                            <Typography variant="h6">Không tìm thấy bài viết nào phù hợp.</Typography>
                                            <Typography color="text.secondary">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</Typography>
                                        </Paper>
                                    </Grid>
                                )}
                            </Grid>

                            {totalPages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 3 }}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={(event, value) => setCurrentPage(value)}
                                        color="primary"
                                        size="large"
                                        showFirstButton showLastButton
                                    />
                                </Box>
                            )}
                        </MotionBox>
                    </Grid>
                </Grid>

                {latestPostsForCarousel.length > 0 && (
                    <MotionBox sx={{ py: 6, mt: 6 }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariants} transition={{ delay: 0.3 }}>
                        <Typography variant="h2" align="left" gutterBottom sx={{ mb: 4, pl: 1 }}>
                            Có thể bạn quan tâm
                        </Typography>
                        <Swiper
                            modules={[Navigation, SwiperPagination, SwiperAutoplay]}
                            spaceBetween={24} slidesPerView={1}
                            loop={latestPostsForCarousel.length >= 5}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            pagination={{ clickable: true, el: '.swiper-pagination-latest-posts' }}
                            navigation={true}
                            breakpoints={{
                                600: { slidesPerView: 2, spaceBetween: 20, loop: latestPostsForCarousel.length >= 3 },
                                900: { slidesPerView: 3, spaceBetween: 24, loop: latestPostsForCarousel.length >= 4 },
                                1200: { slidesPerView: 4, spaceBetween: 24, loop: latestPostsForCarousel.length >= 5 },
                                1536: { slidesPerView: 5, spaceBetween: 24, loop: latestPostsForCarousel.length >= 6 },
                            }}
                            style={{ paddingBottom: '60px', paddingTop: '10px' }}
                        >
                            {latestPostsForCarousel.map((post) => (
                                <SwiperSlide key={`carousel-${post._id || post.slug}`} style={{ height: 'auto' }}>
                                    <BlogCard post={post} small={false} />
                                </SwiperSlide>
                            ))}
                            <div className="swiper-pagination-latest-posts" style={{ textAlign: 'center', marginTop: '25px', position: 'relative', bottom: 'auto' }}></div>
                        </Swiper>
                    </MotionBox>
                )}
            </Container>
            <BlogPageFooter />
        </ThemeProvider>
    );
}