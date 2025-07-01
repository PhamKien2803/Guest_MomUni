import { Card, CardMedia, CardContent, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const DEFAULT_POST_IMAGE_URL = `https://placehold.co/400x225/E5A3B3/FFF7F5?text=MomUni`;

export const GridBlogCard = ({ post, sx: cardSxProp }) => {
    const titleLineClamp = 3;

    return (
        <MuiLink
            component={RouterLink}
            to={`/blog/${post.slug || post.id}`}
            underline="none"
            sx={{ display: 'block', height: '100%', textDecoration: 'none' }}
        >
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 460,
                    width: 300,
                    ...cardSxProp,
                }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        width: '100%',
                        height: 260,
                        objectFit: 'cover',
                    }}
                    image={post.mainImage || DEFAULT_POST_IMAGE_URL}
                    alt={post.title || 'Blog post image'}
                />


                <CardContent sx={{
                    flexGrow: 1,
                    p: 1.5,
                }}>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        title={post.title}
                        sx={{
                            fontWeight: 'bold',
                            color: 'text.primary',
                            lineHeight: 1.4,
                            fontSize: '0.9rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: titleLineClamp,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {post.title || "Không có tiêu đề"}
                    </Typography>
                </CardContent>
            </Card>
        </MuiLink>
    );
};