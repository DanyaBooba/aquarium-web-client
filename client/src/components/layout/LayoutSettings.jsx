import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IconButton, Stack, Typography, Box } from '@mui/joy'
import { CaretLeft } from '@phosphor-icons/react'
import { useTheme } from '@mui/joy/styles';
import { useMediaQuery } from '@mui/material';

const MotionDiv = motion.div

function LayoutSettings({ header = "Настройки", backUrl = "/settings", children }) {
    const isMobile = useMediaQuery('(max-width:1100px)');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (isMobile) {
                setScrolled(mobileScrollElement?.scrollTop > 30);
            }
            else {
                setScrolled(desktopScrollElement?.scrollTop > 30);
            }
        };

        const desktopScrollElement = document.querySelector('.profile .app .profile');
        const mobileScrollElement = document.querySelector('html');

        onScroll();

        desktopScrollElement?.addEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll);
    }, []);

    const navigate = useNavigate();
    const theme = useTheme();

    const sxHeader = {
        ml: -3,
        mr: -2,
        position: 'sticky',
        zIndex: 500,
        py: 2,
        top: isMobile ? '0' : '-16px',
        backgroundColor: `${theme.palette.background.body}de`,
        backdropFilter: 'blur(12px)',
        borderBottomStyle: 'solid',
        borderBottomWidth: scrolled ? 1 : 0,
        borderBottomColor: 'divider',
        transition: '.15s'
    }

    return (
        <MotionDiv>
            <Box sx={sxHeader}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 3 }}>
                    <IconButton
                        onClick={() =>
                            navigate(backUrl, {
                                state: { direction: -1 }
                            })}
                        sx={{
                            gap: .5,
                            // pr: 1.5,
                            pl: 1,
                            pr: 2,
                            borderRadius: '50px',
                        }}
                    >
                        <CaretLeft size={18} />
                        <Typography level="body-md">Назад</Typography>
                    </IconButton>
                    <Typography level="h4" sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        m: 0,
                    }}>{header}</Typography>
                </Stack>
            </Box>
            <Box mt={2}>
                {children}
            </Box>
        </MotionDiv>
    )
}

export default LayoutSettings
