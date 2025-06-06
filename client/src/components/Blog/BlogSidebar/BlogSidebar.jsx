import React from 'react';
import {
    Grid, Typography, Box, Link as MuiLink,
    Divider, Chip, alpha, Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Helper component cho tiêu đề mục, tạo sự nhất quán
const SectionHeader = ({ title }) => (
    <Box sx={{ mb: 2.5 }}>
        <Typography
            variant="h6"
            sx={(theme) => ({
                fontWeight: 'bold',
                fontSize: '1.2rem',
                position: 'relative',
                pb: 1,
                '&::after': { // Hiệu ứng gạch chân trang trí
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '30px',
                    height: '3px',
                    backgroundColor: 'primary.main',
                    borderRadius: '3px',
                },
            })}
        >
            {title}
        </Typography>
    </Box>
);

export const BlogSidebar = ({ popularPosts, allTagsFromData }) => {
    return (
        <Grid item xs={12} md={4}>
            {/* Container chính cho sidebar, đảm bảo nó "dính" lại khi cuộn */}
            <Box sx={{ position: 'sticky', top: '120px' }}>

                {/* --- KHỐI 1: BÀI VIẾT NỔI BẬT --- */}
                <Box component="section" sx={{ mb: 5 }}>
                    <SectionHeader title="Đọc nhiều nhất" />
                    <Box>
                        {popularPosts.length > 0 ? (
                            popularPosts.map((post, idx) => (
                                <React.Fragment key={`popular-${post.id}`}>
                                    <MuiLink
                                        component={RouterLink}
                                        to={`/blog/${post.slug}`}
                                        underline="none"
                                        sx={{
                                            display: 'block',
                                            py: 1.5,
                                            color: 'text.primary',
                                            transition: 'background-color 0.2s',
                                            '&:hover .popular-post-title': { // Hiệu ứng hover cho tiêu đề
                                                color: 'primary.main',
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: 'grey.300', fontStyle: 'italic' }}>
                                                {String(idx + 1).padStart(2, '0')}
                                            </Typography>
                                            <Box>
                                                <Typography
                                                    className="popular-post-title"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '0.95rem',
                                                        lineHeight: 1.5,
                                                        transition: 'color 0.2s'
                                                    }}
                                                >
                                                    {post.title}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                    {post.createdAt}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </MuiLink>
                                    {idx < popularPosts.length - 1 && <Divider sx={{ opacity: 0.7 }} />}
                                </React.Fragment>
                            ))
                        ) : (
                            <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                                Chưa có dữ liệu.
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* --- KHỐI 2: TAGS NỔI BẬT --- */}
                <Box component="section">
                    <SectionHeader title="Khám phá theo Tags" />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {Array.isArray(allTagsFromData) && allTagsFromData.filter(t => t !== "Tất cả").length > 0 ? (
                            allTagsFromData.filter(t => t !== "Tất cả").slice(0, 12).map(tag => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    component={RouterLink}
                                    to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                    clickable
                                    sx={(theme) => ({
                                        cursor: 'pointer',
                                        py: 2,
                                        px: 1,
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        borderRadius: '8px',
                                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                        color: 'secondary.dark',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: 'secondary.main',
                                            color: '#fff',
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.3)}`
                                        }
                                    })}
                                />
                            ))
                        ) : (
                            <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                                Chưa có tags.
                            </Typography>
                        )}
                    </Box>
                </Box>

            </Box>
        </Grid>
    );
};