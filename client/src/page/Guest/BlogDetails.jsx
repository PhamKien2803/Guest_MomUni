import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useParams } from "react-router-dom";
import axios from 'axios';
import {
    createTheme, ThemeProvider, CssBaseline, Typography,
    Button, Container, Box, CardMedia, Grid, Link,
    Chip, TextField, Alert,
    Paper, Stack, Divider, useTheme, alpha, Pagination, Breadcrumbs,
    List, ListItem, ListItemText, ListItemAvatar,
    Avatar, Rating, CircularProgress, Card, CardContent, CardActions // Thêm Card, CardContent, CardActions
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
    Facebook, Instagram, Twitter,
    Search as SearchIcon, AccessTime as TimeIcon,
    Visibility as ViewIcon, Person as PersonIcon, Category as CategoryIcon,
    CalendarToday as CalendarTodayIcon,
    Whatshot as TrendingIcon, NewReleases as NewIcon,
    FilterList as FilterListIcon, Send as SendIcon,
    Star as StarIcon,
    Comment as CommentIcon,
    ShoppingCart as ShoppingCartIcon, // Icon cho affiliate links
    Launch as LaunchIcon // Icon cho link ngoài
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const paletteConfig = {
    primary: { main: '#E5A3B3', light: '#F8C8D4', dark: '#BF8A9B' },
    secondary: { main: '#A0C4B8', light: '#C0D8D0', dark: '#7FA99F' },
    background: { default: '#FFF7F5', paper: '#FFFFFF' },
    text: { primary: '#4A4A4A', secondary: '#757575', disabled: '#BDBDBD' },
};

const elegantTheme = createTheme({
    palette: paletteConfig,
    typography: {
        fontFamily: '"Nunito Sans", sans-serif',
        h1: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2.6rem', color: paletteConfig.text.primary, lineHeight: 1.3, marginBottom: '0.5em' },
        h2: { fontFamily: '"Lora", serif', fontWeight: 700, fontSize: '2rem', color: '#3E2723', marginTop: '1.8em', marginBottom: '0.8em' },
        h3: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.6rem', color: '#4E342E', marginTop: '1.5em', marginBottom: '0.6em' },
        h4: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.4rem', color: '#5D4037' },
        h5: { fontFamily: '"Lora", serif', fontWeight: 600, fontSize: '1.2rem', color: '#4E342E' },
        h6: { fontWeight: 700, fontSize: '1.1rem', color: paletteConfig.text.primary },
        subtitle1: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 400, color: paletteConfig.text.secondary },
        body1: { fontSize: '1rem', lineHeight: 1.8, color: paletteConfig.text.primary },
        body2: { fontSize: '0.9rem', lineHeight: 1.6, color: paletteConfig.text.secondary },
        caption: { fontSize: '0.875rem', color: alpha(paletteConfig.text.secondary, 0.9) }
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: '8px', textTransform: 'none', fontWeight: 600, padding: '8px 22px', boxShadow: 'none' } } },
        MuiChip: { styleOverrides: { root: { borderRadius: '16px', fontWeight: 600, padding: '6px 12px', fontSize: '0.875rem' } } },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.07)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 10px 25px ${alpha(paletteConfig.primary.main, 0.15)}`,
                    },
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    '&.Mui-selected': {
                        backgroundColor: paletteConfig.primary.main,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: paletteConfig.primary.dark,
                        }
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    padding: '24px',
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: alpha(paletteConfig.primary.main, 0.03)
                    }
                }
            }
        }
    },
});

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);


const DEFAULT_AUTHOR_NAME = "MomUni Team";
const DEFAULT_AUTHOR_IMAGE = "/assets/images/momuni-default-avatar.png";

export default function BlogDetailMUI() {
    const theme = useTheme();
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [toc, setToc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commenterName, setCommenterName] = useState("");
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [commentError, setCommentError] = useState("");
    const [commentSuccess, setCommentSuccess] = useState("");

    const [userRating, setUserRating] = useState(0);
    const [currentBlogRating, setCurrentBlogRating] = useState(0);
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    const [ratingError, setRatingError] = useState("");
    const [ratingSuccess, setRatingSuccess] = useState("");

    const [commentPage, setCommentPage] = useState(1);
    const [totalCommentPages, setTotalCommentPages] = useState(1);
    const commentsPerPage = 5;

    const fetchBlogRatings = useCallback(async (blogId) => {
        if (!blogId) return;
        try {
            const ratingResponse = await axios.get(`ratings?blogId=${blogId}`);
            if (ratingResponse.data && typeof ratingResponse.data.averageRating === 'number') {
                const newAvgRating = parseFloat(ratingResponse.data.averageRating.toFixed(1));
                setCurrentBlogRating(newAvgRating);
                setBlog(prevBlog => prevBlog ? { ...prevBlog, averageRating: newAvgRating } : null);
            }
        } catch (ratingError) {
            console.error("Lỗi khi lấy rating cho blog:", ratingError);
        }
    }, []);

    const fetchComments = useCallback(async (blogId, page = 1) => {
        if (!blogId) return;
        try {
            const commentsResponse = await axios.get(`comments?blogId=${blogId}&page=${page}&limit=${commentsPerPage}`);
            if (commentsResponse.data && Array.isArray(commentsResponse.data.comments)) {
                setComments(commentsResponse.data.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                if (commentsResponse.data.pagination) {
                    setTotalCommentPages(commentsResponse.data.pagination.totalPages || 1);
                    setCommentPage(commentsResponse.data.pagination.page || 1);
                }
            }
        } catch (commentErr) {
            console.error("Lỗi khi lấy comments:", commentErr);
            setCommentError("Không thể tải bình luận.");
        }
    }, [commentsPerPage]);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            if (!slug) {
                setError("Không tìm thấy slug bài viết.");
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            setToc([]);
            setComments([]);

            try {
                const response = await axios.get(`blog/${slug}`);
                const fetchedBlog = response.data.blog;

                if (!fetchedBlog) {
                    setError("Không tìm thấy bài viết.");
                    setLoading(false);
                    return;
                }

                const blogData = {
                    ...fetchedBlog,
                    author: fetchedBlog.authorId?.name || DEFAULT_AUTHOR_NAME,
                    authorImage: fetchedBlog.authorId?.profileImageUrl || DEFAULT_AUTHOR_IMAGE,
                    averageRating: typeof fetchedBlog.averageRating === 'number' ? parseFloat(fetchedBlog.averageRating.toFixed(1)) : 0,
                    commentCount: typeof fetchedBlog.commentCount === 'number' ? fetchedBlog.commentCount : 0,
                    images: (fetchedBlog.images && fetchedBlog.images.length > 0 && fetchedBlog.images[0].url)
                        ? fetchedBlog.images
                        : [{ url: 'https://placehold.co/1200x550/E5A3B3/FFF7F5?text=MomUni+Blog', caption: "Ảnh minh họa" }],
                    affiliateLinks: Array.isArray(fetchedBlog.affiliateLinks) ? fetchedBlog.affiliateLinks : []
                };

                setCurrentBlogRating(blogData.averageRating);

                if (blogData.content) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(blogData.content, "text/html");
                    const headings = Array.from(doc.querySelectorAll("h2, h3")).map((h, index) => {
                        const id = `section-${h.tagName.toLowerCase()}-${index}`;
                        h.setAttribute('id', id);
                        return { id: id, text: h.textContent?.trim() || "Mục không tên", level: h.tagName.toLowerCase() };
                    });
                    setToc(headings);
                    blogData.contentWithIds = doc.body.innerHTML;
                } else {
                    blogData.contentWithIds = "<p>Nội dung bài viết hiện chưa có.</p>";
                }
                setBlog(blogData);

                if (blogData._id) {
                    fetchComments(blogData._id, 1);
                }

            } catch (err) {
                console.error("Lỗi khi tải bài viết chi tiết:", err);
                setError(err.response?.data?.message || "Lỗi tải dữ liệu bài viết.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogDetail();
    }, [slug, fetchComments, fetchBlogRatings]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setCommentError("");
        setCommentSuccess("");
        if (!newComment.trim() || !commenterName.trim()) {
            setCommentError("Vui lòng nhập tên và nội dung bình luận.");
            return;
        }
        if (!blog || !blog._id) {
            setCommentError("Không tìm thấy thông tin bài viết để bình luận.");
            return;
        }
        setIsSubmittingComment(true);

        try {
            const response = await axios.post('comments/user-comment', {
                blogId: blog._id,
                name: commenterName,
                content: newComment
            });
            if (response.data && response.data.comment) {
                await fetchComments(blog._id, 1);
                setBlog(prev => prev ? ({ ...prev, commentCount: (prev.commentCount || 0) + 1 }) : null);
                setNewComment("");
                setCommenterName("");
                setCommentSuccess("Bình luận của bạn đã được gửi thành công!");
            }
        } catch (err) {
            console.error("Lỗi khi gửi bình luận:", err);
            setCommentError(err.response?.data?.message || "Gửi bình luận thất bại.");
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleRatingSubmit = async () => {
        setRatingError("");
        setRatingSuccess("");
        if (userRating === 0) {
            setRatingError("Vui lòng chọn số sao để đánh giá.");
            return;
        }
        if (ratingSubmitted) {
            setRatingError("Bạn đã đánh giá bài viết này rồi.");
            return;
        }
        if (!blog || !blog._id) {
            setRatingError("Không tìm thấy thông tin bài viết để đánh giá.");
            return;
        }

        try {
            await axios.post('ratings/user-rating', {
                blogId: blog._id,
                rating: userRating
            });
            setRatingSubmitted(true);
            await fetchBlogRatings(blog._id);
            setRatingSuccess("Cảm ơn bạn đã đánh giá!");

        } catch (err) {
            console.error("Lỗi khi gửi rating:", err);
            setRatingError(err.response?.data?.message || "Gửi đánh giá thất bại.");
            setRatingSubmitted(false);
        }
    };

    const handleAffiliateLinkClick = async (linkId) => {
        // Chỗ này bạn có thể thêm logic gọi API để ghi nhận lượt click nếu cần
        // Ví dụ: await axios.post(`/api/affiliate-links/${linkId}/click`);
        console.log(`Affiliate link clicked: ${linkId}`);
    };


    if (loading) return <Container sx={{ py: 5, textAlign: 'center' }}><CircularProgress /><Typography variant="h6" sx={{ mt: 2 }}>Đang tải bài viết...</Typography></Container>;
    if (error || !blog) return <Container sx={{ py: 5, textAlign: 'center' }}><Alert severity="error">{error || "Không tìm thấy bài viết."}</Alert></Container>;

    return (
        <ThemeProvider theme={elegantTheme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, fontSize: '0.9rem' }}>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/">Trang chủ</Link>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/blog">Blog</Link>
                    <Typography color="text.primary" sx={{ fontWeight: 500 }}>{blog.title || "Chi tiết bài viết"}</Typography>
                </Breadcrumbs>

                <Grid container spacing={5}>
                    <Grid item xs={12} md={8}>
                        <MotionPaper
                            elevation={0}
                            sx={{ border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, p: { xs: 2.5, md: 4 } }}
                            variants={sectionVariants} initial="hidden" animate="visible"
                        >
                            <Typography variant="h1" component="h1" gutterBottom>
                                {blog.title}
                            </Typography>

                            <Stack direction="row" spacing={1.5} sx={{ my: 3, color: 'text.secondary', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Stack direction="row" alignItems="center" spacing={0.5}><Avatar src={blog.authorImage} sx={{ width: 28, height: 28, fontSize: '0.8rem' }}>{blog.author?.[0]}</Avatar> <Typography variant="caption" sx={{ fontWeight: 600 }}>{blog.author}</Typography></Stack>
                                <Stack direction="row" alignItems="center" spacing={0.5}><CalendarTodayIcon sx={{ fontSize: '1rem' }} /> <Typography variant="caption">{new Date(blog.createdAt).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography></Stack>
                                <Stack direction="row" alignItems="center" spacing={0.5}><CommentIcon sx={{ fontSize: '1rem' }} /> <Typography variant="caption">{blog.commentCount || comments.length} bình luận</Typography></Stack>
                                <Stack direction="row" alignItems="center" spacing={0.5}><StarIcon sx={{ fontSize: '1.1rem', color: 'warning.main' }} /> <Typography variant="caption" sx={{ fontWeight: 500 }}>{currentBlogRating.toFixed(1)}/5</Typography></Stack>
                            </Stack>

                            {blog.images && blog.images.length > 0 && (
                                <Box sx={{ mb: 3, borderRadius: '12px', overflow: 'hidden', boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}` }}>
                                    <CardMedia component="img" image={blog.images[0].url} alt={blog.images[0].caption || blog.title} sx={{ width: '100%', maxHeight: '550px', objectFit: 'cover' }} />
                                </Box>
                            )}

                            <Box className="blog-post-content" dangerouslySetInnerHTML={{ __html: blog.contentWithIds || blog.content || "" }} sx={{
                                '& h2': { ...elegantTheme.typography.h2, color: elegantTheme.palette.primary.dark },
                                '& h3': { ...elegantTheme.typography.h3, color: alpha(elegantTheme.palette.text.primary, 0.85) },
                                '& p': { ...elegantTheme.typography.body1, mb: 2 },
                                '& a': { color: 'secondary.main', textDecoration: 'underline', '&:hover': { color: 'secondary.dark' } },
                                '& img': { maxWidth: '100%', height: 'auto', borderRadius: '12px', display: 'block', my: 3, boxShadow: 3 },
                                '& ul, & ol': { pl: 3, my: 2 }, '& li': { mb: 1, lineHeight: 1.7, color: 'text.secondary' },
                                '& strong': { fontWeight: 600, color: 'text.primary' }
                            }} />

                            {blog.tags && blog.tags.length > 0 && (
                                <Box sx={{ mt: 4, mb: 3 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Thẻ:</Typography>
                                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                        {blog.tags.map((tag, index) => (
                                            <Chip key={index} label={tag} component="a" href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`} clickable variant="outlined" size="medium" sx={{ borderColor: alpha(theme.palette.primary.main, 0.5), color: theme.palette.primary.dark, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) } }} />
                                        ))}
                                    </Stack>
                                </Box>
                            )}

                            {blog.affiliateLinks && blog.affiliateLinks.length > 0 && (
                                <MotionBox
                                    variants={itemVariants}
                                    sx={{
                                        mt: 4,
                                        mb: 3,
                                        p: 2.5,
                                        backgroundColor: alpha(theme.palette.secondary.light, 0.15),
                                        borderRadius: '12px',
                                        border: `1px dashed ${theme.palette.secondary.main}`
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'secondary.dark', display: 'flex', alignItems: 'center' }}>
                                        <ShoppingCartIcon sx={{ mr: 1 }} /> Sản phẩm gợi ý
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {blog.affiliateLinks.map((link, index) => (
                                            <Grid item xs={12} sm={6} key={link._id || `aff-${index}`}>
                                                <MotionCard
                                                    elevation={0}
                                                    sx={{
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                                                        transition: 'all 0.2s ease-in-out',
                                                        '&:hover': {
                                                            borderColor: theme.palette.secondary.main,
                                                            boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.2)}`
                                                        }
                                                    }}
                                                    variants={itemVariants}
                                                >
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                                            {link.label || "Sản phẩm"}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions sx={{ px: 2, pb: 2 }}>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            fullWidth
                                                            onClick={() => handleAffiliateLinkClick(link._id)} // Giả sử link có _id
                                                            endIcon={<LaunchIcon />}
                                                            sx={{ fontWeight: 600 }}
                                                        >
                                                            Xem Ngay
                                                        </Button>
                                                    </CardActions>
                                                </MotionCard>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </MotionBox>
                            )}

                            <Divider sx={{ my: 4, borderColor: alpha(theme.palette.primary.main, 0.2) }} />

                            <MotionBox variants={itemVariants} sx={{ textAlign: 'center', p: { xs: 2, md: 3 }, backgroundColor: alpha(theme.palette.primary.light, 0.15), borderRadius: '12px' }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Bạn thấy bài viết này thế nào?</Typography>
                                <Rating
                                    name="blog-post-rating"
                                    value={userRating}
                                    onChange={(event, newValue) => { if (!ratingSubmitted) setUserRating(newValue); }}
                                    readOnly={ratingSubmitted}
                                    size="large"
                                    emptyIcon={<StarIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
                                    sx={{ mb: 2, '& .MuiRating-iconFilled': { color: '#FFB400' } }}
                                />
                                {ratingError && <Alert severity="error" sx={{ mb: 1 }} onClose={() => setRatingError("")}>{ratingError}</Alert>}
                                {ratingSuccess && <Alert severity="success" sx={{ mb: 1 }} onClose={() => setRatingSuccess("")}>{ratingSuccess}</Alert>}
                                {!ratingSubmitted && (
                                    <Button variant="contained" onClick={handleRatingSubmit} disabled={userRating === 0} size="medium" sx={{ fontWeight: 600 }}>
                                        Gửi đánh giá
                                    </Button>
                                )}
                            </MotionBox>
                        </MotionPaper>

                        <MotionPaper elevation={0} sx={{ mt: 4, border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` }} variants={sectionVariants}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, pb: 2, mb: 2 }}>
                                <CommentIcon sx={{ verticalAlign: 'middle', mr: 1, color: 'primary.main' }} />Bình luận ({blog.commentCount || comments.length})
                            </Typography>
                            <Box component="form" onSubmit={handleCommentSubmit} sx={{ my: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label="Tên của bạn" name="commenterName" value={commenterName} onChange={(e) => setCommenterName(e.target.value)} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Viết bình luận..." name="newComment" value={newComment} onChange={(e) => setNewComment(e.target.value)} required multiline rows={3} />
                                    </Grid>
                                    {commentError && <Grid item xs={12}><Alert severity="error" onClose={() => setCommentError("")}>{commentError}</Alert></Grid>}
                                    {commentSuccess && <Grid item xs={12}><Alert severity="success" onClose={() => setCommentSuccess("")}>{commentSuccess}</Alert></Grid>}
                                    <Grid item xs={12}>
                                        <LoadingButton type="submit" loading={isSubmittingComment} variant="contained" endIcon={<SendIcon />} size="medium" sx={{ fontWeight: 600 }}>
                                            Gửi bình luận
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider sx={{ mb: 2.5 }} />
                            {comments.length > 0 ? ( // Sửa: dùng comments.length thay vì currentDisplayComments để kiểm tra có bình luận không
                                <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
                                    {currentDisplayComments.map((comment, index) => (
                                        <React.Fragment key={comment._id || `comment-${index}`}>
                                            <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                                                <ListItemAvatar sx={{ minWidth: 50 }}>
                                                    <Avatar src={comment.avatar || undefined} sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>{comment.name ? comment.name.charAt(0).toUpperCase() : 'A'}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={<Typography sx={{ fontWeight: 'bold', color: 'text.primary', mb: 0.3 }}>{comment.name || "Ẩn danh"}</Typography>}
                                                    secondary={
                                                        <>
                                                            <Typography sx={{ display: 'block', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'text.primary', fontSize: '0.95rem' }} component="span" variant="body2">
                                                                {comment.content || "..."}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                                                {new Date(comment.createdAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                            {index < currentDisplayComments.length - 1 && <Divider variant="inset" component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <Alert severity="info" sx={{ mt: 2, justifyContent: 'center' }}>Chưa có bình luận. Hãy là người đầu tiên!</Alert>
                            )}
                            {totalCommentPages > 1 && (
                                <Stack sx={{ mt: 3, alignItems: 'center' }}>
                                    <Pagination count={totalCommentPages} page={commentPage} onChange={(e, val) => setCommentPage(val)} color="primary" />
                                </Stack>
                            )}
                        </MotionPaper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <MotionBox sx={{ position: 'sticky', top: '88px' }} variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                            {toc.length > 0 && (
                                <Paper elevation={2} sx={{ p: 2.5, border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`, backgroundColor: alpha(theme.palette.secondary.light, 0.1) }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'secondary.dark', borderBottom: `2px solid ${theme.palette.secondary.main}`, pb: 1, mb: 1.5 }}>Mục lục bài viết</Typography>
                                    <List dense component="nav" sx={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                                        {toc.map((item) => (
                                            <ListItem key={item.id} disablePadding sx={{ '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.1), borderRadius: '4px' } }}>
                                                <Link href={`#${item.id}`} underline="none" sx={{ color: item.level === 'h3' ? 'text.secondary' : 'text.primary', width: '100%', py: 0.7, pl: item.level === 'h3' ? 2.5 : 0.5, display: 'block', fontWeight: item.level === 'h2' ? 500 : 400, fontSize: item.level === 'h2' ? '0.95rem' : '0.85rem', transition: 'color 0.2s', '&:hover': { color: 'secondary.dark' } }}>
                                                    {item.text}
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            )}
                        </MotionBox>
                    </Grid>
                </Grid>
            </Container>
            {/* <BlogPageFooter /> */}
        </ThemeProvider>
    );
}