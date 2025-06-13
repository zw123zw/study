export const getName = (name: string) => {
  const time = new Date().getTime();
  return `${name}-${time}`;
};
