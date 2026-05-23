import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  return (
    <div>
      <h1>SpreadSheet</h1>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
      </button>
      <button onClick={handleLogout}>Выйти</button>
      <Outlet />
    </div>
  );
}