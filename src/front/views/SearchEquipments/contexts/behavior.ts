let skipNextTimeout = false;

export const shouldSkipNextSearchTimeout = () => skipNextTimeout;
export const setSkipNextSearchTimeout = (value: boolean) => {
  skipNextTimeout = value;
};
