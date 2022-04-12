export const getDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const convertedDate = `
    ${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return convertedDate;
};
