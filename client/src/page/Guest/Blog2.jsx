import { useState, useEffect, useMemo } from 'react';
import {
    createTheme, ThemeProvider, CssBaseline, Typography,
    Container, Box, Grid, Link as MuiLink,
    TextField, MenuItem, Chip, Divider,
    Paper, alpha, IconButton, Fab,
    InputAdornment,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Search as SearchIcon,
    ArrowForwardIos as ArrowForwardIosIcon,
    Menu as MenuIcon,
    Explore as ExploreIcon,
    Call as CallIcon,
    Chat as ChatIcon,
    ArrowUpward as ArrowUpwardIcon,
    FilterList as FilterListIcon,
    StarBorder as StarBorderIcon,
    Home as HomeIcon,
    Book as BookIcon,
    Apps as TopicsIcon,
    MailOutline as ContactIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BlogCard } from './../../components/Blog/BlogCard/BlogCard';
import { BlogPageFooter } from '../../components/Blog/BlogPageFooter/BlogPageFooter';
import WaitingForContentPage from '../../components/404/WaitingForContentPage';
import { CircularProgress, Alert, Button, Pagination } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GridBlogCard } from '../../components/Blog/BlogCard/GridBlogCard';
import { BlogSidebar } from '../../components/Blog/BlogSidebar/BlogSidebar';

const paletteConfigFromOldUI = {
    primary: { main: '#E5A3B3', light: '#F8C8D4', dark: '#BF8A9B' },
    secondary: { main: '#A0C4B8', light: '#C0D8D0', dark: '#7FA99F' },
    background: {
        default: '#FFF7F5',
        paper: '#FFF7F5'
    },
    text: { primary: '#4A4A4A', secondary: '#757575', disabled: '#BDBDBD' },
};

const elegantThemeWithOldColors = createTheme({
    palette: paletteConfigFromOldUI,
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2.8rem', color: paletteConfigFromOldUI.text.primary },
        h2: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2.2rem', color: '#3E2723' },
        h3: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.8rem', color: '#4E342E' },
        h4: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.4rem', color: '#5D4037' },
        h5: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.3rem', color: '#4E342E' },
        h6: { fontWeight: 700, fontSize: '1rem' },
        subtitle1: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 400, color: paletteConfigFromOldUI.text.secondary },
        body1: { fontSize: '1rem', lineHeight: 1.7 },
        body2: { fontSize: '0.9rem', lineHeight: 1.6, color: paletteConfigFromOldUI.text.secondary },
        caption: { fontSize: '0.8rem', color: alpha(paletteConfigFromOldUI.text.primary, 0.8) }
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: '8px', textTransform: 'none', fontWeight: 600, padding: '8px 22px', boxShadow: 'none' } } },
        MuiChip: { styleOverrides: { root: { borderRadius: '16px', fontWeight: 600, padding: '6px 12px', fontSize: '0.875rem' } } },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    borderRadius: '16px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.07)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: (theme) => `0 10px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                    },
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    '&.Mui-selected': {
                        backgroundColor: paletteConfigFromOldUI.primary.main,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: paletteConfigFromOldUI.primary.dark,
                        }
                    },
                },
            },
        },
    },
});

const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const MotionBox = motion(Box);

const DEFAULT_AUTHOR_NAME = "MomUni Team";
const DEFAULT_POST_IMAGE_URL = `https://placehold.co/600x338/${paletteConfigFromOldUI.primary.main.substring(1)}/${paletteConfigFromOldUI.background.default.substring(1)}?text=MomUniBlog`;

// --- FIX: CÁC HẰNG SỐ CẮT CHUỖI ---
const MAX_TITLE_LENGTH = 65;
const MAX_SUMMARY_LENGTH = 80;

