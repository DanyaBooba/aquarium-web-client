import { SealCheck } from '@phosphor-icons/react';

export default function VerifiedBadge({ size = 14 }) {
    return (
        <SealCheck
            weight="fill"
            size={size}
            color="var(--joy-palette-primary-500)"
            style={{ flexShrink: 0, display: 'block' }}
        />
    );
}
