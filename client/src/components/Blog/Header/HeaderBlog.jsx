import { useState, useMemo } from 'react';
import {
    createTheme, ThemeProvider, CssBaseline, Typography,
    Container, Box, Link as MuiLink,
    TextField, MenuItem,
    alpha, IconButton,
    InputAdornment,

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


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CircularProgress, Alert, Button } from '@mui/material';
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




function HeaderBlog() {
    const [blogPostsData, setBlogPostsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [headerSearchQuery, setHeaderSearchQuery] = useState("");
    const [selectedHeaderTag, setSelectedHeaderTag] = useState("Tất cả");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMobileMenuOpen = () => setMobileMenuOpen(true);
    const navItems = [
        { text: 'Về chúng tôi', icon: <HomeIcon />, path: '/about-us', activePaths: ['/about-us'] },
        { text: 'Blog', icon: <BookIcon />, path: '/', activePaths: ['/', '/blog', '/article/:slug', '/tag/:tag'] },
        // { text: 'Chủ đề', icon: <TopicsIcon />, path: '/topics', activePaths: ['/topics'] },
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
    const currentRegularNewsPosts = filteredMainPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);



    const handleHeaderSearch = (e) => { if (e.key === 'Enter') { setCurrentPage(1); } };
    const handleTagChange = (event) => { setSelectedHeaderTag(event.target.value); setCurrentPage(1); };

    if (loading) { return (<ThemeProvider theme={elegantThemeWithOldColors}><CssBaseline /><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress color="primary" /><Typography sx={{ ml: 2 }}>Đang tải...</Typography></Box></ThemeProvider>); }
    if (error) { return (<ThemeProvider theme={elegantThemeWithOldColors}><CssBaseline /><Container sx={{ py: 3, textAlign: 'center' }}><Alert severity="error">Lỗi: {error}</Alert><Button variant="outlined" onClick={() => window.location.reload()} sx={{ mt: 2 }}>Thử lại</Button></Container></ThemeProvider>); }


    return (
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
    )
}

export default HeaderBlog
