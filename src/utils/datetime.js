import { format } from "date-fns";

export const getTimezoneOffset = (date = new Date()) => {
  const timezoneOffset = -date.getTimezoneOffset() / 60;
  const timezoneSign = timezoneOffset >= 0 ? "+" : "-";
  const absTimezoneOffset = Math.abs(timezoneOffset);
  return `${timezoneSign}${absTimezoneOffset}`;
};

export const getTimezone = (date) => {
  return "UTC" + getTimezoneOffset(date);
};
export function formatDate(date) {
  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
  const day = String(date?.getDate()).padStart(2, "0"); // getDate() returns 1-31

  return `${year}-${month}-${day}`;
}

export function isPastDate(date) {
  return Date(date) < new Date();
}

export function formatFullDate(date) {
  return format(date, "MMMM d, yyy") + " | " + format(date, "hh:mm a");
}
export function formatShortDateTime(date) {
  return format(date, "MMM d, yyy") + " " + format(date, "hh:mm a");
}
export function formatFullDateOnly(date) {
  return format(date, "MMMM d, yyy");
}

export function formatUtcToLocalDateTime(utcDate) {
  const offsetMinutes = getTimezoneOffset() * 60;
  let date = new Date(utcDate);
  date.setMinutes(date.getMinutes() + offsetMinutes);
  return formatFullDate(new Date(date));
}