export default function BlogPageWithCarouselAndFixedTags() {
    const [blogPostsData, setBlogPostsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiReturnedNoPosts, setApiReturnedNoPosts] = useState(false);

    const [headerSearchQuery, setHeaderSearchQuery] = useState("");
    const [selectedHeaderTag, setSelectedHeaderTag] = useState("Tất cả");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMobileMenuOpen = () => setMobileMenuOpen(true);
    const handleMobileMenuClose = () => setMobileMenuClose(false);
    const navItems = [
        { text: 'Về chúng tôi', icon: <HomeIcon />, path: '/about-us', activePaths: ['/about-us'] },
        { text: 'Blog', icon: <BookIcon />, path: '/', activePaths: ['/', '/blog', '/article/:slug', '/tag/:tag'] },
        { text: 'Chủ đề', icon: <TopicsIcon />, path: '/topics', activePaths: ['/topics'] },
    ];
    const isLinkActive = (paths) => {
        const currentPath = window.location.pathname;
        return paths.some(p => {
            if (p.includes(':')) {
                const basePath = p.substring(0, p.indexOf(':') - 1);
                if (currentPath === basePath && !currentPath.substring(basePath.length).includes('/')) {
                    return true;
                }
                return currentPath.startsWith(basePath + (basePath === '/' ? '' : '/'));
            }
            return currentPath === p;
        });
    };

    useEffect(() => {
        const fetchBlogPosts = async () => {
            setLoading(true);
            setError(null);
            setApiReturnedNoPosts(false);
            try {
                const response = await axios.get('blog');
                const fetchedPosts = response.data && Array.isArray(response.data.blogs) ? response.data.blogs : [];

                if (fetchedPosts.length > 0) {
                    const processedBlogs = fetchedPosts.map(post => {

                        // --- FIX: LOGIC CẮT CHUỖI CHO TITLE ---
                        let title = post.title || "Chưa có tiêu đề";
                        if (title.length > MAX_TITLE_LENGTH) {
                            title = title.substring(0, MAX_TITLE_LENGTH).trim();
                            title = title.substring(0, Math.min(title.length, title.lastIndexOf(" "))) + "...";
                        }

                        // --- FIX: LOGIC CẮT CHUỖI CHO SUMMARY ---
                        let summary = post.summary || "";
                        if (summary.length > MAX_SUMMARY_LENGTH) {
                            summary = summary.substring(0, MAX_SUMMARY_LENGTH).trim();
                            summary = summary.substring(0, Math.min(summary.length, summary.lastIndexOf(" "))) + "...";
                        } else if (!summary && post.content) {
                            summary = post.content.substring(0, MAX_SUMMARY_LENGTH).trim();
                            summary = summary.substring(0, Math.min(summary.length, summary.lastIndexOf(" "))) + "...";
                        } else if (!summary) {
                            summary = "Khám phá nội dung chi tiết của bài viết này...";
                        }


                        const dateObj = new Date(post.updatedAt || post.createdAt || Date.now());
                        const day = dateObj.getDate().toString().padStart(2, '0');
                        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                        const year = dateObj.getFullYear();
                        const formattedDateTime = `${day}/${month}/${year}`;

                        const mainImage = (post.images && post.images.length > 0 && post.images[0].url)
                            ? post.images[0].url
                            : DEFAULT_POST_IMAGE_URL;

                        const galleryImages = (post.images && post.images.length > 0)
                            ? post.images.map(img => ({ url: img.url, caption: img.caption || "Ảnh chi tiết" }))
                            : [{ url: mainImage, caption: "Ảnh chính" }];

                        return {
                            id: post._id,
                            slug: post.slug || post._id.toString(),
                            title: title,
                            summary: summary,
                            mainImage: mainImage,
                            content: post.content || "Nội dung đang được cập nhật...",
                            author: DEFAULT_AUTHOR_NAME,
                            createdAt: formattedDateTime,
                            tags: Array.isArray(post.tags) ? post.tags : [],
                            views: post.viewCount || 0,
                            authorImage: "/assets/images/momuni-default-avatar.png",
                            averageRating: post.averageRating || 0,
                            images: galleryImages,
                        };
                    });
                    setBlogPostsData(processedBlogs);
                } else {
                    setBlogPostsData([]);
                    setApiReturnedNoPosts(true);
                }
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu bài viết:", err);
                setError(err.response?.data?.message || err.message || "Không thể tải dữ liệu. Vui lòng thử lại sau.");
                setBlogPostsData([]);
                setApiReturnedNoPosts(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    const allTagsFromData = useMemo(() => {
        if (!blogPostsData || blogPostsData.length === 0) return ["Tất cả"];
        const tagsSet = new Set();
        blogPostsData.forEach(post => {
            if (Array.isArray(post.tags)) {
                post.tags.forEach(tag => {
                    if (typeof tag === 'string' && tag.trim() !== '') {
                        tagsSet.add(tag.trim());
                    } else if (typeof tag === 'object' && tag !== null && tag.name) {
                        tagsSet.add(tag.name.trim());
                    }
                });
            }
        });
        return ["Tất cả", ...Array.from(tagsSet).sort()];
    }, [blogPostsData]);

    const filteredMainPosts = useMemo(() => {
        return blogPostsData
            .filter(post =>
                selectedHeaderTag === "Tất cả" || (Array.isArray(post.tags) && post.tags.some(tag => {
                    const tagName = (typeof tag === 'string') ? tag : (tag && tag.name);
                    return tagName === selectedHeaderTag;
                }))
            )
            .filter(post =>
                post.title.toLowerCase().includes(headerSearchQuery.toLowerCase()) ||
                (post.summary && post.summary.toLowerCase().includes(headerSearchQuery.toLowerCase())) ||
                (post.content && post.content.toLowerCase().includes(headerSearchQuery.toLowerCase()))
            );
    }, [blogPostsData, selectedHeaderTag, headerSearchQuery]);

    const totalPagesForRegularNews = Math.ceil(filteredMainPosts.length / postsPerPage);
    const currentRegularNewsPosts = filteredMainPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const popularPosts = useMemo(() => {
        return [...blogPostsData]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 4);
    }, [blogPostsData]);

    const exploreMorePosts = useMemo(() => {
        const displayedIds = new Set(currentRegularNewsPosts.map(p => p.id));
        return blogPostsData
            .filter(p => !displayedIds.has(p.id))
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
    }, [blogPostsData, currentRegularNewsPosts]);

    const featuredCarouselPosts = useMemo(() => {
        return [...blogPostsData]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);
    }, [blogPostsData]);


    const handleHeaderSearch = (e) => { if (e.key === 'Enter') { setCurrentPage(1); } };
    const handleTagChange = (event) => { setSelectedHeaderTag(event.target.value); setCurrentPage(1); };
    const handlePageChange = (event, value) => { setCurrentPage(value); scrollToTop(); };
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (loading) { return (<ThemeProvider theme={elegantThemeWithOldColors}><CssBaseline /><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress color="primary" /><Typography sx={{ ml: 2 }}>Đang tải...</Typography></Box></ThemeProvider>); }
    if (error) { return (<ThemeProvider theme={elegantThemeWithOldColors}><CssBaseline /><Container sx={{ py: 3, textAlign: 'center' }}><Alert severity="error">Lỗi: {error}</Alert><Button variant="outlined" onClick={() => window.location.reload()} sx={{ mt: 2 }}>Thử lại</Button></Container></ThemeProvider>); }

    const noPostsToShow = !loading && (apiReturnedNoPosts || blogPostsData.length === 0);
    const noFilteredResults = !loading && !error && blogPostsData.length > 0 && filteredMainPosts.length === 0;


    return (
        <ThemeProvider theme={elegantThemeWithOldColors}>
            <CssBaseline />
            <Box sx={{ backgroundColor: elegantThemeWithOldColors.palette.background.default, minHeight: '100vh' }}>
                {/* Header Section */}
                <Paper
                    elevation={1}
                    sx={{
                        position: 'sticky', top: 0, zIndex: 1100,
                        backgroundColor: alpha(elegantThemeWithOldColors.palette.background.paper, 0.95),
                        backdropFilter: 'blur(8px)',
                        boxShadow: `0 1px 3px ${alpha(elegantThemeWithOldColors.palette.text.primary, 0.1)}`
                    }}
                >
                    <Container maxWidth="xl">
                        {/* Top Nav */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: { xs: 56, md: 64 }, flexWrap: 'nowrap' }}>
                            <MuiLink component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                <Box component="img" src="/MomUni.svg" alt="MomUni" sx={{ height: { xs: 28, sm: 32, md: 36 }, mr: 1 }} />
                                <Typography variant="h5" component="div" sx={{ color: "pink", fontWeight: 'bold', display: { xs: 'none', sm: 'block' }, fontSize: { sm: '1.2rem', md: '1.4rem' } }}>
                                    MomUni
                                </Typography>
                            </MuiLink>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 2, lg: 2.5 }, ml: 'auto' }}>
                                {navItems.map((item) => (
                                    <MuiLink
                                        key={item.text} component={RouterLink} to={item.path} underline="none"
                                        sx={{
                                            fontWeight: isLinkActive(item.activePaths) ? 700 : 500,
                                            color: isLinkActive(item.activePaths) ? 'primary.main' : 'text.primary',
                                            fontSize: '0.9rem', padding: '6px 10px', borderRadius: '6px',
                                            transition: 'color 0.2s ease, background-color 0.2s ease',
                                            '&:hover': {
                                                color: 'primary.dark',
                                                backgroundColor: alpha(elegantThemeWithOldColors.palette.primary.light, 0.25)
                                            },
                                        }}
                                    >
                                        {item.text}
                                    </MuiLink>
                                ))}
                                <Button
                                    variant="contained" color="primary" startIcon={<ContactIcon />}
                                    sx={{
                                        borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem',
                                        px: { md: 2, lg: 2.5 }, py: { md: 0.6, lg: 0.8 },
                                        boxShadow: `0 3px 8px ${alpha(elegantThemeWithOldColors.palette.primary.main, 0.3)}`,
                                        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                                        '&:hover': { bgcolor: 'primary.dark', boxShadow: `0 1px 4px ${alpha(elegantThemeWithOldColors.palette.primary.dark, 0.4)}` }
                                    }}
                                >
                                    Liên hệ
                                </Button>
                            </Box>
                            <IconButton sx={{ display: { xs: 'flex', md: 'none' }, ml: 1, color: elegantThemeWithOldColors.palette.text.primary }} aria-label="menu" onClick={handleMobileMenuOpen} >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        {/* Search and Filter */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr minmax(170px, auto)' }, alignItems: 'center', gap: { xs: 1.5, sm: 2 }, py: 1.5, borderTop: `1px solid ${alpha(elegantThemeWithOldColors.palette.divider, 0.7)}` }}>
                            <TextField
                                fullWidth variant="outlined" size="small" placeholder="Tìm kiếm bài viết, chủ đề..."
                                value={headerSearchQuery} onChange={(e) => { setHeaderSearchQuery(e.target.value); setCurrentPage(1); }} onKeyPress={handleHeaderSearch}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: elegantThemeWithOldColors.palette.text.secondary }} fontSize="small" /></InputAdornment>),
                                    sx: { borderRadius: '8px', fontSize: '0.9rem' }
                                }}
                            />
                            <TextField
                                select fullWidth size="small" value={selectedHeaderTag} onChange={handleTagChange} variant="outlined"
                                SelectProps={{
                                    IconComponent: (props) => <FilterListIcon {...props} sx={{ fontSize: '1.2rem', color: elegantThemeWithOldColors.palette.text.secondary, mr: 0.5 }} />,
                                    displayEmpty: true,
                                }}
                                renderValue={(selected) => {
                                    if (selected === "Tất cả") {
                                        return <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: 'text.secondary' }}>Lọc theo Tag</Box>;
                                    }
                                    return <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{selected}</Typography>;
                                }}
                            >
                                {Array.isArray(allTagsFromData) && allTagsFromData.map((tag) => (
                                    <MenuItem key={tag} value={tag} sx={{ fontSize: '0.9rem' }}>
                                        {tag === "Tất cả" ? (<Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontStyle: 'italic' }}><FilterListIcon sx={{ mr: 0.8, fontSize: '1.1rem' }} />Tất cả Tags</Box>) : tag}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Container>
                </Paper>

                {/* Mobile Drawer */}
                <Drawer anchor="right" open={mobileMenuOpen} onClose={handleMobileMenuClose} PaperProps={{ sx: { width: { xs: '260px', sm: '300px' } } }} >
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${elegantThemeWithOldColors.palette.divider}` }}>
                        <MuiLink component={RouterLink} to="/" underline="none" onClick={handleMobileMenuClose} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box component="img" src="/assets/images/momuni-logo.png" alt="MomUni" sx={{ height: 30, mr: 1 }} />
                            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>MomUni</Typography>
                        </MuiLink>
                        <IconButton onClick={handleMobileMenuClose} aria-label="close menu"><ArrowForwardIosIcon fontSize="small" /></IconButton>
                    </Box>
                    <List sx={{ p: 1 }}>
                        {navItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton component={RouterLink} to={item.path} onClick={handleMobileMenuClose} selected={isLinkActive(item.activePaths)} sx={{ borderRadius: '8px' }}>
                                    <ListItemIcon sx={{ minWidth: '40px' }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem disablePadding sx={{ mt: 2, px: 1 }}>
                            <Button fullWidth variant="contained" color="primary" startIcon={<ContactIcon />} onClick={handleMobileMenuClose}>Liên hệ</Button>
                        </ListItem>
                    </List>
                </Drawer>

                <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                    {/* Page Title */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 2.5, md: 4 } }}>
                        <Typography variant="h1" component="h2" sx={{ fontWeight: 'bold', position: 'relative', display: 'inline-block', pb: 0.5, fontSize: { xs: '2rem', md: '2.6rem' } }} >
                            {selectedHeaderTag === "Tất cả" && !headerSearchQuery ? "MomUni Blog" : (headerSearchQuery ? `Kết quả cho "${headerSearchQuery}"` : `Tag: ${selectedHeaderTag}`)}
                            <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '30%', height: '4px', backgroundColor: "pink", borderRadius: '2px' }} />
                        </Typography>
                    </Box>

                    {noPostsToShow && (<WaitingForContentPage message="Hiện chưa có bài viết nào." />)}

                    {/* Featured Carousel */}
                    {featuredCarouselPosts.length > 0 && (!headerSearchQuery && selectedHeaderTag === "Tất cả" && !noPostsToShow) && (
                        <MotionBox variants={sectionVariants} initial="hidden" animate="visible" sx={{ mb: { xs: 3, md: 4 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <StarBorderIcon color="primary" sx={{ mr: 1, fontSize: '1.8rem' }} />
                                <Typography variant="h2" sx={{ fontSize: { xs: '1.3rem', md: '1.5rem' } }}>Bài viết nổi bật</Typography>
                            </Box>
                            <Swiper
                                modules={[Navigation, SwiperAutoplay, SwiperPagination]} spaceBetween={24} slidesPerView={1}
                                loop={featuredCarouselPosts.length > 3} autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true, dynamicBullets: true }} navigation={featuredCarouselPosts.length > 1}
                                breakpoints={{
                                    600: { slidesPerView: Math.min(featuredCarouselPosts.length, 2) },
                                    900: { slidesPerView: Math.min(featuredCarouselPosts.length, 3) },
                                    1200: { slidesPerView: Math.min(featuredCarouselPosts.length, 4) },
                                }}
                                style={{ paddingBottom: '40px', '--swiper-pagination-color': elegantThemeWithOldColors.palette.primary.main, '--swiper-navigation-color': elegantThemeWithOldColors.palette.primary.main, '--swiper-navigation-size': '28px' }}
                            >
                                {featuredCarouselPosts.map((post) => (
                                    <SwiperSlide key={`featured-carousel-${post.id}`} style={{ height: 'auto' }}>
                                        <BlogCard post={post} small={false} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </MotionBox>
                    )}

                    {/* Main Content */}
                    {!noPostsToShow && (
                        <Grid container spacing={{ xs: 2.5, md: 3.5 }}>
                            <Grid item xs={12} md={8}>
                                {noFilteredResults && (<Typography sx={{ my: 3, textAlign: 'center', fontStyle: 'italic', color: 'text.secondary' }}>Không tìm thấy bài viết nào phù hợp.</Typography>)}

                                {currentRegularNewsPosts.length > 0 && (
                                    <Grid container spacing={3} alignItems="stretch">
                                        {currentRegularNewsPosts.map((post) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                key={`regular-${post.id}`}
                                                sx={{ display: 'flex' }}
                                            >
                                                <GridBlogCard
                                                    post={post}
                                                    small={false}
                                                    sx={{ flexGrow: 1 }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}

                                {totalPagesForRegularNews > 1 && currentRegularNewsPosts.length > 0 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3.5, mb: 2 }}>
                                        <Pagination count={totalPagesForRegularNews} page={currentPage} onChange={handlePageChange} color="primary" size="medium" />
                                    </Box>
                                )}
                            </Grid>

                            {/* Sidebar */}
                            {/* <Grid item xs={12} md={4}>
                                <Paper sx={{ p: { xs: 2, md: 2.5 }, position: 'sticky', top: '145px', borderRadius: '12px' }}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5, color: 'primary.dark', fontSize: '1.1rem' }}>Đọc nhiều nhất</Typography>
                                    {popularPosts.length > 0 ? popularPosts.map((post, idx) => (<Box key={`popular-${post.id}`} sx={{ display: 'flex', mb: 1.5, alignItems: 'flex-start' }}> <Typography variant="h4" sx={{ color: 'secondary.main', mr: 1.5, lineHeight: 1.2, fontSize: '1.2rem', fontWeight: 600 }}>{idx + 1}.</Typography> <MuiLink component={RouterLink} to={`/blog/${post.slug}`} underline="hover" sx={{ fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.4, color: 'text.primary', '&:hover': { color: 'primary.main' } }}> {post.title} </MuiLink> </Box>)) : <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Chưa có dữ liệu.</Typography>}
                                    <Divider sx={{ my: 2.5 }} />
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5, color: 'primary.dark', fontSize: '1.1rem' }}>Tags nổi bật</Typography>
                                    {Array.isArray(allTagsFromData) && allTagsFromData.filter(t => t !== "Tất cả").length > 0 ? (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}> {allTagsFromData.filter(t => t !== "Tất cả").slice(0, 10).map(tag => (<Chip key={tag} label={tag} component={RouterLink} to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} clickable size="small" sx={{ backgroundColor: alpha(elegantThemeWithOldColors.palette.secondary.light, 0.3), color: elegantThemeWithOldColors.palette.secondary.dark, fontWeight: 500, '&:hover': { backgroundColor: 'secondary.main', color: 'white' } }} />))} </Box>) : <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Chưa có tags.</Typography>}
                                </Paper>
                            </Grid> */}
                            <BlogSidebar
                                popularPosts={popularPosts}
                                allTagsFromData={allTagsFromData}
                            />
                        </Grid>
                    )}
                </Container>

                {/* Footer and FABs */}
                <BlogPageFooter />
                <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: 1.5, zIndex: 1200 }}>
                    <Fab color="primary" size="medium" aria-label="call"><CallIcon /></Fab>
                    <Fab sx={{ bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } }} size="medium" aria-label="chat"><ChatIcon /></Fab>
                    <Fab sx={{ bgcolor: alpha(elegantThemeWithOldColors.palette.text.secondary, 0.7), color: 'white', '&:hover': { bgcolor: 'text.primary' } }} size="small" aria-label="scroll-to-top" onClick={scrollToTop}><ArrowUpwardIcon fontSize="small" /></Fab>
                </Box>
            </Box>
        </ThemeProvider>
    );
}