import create from 'zustand';

const useTimer = create((set) => ({
  timer: 0,
  isActive: false,
  startTimer: (duration) => set({ timer: duration, isActive: true }),
  stopTimer: () => set({ isActive: false }),
  resetTimer: () => set({ timer: 0, isActive: false }),
  decrementTimer: () => set((state) => {
    if (state.isActive && state.timer > 0) {
      return { timer: state.timer - 1000 };
    }
    if (state.timer <= 0) {
      return { isActive: false };
    }
    return {};
  }),
}));

export default useTimer;
