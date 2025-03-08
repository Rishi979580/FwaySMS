const generateUniqueNumber = () => {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 1000); // Random number between 0 and 9999
  return `${timestamp}${randomPart}`;
};
export default generateUniqueNumber;
