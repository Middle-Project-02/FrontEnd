import AppRouter from './AppRouter';
import { FirebaseProvider } from '@/components/providers/FirebaseProvider';
import ModalContainer from '@/components/common/ModalContainer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <FirebaseProvider>
      <AppRouter />
      <ModalContainer />
      <Toaster />
    </FirebaseProvider>
  );
}

export default App;
