export const convertInput = (val) => {
  let convertedToNumber = val.split(",");
  convertedToNumber = Number(convertedToNumber.join(""));
  const includesAlphabet = /[^0-9.]/g.test(convertedToNumber);
  return { includesAlphabet, convertedToNumber };
};

export const stripCommasInNumber = (numberString) => {
  let convertedToNumber = numberString.split(",");
  return Number(convertedToNumber.join(""));
};
