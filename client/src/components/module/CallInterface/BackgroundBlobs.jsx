import { Box } from "@mui/joy";

export default function BackgroundBlobs() {
    return (
        <>
            {[
                { color: 'rgba(255, 220, 0, 0.95)', size: '100%', x: '-20%', y: '40%', dur: '9s', delay: '0s' },
                { color: 'rgba(0, 180, 255, 0.95)', size: '90%', x: '50%', y: '-20%', dur: '11s', delay: '-3s' },
                { color: 'rgba(50, 220, 100, 0.85)', size: '85%', x: '10%', y: '20%', dur: '13s', delay: '-6s' },
                { color: 'rgba(255, 60, 180, 0.9)', size: '90%', x: '60%', y: '55%', dur: '10s', delay: '-2s' },
                { color: 'rgba(130, 0, 255, 0.9)', size: '80%', x: '-15%', y: '-15%', dur: '14s', delay: '-7s' },
                { color: 'rgba(255, 100, 0, 0.85)', size: '75%', x: '35%', y: '70%', dur: '8s', delay: '-4s' },
                { color: 'rgba(0, 255, 200, 0.8)', size: '80%', x: '70%', y: '20%', dur: '12s', delay: '-5s' },
                { color: 'rgba(255, 30, 60, 0.8)', size: '70%', x: '20%', y: '-15%', dur: '15s', delay: '-9s' },
            ].map((blob, i) => (
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        width: blob.size,
                        aspectRatio: '1',
                        left: blob.x,
                        top: blob.y,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
                        filter: 'blur(40px)',
                        animation: `blob${i} ${blob.dur} ease-in-out infinite alternate`,
                        animationDelay: blob.delay,
                        willChange: 'transform',
                        [`@keyframes blob${i}`]: {
                            '0%': { transform: 'translate(0px, 0px)    scale(1)' },
                            '25%': { transform: `translate(${i % 2 === 0 ? '+' : '-'}${30 + i * 8}px, ${i % 3 === 0 ? '+' : '-'}${20 + i * 6}px) scale(${1.1 + i * 0.03})` },
                            '50%': { transform: `translate(${i % 2 === 0 ? '-' : '+'}${20 + i * 10}px, ${i % 3 === 0 ? '-' : '+'}${35 + i * 5}px) scale(${0.9 - i * 0.02})` },
                            '75%': { transform: `translate(${i % 2 === 0 ? '+' : '-'}${15 + i * 7}px, ${i % 3 === 0 ? '+' : '-'}${25 + i * 8}px) scale(${1.05 + i * 0.02})` },
                            '100%': { transform: `translate(${i % 2 === 0 ? '-' : '+'}${40 + i * 5}px, ${i % 3 === 0 ? '-' : '+'}${15 + i * 7}px) scale(1)` },
                        },
                    }}
                />
            ))}

            <Box sx={{
                position: 'absolute',
                inset: 0,
                backdropFilter: 'blur(0px)',
                background: 'rgba(10, 8, 20, 0.15)',
                zIndex: 0,
            }} />
        </>
    )
}
