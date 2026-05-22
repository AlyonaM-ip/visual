import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div>
      <h1>Табличный процессор</h1>
      <Outlet />
    </div>
  );
}