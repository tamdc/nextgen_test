import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login';
import Portfolios from './pages/portfolios/Portfolios';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './navigation/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/portfolios' element={
          <ProtectedRoute>
            {/* <Portfolios /> */}
            <Portfolios />
          </ProtectedRoute>} 
        />
      </Routes>
    </AuthProvider>

  );
}

export default App;
