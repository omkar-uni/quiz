export const playSound = (src) => {
  try {
    const audio = new Audio(src);
    audio.volume = 0.9;
    audio.play();
  } catch (e) {}
};
