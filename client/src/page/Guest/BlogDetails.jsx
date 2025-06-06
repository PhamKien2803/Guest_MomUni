import React, { useState, useEffect, useCallback } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import axios from "axios";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Typography,
  Button,
  Container,
  Box,
  CardMedia,
  Grid,
  Link,
  Chip,
  TextField,
  Alert,
  Paper,
  Stack,
  Divider,
  useTheme,
  alpha,
  Pagination,
  Breadcrumbs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  CalendarToday as CalendarTodayIcon,
  Star as StarIcon,
  Comment as CommentIcon,
  ShoppingCart as ShoppingCartIcon,
  Launch as LaunchIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";
import WaitingForContentPage from "../../components/404/WaitingForContentPage";
import styles from "./BlogDetails.module.scss";
import { Header } from "../../components/HomePage/Header/Header";
import Footer from "../../components/HomePage/Footer/Footer";

const paletteConfig = {
  primary: { main: "#E5A3B3", light: "#F8C8D4", dark: "#BF8A9B" },
  secondary: { main: "#A0C4B8", light: "#C0D8D0", dark: "#7FA99F" },
  background: { default: "#FFF7F5", paper: "#FFFFFF" },
  text: { primary: "#4A4A4A", secondary: "#757575", disabled: "#BDBDBD" },
};

