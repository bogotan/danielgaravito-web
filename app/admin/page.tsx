'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/components/AdminAuth';

interface Lead {
  id: number;
  email: string;
  name: string | null;
  source: string;
  created_at: string;
}

export default function AdminPage() {
  const { logout } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { createClient } = await import('@/lib/supabase');
      const supabase = createClient();

      const { count } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      setTotalLeads(count || 0);

      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      setLeads((data as Lead[]) || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="section-container">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold gradient-text">Dashboard Admin</h1>
        <button
          onClick={logout}
          className="text-text-muted hover:text-red-400 text-sm transition-colors"
        >
          Cerrar sesi&oacute;n
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-green">{totalLeads}</div>
          <div className="text-text-muted text-sm">Total Leads</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-blue">
            {leads.filter((l) => l.source === 'book-waitlist').length}
          </div>
          <div className="text-text-muted text-sm">Waitlist Libro</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-gold">
            {leads.filter((l) => {
              const d = new Date(l.created_at);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length}
          </div>
          <div className="text-text-muted text-sm">Este mes</div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text">Leads recientes</h2>
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="text-accent-green text-sm hover:underline disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Actualizar'}
          </button>
        </div>

        {leads.length === 0 ? (
          <p className="text-text-muted text-center py-8">No hay leads a&uacute;n.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Email</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Nombre</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Fuente</th>
                  <th className="text-left py-2 px-3 text-text-muted font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-800/50 hover:bg-bg">
                    <td className="py-2 px-3 text-text">{lead.email}</td>
                    <td className="py-2 px-3 text-text-muted">{lead.name || '\u2014'}</td>
                    <td className="py-2 px-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-text-muted">
                      {new Date(lead.created_at).toLocaleDateString('es-CO')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-8 flex gap-4">
        <a href="/admin/metrics" className="btn-primary text-sm">
          Metrics Dashboard
        </a>
        <a href="/blog" className="btn-secondary text-sm">
          Ver Blog
        </a>
      </div>
    </div>
  );
}
