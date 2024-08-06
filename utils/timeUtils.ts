import { isDev } from "config/env";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * format date with template
 * @param millis millisecond timestamp
 * @param template format template
 * @returns formatted time
 */
export function formatDate(
  millis: number,
  template: string = "YYYY-M-D HH:mm"
) {
  return dayjs.utc(millis).format(template);
}

export function solanaEpochToHours(epochNumber: number) {
  if (isDev()) {
    return epochNumber * 5;
  }
  return epochNumber * 60;
}
