import { formatDistance } from 'date-fns';
import format from 'date-fns/format';
import kazLeng from 'date-fns/locale/ru';

export const formatData = (date: Date): string => {
    return formatDistance(date, new Date(), { locale: kazLeng });
};
