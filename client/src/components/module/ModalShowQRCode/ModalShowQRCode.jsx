import { useState, useEffect, useRef } from 'react'
import { Typography, Box, Button, Modal, ModalDialog } from '@mui/joy'
import { Transition } from 'react-transition-group'
import QRCodeStyling from "qr-code-styling"
import { useTheme } from '@mui/joy/styles'

const SVG_TEMPLATE = `<svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="100" height="100" rx="16" fill="ICON_BG_COLOR" />
            <path d="M63.0785 74.1126L79.2653 46H86.6023L64.4904 84.7273H58.1367L49.2617 46H56.5483L63.0785 74.1126ZM54.2791 46L47.8246 84.7273H39L45.4545 46H54.2791ZM75.1808 84.7273L81.6353 46H90.359L83.9045 84.7273H75.1808Z" fill="ICON_TEXT_COLOR" />
        </svg>`

export default function ModalShowQRCode({ shareOpen, setShareOpen, username = null, id = 0 }) {
    const theme = useTheme();
    const [copied, setCopied] = useState(false);
    const nodeRef = useRef(null);

    const qrContainerRef = useRef(null);
    const qrCodeInstanceRef = useRef(null);

    const domain = window.location.origin;
    const qrCodeUrl = username ? `${domain}/show/${username}` : `${domain}/show/id/${id}`;

    const logoBgColor = theme.colors?.logo || '#0b6bcb';
    const logoTextColor = theme.colors?.logoText || '#ffffff';

    useEffect(() => {
        if (!shareOpen || !qrContainerRef.current) return;

        const coloredSvgString = SVG_TEMPLATE
            .replace(/ICON_BG_COLOR/g, logoBgColor)
            .replace(/ICON_TEXT_COLOR/g, logoTextColor);

        const base64Svg = window.btoa(unescape(encodeURIComponent(coloredSvgString)));
        const svgDataUri = `data:image/svg+xml;base64,${base64Svg}`;

        const options = {
            width: 300,
            height: 300,
            type: "svg",
            data: qrCodeUrl,
            image: svgDataUri,
            dotsOptions: {
                color: logoBgColor,
                type: "rounded",
            },
            qrOptions: {
                errorCorrectionLevel: 'M'
            },
            cornersSquareOptions: {
                type: "extra-rounded",
                color: logoBgColor,
            },
            backgroundOptions: {
                color: "transparent",
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 4,
            },
        };

        qrContainerRef.current.innerHTML = '';
        const qrCode = new QRCodeStyling(options);

        setTimeout(() => {
            if (qrContainerRef.current) {
                qrCode.append(qrContainerRef.current);
            }
        }, 0);

        qrCodeInstanceRef.current = qrCode;

    }, [shareOpen, qrCodeUrl, logoBgColor, logoTextColor]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(qrCodeUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Ошибка при копировании:', err);
        }
    };

    return (
        <Transition nodeRef={nodeRef} in={shareOpen} timeout={400}>
            {state => (
                <Modal
                    ref={nodeRef}
                    keepMounted
                    disableScrollLock
                    open={!['exited', 'exiting'].includes(state)}
                    onClose={() => setShareOpen(false)}
                    slotProps={{
                        backdrop: {
                            sx: {
                                opacity: 0,
                                backdropFilter: 'none',
                                transition: 'opacity 400ms, backdrop-filter 400ms',
                                ...{
                                    entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                }[state],
                            },
                        },
                    }}
                    sx={[
                        state === 'exited'
                            ? { visibility: 'hidden' }
                            : { visibility: 'visible' },
                    ]}
                >
                    <ModalDialog
                        sx={{
                            border: 'none',
                            borderRadius: '32px',
                            p: 3,
                            opacity: 0,
                            maxWidth: '348px',
                            position: 'fixed',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%) scale(0.95)',
                            transformOrigin: 'center center',
                            transition: 'opacity 300ms ease, transform 300ms ease',
                            ...{
                                entering: {
                                    opacity: 1,
                                    transform: 'translate(-50%, -50%) scale(1)'
                                },
                                entered: {
                                    opacity: 1,
                                    transform: 'translate(-50%, -50%) scale(1)'
                                },
                            }[state],
                        }}
                    >
                        <Typography level="title-lg" textAlign="center" sx={{
                            mb: 2,
                            wordBreak: 'break-all',
                            wordWrap: 'break-word'
                        }}>
                            {!!username && `@${username}`}
                            {!username && 'Поделиться профилем'}
                        </Typography>

                        <Box
                            ref={qrContainerRef}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '300px',
                                '& svg': {
                                    maxWidth: '100%',
                                    shapeRendering: 'geometricPrecision',
                                },
                            }}
                        />

                        <Button
                            onClick={handleCopy}
                            sx={{ mt: 2, borderRadius: '50px', px: 2, py: 1 }}
                        >
                            {copied ? 'Скопировано!' : 'Скопировать'}
                        </Button>
                    </ModalDialog>
                </Modal>
            )}
        </Transition>
    )
}
