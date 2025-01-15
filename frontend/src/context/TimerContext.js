import create from "zustand";

const useTimer = create((set) => ({
  timer: 180000, // 3 minutes in milliseconds
  isActive: false,
  decrementTimer: () => set((state) => ({ timer: state.timer - 1000 })),
  startTimer: () => set({ isActive: true, timer: 180000 }), // Reset and start
  stopTimer: () => set({ isActive: false, timer: 180000 }), // Reset timer when stopped
}));

export default useTimer;
