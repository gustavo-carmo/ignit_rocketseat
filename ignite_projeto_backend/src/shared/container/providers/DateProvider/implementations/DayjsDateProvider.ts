import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IDateProvider from '../IDateProvider';

dayjs.extend(utc);

export default class DayjsDateProvider implements IDateProvider {
  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = dayjs(start_date).utc().local().format();
    const end_date_utc = dayjs(end_date).utc().local().format();

    const compareDates = dayjs(end_date_utc).diff(start_date_utc, 'days');

    return compareDates;
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = dayjs(start_date).utc().local().format();
    const end_date_utc = dayjs(end_date).utc().local().format();

    const compareDates = dayjs(end_date_utc).diff(start_date_utc, 'hours');

    return compareDates;
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}
