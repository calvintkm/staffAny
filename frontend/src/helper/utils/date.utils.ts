const monthStrMap: { [key: string]: string } = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export function convertToMMDD(isoDate: string) {
  const DD = isoDate.substring(8);
  const MM: string = isoDate.substring(5, 7) + "";

  return `${monthStrMap[MM]} ${DD}`;
}

export function getMonday(iso: string, modifier = 0) {
  const d = new Date(iso);
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1) + modifier; // adjust when day is sunday
  return new Date(d.setDate(diff)).toISOString().substring(0, 10);
}
export function getSunday(iso: string) {
  return getMonday(iso, 6);
}

export function getNextMonday(iso: string) {
  return getMonday(iso, 7);
}
export function getPrevMonday(iso: string) {
  return getMonday(iso, -7);
}

export function getYYYYMMDD(iso: string) {
  const newDate = new Date(iso);
  return `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`;
}
