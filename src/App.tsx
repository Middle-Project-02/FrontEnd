import AppRouter from './AppRouter';
import ModalContainer from '@/components/common/ModalContainer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      <AppRouter />
      <ModalContainer />
      <Toaster />
    </>
  );
}

export default App;
