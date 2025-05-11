import { useEffect, useRef } from "react";

type InactivityLockOptions = {
  timeout: number; // in minutes
  onLock: () => void;
};

export function useInactivityLock({ timeout, onLock }: InactivityLockOptions) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutMs = timeout * 60 * 1000; // convert minutes to milliseconds

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onLock, timeoutMs);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [timeout]);

  return null;
}