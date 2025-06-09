import { useState, useEffect, useCallback } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import axios from "axios";
import {
  ThemeProvider,
  CssBaseline,
  Typography,
  Button,
  Container,
  Box,
  CardMedia,
  Grid,
  Chip,
  TextField,
  Alert,
  Paper,
  Stack,
  Divider,
  Pagination,
  ListItemAvatar,
  Avatar,
  Rating,
  CircularProgress,
  CardContent,
  CardActions,
  Card,
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
import styles from "../../page/Guest/BlogDetails.module.scss";
import {
  elegantTheme,
  itemVariants,
  sectionVariants,
} from "../../components/BlogDetails/theme";
import TableOfContents from "./TableOfContents";
import ShareSources from "./ShareSources";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay as SwiperAutoplay,
  Pagination as SwiperPagination,
} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

const DEFAULT_AUTHOR_NAME = "MomUni Team";
const DEFAULT_AUTHOR_IMAGE = "/assets/images/momuni-default-avatar.png";
const DEFAULT_POST_IMAGE_URL =
  "https://placehold.co/1200x550/E5A3B3/FFF7F5?text=MomUni+Blog";
const DEFAULT_PRODUCT_IMAGE_URL =
  "https://placehold.co/1200x550/E5A3B3/FFF7F5?text=MomUni+Blog";


