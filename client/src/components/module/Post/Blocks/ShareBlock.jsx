import { useState } from 'react';
import { Box, Modal, ModalDialog, Typography, Button, Textarea } from '@mui/joy';
import { Share, Link } from '@phosphor-icons/react';

function TelegramIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 543 450" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.3284 193.722C183.089 130.217 280.285 88.35 328.917 68.1222C467.773 10.3674 496.625 0.334815 515.431 0.00353222C519.568 -0.0693298 528.816 0.95574 534.806 5.8167C539.865 9.92121 541.257 15.4658 541.923 19.3573C542.589 23.2488 543.418 32.1138 542.759 39.0407C535.234 118.102 502.675 309.965 486.111 398.515C479.102 435.984 465.301 448.548 451.941 449.777C422.905 452.449 400.856 430.588 372.733 412.153C328.727 383.306 303.866 365.349 261.15 337.2C211.784 304.669 243.786 286.789 271.919 257.569C279.282 249.921 407.215 133.556 409.691 123C410.001 121.68 410.288 116.759 407.365 114.16C404.441 111.562 400.126 112.45 397.012 113.157C392.599 114.159 322.298 160.625 186.11 252.556C166.155 266.259 148.081 272.935 131.887 272.585C114.034 272.199 79.6928 262.491 54.1636 254.192C22.8511 244.014 -2.03552 238.632 0.131547 221.346C1.26029 212.343 13.6592 203.135 37.3284 193.722Z"
                fill="currentColor"
            />
        </svg>
    );
}

function ShareBlock({ idUser = 0, idPost = 0, shareTitle = 'Посмотрите эту запись!' }) {
    const [open, setOpen] = useState(false);
    const [showEmbed, setShowEmbed] = useState(false);
    const [embedCode, setEmbedCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);

    const url = `${window.location.origin}/post/${idUser}/${idPost}`;

    const handleShareClick = (e) => {
        e.stopPropagation();
        setOpen(true);
        generateEmbedCode(e);
    };

    const generateEmbedCode = (e) => {
        e.stopPropagation();

        const code = `<iframe src="${url}/embed" width="600" height="400" frameborder="0"></iframe>`;
        setEmbedCode(code);
    };

    const handleClose = (e) => {
        e.stopPropagation();

        setOpen(false);
        setShowEmbed(false);
        setCopied(false);
    };

    const shareToSocial = (e, platform) => {
        e.stopPropagation();
        const title = shareTitle;

        switch (platform) {
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
                break;
            default:
                break;
        }
    };

    const copyEmbedCode = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(embedCode);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 3000);
    };

    const showCode = (e) => {
        e.stopPropagation();
        setShowEmbed(true);
    }

    return (
        <>
            <Box
                role="button"
                tabIndex={0}
                onClick={handleShareClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1,
                    py: 0.5,
                    borderRadius: '100px',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'neutral.softHoverBg',
                    },
                    '&:focus-visible': {
                        outline: '2px solid #8884ff',
                        outlineOffset: '2px',
                    },
                }}
            >
                <Share size={20} />
            </Box>

            <Modal open={open} onClose={handleClose}>
                <ModalDialog
                    sx={{
                        minWidth: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: '32px',
                        p: 3,
                    }}
                >
                    <Typography level="title-lg">Поделиться записью</Typography>

                    <Button
                        variant="outlined"
                        color="neutral"
                        onClick={(e) => shareToSocial(e, 'telegram')}
                        startDecorator={<TelegramIcon size={16} />}
                        sx={{ flex: 1, borderRadius: '50px' }}
                    >
                        Telegram
                    </Button>

                    <Button
                        variant="outlined"
                        color="neutral"
                        startDecorator={<Link size={16} />}
                        onClick={(e) => shareToSocial(e, 'copy')}
                        sx={{ flex: 1, borderRadius: '50px' }}
                    >
                        {copied ? 'Скопировано!' : 'Скопировать ссылку'}
                    </Button>

                    {!showEmbed && (
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={showCode}
                            sx={{ flex: 1, borderRadius: '50px' }}
                        >
                            Код для вставки
                        </Button>
                    )}

                    {showEmbed && (
                        <Box>
                            <Textarea
                                value={embedCode}
                                readOnly
                                minRows={3}
                                sx={{ borderRadius: '18px' }}
                                endDecorator={
                                    <Button
                                        variant="solid"
                                        onClick={copyEmbedCode}
                                        sx={{ mt: 1, borderRadius: '50px', flex: 1 }}
                                    >
                                        {copiedCode ? 'Скопировано!' : 'Скопировать код'}
                                    </Button>
                                }
                            />
                        </Box>
                    )}
                </ModalDialog>
            </Modal>
        </>
    );
}

export default ShareBlock;
