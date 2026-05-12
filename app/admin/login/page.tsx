'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setError(json?.error || 'Unable to sign in.');
        return;
      }

      window.location.assign('/admin');
    } catch (err) {
      setError('Unable to sign in. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold mb-3">Admin login</h1>
        <p className="mb-6 text-sm text-slate-600">
          Enter Garrett&apos;s admin password to access the Garrett ratings and takes panel.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              required
            />
          </label>

          {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-brand)' }}
          >
            {isSaving ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}
