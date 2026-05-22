import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'user@mail.ru' && password === '12345678') {
      dispatch(login({ name: 'Пользователь', email }));
      navigate('/dashboard');
    } else {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
      {error && <p>{error}</p>}
    </div>
  );
}