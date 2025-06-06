import {
    Paper,
    Typography,
    List,
    ListItem,
    Link,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);

// Dữ liệu mẫu để test
const sampleToc = [
    {
        id: "gioi-thieu",
        text: "1. Giới thiệu về chủ đề",
        level: 1,
    },
    {
        id: "nguyen-nhan",
        text: "2. Nguyên nhân chính",
        level: 1,
    },
    {
        id: "nguyen-nhan-noi-bat",
        text: "2.1. Nguyên nhân nổi bật",
        level: 2,
    },
    {
        id: "giai-phap",
        text: "3. Các giải pháp đề xuất",
        level: 1,
    },
    {
        id: "ket-luan",
        text: "4. Kết luận và khuyến nghị",
        level: 1,
    },
];

const TableOfContents = ({ toc = sampleToc, variants }) => {
    if (!toc || toc.length === 0) return null;

    return (
        <MotionPaper
            elevation={0}
            variants={variants}
            sx={{
                p: 2,
                border: '1px solid rgba(160, 196, 184, 0.3)',
                backgroundColor: 'rgba(192, 216, 208, 0.1)',
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Mục lục
            </Typography>
            <List dense component="nav" disablePadding>
                {toc.map((item) => (
                    <ListItem
                        key={item.id}
                        disablePadding
                        sx={{ pl: item.level === 1 ? 1 : 3 }}
                    >
                        <Link
                            href={`#${item.id}`}
                            underline="hover"
                            sx={{
                                py: 0.75,
                                fontSize: item.level === 1 ? '0.95rem' : '0.88rem',
                                fontWeight: item.level === 1 ? 500 : 400,
                                color: item.level === 1 ? 'text.primary' : 'text.secondary',
                                display: 'block',
                                transition: 'color 0.2s',
                                '&:hover': {
                                    color: 'primary.main',
                                },
                            }}
                        >
                            {item.text}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </MotionPaper>
    );
};

export default TableOfContents;
