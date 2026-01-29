import { Typography, Button, Modal, ModalDialog } from '@mui/joy'
import { Transition } from 'react-transition-group'

export default function ModalConfirmDelete({
    open = true,
    setOpen = () => { },
    onDelete = () => { },
    title = "Подтвердите удаление",
    desc = "",
    buttonActiveText = "Удалить"
}) {
    return (
        <Transition in={open} timeout={200}>
            {state => (
                <Modal
                    keepMounted
                    disableScrollLock
                    open={!['exited', 'exiting'].includes(state)}
                    onClose={() => setOpen(false)}
                    onClick={(e) => e.stopPropagation()}
                    slotProps={{
                        backdrop: {
                            sx: {
                                opacity: 0,
                                backdropFilter: 'none',
                                transition: 'opacity 200ms, backdrop-filter 200ms',
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
                        onClick={(e) => e.stopPropagation()}
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
                        <Typography level="title-lg" sx={{
                            textAlign: 'center',
                        }}>
                            {title ?? "Подтвердите удаление"}
                        </Typography>
                        {desc && (
                            <Typography level="body-md" sx={{ textAlign: 'center', mb: 2 }}>
                                {desc}
                            </Typography>
                        )}

                        <Button
                            color="danger"
                            onClick={onDelete}
                            sx={{ borderRadius: '50px', px: 2, py: 1 }}
                        >
                            {buttonActiveText}
                        </Button>
                        <Button
                            color="neutral"
                            variant="outlined"
                            onClick={() => setOpen(false)}
                            sx={{ borderRadius: '50px', px: 2, py: 0.8 }}
                        >
                            Отмена
                        </Button>
                    </ModalDialog>
                </Modal>
            )}
        </Transition>
    )
}
