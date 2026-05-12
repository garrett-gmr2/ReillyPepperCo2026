import GarrettAdminPanel from '@/components/GarrettAdminPanel';

export const metadata = {
  title: 'Admin • Garrett Takes',
};

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <GarrettAdminPanel />
    </main>
  );
}