const elegantTheme = createTheme({
  palette: paletteConfig,
  typography: {
    fontFamily: '"Nunito Sans", sans-serif',
    h1: {
      fontFamily: '"Lora", serif',
      fontWeight: 700,
      fontSize: "2.6rem",
      color: paletteConfig.text.primary,
      lineHeight: 1.3,
      marginBottom: "0.5em",
    },
    h2: {
      fontFamily: '"Lora", serif',
      fontWeight: 700,
      fontSize: "2rem",
      color: "#3E2723",
      marginTop: "1.8em",
      marginBottom: "0.8em",
    },
    h3: {
      fontFamily: '"Lora", serif',
      fontWeight: 600,
      fontSize: "1.6rem",
      color: "#4E342E",
      marginTop: "1.5em",
      marginBottom: "0.6em",
    },
    h4: {
      fontFamily: '"Lora", serif',
      fontWeight: 600,
      fontSize: "1.4rem",
      color: "#5D4037",
    },
    h5: {
      fontFamily: '"Lora", serif',
      fontWeight: 600,
      fontSize: "1.2rem",
      color: "#4E342E",
    },
    h6: {
      fontWeight: 700,
      fontSize: "1.1rem",
      color: paletteConfig.text.primary,
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400,
      color: paletteConfig.text.secondary,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.8,
      color: paletteConfig.text.primary,
      wordBreak: "break-word",
      overflowWrap: "break-word",
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.6,
      color: paletteConfig.text.secondary,
    },
    caption: {
      fontSize: "0.875rem",
      color: alpha(paletteConfig.text.secondary, 0.9),
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 22px",
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          fontWeight: 600,
          padding: "6px 12px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: `0 10px 25px ${alpha(paletteConfig.primary.main, 0.15)}`,
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&.Mui-selected": {
            backgroundColor: paletteConfig.primary.main,
            color: "white",
            "&:hover": {
              backgroundColor: paletteConfig.primary.dark,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "24px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: alpha(paletteConfig.primary.main, 0.03),
          },
        },
      },
    },
  },
});

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
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
const DEFAULT_POST_IMAGE_URL =
  "https://placehold.co/1200x550/E5A3B3/FFF7F5?text=MomUni+Blog";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  let videoId = null;
  try {
    const urlObj = new URL(url);
    if (
      urlObj.hostname === "www.youtube.com" ||
      urlObj.hostname === "youtube.com"
    ) {
      if (urlObj.pathname.includes("watch")) {
        videoId = urlObj.searchParams.get("v");
      } else if (urlObj.pathname.includes("embed")) {
        videoId = urlObj.pathname.split("/").pop();
      }
    } else if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (e) {
    if (url.length === 11 && !url.includes("/")) {
      return `https://www.youtube.com/embed/${url}`;
    }
    return null;
  }
};

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

  const [allBlogs, setAllBlogs] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  const [commentPage, setCommentPage] = useState(1);
  const [totalCommentPages, setTotalCommentPages] = useState(1);
  const commentsPerPage = 5;

  const fetchBlogRatings = useCallback(async (blogId) => {
    if (!blogId) return;
    try {
      const ratingResponse = await axios.get(`ratings?blogId=${blogId}`);
      if (
        ratingResponse.data &&
        typeof ratingResponse.data.averageRating === "number"
      ) {
        const newAvgRating = parseFloat(
          ratingResponse.data.averageRating.toFixed(1)
        );
        setCurrentBlogRating(newAvgRating);
        setBlog((prevBlog) =>
          prevBlog ? { ...prevBlog, averageRating: newAvgRating } : null
        );
      }
    } catch (err) {
      console.error("Lỗi khi lấy rating cho blog:", err);
    }
  }, []);

  const fetchComments = useCallback(
    async (blogId, page = 1) => {
      if (!blogId) return;
      try {
        const res = await axios.get(
          `comments?blogId=${blogId}&page=${page}&limit=${commentsPerPage}`
        );
        if (res.data && Array.isArray(res.data.comments)) {
          setComments(
            res.data.comments.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          );
          if (res.data.pagination) {
            setTotalCommentPages(res.data.pagination.totalPages || 1);
            setCommentPage(res.data.pagination.page || 1);
          }
        }
      } catch (err) {
        console.error("Lỗi khi lấy comments:", err);
        setCommentError("Không thể tải bình luận.");
      }
    },
    [commentsPerPage]
  );

  // Effect for fetching the main blog content
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
          authorImage:
            fetchedBlog.authorId?.profileImageUrl || DEFAULT_AUTHOR_IMAGE,
          averageRating:
            typeof fetchedBlog.averageRating === "number"
              ? parseFloat(fetchedBlog.averageRating.toFixed(1))
              : 0,
          commentCount:
            typeof fetchedBlog.commentCount === "number"
              ? fetchedBlog.commentCount
              : 0,
          images:
            Array.isArray(fetchedBlog.images) &&
            fetchedBlog.images.length > 0 &&
            fetchedBlog.images[0].url
              ? fetchedBlog.images
              : [],
          video: fetchedBlog.video || null,
          affiliateLinks: Array.isArray(fetchedBlog.affiliateLinks)
            ? fetchedBlog.affiliateLinks
            : [],
        };
        setCurrentBlogRating(blogData.averageRating);
        if (blogData.content) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(blogData.content, "text/html");
          const headings = Array.from(doc.querySelectorAll("h2, h3")).map(
            (h, index) => {
              const id = `section-${h.tagName.toLowerCase()}-${index}`;
              h.setAttribute("id", id);
              return {
                id: id,
                text: h.textContent?.trim() || "Mục không tên",
                level: h.tagName.toLowerCase(),
              };
            }
          );
          setToc(headings);
          blogData.contentWithIds = doc.body.innerHTML;
        } else {
          blogData.contentWithIds = "<p>Nội dung bài viết hiện chưa có.</p>";
        }
        setBlog(blogData);

        // Fetch all blogs for related/featured
        const allRes = await axios.get(`blog`);
        if (Array.isArray(allRes.data.blogs)) {
          const all = allRes.data.blogs.filter(
            (b) => b._id !== fetchedBlog._id
          );
          setAllBlogs(all);

          // Random 4 blogs for related
          const shuffled = all.sort(() => 0.5 - Math.random());
          setRelatedBlogs(shuffled.slice(0, 4));

          // Top 4 blogs by viewCount
          const topViewed = [...all].sort(
            (a, b) => (b.viewCount || 0) - (a.viewCount || 0)
          );
          setFeaturedBlogs(topViewed.slice(0, 4));
        }
      } catch (err) {
        console.error("Lỗi khi tải bài viết chi tiết:", err);
        setError(err.response?.data?.message || "Lỗi tải dữ liệu bài viết.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetail();
  }, [slug, fetchBlogRatings]);

  // Effect for fetching comments, triggered by blog load or page change
  useEffect(() => {
    if (blog?._id) {
      fetchComments(blog._id, commentPage);
    }
  }, [blog?._id, commentPage, fetchComments]);

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
      const response = await axios.post("comments/user-comment", {
        blogId: blog._id,
        name: commenterName,
        content: newComment,
      });
      if (response.data && response.data.comment) {
        await fetchComments(blog._id, 1); // Refetch comments for the first page
        setBlog((prev) =>
          prev ? { ...prev, commentCount: (prev.commentCount || 0) + 1 } : null
        );
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
      await axios.post("ratings/user-rating", {
        blogId: blog._id,
        rating: userRating,
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

  const handleAffiliateLinkClick = async (linkUrl, linkId) => {
    console.log(
      `Affiliate link clicked: ${linkUrl}, ID (if available): ${linkId}`
    );
  };

  if (loading)
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Đang tải bài viết...
        </Typography>
      </Container>
    );
  if (error || !blog) {
    return (
      <ThemeProvider theme={elegantTheme}>
        <CssBaseline />
        <WaitingForContentPage />
      </ThemeProvider>
    );
  }
  const coverImage =
    blog.images && blog.images.length > 0
      ? blog.images[0]
      : { url: DEFAULT_POST_IMAGE_URL, caption: "Ảnh minh họa" };
  const embedVideoUrl = blog.video?.url
    ? getYouTubeEmbedUrl(blog.video.url)
    : null;

  return (
    <ThemeProvider theme={elegantTheme}>
      <CssBaseline />
      <Header style={{padding: '0'}}/>
      <Container className={styles.blogDetailWrapper} maxWidth="lg">
        <Breadcrumbs className={styles.blogBreadcrumbs} aria-label="breadcrumb">
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Trang chủ
          </Link>
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to="/blog"
          >
            Blog
          </Link>
          <Typography
            className={styles.blogTitleBreadcrumb}
            color="text.primary"
          >
            {blog.title || "Chi tiết bài viết"}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <MotionPaper
              className={styles.blogCardPaper}
              elevation={0}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography variant="h1" component="h1" gutterBottom>
                {blog.title}
              </Typography>

              <Stack direction="row" spacing={1.5} className={styles.blogMeta}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Avatar src={blog.authorImage}>{blog.author?.[0]}</Avatar>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {blog.author}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <CalendarTodayIcon sx={{ fontSize: "1rem" }} />
                  <Typography variant="caption">
                    {new Date(blog.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <VisibilityIcon sx={{ fontSize: "1rem" }} />
                  <Typography variant="caption">
                    {blog.viewCount || 0} lượt xem
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <CommentIcon sx={{ fontSize: "1rem" }} />
                  <Typography variant="caption">
                    {blog.commentCount || comments.length} bình luận
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <StarIcon
                    sx={{ fontSize: "1.1rem", color: "warning.main" }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {currentBlogRating.toFixed(1)}/5
                  </Typography>
                </Stack>
              </Stack>

              {coverImage.url !== DEFAULT_POST_IMAGE_URL && (
                <Box className={styles.blogCoverImage}>
                  <CardMedia
                    component="img"
                    image={coverImage.url}
                    alt={coverImage.caption || blog.title}
                  />
                  {coverImage.caption && (
                    <Typography
                      variant="caption"
                      component="p"
                      className={styles.blogCoverCaption}
                    >
                      {coverImage.caption}
                    </Typography>
                  )}
                </Box>
              )}

              <Typography variant="subtitle1" className={styles.blogSummary}>
                {blog.summary || blog.excerpt}
              </Typography>

              <Box
                className={`${styles.blogContent} blog-post-content`}
                dangerouslySetInnerHTML={{
                  __html: blog.contentWithIds || blog.content || "",
                }}
              />

              {embedVideoUrl && (
                <MotionBox
                  className={styles.blogVideoSection}
                  variants={itemVariants}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={styles.blogVideoTitle}
                  >
                    <PlayCircleOutlineIcon className={styles.blogVideoIcon} />{" "}
                    Video
                  </Typography>
                  <Box className={styles.blogVideoEmbedWrapper}>
                    <iframe
                      src={embedVideoUrl}
                      title={blog.video?.caption || blog.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </Box>
                  {blog.video?.caption && (
                    <Typography
                      variant="caption"
                      align="center"
                      className={styles.blogVideoCaption}
                    >
                      {blog.video.caption}
                    </Typography>
                  )}
                </MotionBox>
              )}

              {blog.tags?.length > 0 && (
                <Box className={styles.blogTagWrapper}>
                  <Typography variant="h6" gutterBottom>
                    Thẻ:
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {blog.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        component="a"
                        href={`/blog?tag=${encodeURIComponent(
                          tag.toLowerCase()
                        )}`}
                        clickable
                        variant="outlined"
                        size="medium"
                        className={styles.blogTagChip}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {blog.affiliateLinks?.length > 0 && (
                <MotionBox
                  className={styles.blogAffiliateBox}
                  variants={itemVariants}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={styles.blogAffiliateTitle}
                  >
                    <ShoppingCartIcon className={styles.blogAffiliateIcon} />{" "}
                    Sản phẩm gợi ý trong bài
                  </Typography>
                  <Grid container spacing={2}>
                    {blog.affiliateLinks.map((link, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        key={link._id || `aff-${index}`}
                      >
                        <MotionCard
                          className={styles.blogAffiliateCard}
                          elevation={0}
                          variants={itemVariants}
                        >
                          <CardContent
                            className={styles.blogAffiliateCardContent}
                          >
                            <Typography
                              variant="subtitle1"
                              className={styles.blogAffiliateLabel}
                            >
                              {link.label || "Sản phẩm"}
                            </Typography>
                          </CardContent>
                          <CardActions className={styles.blogAffiliateActions}>
                            <Button
                              variant="contained"
                              color="secondary"
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              fullWidth
                              onClick={() =>
                                handleAffiliateLinkClick(link.url, link._id)
                              }
                              endIcon={<LaunchIcon />}
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

              <Divider className={styles.blogDivider} />

              <MotionBox
                className={styles.blogRatingBox}
                variants={itemVariants}
              >
                <Typography variant="h6" gutterBottom>
                  {" "}
                  Bạn thấy bài viết này thế nào?
                </Typography>
                <Rating
                  name="blog-post-rating"
                  value={userRating}
                  onChange={(e, newValue) =>
                    !ratingSubmitted && setUserRating(newValue)
                  }
                  readOnly={ratingSubmitted}
                  size="large"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.4 }} fontSize="inherit" />
                  }
                  className={styles.blogRatingStars}
                />
                {ratingError && (
                  <Alert severity="error" onClose={() => setRatingError("")}>
                    {ratingError}
                  </Alert>
                )}
                {ratingSuccess && (
                  <Alert
                    severity="success"
                    onClose={() => setRatingSuccess("")}
                  >
                    {ratingSuccess}
                  </Alert>
                )}
                {!ratingSubmitted && (
                  <Button
                    variant="contained"
                    onClick={handleRatingSubmit}
                    disabled={userRating === 0}
                  >
                    Gửi đánh giá
                  </Button>
                )}
              </MotionBox>

              <MotionPaper
                elevation={0}
                className={styles.blogCommentBox}
                variants={sectionVariants}
              >
                <Typography variant="h6" gutterBottom>
                  <CommentIcon className={styles.blogCommentIcon} /> Bình luận (
                  {blog.commentCount || comments.length})
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleCommentSubmit}
                  className={styles.blogCommentForm}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Tên của bạn"
                        name="commenterName"
                        value={commenterName}
                        onChange={(e) => setCommenterName(e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Viết bình luận..."
                        name="newComment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                        multiline
                        rows={3}
                      />
                    </Grid>
                    {commentError && (
                      <Grid item xs={12}>
                        <Alert
                          severity="error"
                          onClose={() => setCommentError("")}
                        >
                          {commentError}
                        </Alert>
                      </Grid>
                    )}
                    {commentSuccess && (
                      <Grid item xs={12}>
                        <Alert
                          severity="success"
                          onClose={() => setCommentSuccess("")}
                        >
                          {commentSuccess}
                        </Alert>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <LoadingButton
                        type="submit"
                        loading={isSubmittingComment}
                        variant="contained"
                        endIcon={<SendIcon />}
                      >
                        Gửi bình luận
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                {comments.length > 0 ? (
                  <List>
                    {comments.map((comment, index) => (
                      <React.Fragment key={comment._id || `comment-${index}`}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar src={comment.avatar || undefined}>
                              {comment.name
                                ? comment.name.charAt(0).toUpperCase()
                                : "A"}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography className={styles.blogCommentName}>
                                {comment.name || "Ẩn danh"}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography
                                  className={styles.blogCommentContent}
                                >
                                  {comment.content || "..."}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  className={styles.blogCommentTimestamp}
                                >
                                  {new Date(comment.createdAt).toLocaleString(
                                    "vi-VN",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                        {index < comments.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Alert severity="info">
                    Chưa có bình luận. Hãy là người đầu tiên!
                  </Alert>
                )}
                {totalCommentPages > 1 && (
                  <Stack alignItems="center">
                    <Pagination
                      count={totalCommentPages}
                      page={commentPage}
                      onChange={(e, val) => setCommentPage(val)}
                      color="primary"
                    />
                  </Stack>
                )}
              </MotionPaper>
            </MotionPaper>
          </Grid>

          <Grid item xs={12} md={5}>
            <MotionBox
              className={styles.blogStickySidebar}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {toc.length > 0 && (
                <Paper className={styles.blogSidebarPaper} elevation={2}>
                  <Typography variant="h6" gutterBottom>
                    Mục lục bài viết
                  </Typography>
                  <List
                    dense
                    component="nav"
                    sx={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
                  >
                    {toc.map((item) => (
                      <ListItem key={item.id} disablePadding>
                        <Link
                          href={`#${item.id}`}
                          underline="none"
                          sx={{
                            width: "100%",
                            py: 0.7,
                            pl: item.level === "h3" ? 2.5 : 0.5,
                          }}
                        >
                          {item.text}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}

              {(relatedBlogs.length > 0 || featuredBlogs.length > 0) && (
                <Stack spacing={3} className={styles.blogSidebarSection}>
                  {relatedBlogs.length > 0 && (
                    <Paper className={styles.blogSidebarPaper} elevation={2}>
                      <Typography variant="h6">Bài viết liên quan</Typography>
                      <Stack spacing={1.5}>
                        {relatedBlogs.map((b) => (
                          <Link
                            key={b._id}
                            component={RouterLink}
                            to={`/blog/${b.slug}`}
                            underline="hover"
                          >
                            • {b.title}
                          </Link>
                        ))}
                      </Stack>
                    </Paper>
                  )}

                  {featuredBlogs.length > 0 && (
                    <Paper className={styles.blogSidebarPaper} elevation={2}>
                      <Typography variant="h6">Nổi bật</Typography>
                      <Stack spacing={1.5}>
                        {featuredBlogs.map((b) => (
                          <Link
                            key={b._id}
                            component={RouterLink}
                            to={`/blog/${b.slug}`}
                            underline="hover"
                          >
                            • {b.title}
                          </Link>
                        ))}
                      </Stack>
                    </Paper>
                  )}
                </Stack>
              )}
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
