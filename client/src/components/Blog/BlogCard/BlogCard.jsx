import { Card, CardMedia, CardContent, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const DEFAULT_POST_IMAGE_URL = `https://placehold.co/600x338/E5A3B3/FFF7F5?text=MomUni`;

export const BlogCard = ({ post, small, compact, sx: cardSxProp }) => {
    const cardContentPadding = small || compact ? 1.5 : 2;
    const titleVariant = small || compact ? "h6" : "h5";
    const titleLineClamp = 2;
    const summaryLineClamp = small || compact ? 2 : 3;

    return (
        <MuiLink
            component={RouterLink}
            to={`/blog/${post.slug || post.id}`}
            underline="none"
            sx={{
                display: 'block',
                height: '100%',
                textDecoration: 'none'
            }}
        >
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
                ...cardSxProp
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: '100%',
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                    }}
                    image={post.mainImage || DEFAULT_POST_IMAGE_URL}
                    alt={post.title || 'Blog post image'}
                />

                <CardContent sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: cardContentPadding,
                    // Giúp padding bottom nhất quán hơn
                    pb: `${cardContentPadding}px !important`
                }}>
                    {/* Box này sẽ co giãn, đẩy phần tác giả/ngày tháng xuống dưới cùng */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            variant={titleVariant}
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                                mb: 0.5,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: titleLineClamp,
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {post.title || "Không có tiêu đề"}
                        </Typography>

                        {post.summary && !(small && compact) && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: summaryLineClamp,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {post.summary}
                            </Typography>
                        )}
                    </Box>

                    {/* Box này sẽ luôn bị đẩy xuống đáy của CardContent */}
                    <Box sx={{ mt: 'auto', pt: 1 }}>
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ lineHeight: 1.3 }}>
                            {post.author || "MomUni Team"}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary" sx={{ lineHeight: 1.3 }}>
                            {post.createdAt || "Không có ngày"}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </MuiLink>
    );
};