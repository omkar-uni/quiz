export const vibrate = (pattern) => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
