import { useState } from "react";

export default function ShowPersonVideo({ remoteVideoRef, remoteStream }) {
    const [remoteAspectRatio, setRemoteAspectRatio] = useState('');

    return (
        <video
            className="call-video"
            ref={remoteVideoRef}
            autoPlay
            playsInline
            controls={false}
            onLoadedMetadata={(e) => {
                const { videoWidth, videoHeight } = e.target;
                if (videoWidth && videoHeight) {
                    setRemoteAspectRatio(`${videoWidth}/${videoHeight}`);
                }
            }}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                aspectRatio: remoteAspectRatio,
                display: remoteStream ? 'block' : 'none',
                opacity: remoteStream ? 1 : 0,
                transform: 'scaleX(-1)',
                background: 'transparent',
                WebkitMediaControls: 'none',
            }}
        />
    )
}
