import { useEffect } from 'react';
import ModalContainer from '@/components/common/ModalContainer';
import { Toaster } from '@/components/ui/sonner';
import useFontModeStore from '@/stores/fontModeStore';
import AppRouter from './AppRouter';

function App() {
  const { fontMode } = useFontModeStore();

  useEffect(() => {
    const html = document.documentElement;

    if (fontMode) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }
  }, [fontMode]);

  return (
    <>
      <AppRouter />
      <ModalContainer />
      <Toaster />
    </>
  );
}

export default App;
