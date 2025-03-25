import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import Cart from './pages/Cart/Cart';
import NavBar from './components/NavBar/NavBar';
import Profile from './pages/Profile/Profile';
import './App.css'

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </>
  )
};

export default App;