import { Box, Modal, ModalClose, Sheet } from '@mui/joy'
import { keyframes } from '@mui/system'
import { useCallback, useState, useRef, useEffect } from 'react'
import { PlayIcon } from '@phosphor-icons/react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { Fancybox } from '@fancyapps/ui'

const CONTROLS_H = 42
const MIN_CTRL_W = 380

const BASE_URL = process.env.REACT_APP_API_URL || ''
const getUrl = (src) => (src?.startsWith('http') ? src : `${BASE_URL}${src}`)

const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`

const fadeOut = keyframes`
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.95); }
`

// Кнопочка с настройками
function registerSettingsButton(videojs) {
    if (videojs.getComponent('SettingsButton')) return

    const Button = videojs.getComponent('Button')

    class SettingsButton extends Button {
        constructor(player, options) {
            super(player, options)
            this.menuVisible = false
            this.boundHideMenu = this.hideMenu.bind(this)
        }

        buildCSSClass() {
            return 'vjs-settings-button vjs-control vjs-button'
        }

        createEl() {
            const rates = (this.options_ && this.options_.rates) || [0.5, 0.75, 1, 1.25, 1.5, 2]

            const el = super.createEl('button', {
                className: 'vjs-settings-button vjs-control vjs-button',
            })

            // Иконка шестерёнки SVG
            el.innerHTML = `
                <svg class="vjs-settings-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.34.07-.69.07-1.08s-.03-.74-.07-1.08l2.32-1.84c.21-.16.27-.46.13-.7l-2.2-3.82c-.13-.24-.42-.32-.66-.24l-2.74 1.1c-.57-.44-1.18-.8-1.86-1.08L14.04 2.1C14 1.84 13.76 1.5 13.5 1.5h-3c-.26 0-.49.34-.54.6l-.42 2.74c-.68.28-1.29.64-1.86 1.08L4.96 4.84c-.24-.08-.53 0-.66.24L2.1 8.9c-.14.24-.08.54.13.7l2.32 1.84C4.51 11.76 4.5 12.11 4.5 12.5s.01.74.05 1.08L2.23 15.42c-.21.16-.27.46-.13.7l2.2 3.82c.13.24.42.32.66.24l2.74-1.1c.57.44 1.18.8 1.86 1.08l.42 2.74c.05.26.28.6.54.6h3c.26 0 .5-.34.54-.6l.42-2.74c.68-.28 1.29-.64 1.86-1.08l2.74 1.1c.24.08.53 0 .66-.24l2.2-3.82c.14-.24.08-.54-.13-.7l-2.32-1.84z"/>
                </svg>
            `
            this.menuEl = document.createElement('div')
            this.menuEl.className = 'vjs-settings-menu'
            this.menuEl.innerHTML = `
                <div class="vjs-settings-menu-title">Скорость</div>
                ${rates.map(r => `
                    <button class="vjs-settings-menu-item" data-rate="${r}">
                        ${r === 1 ? 'Обычная' : `${r}x`}
                    </button>
                `).join('')}
            `

            this.menuEl.querySelectorAll('.vjs-settings-menu-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation()
                    const rate = parseFloat(btn.dataset.rate)
                    this.player_.playbackRate(rate)
                    this.updateActiveRate(rate)
                    this.hideMenu()
                })
            })

            el.appendChild(this.menuEl)

            // Подсветка текущей скорости
            this.player_.on('ratechange', () => {
                this.updateActiveRate(this.player_.playbackRate())
            })

            return el
        }

        updateActiveRate(rate) {
            if (!this.menuEl) return
            this.menuEl.querySelectorAll('.vjs-settings-menu-item').forEach(btn => {
                btn.classList.toggle('vjs-settings-menu-item--active', parseFloat(btn.dataset.rate) === rate)
            })
        }

        handleClick(e) {
            e.stopPropagation()
            if (this.menuVisible) {
                this.hideMenu()
            } else {
                this.showMenu()
            }
        }

        showMenu() {
            this.updateActiveRate(this.player_.playbackRate())
            this.menuEl.classList.add('vjs-settings-menu--visible')
            this.menuVisible = true
            setTimeout(() => {
                document.addEventListener('click', this.boundHideMenu)
            }, 0)
        }

        hideMenu() {
            this.menuEl.classList.remove('vjs-settings-menu--visible')
            this.menuVisible = false
            document.removeEventListener('click', this.boundHideMenu)
        }

        dispose() {
            document.removeEventListener('click', this.boundHideMenu)
            super.dispose()
        }
    }

    videojs.registerComponent('SettingsButton', SettingsButton)
}

function ModalVideoContent({ src, onPip }) {
    const videoRef = useRef(null)
    const playerRef = useRef(null)
    const [dims, setDims] = useState(null) // { w, h } — итоговые размеры контейнера

    useEffect(() => {
        if (!videoRef.current) return

        registerSettingsButton(videojs)

        const player = videojs(videoRef.current, {
            controls: true,
            autoplay: true,
            muted: true,
            preload: 'metadata',
            fluid: false,   // ← отключаем, управляем размером сами
            playsinline: true,
            controlBar: {
                fullscreenToggle: true,
                pictureInPictureToggle: true,
                volumePanel: { inline: true },
                currentTimeDisplay: true,
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                playbackRateMenuButton: false,
            },
            sources: [{ src: getUrl(src), type: 'video/mp4' }],
        })

        player.on('loadedmetadata', () => {
            const vw = player.videoWidth()
            const vh = player.videoHeight()
            if (!vw || !vh) return

            // Максимально допустимые размеры с учётом отступов модала
            const maxTotalH = window.innerHeight * 0.88
            const maxW = window.innerWidth * 0.9
            const ratio = vw / vh

            // Область для видео (без панели управления)
            const maxVideoH = maxTotalH - CONTROLS_H

            // Считаем размеры видео, вписывая в допустимую область
            let videoW = maxVideoH * ratio
            let videoH = maxVideoH

            if (videoW > maxW) {
                videoW = maxW
                videoH = videoW / ratio
            }

            // Ширина контейнера: не меньше MIN_CTRL_W для вертикальных видео
            const containerW = Math.round(Math.max(videoW, MIN_CTRL_W))
            const containerH = Math.round(videoH + CONTROLS_H)

            setDims({ w: containerW, h: containerH })
        })

        player.ready(() => {
            const videoEl = player.el().querySelector('video')
            const elementControlBar = document.querySelector('.vjs-control-bar')

            // Уходим в PiP — скрываем модал
            videoEl?.addEventListener('enterpictureinpicture', () => {
                if (elementControlBar) elementControlBar.style.visibility = 'hidden'
                onPip?.(true)
            })

            // Выходим из PiP — восстанавливаем модал
            videoEl?.addEventListener('leavepictureinpicture', () => {
                if (elementControlBar) elementControlBar.style.visibility = 'visible'
                onPip?.(false)
            })

            const controlBar = player.getChild('controlBar')
            const pipIndex = controlBar.children().findIndex(
                (c) => c.name && c.name() === 'PictureInPictureToggle'
            )
            const insertAt = pipIndex >= 0 ? pipIndex : undefined
            controlBar.addChild('SettingsButton', {
                rates: [0.5, 0.75, 1, 1.25, 1.5, 2],
            }, insertAt)
        })

        playerRef.current = player

        return () => {
            player?.dispose()
            playerRef.current = null
        }
    }, [src, onPip])

    return (
        <Box
            sx={{
                width: dims ? `${dims.w}px` : '90vw',
                height: dims ? `${dims.h}px` : 'auto',
                maxWidth: '960px',
                maxHeight: '88dvh',
                borderRadius: '12px',
                overflow: 'hidden',
                bgcolor: '#000',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
                transition: 'width 0.15s ease, height 0.15s ease',

                // Плеер растягивается на весь контейнер
                '& .video-js': {
                    width: '100% !important',
                    height: '100% !important',
                    flex: 1,
                },
                // Само видео не тянется — добавляет чёрные поля при вертикальном
                '& .vjs-tech': {
                    objectFit: 'contain',
                },
            }}
        >
            <video
                ref={videoRef}
                className="video-js vjs-default-skin vjs-big-play-centered"
                playsInline
            />
        </Box>
    )
}

function Attachments({ attachments, postId = 0 }) {
    const [durations, setDurations] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPip, setIsPip] = useState(false)

    const handlePip = useCallback((active) => {
        setIsPip(active)
    }, [])

    const isVideo = (src) => /\.(mp4|webm|ogg|mov)$/i.test(src)

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleLoadedMetadata = (idx, e) => {
        setDurations((prev) => ({ ...prev, [idx]: e.target.duration }))
    }

    const openGallery = useCallback((index, e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentIndex(index)
        setModalOpen(true)
        setIsClosing(false)
    }, [])

    const handleClose = useCallback(() => {
        setIsClosing(true)
        setTimeout(() => {
            setModalOpen(false)
            setIsClosing(false)
        }, 300)
    }, [])

    const openFancybox = useCallback((startSrc) => {
        const images = attachments
            .filter((src) => !isVideo(src))
            .map((src) => ({ src: getUrl(src), type: 'image' }))

        const startIndex = images.findIndex((img) => img.src === getUrl(startSrc))

        Fancybox.show(images, {
            startIndex,
            Thumbs: { autoStart: true, type: 'modern' },
            Carousel: { infinite: false },
            Images: { initialSize: 'cover' },
        })
    }, [attachments])

    // useEffect(() => {
    //     if (!attachments?.length) return
    //     const selector = '[data-fancybox="post-gallery"]'
    //     Fancybox.bind(selector, {
    //         Thumbs: { autoStart: true, type: 'modern' },
    //         Carousel: { infinite: false },
    //         Images: { initialSize: "cover" },
    //     })
    //     return () => {
    //         Fancybox.unbind(selector)
    //         Fancybox.close()
    //     }
    // }, [attachments])

    if (!attachments?.length) return null

    const currentSrc = attachments[currentIndex]
    const isCurrentVideo = isVideo(currentSrc)

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mb: 2 }}>
                {attachments.map((src, idx) => {
                    const video = isVideo(src)
                    return (
                        <Box
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (video) openGallery(idx, e)
                                else openFancybox(src)
                            }}
                            sx={{
                                width: '120px',
                                height: '120px',
                                overflow: 'hidden',
                                borderRadius: '12px',
                                backgroundColor: '#f0f0f0',
                                flexShrink: 0,
                                position: 'relative',
                                cursor: 'pointer',
                            }}
                        >
                            {video ? (
                                <>
                                    <video
                                        src={`${getUrl(src)}#t=0.001`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        muted
                                        playsInline
                                        preload="metadata"
                                        onLoadedMetadata={(e) => handleLoadedMetadata(idx, e)}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'rgba(0,0,0,0.25)',
                                            transition: '0.12s ease-in-out',
                                            '&:hover': { transform: 'scale(1.08)' },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: 'rgba(0,0,0,0.65)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                            }}
                                        >
                                            <PlayIcon size={16} weight="fill" />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            p: '4px 6px',
                                            color: '#fff',
                                            fontSize: '12px',
                                            borderRadius: '10px 0 0 0',
                                        }}
                                    >
                                        {durations[idx] && formatTime(durations[idx])}
                                    </Box>
                                </>
                            ) : (
                                <img
                                    src={getUrl(src)}
                                    alt=""
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    loading="lazy"
                                />
                            )}
                        </Box>
                    )
                })}
            </Box>

            <Modal
                open={modalOpen}
                onClick={(e) => e.stopPropagation()}
                onClose={(e) => {
                    e.stopPropagation()
                    handleClose()
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    visibility: isPip ? 'hidden' : 'visible',
                }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.84)',
                            backdropFilter: 'blur(16px)',
                            transition: 'all 0.4s ease',
                        },
                    },
                }}
            >
                <Sheet
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        bgcolor: 'transparent !important',
                        boxShadow: 'none',
                        outline: 'none',
                        width: '100vw',
                        height: '100dvh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: `${isClosing ? fadeOut : popIn} 0.3s ease-out forwards`,
                    }}
                >
                    <ModalClose
                        onClick={handleClose}
                        sx={{
                            position: 'fixed',
                            top: '24px',
                            right: '24px',
                            color: '#000',
                            bgcolor: 'rgba(255,255,255,0.94)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.28)',
                            zIndex: 2000,
                            borderRadius: '50%',
                            '&:hover': { bgcolor: '#fff' },
                        }}
                    />
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: { xs: 1, sm: 2, md: 3 },
                        }}
                    >
                        {isCurrentVideo && (
                            <ModalVideoContent
                                src={currentSrc}
                                onPip={handlePip}
                            />
                        )}
                    </Box>
                </Sheet>
            </Modal>
        </>
    )
}

export default Attachments
