import { createContext } from 'react'

const timer = {
  currentTime: 0,

  interval: null,

  startTimer() {
    const start = Date.now();
    this.interval = setInterval(() => {
      const timeElapsed = Date.now() - start;
      this.currentTime = Math.floor(timeElapsed / 1000);
    }, 1000);
  },

  stopTimer() {
    clearInterval(this.interval);
    this.currentTime = 0;
  },
};

export default createContext(timer);
