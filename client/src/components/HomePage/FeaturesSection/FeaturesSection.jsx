import React, { useRef } from 'react';
import {
    Typography,
    Container, Box, Grid,
    Paper, useTheme, alpha
} from '@mui/material';
import {
    FavoriteBorder,
    Restaurant,
    ChildCare,
    LocalHospital,
    Spa,
    School,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const MotionBox = motion(Box);

export const FeaturesSection = () => {
    const theme = useTheme();
    const featuresData = [
        { icon: <Restaurant />, title: "Dinh dưỡng", description: "Công thức cho mẹ và bé." },
        { icon: <ChildCare />, title: "Phát triển", description: "Cột mốc quan trọng." },
        { icon: <LocalHospital />, title: "Sức khỏe", description: "Phòng và trị bệnh." },
        { icon: <Spa />, title: "Làm đẹp", description: "Rạng rỡ mỗi ngày." },
        { icon: <School />, title: "Giáo dục sớm", description: "Nền tảng tương lai." },
        { icon: <FavoriteBorder />, title: "Tâm lý", description: "Thấu hiểu & sẻ chia." },
    ];

    const FeatureCard = ({ icon, title, description }) => {
        const cardRef = useRef(null);

        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            const { left, top, width, height } = cardRef.current.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            const rotateX = (y - height / 2) / (height / 2) * -7;
            const rotateY = (x - width / 2) / (width / 2) * 7;

            cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            cardRef.current.style.transition = 'transform 0.05s linear';
        };

        const handleMouseLeave = () => {
            if (!cardRef.current) return;
            cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            cardRef.current.style.transition = 'transform 0.3s ease';
        };

        return (
            <MotionBox
                ref={cardRef}
                component={Paper}
                elevation={3}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                sx={{
                    p: { xs: 1.5, md: 2 },
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.15),
                    backgroundColor: alpha('#ffffff', 0.8),
                    backdropFilter: 'blur(4px)',
                    cursor: 'pointer',
                    willChange: 'transform',
                    transition: 'all 0.3s ease',
                    minHeight: { xs: 180, sm: 200 },
                    '&:hover .feature-icon-wrapper': {
                        transform: 'scale(1.1)',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }
                }}
            >
                <Box
                    className="feature-icon-wrapper"
                    sx={{
                        width: { xs: 48, md: 56 },
                        height: { xs: 48, md: 56 },
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mb: 1.5,
                        transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                    }}
                >
                    {React.cloneElement(icon, { sx: { fontSize: { xs: 24, md: 28 }, color: 'primary.main' } })}
                </Box>
                <Typography variant="h6" sx={{
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 0.5
                }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    fontSize: { xs: '0.75rem', md: '0.8rem' },
                    minHeight: '2.5em',
                    lineHeight: 1.4
                }}>
                    {description}
                </Typography>
            </MotionBox>
        );
    };

    return (
        <MotionBox
            sx={{ py: { xs: 6, md: 8 } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
        >
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" color="text.primary" sx={{
                    mb: { xs: 1, md: 2 },
                    fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' }
                }}>
                    Khám phá mọi khía cạnh
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" sx={{
                    mb: { xs: 4, md: 6 },
                    fontWeight: 400,
                    maxWidth: '600px',
                    margin: 'auto',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                }}>
                    Những chủ đề được quan tâm nhất, giúp mẹ tự tin và vững vàng trên mọi chặng đường.
                </Typography>
                <Grid container spacing={{ xs: 1.5, md: 2 }} justifyContent="center">
                    {featuresData.map((feature, index) => (

                        <Grid item xs={4} sm={3} md={2} key={index}>
                            <FeatureCard {...feature} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MotionBox>
    );
};





// import React, { useEffect, useRef, useState } from 'react';
// import {
//     Typography,
//     Container, Box, Grid,
//     Paper, useTheme, alpha
// } from '@mui/material';
// import {
//     FavoriteBorder,
//     Restaurant,
//     ChildCare,
//     LocalHospital,
//     Spa,
//     School,
// } from '@mui/icons-material';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// const sectionVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };
// const MotionBox = motion(Box);

// // Danh sách icon để lặp tuần hoàn
// const iconList = [
//     <Restaurant />, <ChildCare />, <LocalHospital />,
//     <Spa />, <School />, <FavoriteBorder />
// ];

// export const FeaturesSection = ({ onSelectTag }) => {
//     const theme = useTheme();
//     const [featureTags, setFeatureTags] = useState([]);

//     // Scroll lên trên
//     const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

//     useEffect(() => {
//         const fetchTagsFromBlog = async () => {
//             try {
//                 const res = await axios.get("/blog");
//                 const blogs = Array.isArray(res.data.blogs) ? res.data.blogs : [];
//                 const tagSet = new Set();

//                 blogs.forEach(blog => {
//                     if (Array.isArray(blog.tags)) {
//                         blog.tags.forEach(tag => {
//                             if (typeof tag === "string") tagSet.add(tag.trim());
//                             else if (typeof tag === "object" && tag?.name) tagSet.add(tag.name.trim());
//                         });
//                     }
//                 });

//                 const tags = Array.from(tagSet).sort();

//                 // Gắn icon cho mỗi tag
//                 const mappedTags = tags.map((tagName, idx) => ({
//                     icon: iconList[idx % iconList.length],
//                     title: tagName,
//                     description: "Click để xem bài viết có liên quan"
//                 }));
//                 setFeatureTags(mappedTags);
//             } catch (err) {
//                 console.error("Lỗi khi tải tags từ /blog:", err);
//             }
//         };

//         fetchTagsFromBlog();
//     }, []);

//     const FeatureCard = ({ icon, title, description }) => {
//         const cardRef = useRef(null);

//         const handleMouseMove = (e) => {
//             if (!cardRef.current) return;
//             const { left, top, width, height } = cardRef.current.getBoundingClientRect();
//             const x = e.clientX - left;
//             const y = e.clientY - top;
//             const rotateX = (y - height / 2) / (height / 2) * -7;
//             const rotateY = (x - width / 2) / (width / 2) * 7;

//             cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
//             cardRef.current.style.transition = 'transform 0.05s linear';
//         };

//         const handleMouseLeave = () => {
//             if (!cardRef.current) return;
//             cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
//             cardRef.current.style.transition = 'transform 0.3s ease';
//         };

//         return (
//             <MotionBox
//                 ref={cardRef}
//                 component={Paper}
//                 elevation={3}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={handleMouseLeave}
//                 onClick={() => {
//                     onSelectTag?.(title);
//                     scrollToTop();
//                 }}
//                 sx={{
//                     p: { xs: 1.5, md: 2 },
//                     textAlign: 'center',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: '12px',
//                     border: '1px solid',
//                     borderColor: alpha(theme.palette.primary.main, 0.15),
//                     backgroundColor: alpha('#ffffff', 0.85),
//                     backdropFilter: 'blur(4px)',
//                     cursor: 'pointer',
//                     willChange: 'transform',
//                     transition: 'all 0.3s ease',
//                     minHeight: { xs: 180, sm: 200 },
//                     '&:hover .feature-icon-wrapper': {
//                         transform: 'scale(1.1)',
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     }
//                 }}
//             >
//                 <Box
//                     className="feature-icon-wrapper"
//                     sx={{
//                         width: { xs: 48, md: 56 },
//                         height: { xs: 48, md: 56 },
//                         borderRadius: '50%',
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         mb: 1.5,
//                         transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
//                     }}
//                 >
//                     {React.cloneElement(icon, {
//                         sx: { fontSize: { xs: 24, md: 28 }, color: 'primary.main' }
//                     })}
//                 </Box>
//                 <Typography variant="h6" sx={{
//                     fontSize: { xs: '0.875rem', md: '1rem' },
//                     fontWeight: 600,
//                     color: 'text.primary',
//                     mb: 0.5
//                 }}>
//                     {title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{
//                     fontSize: { xs: '0.75rem', md: '0.8rem' },
//                     minHeight: '2.5em',
//                     lineHeight: 1.4
//                 }}>
//                     {description}
//                 </Typography>
//             </MotionBox>
//         );
//     };

//     return (
//         <MotionBox
//             sx={{ py: { xs: 6, md: 8 } }}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={sectionVariants}
//         >
//             <Container maxWidth="lg">
//                 <Typography variant="h3" align="center" color="text.primary" sx={{
//                     mb: { xs: 1, md: 2 },
//                     fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' }
//                 }}>
//                     Khám phá mọi khía cạnh
//                 </Typography>
//                 <Typography variant="h6" align="center" color="text.secondary" sx={{
//                     mb: { xs: 4, md: 6 },
//                     fontWeight: 400,
//                     maxWidth: '600px',
//                     margin: 'auto',
//                     fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
//                 }}>
//                     Những chủ đề được quan tâm nhất, giúp mẹ tự tin và vững vàng trên mọi chặng đường.
//                 </Typography>

//                 <Grid container spacing={{ xs: 1.5, md: 2 }} justifyContent="center">
//                     {featureTags.map((feature, index) => (
//                         <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
//                             <FeatureCard {...feature} />
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Container>
//         </MotionBox>
//     );
// };
