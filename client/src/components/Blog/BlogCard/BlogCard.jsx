import {
    Typography,
    Box, CardMedia, CardContent,
    Chip,
    Stack, Divider, useTheme, alpha,
    Avatar, CardActionArea
} from '@mui/material';

import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const MotionBox = motion(Box);

export const BlogCard = ({ post, small = false }) => {
    const theme = useTheme();
    const cardLink = `/blog/${post.slug}`;

    return (
        <MotionBox
            component={CardActionArea}
            href={cardLink}
            variants={sectionVariants}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                backgroundColor: 'background.paper',
                '&:hover .blog-card-media': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <Box sx={{
                overflow: 'hidden', position: 'relative',
                pt: small ? '75%' : '56.25%',
                borderRadius: '12px 12px 0 0'
            }}>
                <CardMedia
                    component="img"
                    className="blog-card-media"
                    sx={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                    image={post.images && post.images.length > 0 ? post.images[0].url : 'https://placehold.co/600x400/E5A3B3/FFF7F5?text=MomUni'}
                    alt={post.title}
                />
                <Chip
                    label={post.category}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: small ? 8 : 12,
                        left: small ? 8 : 12,
                        backgroundColor: alpha(theme.palette.primary.main, 0.85),
                        color: 'white',
                        fontWeight: 600,
                        backdropFilter: 'blur(2px)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: small ? '0.65rem' : '0.7rem'
                    }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: small ? 1.5 : 2 }}>
                <Typography
                    variant={small ? "body1" : "h6"}
                    component="h2"
                    gutterBottom={!small}
                    sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        fontSize: small ? '0.95rem' : '1.1rem',
                        display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: small ? 2 : 3,
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        minHeight: small ? '2.4em' : '3.9em',
                        lineHeight: 1.3,
                        mb: small ? 0.5 : 1
                    }}
                >
                    {post.title}
                </Typography>
                {!small && (
                    <>
                        <Typography variant="body2" color="text.secondary" sx={{
                            mb: 1.5,
                            display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3,
                            overflow: 'hidden', textOverflow: 'ellipsis',
                            minHeight: '4.2em'
                        }}>
                            {post.excerpt}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 'auto', pt: 1, color: 'text.secondary' }}>
                            <Avatar src={post.authorImage || undefined} sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>{post.author?.[0]}</Avatar>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>{post.author}</Typography>
                            <Divider orientation="vertical" flexItem sx={{ height: 12, alignSelf: 'center' }} />
                            <Typography variant="caption">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</Typography>
                        </Stack>
                    </>
                )}
            </CardContent>
        </MotionBox>
    );
};