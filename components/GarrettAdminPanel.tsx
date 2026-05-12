'use client';

import { useEffect, useState } from 'react';
import { recipes } from '@/content/recipes';

type RecipeAdminRow = {
  recipeSlug: string;
  title: string;
  category: string;
  rating: number;
  take: string;
  isSaving?: boolean;
  saved?: boolean;
};

type GarrettTake = {
  recipe_slug: string;
  rating: number;
  take: string;
};

export default function GarrettAdminPanel() {
  const [rows, setRows] = useState<RecipeAdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/garrett-takes');
        const json = await res.json();
        const takes: GarrettTake[] = json.takes || [];
        const mapped = recipes.map((recipe) => {
          const match = takes.find((take) => take.recipe_slug === recipe.slug);
          return {
            recipeSlug: recipe.slug,
            title: recipe.title,
            category: recipe.category,
            rating: match?.rating ?? 0,
            take: (match?.take ?? recipe.garrettTake) || '',
          };
        });
        setRows(mapped);
      } catch (err) {
        console.error(err);
        setError('Unable to load Garrett takes.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const saveRow = async (recipeSlug: string) => {
    setRows((prev) => prev.map((row) => row.recipeSlug === recipeSlug ? { ...row, isSaving: true, saved: false } : row));
    const row = rows.find((item) => item.recipeSlug === recipeSlug);
    if (!row) return;

    try {
      const res = await fetch('/api/garrett-takes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeSlug: row.recipeSlug, rating: row.rating, take: row.take }),
      });
      if (!res.ok) throw new Error('Save failed');
      setRows((prev) => prev.map((item) => item.recipeSlug === recipeSlug ? { ...item, isSaving: false, saved: true } : item));
    } catch (err) {
      console.error(err);
      setRows((prev) => prev.map((item) => item.recipeSlug === recipeSlug ? { ...item, isSaving: false } : item));
      setError('Save failed. Try again.');
    }
  };

  const updateRow = (recipeSlug: string, field: 'rating' | 'take', value: string | number) => {
    setRows((prev) => prev.map((row) => row.recipeSlug === recipeSlug ? { ...row, [field]: value, saved: false } : row));
  };

  if (loading) return <p>Loading Garrett admin panel…</p>;

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h1 className="text-2xl font-semibold mb-2">Garrett admin panel</h1>
        <p className="text-sm text-slate-600">
          Edit Garrett&apos;s rating and take for each recipe. This saves live to Supabase so the homepage and recipe cards update without redeploying.
        </p>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.recipeSlug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-semibold">{row.title}</div>
                <div className="text-sm text-slate-500">{row.category}</div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">Rating</label>
                <select
                  value={row.rating}
                  onChange={(event) => updateRow(row.recipeSlug, 'rating', Number(event.target.value))}
                  className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                  <option value={0}>None</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>{value} star{value > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">Garrett&apos;s take</label>
              <textarea
                value={row.take}
                onChange={(event) => updateRow(row.recipeSlug, 'take', event.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => saveRow(row.recipeSlug)}
                disabled={row.isSaving}
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                style={{ backgroundColor: 'var(--color-brand)' }}
              >
                {row.isSaving ? 'Saving…' : 'Save'}
              </button>
              {row.saved && <span className="text-sm text-emerald-600">Saved</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
