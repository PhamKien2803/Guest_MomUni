import {
    Paper,
    Typography,
    List,
    ListItem,
    Link,
    Box
} from "@mui/material";
import { motion } from "framer-motion";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

const MotionPaper = motion(Paper);

const TableOfContents = ({ toc, variants }) => {
    if (!toc || toc.length === 0) return null;

    return (
        <MotionPaper
            elevation={3}
            variants={variants}
            sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: '#f9fafb',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: 'primary.main',
                    textTransform: 'uppercase',
                    fontSize: '0.95rem'
                }}
            >
                Mục lục bài viết
            </Typography>

            <List dense component="nav" disablePadding>
                {toc.map((item) => (
                    <ListItem
                        key={item.id}
                        disableGutters
                        sx={{
                            pl: item.level * 1.5,
                            py: 0.5,
                        }}
                    >
                        <Link
                            href={`#${item.id}`}
                            underline="hover"
                            sx={{
                                fontSize: item.level === 1 ? '0.95rem' : '0.88rem',
                                fontWeight: item.level === 1 ? 600 : 400,
                                color: 'text.primary',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.75,
                                '&:hover': {
                                    color: 'primary.dark',
                                },
                                transition: 'all 0.2s ease-in-out'
                            }}
                        >
                            <LabelImportantIcon sx={{ fontSize: 16, color: 'primary.light' }} />
                            <Box
                                component="span"
                                sx={{
                                    display: 'inline-block'
                                }}
                            >
                                {item.text}
                            </Box>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </MotionPaper>
    );
};

export default TableOfContents;
