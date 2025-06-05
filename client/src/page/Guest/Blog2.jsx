import { useState, useEffect, useMemo } from 'react';
import {
    createTheme, ThemeProvider, CssBaseline, Typography,
    Container, Box, Grid, Link as MuiLink,
    TextField, MenuItem, Chip, Divider,
    Paper, useTheme, alpha, IconButton, Fab,
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

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BlogCard } from './../../components/Blog/BlogCard/BlogCard';
import { BlogPageFooter } from '../../components/Blog/BlogPageFooter/BlogPageFooter';
import WaitingForContentPage from '../../components/404/WaitingForContentPage';
import { CircularProgress, Alert, Button, Pagination } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const paletteConfigFromOldUI = {
    primary: { main: '#E5A3B3', light: '#F8C8D4', dark: '#BF8A9B' },
    secondary: { main: '#A0C4B8', light: '#C0D8D0', dark: '#7FA99F' },
    background: {
        default: '#FFF7F5',
        paper: '#FFF7F5'
    },
    text: { primary: '#4A4A4A', secondary: '#757575', disabled: '#BDBDBD' },
};

const staticBlogPostsData = [
    { _id: '1', slug: 'bai-viet-1', title: 'Hướng Dẫn Chăm Sóc Bé Sơ Sinh Tại Nhà', summary: 'Kiến thức cơ bản và nâng cao cho bố mẹ.', mainImage: 'https://placehold.co/800x450/E5A3B3/FFF7F5?text=Baby+Care', category: 'Chăm sóc bé', tags: ['Chăm sóc bé', 'Sơ sinh', 'Mẹ và bé'], createdAt: new Date(2025, 5, 1, 10, 0, 0).toISOString(), views: 1250, authorId: { name: 'Dr. Mom Uni' } },
    { _id: '2', slug: 'bai-viet-2', title: 'Dinh Dưỡng Vàng Cho Mẹ Bầu 3 Tháng Cuối', summary: 'Chế độ ăn uống khoa học giúp mẹ khỏe, bé phát triển.', mainImage: 'https://placehold.co/800x450/A0C4B8/FFFFFF?text=Mom+Nutrition', category: 'Dinh dưỡng', tags: ['Dinh dưỡng', 'Mẹ bầu', 'Thai kỳ'], createdAt: new Date(2025, 5, 2, 14, 30, 0).toISOString(), views: 980, authorId: { name: 'Chuyên Gia DD' } },
    { _id: '3', slug: 'bai-viet-3', title: 'Bí Quyết Sức Khỏe Gia Đình Mùa Hè', summary: 'Phòng bệnh và tăng cường sức đề kháng cho cả nhà.', mainImage: 'https://placehold.co/600x338/E5A3B3/333333?text=Family+Health', category: 'Sức khỏe gia đình', tags: ['Sức khỏe gia đình', 'Mùa hè', 'Phòng bệnh'], createdAt: new Date(2025, 4, 28, 9, 0, 0).toISOString(), views: 1500, authorId: { name: 'Bác Sĩ Gia Đình' } },
    { _id: '4', slug: 'bai-viet-4', title: 'Review Top Sữa Công Thức Cho Trẻ < 1 Tuổi', summary: 'Đánh giá chi tiết các loại sữa phổ biến.', mainImage: 'https://placehold.co/600x338/F8C8D4/333333?text=Milk+Review', category: 'Review sản phẩm', tags: ['Review sản phẩm', 'Sữa công thức', 'Trẻ em'], createdAt: new Date(2025, 5, 3, 11, 0, 0).toISOString(), views: 2100, authorId: { name: 'Mom Reviewer' } },
    { _id: '5', slug: 'bai-viet-5', title: '10 Trò Chơi Phát Triển Trí Não Cho Bé', summary: 'Kích thích sự sáng tạo và tư duy của trẻ.', mainImage: 'https://placehold.co/600x338/C0D8D0/333333?text=Kid+Games', category: 'Chăm sóc bé', tags: ['Phát triển trẻ', 'Trò chơi', 'Mẹ và bé'], createdAt: new Date(2025, 4, 15, 16, 0, 0).toISOString(), views: 850, authorId: { name: 'Cô Giáo Mầm Non' } },
    { _id: '6', slug: 'bai-viet-6', title: 'Mẹo Giảm Cân An Toàn Sau Sinh Hiệu Quả', summary: 'Lấy lại vóc dáng mà vẫn đảm bảo sức khỏe.', mainImage: 'https://placehold.co/600x338/BF8A9B/FFFFFF?text=Postpartum', category: 'Sức khỏe mẹ', tags: ['Sức khỏe mẹ', 'Giảm cân', 'Làm đẹp'], createdAt: new Date(2025, 5, 4, 8, 0, 0).toISOString(), views: 1800, authorId: { name: 'HLV Fitness Mom' } },
];

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
        MuiPaper: {
            styleOverrides: {
                // root: { backgroundColor: paletteConfigFromOldUI.background.paper } // Removed this if not needed globally or defined specifically elsewhere
            }
        }
    },
});

