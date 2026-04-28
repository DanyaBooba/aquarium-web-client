import { Box, IconButton, Stack } from '@mui/joy';
import { PhoneDisconnect, PhoneCall } from '@phosphor-icons/react';

export default function ButtonsIncoming({ endCall, acceptCall }) {
    return (
        <Stack direction="row" spacing={6} alignItems="center" sx={{ zIndex: 10 }}>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                    onClick={endCall}
                    sx={{
                        width: 72, height: 72,
                        borderRadius: '50%',
                        backdropFilter: 'blur(20px)',
                        background: 'linear-gradient(135deg, #ff3b3b, #c0001a)',
                        color: '#fff',
                        boxShadow: '0 0 30px rgba(255, 40, 40, 0.5), 0 4px 16px rgb(162 0 0 / 40%), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #ff5555, #e0001a)',
                            boxShadow: '0 0 50px rgba(255, 40, 40, 0.5), 0 4px 16px rgb(162 0 0 / 40%), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'scale(1.08)',
                        },
                        '&:active': { transform: 'scale(0.95)' },
                        '& svg': { color: '#fff' }
                    }}
                >
                    <PhoneDisconnect size={30} weight="fill" />
                </IconButton>
            </Box>

            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {[1, 2, 3].map((ring) => (
                    <Box key={ring} sx={{
                        position: 'absolute',
                        width: 72, height: 72,
                        borderRadius: '50%',
                        border: '2px solid rgba(60, 220, 120, 0.6)',
                        animation: 'ripple 2s ease-out infinite',
                        animationDelay: `${ring * 0.5}s`,
                        '@keyframes ripple': {
                            '0%': { transform: 'scale(1)', opacity: 0.7 },
                            '100%': { transform: 'scale(2.4)', opacity: 0 },
                        },
                    }} />
                ))}
                <IconButton
                    onClick={acceptCall}
                    sx={{
                        width: 72, height: 72,
                        borderRadius: '50%',
                        backdropFilter: 'blur(20px)',
                        background: 'linear-gradient(135deg, #1fcc6e, #0a8f45)',
                        color: '#fff',
                        boxShadow: '0 0 30px rgba(30, 200, 100, 0.5), 0 4px 16px rgb(0 219 153 / 40%), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                        zIndex: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #2ddd7e, #0fa050)',
                            boxShadow: '0 0 50px rgba(30, 200, 100, 0.5), 0 4px 16px rgb(0 219 153 / 40%), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            transform: 'scale(1.08)',
                        },
                        '&:active': { transform: 'scale(0.95)' },
                        '& svg': { color: '#fff' }
                    }}
                >
                    <PhoneCall size={30} weight="fill" />
                </IconButton>
            </Box>
        </Stack>
    )
}
