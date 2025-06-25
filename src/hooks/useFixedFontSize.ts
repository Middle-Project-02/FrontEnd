import { useEffect } from 'react';

const useFixedFontSize = () => {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('fixed-text');

    return () => {
      html.classList.remove('fixed-text');
    };
  }, []);
};

export default useFixedFontSize;
