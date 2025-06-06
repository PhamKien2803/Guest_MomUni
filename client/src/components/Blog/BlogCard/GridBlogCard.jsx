import { Card, CardMedia, CardContent, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const DEFAULT_POST_IMAGE_URL = `https://placehold.co/400x225/E5A3B3/FFF7F5?text=MomUni`;

export const GridBlogCard = ({ post, sx: cardSxProp }) => {
    const titleLineClamp = 2;
    const summaryLineClamp = 3;

    return (
        <MuiLink
            component={RouterLink}
            to={`/blog/${post.slug || post.id}`}
            underline="none"
            sx={{ display: 'block', height: '100%', textDecoration: 'none' }}
        >
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                ...cardSxProp
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: '100%',
                        height: '180px', // <<< THAY ĐỔI: Tăng chiều cao ảnh cho thẻ to hơn
                        objectFit: 'cover', // Đảm bảo mọi ảnh (dù kích thước nào) đều lấp đầy khung hình
                    }}
                    image={post.mainImage || DEFAULT_POST_IMAGE_URL}
                    alt={post.title || 'Blog post image'}
                />

                <CardContent sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2, // <<< THAY ĐỔI: Tăng padding cho thoáng hơn
                }}>
                    {/* THAY ĐỔI QUAN TRỌNG: Đặt minHeight cho vùng text.
                      Điều này đảm bảo vùng nội dung không bị co lại quá nhỏ khi thiếu tóm tắt.
                    */}
                    <Box sx={{ flexGrow: 1, minHeight: '110px' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                color: 'text.primary',
                                mb: 1, // <<< THAY ĐỔI: Tăng margin bottom
                                fontSize: '1rem',
                                lineHeight: 1.4, // <<< THAY ĐỔI: Tăng line-height
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: titleLineClamp,
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {post.title || "Không có tiêu đề"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                fontSize: '0.875rem', // <<< THAY ĐỔI: Tăng font-size cho dễ đọc
                                lineHeight: 1.5, // <<< THAY ĐỔI: Tăng line-height
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: summaryLineClamp,
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {post.summary}
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 'auto', pt: 2 }}> {/* <<< THAY ĐỔI: Tăng padding-top */}
                        <Typography variant="caption" display="block" color="text.secondary">
                            {post.author || "MomUni Team"}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                            {post.createdAt || "Không có ngày"}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </MuiLink>
    );
};