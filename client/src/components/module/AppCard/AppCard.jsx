import { useEffect, useRef } from 'react'
import { Sheet, Typography, Box, Link } from '@mui/joy'
import QRCodeStyling from 'qr-code-styling'
import { useTheme } from '@mui/joy/styles'
import { ArrowSquareOutIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import { useMediaQuery } from '@mui/material'
import AquariumLogo from '../Logo/Icon'

export function BlockWebClient() {
    const isMobile = useMediaQuery('(max-width: 320px)')

    return (
        <Sheet
            variant="soft"
            sx={{
                p: 3,
                borderRadius: '24px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                flex: 1,
                height: '100%',
                gap: isMobile ? '.5rem' : '1.5rem',
                '& svg': {
                    borderRadius: '12px'
                }
            }}
        >
            <AquariumLogo />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'start',
                justifyContent: isMobile ? 'center' : 'start'
            }}>
                <Typography
                    level="title-lg"
                    textAlign="center"
                    sx={{ mt: 2, mb: 1 }}
                >
                    Веб-клиент
                </Typography>
                <Link
                    href="https://aquarium.org.ru"
                    target="_blank"
                    level="body-sm"
                    startDecorator={<ArrowSquareOutIcon size={18} />}
                >
                    Открыть
                </Link>
            </Box>
        </Sheet>
    )
}

const SVG_TEMPLATE = `<svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="100" height="100" rx="16" fill="ICON_BG_COLOR" />
            <path d="M63.0785 74.1126L79.2653 46H86.6023L64.4904 84.7273H58.1367L49.2617 46H56.5483L63.0785 74.1126ZM54.2791 46L47.8246 84.7273H39L45.4545 46H54.2791ZM75.1808 84.7273L81.6353 46H90.359L83.9045 84.7273H75.1808Z" fill="ICON_TEXT_COLOR" />
        </svg>`

export default function AppCard({ title, link, moreLink = {} }) {
    const theme = useTheme()
    const qrRef = useRef(null)

    useEffect(() => {
        if (!qrRef.current) return

        const logoBgColor = theme.colors?.logo || '#0b6bcb';
        const logoTextColor = theme.colors?.logoText || '#ffffff';

        const coloredSvgString = SVG_TEMPLATE
            .replace(/ICON_BG_COLOR/g, logoBgColor)
            .replace(/ICON_TEXT_COLOR/g, logoTextColor)

        const base64Svg = window.btoa(unescape(encodeURIComponent(coloredSvgString)))
        const svgDataUri = `data:image/svg+xml;base64,${base64Svg}`

        const qr = new QRCodeStyling({
            width: 240,
            height: 240,
            type: 'svg',
            data: link,
            image: svgDataUri,
            qrOptions: {
                errorCorrectionLevel: 'M'
            },
            dotsOptions: {
                color: logoBgColor,
                type: 'rounded',
            },
            cornersSquareOptions: {
                type: 'extra-rounded',
                color: logoBgColor,
            },
            backgroundOptions: {
                color: 'transparent',
            },
            imageOptions: {
                margin: 4,
                crossOrigin: 'anonymous',
            },
        })

        qrRef.current.innerHTML = ''
        setTimeout(() => {
            if (qrRef.current) {
                qr.append(qrRef.current);
            }
        }, 0);

    }, [link, theme])

    return (
        <Sheet
            variant="soft"
            sx={{
                px: 2,
                py: 3,
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 320,
                flex: 1,
                height: '100%'
            }}
        >
            <Box
                ref={qrRef}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                    '& svg': {
                        width: '100%',
                        height: '100%',
                        maxWidth: 220,
                    },
                }}
            />

            <Typography
                level="title-lg"
                textAlign="center"
                sx={{ mt: 2, mb: 1 }}
            >
                {title}
            </Typography>
            {!!moreLink.title && (
                <Link
                    href={moreLink.href}
                    target="_blank"
                    level="body-sm"
                    startDecorator={moreLink.icon}
                    sx={{ mb: 1 }}
                >
                    {moreLink.title}
                </Link>
            )}
            <Link
                href={link}
                target="_blank"
                level="body-sm"
                startDecorator={<DownloadSimpleIcon size={18} />}
            >
                Скачать
            </Link>
        </Sheet>
    )
}
