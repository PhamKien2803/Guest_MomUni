import { useState, useEffect, useMemo } from 'react';
import ReactWebChat from 'botframework-webchat';
import {
  Box,
  IconButton,
  Typography,
  Paper,
  Slide,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { keyframes } from '@emotion/react';

const ChatWidget = () => {
  const [token, setToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const userId = useMemo(() => `guest-${Math.floor(Math.random() * 100000)}`, []);

  // Fetch token
  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer YOUR_DIRECT_LINE_SECRET',
        },
      });
      const json = await res.json();
      setToken(json.token);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const pulseEffect = keyframes`
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 143, 171, 0.4);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 8px rgba(255, 143, 171, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 143, 171, 0);
    }
  `;

  const styleOptions = {
    hideUploadButton: true,
    bubbleBackground: '#FDEFF4',
    bubbleFromUserBackground: '#E0F7FA',
    bubbleBorderRadius: 16,
    botAvatarInitials: 'MU',
    userAvatarInitials: 'Tôi',
    backgroundColor: '#fff',
    fontSizeSmall: '14px',
    botAvatarImage: '/MomUni.svg',
  };

  return (
    <>
      {!isOpen && (
        <Box
          position="fixed"
          bottom={24}
          right={24}
          zIndex={9999}
          onClick={() => setIsOpen(true)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            backgroundColor: '#ff8fab',
            padding: '10px 16px',
            borderRadius: '32px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            animation: pulse ? `${pulseEffect} 1s ease-in-out` : 'none',
            '&:hover': {
              backgroundColor: '#f06292',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Avatar
            src="/MomUni.svg"
            alt="AI"
            sx={{ width: 28, height: 28, bgcolor: '#fff' }}
          />
          <Typography fontWeight="500" fontSize="15px">
            MomUni Assistant
          </Typography>
        </Box>
      )}

      {/* Khung chat */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={10}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: 380,
            height: 540,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 4,
            overflow: 'hidden',
            zIndex: 10000,
            boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
            border: '1px solid #f8bbd0',
          }}
        >
          {/* Header */}
          <Box
            px={2}
            py={1.5}
            bgcolor="#f48fb1"
            color="#fff"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                alt="MomUni"
                src="/MomUni.svg"
                sx={{ width: 32, height: 32, bgcolor: '#fff' }}
              />
              <Typography variant="subtitle1" fontWeight="bold">
                MomUni Chat
              </Typography>
            </Box>

            <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Nội dung chat */}
          <Box flex={1} p={0}>
            {token && (
              <ReactWebChat
                directLine={window.WebChat.createDirectLine({ token })}
                styleOptions={styleOptions}
                userID={userId}
              />
            )}
          </Box>
        </Paper>
      </Slide>
    </>
  );
};

export default ChatWidget;
