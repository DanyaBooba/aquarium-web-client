import { Box } from '@mui/joy'
import { useCallback } from 'react'
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"

function Attachments({ attachments, removeLink = false }) {
    const containerStyle = {
        display: 'block',
        width: '120px',
        height: '120px',
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
        flexShrink: 0
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
    };

    const openGallery = useCallback((clickedIndex) => {
        const items = attachments.map(src => ({ src: `https://mini.aquarium.org.ru/${src}`, type: "image" }));

        Fancybox.show(items, {
            startIndex: clickedIndex,
            Toolbar: {
                display: ["close", "counter", "zoom"]
            },
            showSlideshow: false
        });
    }, [attachments]);

    if (!attachments?.length) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'flex-start',
                mb: 2
            }}
        >
            {attachments.map((src, idx) =>
                removeLink ? (
                    <div key={idx} style={containerStyle}>
                        <img src={`https://mini.aquarium.org.ru${src}`} alt={`attachment-${idx}`} style={imageStyle} />
                    </div>
                ) : (
                    <a
                        key={idx}
                        href={`https://mini.aquarium.org.ru${src}`}
                        style={containerStyle}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openGallery(idx);
                        }}
                    >
                        <img src={`https://mini.aquarium.org.ru${src}`} alt={`attachment-${idx}`} style={imageStyle} />
                    </a>
                )
            )}
        </Box>
    );
}

export default Attachments;
