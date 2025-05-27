import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BaseLayout from './components/layout/BaseLayout';

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
