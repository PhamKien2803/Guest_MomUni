import { useState } from 'react';
import axios from 'axios';
import {
    createTheme, Typography,
    Container, Box, Grid, Link,
    IconButton, TextField, Alert, Snackbar,
    Paper, Stack, Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
    Menu as MenuIcon,
    Facebook,
    Instagram,
    Twitter,
    Send,
} from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const elegantTheme = createTheme({
    palette: {
        primary: { main: '#E5A3B3', light: '#fce4ec' },
        secondary: { main: '#A0C4B8' },
        background: { default: '#FFF7F5', paper: '#FFFFFF' },
        text: { primary: '#5D4037', secondary: '#8D6E63' },
        success: { main: '#A0C4B8' },
        warning: { main: '#FFDAB9' },
        info: { main: '#B2DFDB' },
        error: { main: '#FFCDD2' },
    },
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '3.2rem' },
        h2: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '3rem' },
        h3: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '2.2rem' },
        h4: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.8rem' },
        h5: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.5rem' },
        h6: { fontWeight: 700 },
        subtitle1: { fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 400 },
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: 50, textTransform: 'none', fontWeight: 700, padding: '10px 25px' } } },
        MuiChip: { styleOverrides: { root: { borderRadius: 8, fontWeight: 700 } } }
    },
});

export const FooterWithForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', topic: '', question: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('expert-form/create', formData);
            if (response.status === 201) {
                setSnackbar({ open: true, message: 'Cảm ơn bạn! Chúng tôi sẽ sớm liên hệ.', severity: 'success' });
                setFormData({ name: '', email: '', phone: '', topic: '', question: '' });
            } else {
                setSnackbar({ open: true, message: response.data.message || 'Có lỗi xảy ra, vui lòng thử lại.', severity: 'error' });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Oops! Có lỗi xảy ra khi gửi form.';
            setSnackbar({ open: true, message: errorMessage, severity: 'error' });
            console.error(err);
        }
        setIsSubmitting(false);
    };

    return (
        <Box component="footer" sx={{ backgroundColor: 'secondary.main', color: 'white', pt: 12, pb: 6, mt: 10, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: `linear-gradient(to bottom, ${elegantTheme.palette.background.default}, ${elegantTheme.palette.secondary.main})`, zIndex: 0 }} />
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <Paper elevation={8} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, mb: 8, mt: -24 }}>
                    <Typography variant="h3" component="h2" align="center" color="text.primary" gutterBottom>Kết nối với MomUni</Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>Có bất kỳ câu hỏi hay góp ý nào? Hãy cho chúng tôi biết nhé!</Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Tên của bạn" name="name" value={formData.name} onChange={handleInputChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Số điện thoại" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Chủ đề câu hỏi" name="topic" value={formData.topic} onChange={handleInputChange} required />
                                </Grid>
                            </Grid>
                            <TextField fullWidth label="Lời nhắn của bạn" name="question" value={formData.question} onChange={handleInputChange} required multiline rows={4} />
                            <LoadingButton type="submit" loading={isSubmitting} endIcon={<Send />} variant="contained" color="primary" size="large" sx={{ mt: 1 }}>Gửi Lời Nhắn</LoadingButton>
                        </Stack>
                    </Box>
                </Paper>
                <Grid container spacing={4} justifyContent="center" textAlign="center">
                    <Grid item xs={12}>
                        <Typography variant="h5" sx={{ fontFamily: '"Lora", serif', mb: 2, color: 'white' }}>MomUni</Typography>
                        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                            <Link href="#" color="inherit" underline="hover">Blog</Link>
                            <Link href="#" color="inherit" underline="hover">Về chúng tôi</Link>
                            <Link href="#" color="inherit" underline="hover">Điều khoản</Link>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton href="#" aria-label="Facebook" sx={{ color: 'white' }}><Facebook /></IconButton>
                            <IconButton href="#" aria-label="Instagram" sx={{ color: 'white' }}><Instagram /></IconButton>
                            <IconButton href="#" aria-label="Twitter" sx={{ color: 'white' }}><Twitter /></IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} align="center">© {new Date().getFullYear()} MomUni. All rights reserved.</Typography>
            </Container>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};