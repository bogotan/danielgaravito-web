import AdminAuth from '@/components/AdminAuth';

export const metadata = {
  title: 'Hub · Daniel Garavito',
  robots: { index: false, follow: false },
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuth>{children}</AdminAuth>;
}
