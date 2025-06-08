import {
    createTheme, ThemeProvider, CssBaseline
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Header } from '../../components/HomePage/Header/Header';
import { HeroSection } from '../../components/HomePage/HeroSection/HeroSection';
import { FeaturesSection } from './../../components/HomePage/FeaturesSection/FeaturesSection';
import { MotherhoodJourneySection } from '../../components/HomePage/MotherhoodJourneySection/MotherhoodJourneySection';
import { BlogSection } from '../../components/HomePage/BlogSection/BlogSection';
import Footer from '../../components/HomePage/Footer/Footer';

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


export default function HomePage2() {
    return (
        <ThemeProvider theme={elegantTheme}>
            <CssBaseline />
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <MotherhoodJourneySection />
                <BlogSection />
            </main>
            <Footer />
        </ThemeProvider>
    );
}