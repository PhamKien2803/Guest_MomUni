import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { Header } from "../../components/HomePage/Header/Header";
import { elegantTheme } from "../../components/BlogDetails/theme";
import BlogDetailWrapper from "../../components/BlogDetails/BlogDetailWrapper";
import Footer from "../../components/HomePage/Footer/Footer";

export default function BlogDetailMUI() {
  return (
    <ThemeProvider theme={elegantTheme}>
      <CssBaseline />
      <Header style={{ padding: '0' }} />
      <BlogDetailWrapper />
      <Footer />
    </ThemeProvider>
  );
}
