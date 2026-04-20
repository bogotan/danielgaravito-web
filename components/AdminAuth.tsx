'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  logout: () => {},
});

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export default function AdminAuth({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setChecking(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.authenticated) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_auth', 'true');
      } else {
        setError(data.error || 'Clave incorrecta');
      }
    } catch {
      setError('Error de conexi\u00f3n');
    }
    setChecking(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword('');
    sessionStorage.removeItem('admin_auth');
  };

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="section-container max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Admin</h1>
          <p className="text-text-muted">Ingresa la clave de administrador</p>
        </div>

        <form onSubmit={handleLogin} className="card space-y-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Clave</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-bg border border-gray-700 rounded-lg text-text focus:outline-none focus:border-accent-green transition-colors text-sm"
              placeholder="Ingresa la clave"
              autoFocus
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={checking} className="w-full btn-primary justify-center disabled:opacity-50">
            {checking ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
