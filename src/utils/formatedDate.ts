const dateFormated = (old_date: string | number | Date) => {
  let year: string | number = "";
  let month: string | number = "";
  let day: string | number = "";
  let hours: string | number = "";
  let minutes: string | number = "";
  let dateFormated: string | number = "";

  const date: Date = new Date(old_date);

  year = date.getFullYear();
  month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  dateFormated = `${year}-${month}-${day} ${hours}:${minutes}`;

  return dateFormated;
};

export default dateFormated;
