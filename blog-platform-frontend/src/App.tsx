import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// helpers
import { AuthProvider, useAuth } from './context/AuthContext';

// pages
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage/CategoriesPage';
import { DraftsPage } from './pages/DraftsPage';
import { EditPostPage } from './pages/EditPostPage/EditPostPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { PostPage } from './pages/PostPage/PostPage';
import { TagsPage } from './pages/TagsPage/TagsPage';

// components
import NavBar from './components/NavBar';

import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <BrowserRouter>
      <NavBar
        isAuthenticated={isAuthenticated}
        userProfile={
          user
            ? {
                name: user.name,
                avatar: undefined, // Add avatar support if needed
              }
            : undefined
        }
        onLogout={logout}
      />
      <main className="container mx-auto py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/posts/new"
            element={
              <ProtectedRoute>
                <EditPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={<PostPage isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/posts/:id/edit"
            element={
              <ProtectedRoute>
                <EditPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={<CategoriesPage isAuthenticated={isAuthenticated} />}
          />
          <Route path="/tags" element={<TagsPage isAuthenticated={isAuthenticated} />} />
          <Route
            path="/posts/drafts"
            element={
              <ProtectedRoute>
                <DraftsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
