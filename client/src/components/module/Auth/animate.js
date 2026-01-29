export const variantsEmail = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.25 } },
    exitForward: { x: '-100%', opacity: 0, transition: { duration: 0.25 } },
    exitBackward: { x: '-100%', opacity: 0, transition: { duration: 0.25 } },
}

export const variantsPassword = {
    initialForward: { x: '100%', opacity: 0 },
    initialBackward: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.25 } },
    exitForward: { x: '100%', opacity: 0, transition: { duration: 0.25 } },
    exitBackward: { x: '-100%', opacity: 0, transition: { duration: 0.25 } },
}
