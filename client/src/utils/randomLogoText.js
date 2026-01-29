export function randomLogoText() {
    const variants = [
        'мини',
        'mini',
        '2026',
        '(ツ)',
        '(ΦωΦ)',
        '{мини}',
        '∞',
        '...',
        '¯\\_(ツ)_/¯',
        'uwu',
        '****',
        '¬_¬',
    ];

    const chance = 0.05;

    if (Math.random() > chance) {
        return 'мини';
    }

    const index = Math.floor(Math.random() * variants.length);
    return variants[index];
}
