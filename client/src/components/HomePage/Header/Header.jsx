import { useState, useEffect, useRef } from 'react';
import {
    AppBar, Toolbar, Typography,
    Button, Container, Box,
    IconButton, TextField, InputAdornment, alpha,
    Paper, List, ListItem, ListItemText, CircularProgress,
    ListItemAvatar, Avatar
} from '@mui/material';
import {
    Menu as MenuIcon,
    MailOutline as ContactIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [allPosts, setAllPosts] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const navigate = useNavigate();
    const searchContainerRef = useRef(null);

    useEffect(() => {
        const fetchAllPosts = async () => {
            setIsSearchLoading(true);
            try {
                const response = await axios.get('blog');
                const postsArray = response.data.blogs;

                if (Array.isArray(postsArray)) {
                    setAllPosts(postsArray);
                } else {
                    console.error("API response does not contain a 'blogs' array:", response.data);
                    setAllPosts([]);
                }

            } catch (error) {
                console.error("Lỗi khi tải danh sách bài viết:", error);
                setAllPosts([]);
            } finally {
                setIsSearchLoading(false);
            }
        };

        fetchAllPosts();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            const results = allPosts.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredResults(results);
        } else {
            setFilteredResults([]);
        }
    }, [searchQuery, allPosts]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setFilteredResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchContainerRef]);

    const handleResultClick = (slug) => {
        navigate(`/blog/${slug}`);
        setSearchQuery('');
        setFilteredResults([]);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && filteredResults.length > 0) {
            event.preventDefault();
            const topResult = filteredResults[0];
            handleResultClick(topResult.slug);
        }
    };

    const handleNavigateToBlog = () => navigate('/');
    const handleNavigateToHome = () => navigate('/about-us');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AppBar
            position="sticky"
            elevation={scrolled ? 4 : 0}
            sx={{
                p: 0,
                backgroundColor: scrolled ? alpha('#F8C8D4', 0.8) : 'pink',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
                zIndex: (theme) => theme.zIndex.drawer + 2
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ px: 0, py: 0, minHeight: '72px !important' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                        <Box component="img" src="/MomUni.svg" alt="MomUni Logo" sx={{ height: { xs: 40, md: 48 }, mr: 1 }} />
                        <Typography variant="h6" component="div" sx={{ fontFamily: '"Lora", serif', color: 'text.primary', fontSize: { sm: "1.8rem", md: "1.8rem" } }}>
                            MomUni
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box
                        ref={searchContainerRef}
                        sx={{
                            position: 'relative',
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexGrow: 1,
                            maxWidth: '500px',
                        }}>
                        <TextField
                            variant="standard"
                            size="small"
                            placeholder="Tìm kiếm bài viết..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            sx={{
                                width: '100%',
                                bgcolor: 'white',
                                borderRadius: '20px',
                                p: '4px 16px',
                                '& .MuiInput-underline:before, & .MuiInput-underline:after, & .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                    borderBottom: 'none',
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {isSearchLoading ? <CircularProgress size={20} /> : <SearchIcon sx={{ color: alpha('#8F5B6A', 0.7) }} />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {filteredResults.length > 0 && (
                            <Paper sx={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                mt: 1,
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                maxHeight: '400px',
                                overflowY: 'auto',
                            }}>
                                <List>
                                    {filteredResults.map((post) => (
                                        // *** THAY ĐỔI NẰM Ở ĐÂY ***
                                        <ListItem
                                            alignItems="flex-start"
                                            button
                                            key={post.slug}
                                            onClick={() => handleResultClick(post.slug)}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant="rounded"
                                                    src={post.images?.[0]?.url || 'https://placehold.co/60x60/E5A3B3/FFF7F5?text=MomUni'}
                                                    sx={{ width: 56, height: 56, mr: 1.5 }}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={post.title}
                                                primaryTypographyProps={{
                                                    style: {
                                                        fontWeight: 500,
                                                        // Giúp tiêu đề không bị quá dài
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 2,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                    }
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
                        <Button variant="text" sx={{ color: 'text.primary', fontWeight: 500 }} onClick={handleNavigateToHome}>Về chúng tôi</Button>
                        <Button variant="text" sx={{ color: 'text.primary', fontWeight: 500 }} onClick={handleNavigateToBlog}>Trang chủ</Button>
                        <Button variant="text" sx={{ color: 'text.primary', fontWeight: 500 }}>Chủ đề</Button>
                        <Button variant="contained" startIcon={<ContactIcon />} onClick={() => { }} sx={{ borderRadius: '20px', bgcolor: 'white', color: '#8F5B6A', fontWeight: 'bold', '&:hover': { bgcolor: alpha('#FFFFFF', 0.9) } }}>
                            Liên hệ
                        </Button>
                    </Box>

                    <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary', pr: { xs: 1, md: 0 } }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};