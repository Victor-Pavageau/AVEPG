import { useCallback, useEffect, useState } from 'react';

const COOLDOWN_KEY: string = 'contact_form_last_submit';
const COOLDOWN_DURATION: number = 60000; // 60 seconds (1 minute) in milliseconds

interface UseSubmitCooldownReturn {
  isInCooldown: boolean;
  remainingSeconds: number;
  startCooldown: () => void;
  resetCooldown: () => void;
}

export function useSubmitCooldown(): UseSubmitCooldownReturn {
  const [isInCooldown, setIsInCooldown]: [boolean, (value: boolean) => void] =
    useState<boolean>(false);
  const [remainingSeconds, setRemainingSeconds]: [number, (value: number) => void] =
    useState<number>(0);

  const calculateRemainingTime: () => number = useCallback((): number => {
    const lastSubmitTime: string | null = localStorage.getItem(COOLDOWN_KEY);
    if (!lastSubmitTime) {
      return 0;
    }

    const timePassed: number = Date.now() - parseInt(lastSubmitTime, 10);
    const remaining: number = Math.max(0, COOLDOWN_DURATION - timePassed);
    return Math.ceil(remaining / 1000);
  }, []);

  const updateCooldownState: () => void = useCallback((): void => {
    const remaining: number = calculateRemainingTime();
    setRemainingSeconds(remaining);
    setIsInCooldown(remaining > 0);
  }, [calculateRemainingTime]);

  const startCooldown: () => void = useCallback((): void => {
    const currentTime: string = Date.now().toString();
    localStorage.setItem(COOLDOWN_KEY, currentTime);
    updateCooldownState();
  }, [updateCooldownState]);

  const resetCooldown: () => void = useCallback((): void => {
    localStorage.removeItem(COOLDOWN_KEY);
    setIsInCooldown(false);
    setRemainingSeconds(0);
  }, []);

  useEffect(() => {
    updateCooldownState();

    const interval: number = setInterval(() => {
      if (isInCooldown) {
        updateCooldownState();
      }
    }, 1000);

    const handleStorageChange: (e: StorageEvent) => void = (e: StorageEvent): void => {
      if (e.key === COOLDOWN_KEY) {
        updateCooldownState();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return (): void => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isInCooldown, updateCooldownState]);

  return {
    isInCooldown,
    remainingSeconds,
    startCooldown,
    resetCooldown,
  };
}
