import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthProvider, { useAuth } from '../contexts/AuthContext';

// components
import HeaderComponent from '../components/HeaderComponent';

// pages
import ErrorPage from '../pages/ErrorPage';
import ListTodosPage from '../pages/ListTodosPage';
import LogoutPage from '../pages/LogoutPage';
import LoginPage from '../pages/LoginPage';
import TodoPage from '../pages/TodoPage';
import WelcomePage from '../pages/WelcomePage';

import './TodoApp.css';

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;

  return <Navigate to="/" />;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomePage />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodosPage />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <TodoPage />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutPage />
                </AuthenticatedRoute>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
