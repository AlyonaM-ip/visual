import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <p>Страница не найдена</p>
      <Link to="/dashboard">На главную</Link>
    </div>
  );
}