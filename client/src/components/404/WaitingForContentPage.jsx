import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const WaitingForContentPage = () => {
    const canvasRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let frameId;

        const baseWidth = 300;
        const baseHeight = 250;
        const scale = window.devicePixelRatio || 1;
        canvas.width = baseWidth * scale;
        canvas.height = baseHeight * scale;
        ctx.scale(scale, scale);

        let angle = 0;
        let heartBeat = 0;
        const cradleColor = theme.palette.primary.dark;
        const heartColor = theme.palette.primary.main;
        const accentColor = theme.palette.secondary.light;

        let particlesArray = [];
        const numberOfParticles = 30;

        class Particle {
            constructor() {
                this.x = Math.random() * baseWidth;
                this.y = Math.random() * baseHeight + baseHeight;
                this.size = Math.random() * 5 + 2;
                this.speedY = Math.random() * 1 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = Math.random() > 0.5 ? accentColor : theme.palette.primary.light;
            }
            update() {
                this.y -= this.speedY;
                if (this.y < -this.size) {
                    this.y = baseHeight + this.size;
                    this.x = Math.random() * baseWidth;
                    this.size = Math.random() * 5 + 2;
                    this.speedY = Math.random() * 1 + 0.5;
                    this.opacity = Math.random() * 0.5 + 0.2;
                }
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        initParticles();


        const drawCradle = () => {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }

            ctx.save();
            const cradleCenterX = baseWidth / 2;
            const cradleBaseY = baseHeight * 0.65;
            const cradleWidth = baseWidth * 0.6;
            const cradleHeight = baseHeight * 0.5;


            ctx.translate(cradleCenterX, cradleBaseY);
            ctx.rotate(Math.sin(angle) * 0.15);
            ctx.translate(-cradleCenterX, -cradleBaseY);

            ctx.beginPath();
            ctx.lineWidth = 8;
            ctx.strokeStyle = cradleColor;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const legOffsetX = cradleWidth * 0.35;
            const legTopY = cradleBaseY + cradleHeight * 0.3;
            const legBottomY = cradleBaseY + cradleHeight * 0.5;
            const legCurveAmount = cradleHeight * 0.15;

            ctx.moveTo(cradleCenterX - legOffsetX, legTopY);
            ctx.quadraticCurveTo(cradleCenterX - legOffsetX, legBottomY + legCurveAmount, cradleCenterX - legOffsetX + cradleWidth * 0.15, legBottomY);
            ctx.moveTo(cradleCenterX + legOffsetX, legTopY);
            ctx.quadraticCurveTo(cradleCenterX + legOffsetX, legBottomY + legCurveAmount, cradleCenterX + legOffsetX - cradleWidth * 0.15, legBottomY);

            const bodyTopY = cradleBaseY - cradleHeight * 0.6;
            const bodySideX = cradleWidth / 2;
            const bodyBottomY = cradleBaseY + cradleHeight * 0.2;
            const bodyCurveY = cradleBaseY - cradleHeight * 1.1;

            ctx.moveTo(cradleCenterX - bodySideX, cradleBaseY);
            ctx.quadraticCurveTo(cradleCenterX, bodyCurveY, cradleCenterX + bodySideX, cradleBaseY);
            ctx.lineTo(cradleCenterX + bodySideX * 0.9, bodyBottomY);
            ctx.quadraticCurveTo(cradleCenterX, cradleBaseY - cradleHeight * 0.3, cradleCenterX - bodySideX * 0.9, bodyBottomY);
            ctx.closePath();

            const canopyTopY = bodyTopY + cradleHeight * 0.1;
            const canopyControlX = cradleWidth * 0.1;
            const canopyControlY = cradleHeight * 0.4;

            ctx.moveTo(cradleCenterX - bodySideX, cradleBaseY);
            ctx.quadraticCurveTo(cradleCenterX - canopyControlX, canopyTopY - canopyControlY, cradleCenterX, canopyTopY);

            ctx.stroke();

            const heartSize = 12 + Math.sin(heartBeat) * 2;
            const heartX = cradleCenterX;
            const heartY = cradleBaseY - cradleHeight * 0.15;

            ctx.fillStyle = heartColor;
            ctx.beginPath();
            ctx.moveTo(heartX, heartY - heartSize / 2);
            ctx.bezierCurveTo(heartX + heartSize / 1.5, heartY - heartSize * 1.2, heartX + heartSize * 1.3, heartY - heartSize / 3, heartX, heartY + heartSize / 1.5);
            ctx.bezierCurveTo(heartX - heartSize * 1.3, heartY - heartSize / 3, heartX - heartSize / 1.5, heartY - heartSize * 1.2, heartX, heartY - heartSize / 2);
            ctx.fill();

            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            angle += 0.025;
            heartBeat += 0.08;
            drawCradle();
            frameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            initParticles();
        }
        window.addEventListener('resize', handleResize);


        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [theme]);

    const textContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    };

    const textItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '90vh',
                textAlign: 'center',
                backgroundColor: 'background.default',
                p: { xs: 2, sm: 3 },
                overflow: 'hidden'
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 120 }}
            >
                <canvas ref={canvasRef} style={{ width: 300, height: 250 }} />
            </motion.div>

            <motion.div
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={textItemVariants}>
                    <Typography variant="h4" sx={{ mt: { xs: 1, sm: 2 }, mb: 1.5, color: 'text.primary', fontWeight: 'bold', fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>
                        MomUni đang chuẩn bị nội dung...
                    </Typography>
                </motion.div>
                <motion.div variants={textItemVariants}>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: '500px', px: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        Những điều tuyệt vời cần có thời gian để trở nên hoàn hảo.
                        Bài viết bạn tìm kiếm đang được MomUni Team chăm chút từng chút một và sẽ sớm ra mắt.
                        Mong bạn quay lại sau nhé!
                    </Typography>
                </motion.div>
                <motion.div variants={textItemVariants}>
                    <Button
                        component={RouterLink}
                        to="/"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            fontWeight: 'bold',
                            py: 1.5,
                            px: 4,
                            boxShadow: (theme) => `0 4px 15px 0 ${theme.palette.primary.light}`
                        }}
                    >
                        Về Trang Chủ
                    </Button>
                </motion.div>
            </motion.div>
        </Box>
    );
};

export default WaitingForContentPage;
