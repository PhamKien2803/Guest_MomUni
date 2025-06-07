import { useState, useEffect } from 'react';

import {
    AppBar, Toolbar, Typography,
    Button, Container, Box,
    IconButton,
    useTheme
} from '@mui/material';
import {
    Menu as MenuIcon,
} from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const handleNavigateToBlog = () => {
        navigate('/');
    };

    const handleNavigateToHome = () => {
        navigate('/about-us');
    };

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
                backgroundColor: 'pink',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ px: 0, py: 0, minHeight: '64px !important' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, pl: { xs: 1, md: 0 } }}>
                        <Box component="img" src="/MomUni.svg" alt="MomUni Logo" sx={{ height: 32 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontFamily: '"Lora", serif', color: 'text.primary' }}
                        >
                            MomUni
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <Button variant="text" sx={{ color: 'text.primary' }} onClick={handleNavigateToHome}>Về chúng tôi</Button>
                        <Button variant="text" sx={{ color: 'text.primary' }} onClick={handleNavigateToBlog}>
                            Trang chủ
                        </Button>
                        <Button variant="text" sx={{ color: 'text.primary' }}>Chủ đề</Button>
                        <Button variant="contained" color="primary">Liên hệ</Button>
                    </Box>
                    <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary', pr: { xs: 1, md: 0 } }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
