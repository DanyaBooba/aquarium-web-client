import { Box, Button, IconButton, Typography } from "@mui/joy";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const checkScrollPosition = (scrollRef, setCanScrollLeft, setCanScrollRight) => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const threshold = 2;

    setCanScrollLeft(scrollLeft > threshold);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - threshold);
};

function ShowButtons({
    canScrollLeft = true,
    canScrollRight = true,
    onClickImage = () => { },
    scrollByAmount = () => { }
}) {
    return (
        <Box sx={{ display: 'flex', px: '17.2px', mt: '.25rem' }}>
            <Box sx={{ display: 'flex', gap: '.25rem' }}>
                <IconButton
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    disabled={!canScrollLeft}
                    sx={{ borderRadius: '50px' }}
                    onClick={() => scrollByAmount('left')}
                >
                    <CaretLeft size={20} />
                </IconButton>

                <IconButton
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    disabled={!canScrollRight}
                    sx={{ borderRadius: '50px' }}
                    onClick={() => scrollByAmount('right')}
                >
                    <CaretRight size={20} />
                </IconButton>
            </Box>

            <Box sx={{ ml: 'auto' }}>
                <Button
                    color="danger"
                    onClick={() => onClickImage('')}
                    size="sm"
                    sx={{ borderRadius: '50px' }}
                    variant="outlined"
                >
                    Убрать
                </Button>
            </Box>
        </Box>
    );
}

function ShowListImages({
    scrollRef,
    ViewImage,
    ViewImageLoad,
    images = [],
    defaultImage = '',
    onClickImage,
    onClickImageLoad,
    setCanScrollLeft,
    setCanScrollRight,
}) {
    const [componentImages, setComponentImages] = useState([]);

    useEffect(() => {
        setComponentImages(['@load', ...images]);
    }, [images]);

    useLayoutEffect(() => {
        checkScrollPosition(scrollRef, setCanScrollLeft, setCanScrollRight);
    }, [componentImages]);

    useLayoutEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const index = images.indexOf(defaultImage);
        if (index === -1) return;

        const activeEl = container.children[index + 1];
        if (!activeEl) return;

        const containerRect = container.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        const offset =
            itemRect.left -
            containerRect.left -
            container.clientWidth / 2 +
            itemRect.width / 2;

        container.scrollBy({ left: offset, behavior: 'smooth' });
    }, [componentImages, defaultImage]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handler = () =>
            checkScrollPosition(scrollRef, setCanScrollLeft, setCanScrollRight);

        el.addEventListener('scroll', handler);
        window.addEventListener('resize', handler);

        return () => {
            el.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        };
    }, []);

    return (
        <Box
            ref={scrollRef}
            sx={{
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
                py: 1,
                px: 0.5,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollSnapType: 'x mandatory',
                scrollPaddingLeft: '4px',
                WebkitOverflowScrolling: 'touch',
            }}
        >
            {componentImages.map((image, index) => (
                <Box
                    key={`${image}-${index}`}
                    sx={{ scrollSnapAlign: 'start', flexShrink: 0 }}
                >
                    {image === '@load' ? (
                        <ViewImageLoad onClick={onClickImageLoad} />
                    ) : (
                        <ViewImage
                            src={image}
                            active={defaultImage === image}
                            onClick={onClickImage}
                        />
                    )}
                </Box>
            ))}
        </Box>
    );
}

export default function HorizontalScrollAppearanceList({
    title,
    size,
    error,
    ViewImage,
    ViewImageLoad,
    images = [],
    defaultImage = '',
    onClickImage,
    onClickImageLoad,
}) {
    const scrollRef = useRef(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const scrollByAmount = (direction) => {
        const el = scrollRef.current;
        if (!el) return;

        const scrollAmount = el.clientWidth * 0.8;
        el.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    px: '17.2px',
                    justifyContent: 'space-between',
                }}
            >
                <Typography level="body-xs" sx={{ textTransform: 'uppercase' }}>
                    {title}
                </Typography>
                <Typography level="body-xs">{size}</Typography>
            </Box>

            {error && (
                <Typography color="danger" sx={{ pl: '17.2px' }}>
                    {error}
                </Typography>
            )}

            <ShowListImages
                scrollRef={scrollRef}
                ViewImage={ViewImage}
                ViewImageLoad={ViewImageLoad}
                images={images}
                defaultImage={defaultImage}
                onClickImage={onClickImage}
                onClickImageLoad={onClickImageLoad}
                setCanScrollLeft={setCanScrollLeft}
                setCanScrollRight={setCanScrollRight}
            />

            <ShowButtons
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
                onClickImage={onClickImage}
                scrollByAmount={scrollByAmount}
            />
        </Box>
    );
}