const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const MotionBox = motion(Box);

const DEFAULT_AUTHOR_NAME = "MomUni Team";
const DEFAULT_POST_IMAGE_URL = `https://placehold.co/600x338/${paletteConfigFromOldUI.primary.main.substring(1)}/${paletteConfigFromOldUI.background.default.substring(1)}?text=MomUni`;

export default function BlogPageWithCarouselAndFixedTags() {
    const currentTheme = useTheme();
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
    const handleMobileMenuClose = () => setMobileMenuOpen(false);
    const navItems = [
        { text: 'Về chúng tôi', icon: <HomeIcon />, path: '/about-us', activePaths: ['/'] }, // Assuming /about-us is where "Về chúng tôi" leads
        { text: 'Trang chủ', icon: <BookIcon />, path: '/', activePaths: ['/blog', '/', '/article/:slug', '/tag/:tag'] }, // Assuming '/' is the main blog page or home
        { text: 'Chủ đề', icon: <TopicsIcon />, path: '/topics', activePaths: ['/topics'] },
    ];
    const isLinkActive = (paths) => {
        const currentPath = window.location.pathname;
        return paths.some(p => {
            if (p.includes(':')) {
                const basePath = p.substring(0, p.indexOf(':') - 1);
                return currentPath.startsWith(basePath);
            }
            return currentPath === p;
        });
    };


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const processedBlogs = staticBlogPostsData.map(post => ({
                ...post, id: post._id, slug: post.slug || post._id,
                excerpt: post.summary || "Nội dung đang được cập nhật...",
                author: post.authorId?.name || DEFAULT_AUTHOR_NAME,
                tags: Array.isArray(post.tags) ? post.tags : [],
                mainImage: post.mainImage || DEFAULT_POST_IMAGE_URL,
                views: post.views || Math.floor(Math.random() * 1000) + 50,
                authorImage: post.authorId?.profileImageUrl || "/assets/images/momuni-default-avatar.png",
                averageRating: typeof post.averageRating === 'number' ? post.averageRating : 0,
                images: (post.images && post.images.length > 0 && post.images[0].url)
                    ? post.images
                    : [{ url: post.mainImage || DEFAULT_POST_IMAGE_URL, caption: "Ảnh mặc định" }]
            }));
            setBlogPostsData(processedBlogs);
            setLoading(false);
            if (processedBlogs.length === 0) setApiReturnedNoPosts(true);
        }, 300);
    }, []);

    const allTagsFromData = useMemo(() => {
        if (!blogPostsData || blogPostsData.length === 0) return ["Tất cả"];
        const tagsSet = new Set();
        blogPostsData.forEach(post => {
            if (Array.isArray(post.tags)) {
                post.tags.forEach(tag => tagsSet.add(tag));
            }
        });
        return ["Tất cả", ...Array.from(tagsSet).sort()];
    }, [blogPostsData]);

    const filteredMainPosts = useMemo(() => {
        return blogPostsData
            .filter(post =>
                selectedHeaderTag === "Tất cả" || (Array.isArray(post.tags) && post.tags.includes(selectedHeaderTag))
            )
            .filter(post =>
                post.title.toLowerCase().includes(headerSearchQuery.toLowerCase()) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(headerSearchQuery.toLowerCase()))
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


    const handleHeaderSearch = (e) => { if (e.key === 'Enter') { console.log("Search:", headerSearchQuery); setCurrentPage(1); } };
    const handleTagChange = (event) => { setSelectedHeaderTag(event.target.value); setCurrentPage(1); };
    const handlePageChange = (event, value) => { setCurrentPage(value); scrollToTop(); };
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (loading) { return (<ThemeProvider theme={elegantThemeWithOldColors}><CssBaseline /><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress color="primary" /><Typography sx={{ ml: 2 }}>Đang tải...</Typography></Box></ThemeProvider>); }
    if (error) { return (<ThemeProvider theme={elegantThemeWithOldColors}><CssBaseline /><Container sx={{ py: 3, textAlign: 'center' }}><Alert severity="error">{error}</Alert><Button variant="outlined" onClick={() => window.location.reload()} sx={{ mt: 2 }}>Thử lại</Button></Container></ThemeProvider>); }
    if (apiReturnedNoPosts && blogPostsData.length === 0) { return (<ThemeProvider theme={elegantThemeWithOldColors}><CssBaseline /><WaitingForContentPage message="Chưa có bài viết nào." /></ThemeProvider>); }

    return (
        <ThemeProvider theme={elegantThemeWithOldColors}>
            <CssBaseline />
            <Box sx={{ backgroundColor: elegantThemeWithOldColors.palette.background.default, minHeight: '100vh' }}>
                <Paper
                    elevation={1}
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1100,
                        backgroundColor: alpha(elegantThemeWithOldColors.palette.background.paper, 0.95),
                        backdropFilter: 'blur(8px)',
                        boxShadow: `0 1px 3px ${alpha(elegantThemeWithOldColors.palette.text.primary, 0.1)}`
                    }}
                >
                    <Container maxWidth="xl">
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: { xs: 56, md: 64 },
                                flexWrap: 'nowrap'
                            }}
                        >
                            <MuiLink component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                                <Box component="img" src="/MomUni.svg" alt="MomUni" sx={{ height: { xs: 28, sm: 32, md: 36 }, mr: 1 }} /> {/* Ensure this path is correct */}
                                <Typography variant="h5" component="div" sx={{ color: "pink", fontWeight: 'bold', display: { xs: 'none', sm: 'block' }, fontSize: { sm: '1.2rem', md: '1.4rem' } }}>
                                    MomUni
                                </Typography>
                            </MuiLink>

                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: { md: 2, lg: 2.5 }, ml: 'auto' }}>
                                {navItems.map((item) => (
                                    <MuiLink
                                        key={item.text}
                                        component={RouterLink}
                                        to={item.path}
                                        underline="none"
                                        sx={{
                                            fontWeight: isLinkActive(item.activePaths) ? 700 : 500,
                                            color: isLinkActive(item.activePaths) ? 'primary.main' : 'text.primary',
                                            fontSize: '0.9rem',
                                            padding: '6px 10px',
                                            borderRadius: '6px',
                                            transition: 'color 0.2s ease, background-color 0.2s ease',
                                            '&:hover': {
                                                color: 'primary.dark',
                                                backgroundColor: alpha(elegantThemeWithOldColors.palette.primary.light, 0.25)
                                            },
                                            position: 'relative',
                                        }}
                                    >
                                        {item.text}
                                    </MuiLink>
                                ))}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<ContactIcon />}
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
                            <IconButton
                                sx={{ display: { xs: 'flex', md: 'none' }, ml: 1, color: elegantThemeWithOldColors.palette.text.primary }}
                                aria-label="menu"
                                onClick={handleMobileMenuOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr minmax(170px, auto)' },
                                alignItems: 'center',
                                gap: { xs: 1.5, sm: 2 },
                                py: 1.5,
                                borderTop: `1px solid ${alpha(elegantThemeWithOldColors.palette.divider, 0.7)}`,
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                placeholder="Tìm kiếm bài viết, chủ đề..."
                                value={headerSearchQuery}
                                onChange={(e) => { setHeaderSearchQuery(e.target.value); setCurrentPage(1); }}
                                onKeyPress={handleHeaderSearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: elegantThemeWithOldColors.palette.text.secondary }} fontSize="small" />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        backgroundColor: alpha(elegantThemeWithOldColors.palette.background.default, 0.7),
                                        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: alpha(elegantThemeWithOldColors.palette.background.default, 1),
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: elegantThemeWithOldColors.palette.background.paper,
                                            boxShadow: `0 0 0 2px ${alpha(elegantThemeWithOldColors.palette.primary.main, 0.2)}`
                                        },
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: alpha(elegantThemeWithOldColors.palette.grey ? elegantThemeWithOldColors.palette.grey[400] : '#bdbdbd', 0.5), // Fallback for grey
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: alpha(elegantThemeWithOldColors.palette.grey ? elegantThemeWithOldColors.palette.grey[500] : '#9e9e9e', 0.7), // Fallback for grey
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: elegantThemeWithOldColors.palette.primary.main,
                                        },
                                    }
                                }}
                            />

                            <TextField
                                select
                                fullWidth
                                size="small"
                                value={selectedHeaderTag}
                                onChange={handleTagChange}
                                variant="outlined"
                                sx={{
                                    borderRadius: '8px',
                                    backgroundColor: alpha(elegantThemeWithOldColors.palette.background.default, 0.7),
                                    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: alpha(elegantThemeWithOldColors.palette.background.default, 1),
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: alpha(elegantThemeWithOldColors.palette.grey ? elegantThemeWithOldColors.palette.grey[500] : '#9e9e9e', 0.7), // Fallback for grey
                                        }
                                    },
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        pl: 1.5,
                                        pr: 2, // Ensure space for icon
                                        fontSize: '0.9rem',
                                        color: elegantThemeWithOldColors.palette.text.secondary,
                                        '&:focus': {
                                            color: elegantThemeWithOldColors.palette.text.primary,
                                        }
                                    },
                                    '&.Mui-focused': {
                                        '.MuiOutlinedInput-notchedOutline': {
                                            borderColor: elegantThemeWithOldColors.palette.primary.main,
                                            boxShadow: `0 0 0 2px ${alpha(elegantThemeWithOldColors.palette.primary.main, 0.2)}`
                                        }
                                    },
                                    '.MuiOutlinedInput-notchedOutline': {
                                        borderColor: alpha(elegantThemeWithOldColors.palette.grey ? elegantThemeWithOldColors.palette.grey[400] : '#bdbdbd', 0.5), // Fallback for grey
                                    },
                                }}
                                SelectProps={{
                                    IconComponent: (props) => <FilterListIcon {...props} sx={{ fontSize: '1.2rem', color: elegantThemeWithOldColors.palette.text.secondary, mr: 0.5 }} />,
                                    displayEmpty: true,
                                    MenuProps: { PaperProps: { sx: { borderRadius: '8px', mt: 0.5, boxShadow: elegantThemeWithOldColors.shadows ? elegantThemeWithOldColors.shadows[3] : '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)' } } } // Fallback for shadows
                                }}
                                renderValue={(selected) => {
                                    if (selected === "Tất cả") {
                                        return <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: elegantThemeWithOldColors.palette.text.secondary }}>Lọc theo Tag</Box>;
                                    }
                                    return <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.9rem', color: elegantThemeWithOldColors.palette.text.primary }}>{selected}</Typography>;
                                }}
                            >
                                {Array.isArray(allTagsFromData) && allTagsFromData.map((tag) => (
                                    <MenuItem key={tag} value={tag} sx={{ fontSize: '0.9rem', '&:hover': { backgroundColor: alpha(elegantThemeWithOldColors.palette.primary.light, 0.15) }, '&.Mui-selected': { backgroundColor: alpha(elegantThemeWithOldColors.palette.primary.light, 0.3), fontWeight: 600, '&:hover': { backgroundColor: alpha(elegantThemeWithOldColors.palette.primary.light, 0.4) } } }}>
                                        {tag === "Tất cả" ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', color: elegantThemeWithOldColors.palette.text.secondary, fontStyle: 'italic' }}>
                                                <FilterListIcon sx={{ mr: 0.8, fontSize: '1.1rem', color: 'inherit' }} />
                                                Tất cả Tags
                                            </Box>
                                        ) : tag}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Container>
                </Paper>

                <Drawer
                    anchor="right"
                    open={mobileMenuOpen}
                    onClose={handleMobileMenuClose}
                    PaperProps={{ sx: { width: { xs: '260px', sm: '300px' }, borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', backgroundColor: elegantThemeWithOldColors.palette.background.paper, boxShadow: elegantThemeWithOldColors.shadows ? elegantThemeWithOldColors.shadows[5] : '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)' } }} // Fallback for shadows
                >
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${elegantThemeWithOldColors.palette.divider}` }}> {/* Use theme directly */}
                        <MuiLink component={RouterLink} to="/" underline="none" onClick={handleMobileMenuClose} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box component="img" src="/assets/images/momuni-logo.png" alt="MomUni" sx={{ height: 30, mr: 1 }} /> {/* Ensure this path is correct */}
                            <Typography variant="h6" sx={{ color: elegantThemeWithOldColors.palette.primary.main, fontWeight: 'bold' }}> {/* Use theme directly */}
                                MomUni
                            </Typography>
                        </MuiLink>
                        <IconButton onClick={handleMobileMenuClose} aria-label="close menu">
                            <ArrowForwardIosIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <List sx={{ p: 1 }}>
                        {navItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    component={RouterLink}
                                    to={item.path}
                                    onClick={handleMobileMenuClose}
                                    selected={isLinkActive(item.activePaths)}
                                    sx={{
                                        borderRadius: '8px',
                                        '&.Mui-selected': {
                                            backgroundColor: alpha(elegantThemeWithOldColors.palette.primary.main, 0.1),
                                            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                                                color: elegantThemeWithOldColors.palette.primary.main,
                                                fontWeight: 600,
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: alpha(elegantThemeWithOldColors.palette.primary.light, 0.1),
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: '40px', color: 'inherit' }}>{item.icon}</ListItemIcon>
                                    <ListItemText primaryTypographyProps={{ fontWeight: isLinkActive(item.activePaths) ? 600 : 400 }} primary={item.text} sx={{ color: 'text.primary' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem disablePadding sx={{ mt: 2, px: 1 }}>
                            <Button fullWidth variant="contained" color="primary" startIcon={<ContactIcon />} /* component={RouterLink} to="/contact" */ onClick={handleMobileMenuClose} sx={{ borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', py: 1.2 }}>
                                Liên hệ
                            </Button>
                        </ListItem>
                    </List>
                </Drawer>

                <Container maxWidth="xl" sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 2.5, md: 4 } }}>
                        <Typography variant="h1" component="h2"
                            sx={{ fontWeight: 'bold', position: 'relative', display: 'inline-block', pb: 0.5, fontSize: { xs: '2rem', md: '2.6rem' }, color: elegantThemeWithOldColors.palette.text.primary }} > {/* Use theme directly */}
                            {selectedHeaderTag === "Tất cả" && !headerSearchQuery ? "MomUni Blog" : (headerSearchQuery ? `Kết quả cho "${headerSearchQuery}"` : `Tag: ${selectedHeaderTag}`)}
                            <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '30%', height: '4px', backgroundColor: "pink", borderRadius: '2px' }} />
                        </Typography>
                    </Box>
                    {featuredCarouselPosts.length > 0 && (!headerSearchQuery && selectedHeaderTag === "Tất cả") && (
                        <MotionBox variants={sectionVariants} initial="hidden" animate="visible" sx={{ mb: { xs: 3, md: 4 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <StarBorderIcon color="primary" sx={{ mr: 1, fontSize: '1.8rem' }} />
                                <Typography variant="h2" sx={{ fontSize: { xs: '1.3rem', md: '1.5rem' }, color: elegantThemeWithOldColors.palette.text.primary }}>
                                    Bài viết nổi bật
                                </Typography>
                            </Box>
                            <Swiper
                                modules={[Navigation, SwiperAutoplay, SwiperPagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                loop={featuredCarouselPosts.length > (featuredCarouselPosts.length >= 3 ? 3 : featuredCarouselPosts.length) && featuredCarouselPosts.length > 1}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                pagination={{ clickable: true, dynamicBullets: true }}
                                navigation={featuredCarouselPosts.length > 1}
                                breakpoints={{
                                    600: { slidesPerView: Math.min(featuredCarouselPosts.length, 2), spaceBetween: 20 },
                                    900: { slidesPerView: Math.min(featuredCarouselPosts.length, 3), spaceBetween: 24 },
                                    1200: { slidesPerView: Math.min(featuredCarouselPosts.length, 4), spaceBetween: 24 },
                                }}
                                style={{ paddingBottom: '40px', '--swiper-pagination-color': elegantThemeWithOldColors.palette.primary.main, '--swiper-navigation-color': elegantThemeWithOldColors.palette.primary.main, '--swiper-navigation-size': '28px' }}
                            >
                                {Array.isArray(featuredCarouselPosts) && featuredCarouselPosts.map((post) => (
                                    <SwiperSlide key={`featured-carousel-${post.id}`} style={{ height: 'auto' }}>
                                        <BlogCard post={post} small={false} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </MotionBox>
                    )}

                    <Grid container spacing={{ xs: 2.5, md: 3.5 }}>
                        <Grid item xs={12} md={8}>
                            {currentRegularNewsPosts.length > 0 ? (
                                <Grid container spacing={3}>
                                    {currentRegularNewsPosts.map((post) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={`regular-${post.id}`}
                                            sx={{ display: 'flex' }}
                                        >
                                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <BlogCard post={post} small={false} />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>



                            ) : (<Typography sx={{ my: 3, textAlign: 'center', fontStyle: 'italic', color: 'text.secondary' }}>Không tìm thấy bài viết nào phù hợp với tiêu chí của bạn.</Typography>)}

                            {totalPagesForRegularNews > 1 && currentRegularNewsPosts.length > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3.5, mb: 2 }}>
                                    <Pagination
                                        count={totalPagesForRegularNews}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                        size="medium"
                                    />
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper sx={{
                                p: { xs: 2, md: 2.5 },
                                position: 'sticky',
                                top: '145px',
                                borderRadius: '12px',
                                backgroundColor: alpha(elegantThemeWithOldColors.palette.background.paper, 0.9),
                                backdropFilter: 'blur(5px)',
                                boxShadow: elegantThemeWithOldColors.shadows ? elegantThemeWithOldColors.shadows[2] : '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)' // Fallback for shadows
                            }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5, color: elegantThemeWithOldColors.palette.primary.dark, fontSize: '1.1rem' }}>Đọc nhiều nhất</Typography> {/* Use theme directly */}
                                {popularPosts.length > 0 ? popularPosts.map((post, idx) => (<Box key={`popular-${post.id}`} sx={{ display: 'flex', mb: 1.5, alignItems: 'flex-start' }}> <Typography variant="h4" sx={{ color: elegantThemeWithOldColors.palette.secondary.main, mr: 1.5, lineHeight: 1.2, fontSize: '1.2rem', fontWeight: 600 }}>{idx + 1}.</Typography> <MuiLink component={RouterLink} to={`/article/${post.slug}`} underline="hover" sx={{ fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.4, color: 'text.primary', '&:hover': { color: 'primary.main' } }}> {post.title} </MuiLink> </Box>)) : <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Chưa có dữ liệu.</Typography>}
                                <Divider sx={{ my: 2.5 }} />
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5, color: elegantThemeWithOldColors.palette.primary.dark, fontSize: '1.1rem' }}>Tags nổi bật</Typography> {/* Use theme directly */}
                                {Array.isArray(allTagsFromData) && allTagsFromData.filter(t => t !== "Tất cả").length > 0 ? (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}> {allTagsFromData.filter(t => t !== "Tất cả").slice(0, 10).map(tag => (<Chip key={tag} label={tag} component="a" href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} clickable size="small" sx={{ backgroundColor: alpha(elegantThemeWithOldColors.palette.secondary.light, 0.3), color: elegantThemeWithOldColors.palette.secondary.dark, fontWeight: 500, '&:hover': { backgroundColor: elegantThemeWithOldColors.palette.secondary.main, color: 'white' } }} />))} </Box>) : <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Chưa có tags.</Typography>}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                {exploreMorePosts.length > 0 && (
                    <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 }, borderTop: `1px solid ${alpha(elegantThemeWithOldColors.palette.primary.main, 0.15)}`, mt: 3.5 }}> {/* Use theme directly */}
                        <MotionBox variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                                <ExploreIcon color="primary" sx={{ mr: 1, fontSize: '1.8rem' }} />
                                <Typography variant="h2" sx={{ fontSize: { xs: '1.3rem', md: '1.5rem' }, color: elegantThemeWithOldColors.palette.text.primary }}>Có thể bạn quan tâm</Typography> {/* Use theme directly */}
                            </Box>
                            <Swiper modules={[Navigation, SwiperAutoplay, SwiperPagination]} spaceBetween={20} slidesPerView={2} loop={exploreMorePosts.length > (exploreMorePosts.length >= 4 ? 4 : exploreMorePosts.length) && exploreMorePosts.length > 1} autoplay={{ delay: 6000, disableOnInteraction: false }} navigation={exploreMorePosts.length > 1} pagination={{ clickable: true, dynamicBullets: true }} breakpoints={{
                                600: { slidesPerView: Math.min(exploreMorePosts.length, 3), spaceBetween: 20 },
                                900: { slidesPerView: Math.min(exploreMorePosts.length, 4), spaceBetween: 20 },
                                1200: { slidesPerView: Math.min(exploreMorePosts.length, 5), spaceBetween: 24 },
                            }} style={{ paddingLeft: '5px', paddingRight: '5px', paddingBottom: '30px', '--swiper-pagination-color': elegantThemeWithOldColors.palette.primary.main, '--swiper-navigation-color': elegantThemeWithOldColors.palette.primary.main, '--swiper-navigation-size': '28px' }} > {/* Use theme directly */}
                                {Array.isArray(exploreMorePosts) && exploreMorePosts.map((post) => (<SwiperSlide key={`explore-${post.id}`} style={{ height: 'auto' }}> <BlogCard post={post} small={true} compact={true} /> </SwiperSlide>))}
                            </Swiper>
                        </MotionBox>
                    </Container>
                )}
                <BlogPageFooter />

                <Box sx={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: 1.5, zIndex: 1200 }}>
                    <Fab color="primary" size="medium" aria-label="call" sx={{ boxShadow: elegantThemeWithOldColors.shadows ? elegantThemeWithOldColors.shadows[4] : '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)' }}> <CallIcon /> </Fab> {/* Fallback for shadows */}
                    <Fab sx={{ backgroundColor: elegantThemeWithOldColors.palette.secondary.main, color: 'white', '&:hover': { backgroundColor: elegantThemeWithOldColors.palette.secondary.dark }, boxShadow: elegantThemeWithOldColors.shadows ? elegantThemeWithOldColors.shadows[4] : '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)' }} size="medium" aria-label="chat"> <ChatIcon /> </Fab> {/* Use theme directly, Fallback for shadows */}
                    <Fab sx={{ backgroundColor: alpha(elegantThemeWithOldColors.palette.text.secondary, 0.7), color: 'white', '&:hover': { backgroundColor: elegantThemeWithOldColors.palette.text.primary }, boxShadow: elegantThemeWithOldColors.shadows ? elegantThemeWithOldColors.shadows[3] : '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)' }} size="small" aria-label="scroll-to-top" onClick={scrollToTop}> <ArrowUpwardIcon fontSize="small" /> </Fab> {/* Use theme directly, Fallback for shadows */}
                </Box>
            </Box>
        </ThemeProvider>
    );
}