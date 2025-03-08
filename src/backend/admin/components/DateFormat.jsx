// utils.js

const formatDate = (timestamp) => {
  const date = new Date(parseInt(timestamp));
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (+1 because January is 0) and pad with leading zero if necessary
  const year = date.getFullYear(); // Get full year
  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if necessary
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if necessary
  const seconds = date.getSeconds().toString().padStart(2, "0"); // Get seconds and pad with leading zero if necessary
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export default formatDate;
