export const playTick = () => {
  const audio = new Audio(
    "https://cdn.pixabay.com/audio/2022/03/10/audio_f5e04477d8.mp3"
  );
  audio.volume = 0.3;
  audio.play();
};
