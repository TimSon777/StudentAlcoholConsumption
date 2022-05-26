export const parseIntOrEmpty = (str: any): number | "" => {
  return str && !isNaN(parseInt(str)) ? parseInt(str) : "";
};
