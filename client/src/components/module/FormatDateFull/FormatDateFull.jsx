import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

function FormatDateFull({ dateString }) {
    const date = new Date(dateString);
    const formattedDate = format(date, "d MMMM yyyy 'г.' 'в' HH:mm:ss", { locale: ru });

    return <span>{formattedDate}</span>;
}

export default FormatDateFull
