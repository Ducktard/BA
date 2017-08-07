import Moment from 'moment';
import { Filter } from 'angular-ecmascript/module-helpers';

/**
 * @author Mario Curkovic
 *
 * Filter for converting the Date from database to a, for user easy to read, format of the date.
 */
export default class CalendarFilter extends Filter {
  filter(time) {
    if (!time) return;
    return moment(time).format('LLL');
  }
}

CalendarFilter.$name = 'calendar';