function BlogDetailWrapper() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [toc, setToc] = useState([]);;
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
          const markdown = blogData.content;

          const html = markdown
            .replace(/^###### (.*$)/gim, "<h6>$1</h6>")
            .replace(/^##### (.*$)/gim, "<h5>$1</h5>")
            .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            .replace(/!\[.*?\]\((.*?)\)/gim, '<img src="$1" alt="image" />')
            .replace(
              /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gim,
              '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #1976d2; text-decoration: underline;">$1</a>'
            )
            // .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gim,
            //     '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #1976d2; text-decoration: underline; display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-word;">$1</a>'
            // )
            .replace(/\n{2,}/g, "<br/><br/>");

          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          const headings = [];
          doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
            const text = el.textContent?.trim() || "no-title";
            const slug = text
              .toLowerCase()
              .replace(/[^a-zA-Z0-9\u00C0-\u1EF9 ]/g, "")
              .replace(/\s+/g, "-");

            el.setAttribute("id", slug);
            headings.push({
              id: slug,
              text,
              level: parseInt(el.tagName[1]),
            });
          });

          blogData.contentWithIds = doc.body.innerHTML;
          setToc(headings);
        } else {
          blogData.contentWithIds = "<p>Nội dung bài viết hiện chưa có.</p>";
          setToc([]);
        }

        setBlog(blogData);

        const allRes = await axios.get(`blog`);
        if (Array.isArray(allRes.data.blogs)) {
          const all = allRes.data.blogs.filter(
            (b) => b._id !== fetchedBlog._id
          );
          setAllBlogs(all);

          const shuffled = all.sort(() => 0.5 - Math.random());
          setRelatedBlogs(shuffled.slice(0, 4));

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

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const id = target.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

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
        await fetchComments(blog._id, 1);
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
      <Container className={styles.blogDetailWrapper} maxWidth="lg">
        <Grid container>
          <Grid item xs={1} md={1} lg={1} />
          <Grid item xs={10} md={10} lg={10}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="flex-start"
              gap={4}
            >
              {/* === CỘT TRÁI: BÀI VIẾT CHÍNH === */}
              <Box flex={1} minWidth={0}>
                <Stack spacing={4}>
                  {/* --- KHỐI BÀI VIẾT --- */}
                  <MotionPaper
                    className={styles.contentBlock}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Typography variant="h1" component="h1" gutterBottom>
                      {blog.title}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1.5}
                      flexWrap="wrap"
                      useFlexGap
                      className={styles.blogMeta}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar
                          src={blog.authorImage}
                          sx={{ width: 28, height: 28 }}
                        >
                          {blog.author?.[0]}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {blog.author}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CalendarTodayIcon sx={{ fontSize: "1rem" }} />
                        <Typography variant="caption">
                          {new Date(blog.createdAt).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
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

                    {blog.summary && (
                      <Typography
                        variant="subtitle1"
                        className={styles.blogSummary}
                      >
                        {blog.summary}
                      </Typography>
                    )}

                    <Box
                      className={`${styles.blogContent} blog-post-content`}
                      dangerouslySetInnerHTML={{
                        __html: blog.contentWithIds || "",
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
                          <PlayCircleOutlineIcon
                            className={styles.blogVideoIcon}
                          />{" "}
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
                        <Stack
                          direction="row"
                          spacing={1}
                          useFlexGap
                          flexWrap="wrap"
                        >
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
                  </MotionPaper>

                  {/* --- KHỐI SẢN PHẨM GỢI Ý (VỚI CARD RỘNG HƠN) --- */}
                  {blog.affiliateLinks?.length > 0 && (
                    <MotionBox
                      className={styles.blogAffiliateBox}
                      variants={itemVariants}
                    >
                      <Typography variant="h5" gutterBottom className={styles.blogAffiliateTitle}>
                        <ShoppingCartIcon className={styles.blogAffiliateIcon} /> Có thể bạn quan tâm
                      </Typography>

                      <Swiper
                        modules={[Navigation, SwiperPagination]}
                        spaceBetween={16}
                        slidesPerView={2}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                          600: { slidesPerView: 2 },
                          900: { slidesPerView: 3 },
                          1200: { slidesPerView: 4 },
                        }}
                        style={{
                          paddingTop: '10px',
                          paddingBottom: '40px',
                        }}
                      >
                        {blog.affiliateLinks.map((link, index) => (
                          <SwiperSlide key={link._id || `aff-${index}`} style={{ height: 'auto', paddingBottom: '10px' }}>
                            <MotionCard
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                borderRadius: 2,
                                border: '1px solid #e0e0e0',
                                transition: 'box-shadow 0.3s',
                                '&:hover': {
                                  boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                                  transform: 'translateY(-2px)',
                                }
                              }}
                              variants={itemVariants}
                            >
                              <CardMedia
                                component="img"
                                height="140"
                                image={link.image || '/images/milk2.jpg'}
                                alt={link.label || "Sản phẩm"}
                                sx={{ objectFit: 'cover' }}
                              />
                              <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                  gutterBottom
                                  variant="h6"
                                  component="div"
                                  title={link.label || "Sản phẩm"}
                                  sx={{
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    minHeight: '48px',
                                  }}
                                >
                                  {link.label || "Sản phẩm"}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  size="medium"
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => handleAffiliateLinkClick(link.url, link._id)}
                                  sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                      boxShadow: 'none',
                                      transform: 'translateY(-1px)',
                                    }
                                  }}
                                >
                                  Xem ngay
                                </Button>
                              </CardActions>
                            </MotionCard>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </MotionBox>
                  )}

                  {/* --- KHỐI ĐÁNH GIÁ --- */}
                  <MotionPaper
                    className={`${styles.contentBlock} ${styles.blogRatingBox}`}
                    variants={itemVariants}
                  >
                    <Typography variant="h6" gutterBottom>
                      Bạn thấy bài viết này thế nào?
                    </Typography>
                    <Rating
                      value={userRating}
                      onChange={(e, newValue) =>
                        !ratingSubmitted && setUserRating(newValue)
                      }
                      readOnly={ratingSubmitted}
                      size="large"
                    />
                    {ratingError && (
                      <Alert
                        severity="error"
                        onClose={() => setRatingError("")}
                      >
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
                        sx={{ mt: 2 }}
                      >
                        Gửi đánh giá
                      </Button>
                    )}
                  </MotionPaper>

                  {/* --- KHỐI BÌNH LUẬN --- */}
                  <MotionPaper
                    className={styles.contentBlock}
                    variants={sectionVariants}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <CommentIcon /> Bình luận (
                      {blog.commentCount || comments.length})
                    </Typography>

                    {/* FORM BÌNH LUẬN MỚI */}
                    <Box
                      component="form"
                      onSubmit={handleCommentSubmit}
                      className={styles.commentForm}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                      >
                        <Avatar sx={{ mt: 1, bgcolor: "primary.main" }}>
                          {commenterName
                            ? commenterName.charAt(0).toUpperCase()
                            : "?"}
                        </Avatar>
                        <TextField
                          fullWidth
                          label="Viết bình luận..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          multiline
                          rows={3}
                          variant="outlined"
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        <TextField
                          label="Tên của bạn"
                          value={commenterName}
                          onChange={(e) => setCommenterName(e.target.value)}
                          variant="outlined"
                          size="small"
                          required
                          sx={{ minWidth: { sm: 200 } }}
                        />
                        <LoadingButton
                          type="submit"
                          loading={isSubmittingComment}
                          variant="contained"
                          endIcon={<SendIcon />}
                        >
                          Gửi bình luận
                        </LoadingButton>
                      </Stack>
                      {commentError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                          {commentError}
                        </Alert>
                      )}
                      {commentSuccess && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                          {commentSuccess}
                        </Alert>
                      )}
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* DANH SÁCH BÌNH LUẬN */}
                    {comments.length > 0 ? (
                      <Stack spacing={3}>
                        {comments.map((comment) => (
                          <Stack
                            key={comment._id}
                            direction="row"
                            spacing={2}
                            className={styles.commentItem}
                          >
                            <ListItemAvatar>
                              <Avatar src={comment.avatar || undefined}>
                                {comment.name
                                  ? comment.name.charAt(0).toUpperCase()
                                  : "A"}
                              </Avatar>
                            </ListItemAvatar>
                            <Box>
                              <Typography
                                component="span"
                                sx={{ fontWeight: 600, color: "text.primary" }}
                              >
                                {comment.name || "Ẩn danh"}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", ml: 1.5 }}
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
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  mt: 0.5,
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {comment.content}
                              </Typography>
                            </Box>
                          </Stack>
                        ))}
                      </Stack>
                    ) : (
                      <Alert severity="info" variant="outlined">
                        Chưa có bình luận nào. Hãy là người đầu tiên!
                      </Alert>
                    )}

                    {totalCommentPages > 1 && (
                      <Stack alignItems="center" sx={{ mt: 4 }}>
                        <Pagination
                          count={totalCommentPages}
                          page={commentPage}
                          onChange={(e, val) => setCommentPage(val)}
                          color="primary"
                        />
                      </Stack>
                    )}
                  </MotionPaper>
                </Stack>
              </Box>

              {/* === CỘT PHẢI: SIDEBAR === */}
              <Box
                width={{ xs: "100%", md: 320 }}
                sx={{
                  position: "sticky",
                  top: "96px",
                  alignSelf: "flex-start",
                  flexShrink: 0,
                }}
              >
                <Stack spacing={3}>
                  {/* Phần mục lục */}
                  <TableOfContents toc={toc} />

                  {/* SIDEBAR BÀI VIẾT LIÊN QUAN */}
                  {relatedBlogs.length > 0 && (
                    <MotionPaper
                      className={styles.sidebarBlock}
                      variants={sectionVariants}
                    >
                      <Card
                        variant="outlined"
                        sx={{ p: 2, minWidth: 280, maxWidth: "100%" }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Bài viết liên quan
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Stack spacing={1}>
                          {relatedBlogs.map((b, index) => (
                            <Box key={b._id}>
                              <Box
                                component={RouterLink}
                                to={`/blog/${b.slug}`}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  textDecoration: "none",
                                  color: "inherit",
                                  py: 1,
                                  transition: "all 0.2s",
                                  "&:hover": {
                                    color: "primary.main",
                                  },
                                }}
                              >
                                <Avatar
                                  variant="rounded"
                                  src={
                                    b.images?.[0]?.url ||
                                    "/assets/images/placeholder.png"
                                  }
                                  sx={{ width: 56, height: 42, mr: 2 }}
                                />
                                <Typography
                                  variant="body2"
                                  fontWeight={500}
                                  noWrap
                                >
                                  {b.title}
                                </Typography>
                              </Box>
                              {index < relatedBlogs.length - 1 && <Divider />}
                            </Box>
                          ))}
                        </Stack>
                      </Card>
                    </MotionPaper>
                  )}

                  {/* SIDEBAR BÀI VIẾT NỔI BẬT */}
                  {featuredBlogs.length > 0 && (
                    <MotionPaper
                      className={styles.sidebarBlock}
                      variants={sectionVariants}
                    >
                      <Card
                        variant="outlined"
                        sx={{ p: 2, minWidth: 280, maxWidth: "100%" }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Nổi bật
                        </Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Stack spacing={1}>
                          {featuredBlogs.map((b, index) => (
                            <Box key={b._id}>
                              <Box
                                component={RouterLink}
                                to={`/blog/${b.slug}`}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  textDecoration: "none",
                                  color: "inherit",
                                  py: 1,
                                  transition: "all 0.2s",
                                  "&:hover": {
                                    color: "primary.main",
                                  },
                                }}
                              >
                                <Avatar
                                  variant="rounded"
                                  src={
                                    b.images?.[0]?.url ||
                                    "/assets/images/placeholder.png"
                                  }
                                  sx={{ width: 56, height: 42, mr: 2 }}
                                />
                                <Typography
                                  variant="body2"
                                  fontWeight={500}
                                  noWrap
                                >
                                  {b.title}
                                </Typography>
                              </Box>
                              {index < featuredBlogs.length - 1 && <Divider />}
                            </Box>
                          ))}
                        </Stack>
                      </Card>
                    </MotionPaper>
                  )}

                  {/* Thẻ chia sẻ/nguồn */}
                  <ShareSources />
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} md={1} lg={1} />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default BlogDetailWrapper;
