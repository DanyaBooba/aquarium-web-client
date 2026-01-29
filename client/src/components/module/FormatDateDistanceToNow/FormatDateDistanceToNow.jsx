import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

function FormatDateDistanceToNow({ dateString }) {
    const date = new Date(dateString);
    const formattedDate = formatDistanceToNow(date, {
        addSuffix: true,
        locale: ru,
    });

    return <span>{formattedDate}</span>;
}

export default FormatDateDistanceToNow
