import { useState, useRef } from 'react';
import type { ButtonRefsType } from '@/types/ranking';

export const usePlanTooltip = () => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(
    null,
  );

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const openTooltip = (key: string) => {
    const button = buttonRefs.current[key];
    if (button) {
      const rect = button.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      setTooltipPosition({
        top: rect.top + scrollTop - 8,
        left: rect.left + rect.width / 2,
      });
      setShowTooltip(key);
    }
  };

  const closeTooltip = () => {
    setShowTooltip(null);
    setTooltipPosition(null);
  };

  return {
    showTooltip,
    tooltipPosition,
    buttonRefs: buttonRefs as ButtonRefsType,
    openTooltip,
    closeTooltip,
  };
};
