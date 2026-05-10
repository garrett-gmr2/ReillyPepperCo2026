'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { recipes } from '@/content/recipes';

type RecipeWithRating = typeof recipes[0] & { averageRating: number; ratingCount: number };

const ethnicityColors: Record<string, string> = {
  'Southeast Asian — Thai': '#be2d2d',
  'North African — Moroccan': '#d2691e',
  'South Asian base · American BBQ technique': '#8b4513',
};

const ethnicities = Object.keys(ethnicityColors);

export default function HomePage() {
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeWithRating[]>([]);
  const [selectedEthnicity, setSelectedEthnicity] = useState<string>('All');

  useEffect(() => {
    const fetchRatings = async () => {
      const recipesWithRatings = await Promise.all(
        recipes.map(async (recipe) => {
          try {
            const res = await fetch(`/api/ratings?recipeSlug=${recipe.slug}`);
            const data = await res.json();
            return { ...recipe, averageRating: data.average || 0, ratingCount: data.count || 0 };
          } catch {
            return { ...recipe, averageRating: 0, ratingCount: 0 };
          }
        })
      );
      const sorted = recipesWithRatings.sort((a, b) => b.averageRating - a.averageRating);
      setFilteredRecipes(sorted);
    };
    fetchRatings();
  }, []);

  useEffect(() => {
    if (selectedEthnicity === 'All') {
      setFilteredRecipes(prev => [...prev].sort((a, b) => b.averageRating - a.averageRating));
    } else {
      setFilteredRecipes(prev => prev.filter(r => r.ethnicity === selectedEthnicity).sort((a, b) => b.averageRating - a.averageRating));
    }
  }, [selectedEthnicity]);

  return (
    <>
      <div className="mb-8">
        <h1
          className="text-3xl font-semibold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Reilly Pepper Co. Recipes
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>
          AI-crafted recipes built around what we love to cook and eat. Follow us <a href="https://www.instagram.com/reillypepperco/" target="_blank" rel="noopener" style={{ color: 'var(--color-brand)' }}>@reillypepperco</a>
        </p>
      </div>

      {/* Ethnicity Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedEthnicity('All')}
          className={`px-3 py-1 rounded-full text-sm ${selectedEthnicity === 'All' ? 'bg-current text-white' : 'bg-gray-200 text-gray-700'}`}
          style={selectedEthnicity === 'All' ? { backgroundColor: 'var(--color-brand)', color: 'white' } : {}}
        >
          All
        </button>
        {ethnicities.map((eth) => (
          <button
            key={eth}
            onClick={() => setSelectedEthnicity(eth)}
            className={`px-3 py-1 rounded-full text-sm ${selectedEthnicity === eth ? 'text-white' : 'text-gray-700'}`}
            style={{
              backgroundColor: selectedEthnicity === eth ? ethnicityColors[eth] : 'var(--color-background-secondary)',
              color: selectedEthnicity === eth ? 'white' : 'var(--color-text-secondary)',
            }}
          >
            {eth.split(' — ')[0] || eth}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredRecipes.map((recipe) => (
          <Link key={recipe.slug} href={`/recipe/${recipe.slug}`} className="no-underline block">
            <article
              className="rounded-xl overflow-hidden transition-shadow hover:shadow-md"
              style={{
                background: 'var(--color-background-primary)',
                border: '0.5px solid var(--color-border-tertiary)',
              }}
            >
              {/* Ethnicity Color bar */}
              <div
                className="h-1.5"
                style={{ backgroundColor: ethnicityColors[recipe.ethnicity] || 'var(--color-brand)' }}
              />

              <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2
                      className="text-lg font-semibold leading-snug mb-0.5"
                      style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                    >
                      {recipe.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {recipe.ethnicity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)' }}>
                      {recipe.prepTime} prep
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)' }}>
                      {recipe.cookTime} cook
                    </span>
                    {recipe.averageRating > 0 && (
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-background-warning)', color: 'var(--color-text-warning)' }}>
                        ★ {recipe.averageRating.toFixed(1)} ({recipe.ratingCount})
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {recipe.description}
                </p>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--color-background-warning)', color: 'var(--color-text-warning)' }}>
                      {recipe.servings} servings
                    </span>
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-brand)' }}
                  >
                    View recipe →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}import Link from 'next/link';
import { recipes } from '@/content/recipes';

export default function HomePage() {
  return (
    <>
      <div className="mb-8">
        <h1
          className="text-3xl font-semibold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Our Recipes
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>
          AI-crafted recipes built around what we love to cook and eat.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {recipes.map((recipe) => (
          <Link key={recipe.slug} href={`/recipe/${recipe.slug}`} className="no-underline block">
            <article
              className="rounded-xl overflow-hidden transition-shadow hover:shadow-md"
              style={{
                background: 'var(--color-background-primary)',
                border: '0.5px solid var(--color-border-tertiary)',
              }}
            >
              {/* Color bar */}
              <div
                className="h-1.5"
                style={{ backgroundColor: 'var(--color-brand)' }}
              />

              <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2
                      className="text-lg font-semibold leading-snug mb-0.5"
                      style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                    >
                      {recipe.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {recipe.ethnicity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)' }}>
                      {recipe.prepTime} prep
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)' }}>
                      {recipe.cookTime} cook
                    </span>
                  </div>
                </div>

                <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                  {recipe.description}
                </p>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--color-background-warning)', color: 'var(--color-text-warning)' }}>
                      {recipe.servings} servings
                    </span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-brand)' }}>
                    View recipe →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
