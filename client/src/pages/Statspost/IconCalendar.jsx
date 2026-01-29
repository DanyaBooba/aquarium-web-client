function ShowIcon({ date }) {
    switch (date) {
        case 1:
            return null
        // ...
        default:
            return null
    }
}

function IconCalendar({ date }) {
    const intDate = parseInt(date)

    if (intDate >= 1 && intDate <= 31) {
        return <ShowIcon date={intDate} />
    }

    return null
}

export default IconCalendar
