import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { Header } from "../../components/HomePage/Header/Header";
import { BlogPageFooter } from "../../components/Blog/BlogPageFooter/BlogPageFooter";
import { elegantTheme } from "../../components/BlogDetails/theme";
import BlogDetailWrapper from "../../components/BlogDetails/BlogDetailWrapper";

export default function BlogDetailMUI() {
  return (
    <ThemeProvider theme={elegantTheme}>
      <CssBaseline />
      <Header style={{ padding: '0' }} />
      <BlogDetailWrapper />
      <BlogPageFooter />
    </ThemeProvider>
  );
}
