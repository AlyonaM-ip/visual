import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Spreadsheet from './components/Spreadsheet/Spreadsheet';
import NotFound from './components/NotFound/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents/:id" element={<Spreadsheet />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}