import { useState } from 'react';
import Modal from '@mui/joy/Modal';
import Box from '@mui/joy/Box';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

const LINK_CLASSES = 'MuiLink-root MuiLink-colorPrimary MuiLink-body-md MuiLink-underlineHover css-6rd2co-JoyLink-root';

export function Content({ content, style, removeLinks = false }) {
    const [open, setOpen] = useState(false);
    const [currentLink, setCurrentLink] = useState('');

    const handleLinkClick = (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            setCurrentLink(e.target.href);
            setOpen(true);
        }
    };

    const handleConfirm = () => {
        window.open(currentLink, '_blank', 'noopener,noreferrer');
        setOpen(false);
    };

    const normalizeLinks = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const requiredClasses = LINK_CLASSES.split(' ');

        doc.querySelectorAll('a').forEach(a => {
            requiredClasses.forEach(cls => {
                if (!a.classList.contains(cls)) {
                    a.classList.add(cls);
                }
            });

            // на всякий случай
            a.setAttribute('rel', 'noopener noreferrer');
            a.setAttribute('target', '_blank');
        });

        return doc.body.innerHTML;
    };

    let processedContent = content;

    if (removeLinks) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        doc.querySelectorAll('a').forEach(a => {
            a.replaceWith(a.textContent || '');
        });

        processedContent = doc.body.innerHTML;
    } else {
        processedContent = normalizeLinks(content);
    }

    const modifiedContent = { __html: processedContent };

    return (
        <>
            <Typography
                component="div"
                level="body-md"
                sx={{
                    color: 'text.primary',
                    mt: 1.5,
                    mb: 2,
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word',
                    '& p': {
                        my: 0,
                        minHeight: '1em',
                        '&:empty::before': {
                            content: '"\\00A0"',
                            visibility: 'hidden'
                        }
                    },
                    '& h3': { my: 0 },
                    '& ul': { pl: 2, my: 0 },
                    ...style
                }}
                onClick={handleLinkClick}
            >
                <div dangerouslySetInnerHTML={modifiedContent} />
            </Typography>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ border: 'none', borderRadius: '32px', p: 3 }}>
                    <Typography level="title-lg" mb={1} textAlign="center">
                        Подтверждение перехода
                    </Typography>
                    <Typography mb={2}>
                        Вы действительно хотите перейти по ссылке: <br />
                        <Typography component="span" sx={{ wordBreak: 'break-all' }}>
                            <b>{currentLink}</b>
                        </Typography>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                        <Button onClick={handleConfirm} sx={{ borderRadius: '50px' }}>
                            Перейти
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ borderRadius: '50px' }}
                            onClick={() => setOpen(false)}>
                            Отмена
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default Content;
