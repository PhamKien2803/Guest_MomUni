import {
    Typography,
    Container, Box, Grid, Link,
    IconButton,
    Stack, Divider, useTheme
} from '@mui/material';
import {
    Menu as MenuIcon,
    Facebook, Instagram, Twitter, Send,
    ChevronRight, Search as SearchIcon, AccessTime as TimeIcon,
    Visibility as ViewIcon, Person as PersonIcon, Category as CategoryIcon,
    CalendarToday as CalendarIcon, Whatshot as TrendingIcon, NewReleases as NewIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const BlogPageFooter = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.secondary.main,
                color: 'white',
                pt: 8,
                pb: 6,
                mt: 10,
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.secondary.main})`,
                    zIndex: 0
                }}
            />

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} justifyContent="center" textAlign="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Lora", serif',
                                mb: 2,
                                color: 'white',
                                fontWeight: 700,
                            }}
                        >
                            MomUni
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={{ xs: 2, sm: 4 }}
                            justifyContent="center"
                            sx={{ mb: 3 }}
                        >
                            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>Blog</Link>
                            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>Về chúng tôi</Link>
                            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>Điều khoản</Link>
                            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500 }}>Liên hệ</Link>
                        </Stack>
                        <Stack direction="row" spacing={1.5} justifyContent="center">
                            <IconButton href="#" aria-label="Facebook" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <Facebook />
                            </IconButton>
                            <IconButton href="#" aria-label="Instagram" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <Instagram />
                            </IconButton>
                            <IconButton href="#" aria-label="Twitter" sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
                                <Twitter />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} align="center">
                    © {new Date().getFullYear()} MomUni. All rights reserved. Made with ❤️ for parents.
                </Typography>
            </Container>
        </Box>
    );
};