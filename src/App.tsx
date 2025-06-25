import { useEffect } from 'react';
import AppRouter from './AppRouter';
import { FirebaseProvider } from '@/components/providers/FirebaseProvider';
import ModalContainer from '@/components/common/ModalContainer';
import { Toaster } from '@/components/ui/sonner';
import useFontModeStore from '@/stores/fontModeStore';
import { registerSW } from 'virtual:pwa-register';

function App() {
  const { fontMode } = useFontModeStore();

  useEffect(() => {
    registerSW();

    const html = document.documentElement;

    if (fontMode) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }
  }, [fontMode]);

  return (
    <FirebaseProvider>
      <AppRouter />
      <ModalContainer />
      <Toaster />
    </FirebaseProvider>
  );
}

export default App;
