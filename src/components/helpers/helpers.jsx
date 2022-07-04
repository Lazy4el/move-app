import { format } from "date-fns";
/* Format date */
const dateFormat = (date) => {
  try {
    const result = new Date(date);
    return format(result, "MMMM dd, yyyy");
  } catch {
    return date;
  }
};

/* Format Text - Overview */
const overviewFormat = (text) => {
  if (text.length >= 180) {
    return text.split(" ").slice(0, 20).join(" ") + " ...";
  }
  return text;
};

const colorVoteAverage = (average) => {
  const red = "#e90000";
  const darkOrange = "#e97e00";
  const yellow = "#e9d100";
  const lime = "#66e900";
  return average > 7
    ? lime
    : average > 5
    ? yellow
    : average > 3
    ? darkOrange
    : red;
};
export { dateFormat, overviewFormat, colorVoteAverage };
