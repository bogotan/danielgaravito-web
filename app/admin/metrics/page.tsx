'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────
interface Project {
  id: number;
  name: string;
  slug: string;
  status: string;
  description: string;
  color: string;
}

interface ProjectMetric {
  id: number;
  project_id: number;
  period: string;
  revenue_money: number;
  revenue_hours: number;
  cost_money: number;
  cost_hours: number;
  notes: string;
}

interface SocialMetric {
  id: number;
  platform: string;
  period: string;
  followers: number;
  new_followers: number;
  impressions: number;
  engagement_rate: number;
  posts_count: number;
  clicks: number;
  top_post_url: string;
}

interface SiteMetric {
  id: number;
  period: string;
  visitors: number;
  page_views: number;
  new_leads: number;
  bounce_rate: number;
}

// ─── Helpers ─────────────────────────────────────────────────
const currentPeriod = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const formatMoney = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const formatHours = (n: number) => `${n.toLocaleString('es-CO')}h`;

const platformIcons: Record<string, string> = {
  linkedin: '💼',
  tiktok: '🎵',
  instagram: '📸',
  twitter: '🐦',
  youtube: '🎬',
};

const platformColors: Record<string, string> = {
  linkedin: '#0A66C2',
  tiktok: '#000000',
  instagram: '#E4405F',
  twitter: '#1DA1F2',
  youtube: '#FF0000',
};

