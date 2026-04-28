import { Box, Typography, IconButton, Stack } from '@mui/joy';
import { Microphone, MicrophoneSlash, VideoCamera, VideoCameraSlash, PhoneDisconnect } from '@phosphor-icons/react';

export default function ButtonsOutcoming({ isMuted, toggleMute, endCall, isVideoOff, toggleVideo }) {
    return (
        <Stack direction="row" spacing={4} alignItems="center">
            {[
                {
                    icon: isMuted ? <MicrophoneSlash size={24} /> : <Microphone size={24} />,
                    onClick: toggleMute,
                    active: isMuted,
                    activeColor: '255, 80, 80',
                    inactiveColor: '255, 255, 255',
                    label: 'Микрофон',
                    iconColor: 'white'
                },
                {
                    icon: <PhoneDisconnect size={26} weight='fill' />,
                    onClick: endCall,
                    active: true,
                    activeColor: '255, 60, 60',
                    inactiveColor: '255, 60, 60',
                    size: 64,
                    label: 'Завершить',
                    iconColor: '#fff',
                    solidBg: 'linear-gradient(135deg, #ff3b3b, #c0001a)',
                    solidShadow: 'rgba(255, 40, 40, 0.5)',
                },
                {
                    icon: isVideoOff ? <VideoCameraSlash size={24} /> : <VideoCamera size={24} />,
                    onClick: toggleVideo,
                    active: isVideoOff,
                    activeColor: '255, 80, 80',
                    inactiveColor: '255, 255, 255',
                    label: 'Камера',
                    iconColor: 'white'
                },
            ].map((btn, i) => (
                <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                    <IconButton
                        onClick={btn.onClick}
                        sx={{
                            width: btn.size ?? 56, height: btn.size ?? 56,
                            borderRadius: '50%',
                            color: `rgba(${btn.active ? btn.activeColor : '255,255,255'}, 1)`,
                            transition: 'all 0.2s ease',
                            backdropFilter: 'blur(20px)',
                            background: btn.solidBg
                                ? btn.solidBg
                                : `rgba(${btn.active ? btn.activeColor : '255,255,255'}, 0.15)`,
                            boxShadow: btn.solidBg
                                ? `0 0 30px ${btn.solidShadow}, 0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)`
                                : `0 4px 20px rgba(${btn.active ? btn.activeColor : '255,255,255'}, 0.15), inset 0 1px 0 rgba(255,255,255,0.12)`,
                            '&:hover': {
                                background: btn.solidBg
                                    ? btn.solidBg.replace('135deg,', '135deg,').replace('#ff3b3b', '#ff5555')
                                    : `rgba(${btn.active ? btn.activeColor : '255,255,255'}, 0.35)`,
                                boxShadow: btn.solidBg
                                    ? `0 0 50px ${btn.solidShadow}, 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)`
                                    : `0 4px 32px rgba(${btn.active ? btn.activeColor : '255,255,255'}, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)`,
                                transform: 'scale(1.08) translateY(-2px)',
                            },
                            '&:active': { transform: 'scale(0.94)' },
                            '& svg': {
                                color: btn.iconColor
                            }
                        }}
                    >
                        {btn.icon}
                    </IconButton>
                    {btn.label && (
                        <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px', letterSpacing: '0.03em' }}>
                            {btn.label}
                        </Typography>
                    )}
                </Box>
            ))}
        </Stack>
    )
}
