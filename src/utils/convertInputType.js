export const convertInput = (val) => {
  let convertedToNumber = val.split(",");
  convertedToNumber = Number(convertedToNumber.join(""));
  const includesAlphabet = /\D/.test(convertedToNumber);
  return { includesAlphabet, convertedToNumber };
};

export const stripCommasInNumber = (numberString) => {
  let convertedToNumber = numberString.split(",");
  return Number(convertedToNumber.join(""));
};