// ─── Component ───────────────────────────────────────────────
export default function MetricsPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectMetrics, setProjectMetrics] = useState<ProjectMetric[]>([]);
  const [socialMetrics, setSocialMetrics] = useState<SocialMetric[]>([]);
  const [siteMetrics, setSiteMetrics] = useState<SiteMetric[]>([]);
  const [loading, setLoading] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'social' | 'site' | 'entry'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod());

  // Form state
  const [formType, setFormType] = useState<'project' | 'social' | 'site'>('project');
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'bogotan@gmail.com';
    if (email === adminEmail) {
      setIsAuth(true);
    } else {
      setError('Acceso denegado.');
    }
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { createClient } = await import('@/lib/supabase');
      const sb = createClient();

      const [p, pm, sm, st] = await Promise.all([
        sb.from('projects').select('*').order('id'),
        sb.from('project_metrics').select('*').order('period', { ascending: false }),
        sb.from('social_metrics').select('*').order('period', { ascending: false }),
        sb.from('site_metrics').select('*').order('period', { ascending: false }),
      ]);

      setProjects((p.data as Project[]) || []);
      setProjectMetrics((pm.data as ProjectMetric[]) || []);
      setSocialMetrics((sm.data as SocialMetric[]) || []);
      setSiteMetrics((st.data as SiteMetric[]) || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuth) fetchAll();
  }, [isAuth, fetchAll]);

  // ─── Save form ────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      const { createClient } = await import('@/lib/supabase');
      const sb = createClient();

      if (formType === 'project') {
        const { error } = await sb.from('project_metrics').upsert(
          {
            project_id: Number(formData.project_id),
            period: formData.period || selectedPeriod,
            revenue_money: Number(formData.revenue_money) || 0,
            revenue_hours: Number(formData.revenue_hours) || 0,
            cost_money: Number(formData.cost_money) || 0,
            cost_hours: Number(formData.cost_hours) || 0,
            notes: formData.notes || '',
          },
          { onConflict: 'project_id,period' }
        );
        if (error) throw error;
      } else if (formType === 'social') {
        const { error } = await sb.from('social_metrics').upsert(
          {
            platform: formData.platform,
            period: formData.period || selectedPeriod,
            followers: Number(formData.followers) || 0,
            new_followers: Number(formData.new_followers) || 0,
            impressions: Number(formData.impressions) || 0,
            engagement_rate: Number(formData.engagement_rate) || 0,
            posts_count: Number(formData.posts_count) || 0,
            clicks: Number(formData.clicks) || 0,
            top_post_url: formData.top_post_url || '',
          },
          { onConflict: 'platform,period' }
        );
        if (error) throw error;
      } else if (formType === 'site') {
        const { error } = await sb.from('site_metrics').upsert(
          {
            period: formData.period || selectedPeriod,
            visitors: Number(formData.visitors) || 0,
            page_views: Number(formData.page_views) || 0,
            new_leads: Number(formData.new_leads) || 0,
            bounce_rate: Number(formData.bounce_rate) || 0,
          },
          { onConflict: 'period' }
        );
        if (error) throw error;
      }
      setSaveMsg('Guardado correctamente');
      setFormData({});
      fetchAll();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al guardar';
      setSaveMsg('Error: ' + msg);
    }
    setSaving(false);
  };

  // ─── Computed metrics ─────────────────────────────────────
  const totalRevenueMoney = projectMetrics.reduce((s, m) => s + Number(m.revenue_money), 0);
  const totalRevenueHours = projectMetrics.reduce((s, m) => s + Number(m.revenue_hours), 0);
  const totalCostMoney = projectMetrics.reduce((s, m) => s + Number(m.cost_money), 0);
  const totalCostHours = projectMetrics.reduce((s, m) => s + Number(m.cost_hours), 0);
  const totalROI = totalCostMoney > 0 ? ((totalRevenueMoney - totalCostMoney) / totalCostMoney) * 100 : 0;

  const totalFollowers = (() => {
    const latest: Record<string, number> = {};
    socialMetrics.forEach((m) => {
      if (!latest[m.platform] || m.period > (latest[m.platform] ? '' : '')) {
        latest[m.platform] = m.followers;
      }
    });
    // Get latest per platform
    const byPlatform: Record<string, SocialMetric> = {};
    socialMetrics.forEach((m) => {
      if (!byPlatform[m.platform] || m.period > byPlatform[m.platform].period) {
        byPlatform[m.platform] = m;
      }
    });
    return Object.values(byPlatform).reduce((s, m) => s + m.followers, 0);
  })();

  const latestSite = siteMetrics[0];

  const periodMetrics = (period: string) =>
    projectMetrics.filter((m) => m.period === period);

  const periodSocial = (period: string) =>
    socialMetrics.filter((m) => m.period === period);

  // ─── Login ────────────────────────────────────────────────
  if (!isAuth) {
    return (
      <div className="section-container max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Metrics Dashboard</h1>
          <p className="text-text-muted">Ingresa con tu email autorizado</p>
        </div>
        <form onSubmit={handleLogin} className="card space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-bg border border-gray-700 rounded-lg text-text focus:outline-none focus:border-accent-green text-sm"
            placeholder="tu@email.com"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="w-full btn-primary justify-center">
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  // ─── Tab buttons ──────────────────────────────────────────
  const tabs = [
    { id: 'overview' as const, label: 'Resumen', icon: '📊' },
    { id: 'projects' as const, label: 'ROI Proyectos', icon: '💰' },
    { id: 'social' as const, label: 'Redes Sociales', icon: '📱' },
    { id: 'site' as const, label: 'Tráfico Web', icon: '🌐' },
    { id: 'entry' as const, label: 'Registrar Datos', icon: '✏️' },
  ];

  return (
    <div className="section-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Metrics Dashboard</h1>
          <p className="text-text-muted text-sm mt-1">ROI por proyecto · Redes sociales · Tráfico</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchAll} disabled={loading} className="text-accent-green text-sm hover:underline disabled:opacity-50">
            {loading ? 'Cargando...' : '↻ Actualizar'}
          </button>
          <a href="/admin" className="text-text-muted text-sm hover:text-text">← Admin</a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                : 'bg-bg border border-gray-700 text-text-muted hover:text-text hover:border-gray-600'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ───── OVERVIEW TAB ───── */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card text-center">
              <div className="text-2xl font-bold text-accent-green">{formatMoney(totalRevenueMoney)}</div>
              <div className="text-text-muted text-xs mt-1">Revenue Total (COP)</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-accent-blue">{formatHours(totalRevenueHours)}</div>
              <div className="text-text-muted text-xs mt-1">Revenue en Horas</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold" style={{ color: totalROI >= 0 ? '#1DB954' : '#E53E3E' }}>
                {totalROI.toFixed(1)}%
              </div>
              <div className="text-text-muted text-xs mt-1">ROI Global</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-accent-gold">{totalFollowers.toLocaleString('es-CO')}</div>
              <div className="text-text-muted text-xs mt-1">Seguidores Totales</div>
            </div>
          </div>

          {/* Investment summary */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="text-sm font-bold text-text mb-3">Inversión Acumulada</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-muted text-sm">Dinero invertido</span>
                  <span className="text-text text-sm font-medium">{formatMoney(totalCostMoney)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted text-sm">Horas invertidas</span>
                  <span className="text-text text-sm font-medium">{formatHours(totalCostHours)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2">
                  <span className="text-text-muted text-sm">Ganancia neta</span>
                  <span className={`text-sm font-bold ${totalRevenueMoney - totalCostMoney >= 0 ? 'text-accent-green' : 'text-red-400'}`}>
                    {formatMoney(totalRevenueMoney - totalCostMoney)}
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-sm font-bold text-text mb-3">Tráfico Web (Último mes)</h3>
              {latestSite ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted text-sm">Visitantes</span>
                    <span className="text-text text-sm font-medium">{latestSite.visitors.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-sm">Page views</span>
                    <span className="text-text text-sm font-medium">{latestSite.page_views.toLocaleString('es-CO')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-sm">Nuevos leads</span>
                    <span className="text-accent-green text-sm font-medium">{latestSite.new_leads}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted text-sm">Bounce rate</span>
                    <span className="text-text text-sm font-medium">{latestSite.bounce_rate}%</span>
                  </div>
                </div>
              ) : (
                <p className="text-text-muted text-sm">Sin datos aún. Registra métricas en la pestaña &quot;Registrar Datos&quot;.</p>
              )}
            </div>
          </div>

          {/* Projects quick view */}
          <div className="card">
            <h3 className="text-sm font-bold text-text mb-4">Proyectos Activos</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {projects.map((p) => {
                const pm = projectMetrics.filter((m) => m.project_id === p.id);
                const rev = pm.reduce((s, m) => s + Number(m.revenue_money), 0);
                const cost = pm.reduce((s, m) => s + Number(m.cost_money), 0);
                const roi = cost > 0 ? ((rev - cost) / cost) * 100 : 0;
                return (
                  <div key={p.id} className="bg-bg rounded-lg p-3 border border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-text text-sm font-medium">{p.name}</span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Revenue</span>
                        <span className="text-text">{formatMoney(rev)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Costo</span>
                        <span className="text-text">{formatMoney(cost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">ROI</span>
                        <span className={roi >= 0 ? 'text-accent-green' : 'text-red-400'}>
                          {pm.length > 0 ? roi.toFixed(1) + '%' : '—'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ───── PROJECTS TAB ───── */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <label className="text-text-muted text-sm">Periodo:</label>
            <input
              type="month"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
            />
          </div>

          {projects.map((p) => {
            const allPm = projectMetrics.filter((m) => m.project_id === p.id);
            const periodPm = allPm.filter((m) => m.period === selectedPeriod);
            const totalRev = allPm.reduce((s, m) => s + Number(m.revenue_money), 0);
            const totalCost = allPm.reduce((s, m) => s + Number(m.cost_money), 0);
            const totalHoursRev = allPm.reduce((s, m) => s + Number(m.revenue_hours), 0);
            const totalHoursCost = allPm.reduce((s, m) => s + Number(m.cost_hours), 0);
            const roi = totalCost > 0 ? ((totalRev - totalCost) / totalCost) * 100 : 0;

            return (
              <div key={p.id} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.color }} />
                  <h3 className="text-lg font-bold text-text">{p.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent-green/10 text-accent-green">{p.status}</span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-text-muted mb-1">Revenue (COP)</div>
                    <div className="text-lg font-bold text-accent-green">{formatMoney(totalRev)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Revenue (Horas)</div>
                    <div className="text-lg font-bold text-accent-blue">{formatHours(totalHoursRev)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Costo (COP)</div>
                    <div className="text-lg font-bold text-text">{formatMoney(totalCost)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Costo (Horas)</div>
                    <div className="text-lg font-bold text-text">{formatHours(totalHoursCost)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">ROI</div>
                    <div className={`text-lg font-bold ${roi >= 0 ? 'text-accent-green' : 'text-red-400'}`}>
                      {allPm.length > 0 ? roi.toFixed(1) + '%' : '—'}
                    </div>
                  </div>
                </div>

                {/* Period detail */}
                {periodPm.length > 0 && (
                  <div className="bg-bg rounded-lg p-3 border border-gray-800">
                    <div className="text-xs text-text-muted mb-2">Detalle {selectedPeriod}</div>
                    {periodPm.map((m) => (
                      <div key={m.id} className="grid grid-cols-4 gap-2 text-xs">
                        <div>Rev: {formatMoney(Number(m.revenue_money))}</div>
                        <div>Horas rev: {formatHours(Number(m.revenue_hours))}</div>
                        <div>Costo: {formatMoney(Number(m.cost_money))}</div>
                        <div>Horas: {formatHours(Number(m.cost_hours))}</div>
                      </div>
                    ))}
                    {periodPm[0]?.notes && (
                      <div className="text-xs text-text-muted mt-2 italic">{periodPm[0].notes}</div>
                    )}
                  </div>
                )}

                {/* History */}
                {allPm.length > 0 && (
                  <details className="mt-3">
                    <summary className="text-xs text-text-muted cursor-pointer hover:text-text">
                      Ver historial ({allPm.length} registros)
                    </summary>
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-1 px-2 text-text-muted">Periodo</th>
                            <th className="text-right py-1 px-2 text-text-muted">Rev COP</th>
                            <th className="text-right py-1 px-2 text-text-muted">Rev Horas</th>
                            <th className="text-right py-1 px-2 text-text-muted">Costo COP</th>
                            <th className="text-right py-1 px-2 text-text-muted">Costo Horas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allPm.map((m) => (
                            <tr key={m.id} className="border-b border-gray-800/50">
                              <td className="py-1 px-2 text-text">{m.period}</td>
                              <td className="py-1 px-2 text-right text-accent-green">{formatMoney(Number(m.revenue_money))}</td>
                              <td className="py-1 px-2 text-right text-accent-blue">{formatHours(Number(m.revenue_hours))}</td>
                              <td className="py-1 px-2 text-right text-text">{formatMoney(Number(m.cost_money))}</td>
                              <td className="py-1 px-2 text-right text-text">{formatHours(Number(m.cost_hours))}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ───── SOCIAL TAB ───── */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {['linkedin', 'tiktok', 'instagram', 'twitter', 'youtube'].map((platform) => {
              const latest = socialMetrics
                .filter((m) => m.platform === platform)
                .sort((a, b) => b.period.localeCompare(a.period))[0];
              return (
                <div key={platform} className="card text-center">
                  <div className="text-2xl mb-1">{platformIcons[platform]}</div>
                  <div className="text-lg font-bold text-text">{latest ? latest.followers.toLocaleString('es-CO') : '0'}</div>
                  <div className="text-text-muted text-xs capitalize">{platform}</div>
                  {latest && latest.new_followers > 0 && (
                    <div className="text-accent-green text-xs mt-1">+{latest.new_followers} este mes</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Per-platform detail */}
          {['linkedin', 'tiktok', 'instagram', 'twitter', 'youtube'].map((platform) => {
            const metrics = socialMetrics
              .filter((m) => m.platform === platform)
              .sort((a, b) => b.period.localeCompare(a.period));
            if (metrics.length === 0) return null;
            const latest = metrics[0];

            return (
              <div key={platform} className="card">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{platformIcons[platform]}</span>
                  <h3 className="text-lg font-bold text-text capitalize">{platform}</h3>
                  <div className="ml-auto text-sm" style={{ color: platformColors[platform] }}>
                    {latest.followers.toLocaleString('es-CO')} seguidores
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-text-muted">Impresiones</div>
                    <div className="text-lg font-bold text-text">{latest.impressions.toLocaleString('es-CO')}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Engagement</div>
                    <div className="text-lg font-bold text-accent-green">{latest.engagement_rate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Posts</div>
                    <div className="text-lg font-bold text-text">{latest.posts_count}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">Clicks</div>
                    <div className="text-lg font-bold text-accent-blue">{latest.clicks.toLocaleString('es-CO')}</div>
                  </div>
                </div>

                {metrics.length > 1 && (
                  <details>
                    <summary className="text-xs text-text-muted cursor-pointer hover:text-text">
                      Historial ({metrics.length} meses)
                    </summary>
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-1 px-2 text-text-muted">Periodo</th>
                            <th className="text-right py-1 px-2 text-text-muted">Seguidores</th>
                            <th className="text-right py-1 px-2 text-text-muted">Nuevos</th>
                            <th className="text-right py-1 px-2 text-text-muted">Impresiones</th>
                            <th className="text-right py-1 px-2 text-text-muted">Engagement</th>
                            <th className="text-right py-1 px-2 text-text-muted">Posts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {metrics.map((m) => (
                            <tr key={m.id} className="border-b border-gray-800/50">
                              <td className="py-1 px-2 text-text">{m.period}</td>
                              <td className="py-1 px-2 text-right">{m.followers.toLocaleString('es-CO')}</td>
                              <td className="py-1 px-2 text-right text-accent-green">+{m.new_followers}</td>
                              <td className="py-1 px-2 text-right">{m.impressions.toLocaleString('es-CO')}</td>
                              <td className="py-1 px-2 text-right">{m.engagement_rate}%</td>
                              <td className="py-1 px-2 text-right">{m.posts_count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                )}
              </div>
            );
          })}

          {socialMetrics.length === 0 && (
            <div className="card text-center py-10">
              <div className="text-4xl mb-3">📱</div>
              <p className="text-text-muted">Sin datos de redes sociales aún.</p>
              <p className="text-text-muted text-sm">Ve a &quot;Registrar Datos&quot; para agregar métricas.</p>
            </div>
          )}
        </div>
      )}

      {/* ───── SITE TAB ───── */}
      {activeTab === 'site' && (
        <div className="space-y-6">
          {siteMetrics.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card text-center">
                  <div className="text-2xl font-bold text-accent-green">{latestSite?.visitors.toLocaleString('es-CO')}</div>
                  <div className="text-text-muted text-xs">Visitantes (último mes)</div>
                </div>
                <div className="card text-center">
                  <div className="text-2xl font-bold text-accent-blue">{latestSite?.page_views.toLocaleString('es-CO')}</div>
                  <div className="text-text-muted text-xs">Page Views</div>
                </div>
                <div className="card text-center">
                  <div className="text-2xl font-bold text-accent-gold">{latestSite?.new_leads}</div>
                  <div className="text-text-muted text-xs">Nuevos Leads</div>
                </div>
                <div className="card text-center">
                  <div className="text-2xl font-bold text-text">{latestSite?.bounce_rate}%</div>
                  <div className="text-text-muted text-xs">Bounce Rate</div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-sm font-bold text-text mb-3">Historial Mensual</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-2 px-3 text-text-muted">Periodo</th>
                        <th className="text-right py-2 px-3 text-text-muted">Visitantes</th>
                        <th className="text-right py-2 px-3 text-text-muted">Page Views</th>
                        <th className="text-right py-2 px-3 text-text-muted">Leads</th>
                        <th className="text-right py-2 px-3 text-text-muted">Bounce</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siteMetrics.map((m) => (
                        <tr key={m.id} className="border-b border-gray-800/50">
                          <td className="py-2 px-3 text-text">{m.period}</td>
                          <td className="py-2 px-3 text-right">{m.visitors.toLocaleString('es-CO')}</td>
                          <td className="py-2 px-3 text-right">{m.page_views.toLocaleString('es-CO')}</td>
                          <td className="py-2 px-3 text-right text-accent-green">{m.new_leads}</td>
                          <td className="py-2 px-3 text-right">{m.bounce_rate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="card text-center py-10">
              <div className="text-4xl mb-3">🌐</div>
              <p className="text-text-muted">Sin datos de tráfico aún.</p>
              <p className="text-text-muted text-sm">Ve a &quot;Registrar Datos&quot; para agregar métricas de tráfico.</p>
            </div>
          )}
        </div>
      )}

      {/* ───── DATA ENTRY TAB ───── */}
      {activeTab === 'entry' && (
        <div className="max-w-2xl">
          <div className="flex gap-2 mb-6">
            {(['project', 'social', 'site'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setFormType(t);
                  setFormData({});
                  setSaveMsg('');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  formType === t
                    ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                    : 'bg-bg border border-gray-700 text-text-muted hover:text-text'
                }`}
              >
                {t === 'project' ? '💰 Proyecto' : t === 'social' ? '📱 Red Social' : '🌐 Tráfico Web'}
              </button>
            ))}
          </div>

          <div className="card space-y-4">
            {/* Period selector */}
            <div>
              <label className="block text-xs text-text-muted mb-1">Periodo</label>
              <input
                type="month"
                value={(formData.period as string) || selectedPeriod}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
              />
            </div>

            {/* ── Project form ── */}
            {formType === 'project' && (
              <>
                <div>
                  <label className="block text-xs text-text-muted mb-1">Proyecto</label>
                  <select
                    value={(formData.project_id as string) || ''}
                    onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                    className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
                  >
                    <option value="">Selecciona un proyecto</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Revenue (COP)</label>
                    <input
                      type="number"
                      value={formData.revenue_money || ''}
                      onChange={(e) => setFormData({ ...formData, revenue_money: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Revenue (Horas ahorradas)</label>
                    <input
                      type="number"
                      value={formData.revenue_hours || ''}
                      onChange={(e) => setFormData({ ...formData, revenue_hours: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Costo (COP)</label>
                    <input
                      type="number"
                      value={formData.cost_money || ''}
                      onChange={(e) => setFormData({ ...formData, cost_money: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Costo (Horas invertidas)</label>
                    <input
                      type="number"
                      value={formData.cost_hours || ''}
                      onChange={(e) => setFormData({ ...formData, cost_hours: e.target.value })}
                      className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">Notas</label>
                  <textarea
                    value={(formData.notes as string) || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
                    rows={2}
                    placeholder="Notas opcionales sobre este periodo..."
                  />
                </div>
              </>
            )}

            {/* ── Social form ── */}
            {formType === 'social' && (
              <>
                <div>
                  <label className="block text-xs text-text-muted mb-1">Plataforma</label>
                  <select
                    value={(formData.platform as string) || ''}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green"
                  >
                    <option value="">Selecciona plataforma</option>
                    <option value="linkedin">💼 LinkedIn</option>
                    <option value="tiktok">🎵 TikTok</option>
                    <option value="instagram">📸 Instagram</option>
                    <option value="twitter">🐦 Twitter/X</option>
                    <option value="youtube">🎬 YouTube</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Seguidores totales</label>
                    <input type="number" value={formData.followers || ''} onChange={(e) => setFormData({ ...formData, followers: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Nuevos seguidores</label>
                    <input type="number" value={formData.new_followers || ''} onChange={(e) => setFormData({ ...formData, new_followers: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Impresiones</label>
                    <input type="number" value={formData.impressions || ''} onChange={(e) => setFormData({ ...formData, impressions: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Engagement Rate (%)</label>
                    <input type="number" step="0.1" value={formData.engagement_rate || ''} onChange={(e) => setFormData({ ...formData, engagement_rate: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0.0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Posts publicados</label>
                    <input type="number" value={formData.posts_count || ''} onChange={(e) => setFormData({ ...formData, posts_count: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Clicks</label>
                    <input type="number" value={formData.clicks || ''} onChange={(e) => setFormData({ ...formData, clicks: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0" />
                  </div>
                </div>
              </>
            )}

            {/* ── Site form ── */}
            {formType === 'site' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Visitantes únicos</label>
                    <input type="number" value={formData.visitors || ''} onChange={(e) => setFormData({ ...formData, visitors: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Page Views</label>
                    <input type="number" value={formData.page_views || ''} onChange={(e) => setFormData({ ...formData, page_views: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Nuevos leads</label>
                    <input type="number" value={formData.new_leads || ''} onChange={(e) => setFormData({ ...formData, new_leads: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Bounce Rate (%)</label>
                    <input type="number" step="0.1" value={formData.bounce_rate || ''} onChange={(e) => setFormData({ ...formData, bounce_rate: e.target.value })} className="w-full px-4 py-2.5 bg-bg border border-gray-700 rounded-lg text-text text-sm focus:outline-none focus:border-accent-green" placeholder="0.0" />
                  </div>
                </div>
              </>
            )}

            {/* Save */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Guardar Métricas'}
              </button>
              {saveMsg && (
                <span className={`text-sm ${saveMsg.includes('Error') ? 'text-red-400' : 'text-accent-green'}`}>
                  {saveMsg}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
