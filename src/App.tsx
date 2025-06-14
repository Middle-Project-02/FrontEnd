import { RouterProvider } from 'react-router-dom';
import { router } from './pages/routes/router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
