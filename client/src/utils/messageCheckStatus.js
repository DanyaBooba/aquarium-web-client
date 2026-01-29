import { Checks, Clock, WarningCircle } from "@phosphor-icons/react"

function Check({ size, opacity }) {
    return (
        <svg width={size} height={size} opacity={opacity} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5256 5.535L9.92561 11.035C9.78536 11.1728 9.5966 11.25 9.39998 11.25C9.20337 11.25 9.01461 11.1728 8.87436 11.035L6.47436 8.67813C6.40406 8.6091 6.34805 8.52691 6.30951 8.43623C6.27098 8.34556 6.25069 8.24818 6.24979 8.14967C6.24797 7.9507 6.32527 7.75917 6.46467 7.61719C6.5337 7.54689 6.61589 7.49088 6.70657 7.45235C6.79724 7.41382 6.89462 7.39352 6.99313 7.39262C7.1921 7.3908 7.38363 7.4681 7.52561 7.6075L9.40061 9.44875L14.475 4.465C14.6169 4.3256 14.8083 4.24827 15.0072 4.25003C15.2061 4.25179 15.3962 4.33249 15.5356 4.47438C15.675 4.61627 15.7523 4.80773 15.7506 5.00663C15.7488 5.20554 15.6675 5.3956 15.5256 5.535Z" fill="currentColor" />
        </svg>

    )
}

export function messageCheckStatus(status = 0) {
    const size = 16
    const colors = {
        read: "#0c6bcb",
        warning: "#9b5b14",
        error: "#c41c1c"
    }

    switch (status) {
        case 1:
            return <Check size={size} opacity=".5" weight="bold" />
        case 2:
            return <Checks size={size} opacity=".5" weight="bold" />
        case 3:
            return <Checks size={size} color={colors.read} weight="bold" />
        case -1:
            return <Clock size={size} color={colors.warning} weight="bold" />
        case -2:
            return <WarningCircle size={size} color={colors.error} weight="bold" />
        default:
            return null
    }
}
