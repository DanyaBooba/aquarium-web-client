import { useState } from 'react';
import { Box } from '@mui/joy';

export default function ShowMyVideo({ localVideoRef, showVideo }) {
    const [localAspectRatio, setLocalAspectRatio] = useState('3/4');
    const [localVideoWidth, setLocalVideoWidth] = useState(120);

    return (
        <Box sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: '100%',
            maxWidth: localVideoWidth,
            aspectRatio: localAspectRatio,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'lg',
            zIndex: 2,
            bgcolor: 'transparent',
            opacity: showVideo ? 1 : 0,
        }}>
            <video
                className="call-video"
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                controls={false}
                onLoadedMetadata={(e) => {
                    const { videoWidth, videoHeight } = e.target;
                    if (videoWidth && videoHeight) {
                        setLocalAspectRatio(`${videoWidth}/${videoHeight}`);
                    }
                }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transform: 'scaleX(-1)',
                    WebkitMediaControls: 'none',
                }}
            />

            <Box
                onPointerDown={(e) => {
                    e.preventDefault();
                    const startX = e.clientX;
                    const startWidth = localVideoWidth;

                    const onMove = (moveEvent) => {
                        const delta = startX - moveEvent.clientX;
                        const newWidth = Math.min(350, Math.max(80, startWidth + delta));
                        setLocalVideoWidth(newWidth);
                    };

                    const onUp = () => {
                        window.removeEventListener('pointermove', onMove);
                        window.removeEventListener('pointerup', onUp);
                    };

                    window.addEventListener('pointermove', onMove);
                    window.addEventListener('pointerup', onUp);
                }}
                sx={{
                    position: 'absolute',
                    bottom: 4,
                    left: 4,
                    width: 18,
                    height: 18,
                    cursor: 'nesw-resize',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.6,
                    '&:hover': { opacity: 1 },
                }}
            >
            </Box>

            <Box sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                WebkitUserSelect: 'none',
            }} />
        </Box>
    )
}
