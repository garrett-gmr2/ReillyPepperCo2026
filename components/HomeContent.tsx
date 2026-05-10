'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { recipes } from '@/content/recipes';

type RecipeWithRating = typeof recipes[0] & { averageRating: number; ratingCount: number };

const categoryColors: Record<string, string> = {
  'Asian': '#be2d2d',
  'Middle Eastern': '#d2691e',
  'BBQ': '#8b4513',
  'European': '#556b2f',
  'Latin American': '#c41e3a',
  'American': '#2c5aa0',
};

const categories = Object.keys(categoryColors);

export default function HomeContent() {
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeWithRating[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
      // Sort by Garrett's rating first, then by community average
      const sorted = recipesWithRatings.sort((a, b) => {
        if (b.garrettRating !== a.garrettRating) {
          return b.garrettRating - a.garrettRating;
        }
        return b.averageRating - a.averageRating;
      });
      setFilteredRecipes(sorted);
    };
    fetchRatings();
  }, []);

  useEffect(() => {
    const filtered = selectedCategory === 'All' 
      ? recipes 
      : recipes.filter(r => r.category === selectedCategory);

    const withRatings = filtered.map(recipe => {
      const existing = filteredRecipes.find(r => r.slug === recipe.slug);
      return existing || { ...recipe, averageRating: 0, ratingCount: 0 };
    });

    const sorted = withRatings.sort((a, b) => {
      if (b.garrettRating !== a.garrettRating) {
        return b.garrettRating - a.garrettRating;
      }
      return b.averageRating - a.averageRating;
    });
    setFilteredRecipes(sorted);
  }, [selectedCategory]);

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

      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'All' ? 'bg-current text-white' : 'bg-gray-200 text-gray-700'}`}
          style={selectedCategory === 'All' ? { backgroundColor: 'var(--color-brand)', color: 'white' } : {}}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm ${selectedCategory === cat ? 'text-white' : 'text-gray-700'}`}
            style={{
              backgroundColor: selectedCategory === cat ? categoryColors[cat] : 'var(--color-background-secondary)',
              color: selectedCategory === cat ? 'white' : 'var(--color-text-secondary)',
            }}
          >
            {cat}
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
              {/* Category Color bar */}
              <div
                className="h-1.5"
                style={{ backgroundColor: categoryColors[recipe.category] || 'var(--color-brand)' }}
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
                      {recipe.category}
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

                {/* Garrett's Take Section */}
                <div
                  className="p-3 rounded-lg mb-3"
                  style={{
                    background: 'var(--color-background-secondary)',
                    borderLeft: '3px solid var(--color-brand)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                      Garrett's Rating
                    </span>
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--color-brand)',
                      }}
                    >
                      {'★'.repeat(recipe.garrettRating)}{'☆'.repeat(5 - recipe.garrettRating)}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, fontStyle: 'italic' }}>
                    {recipe.garrettTake}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--color-background-warning)', color: 'var(--color-text-warning)' }}>
                      {recipe.servings} servings
                    </span>
                    {recipe.averageRating > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'var(--color-background-secondary)', color: 'var(--color-text-secondary)' }}>
                        ★ {recipe.averageRating.toFixed(1)} ({recipe.ratingCount} ratings)
                      </span>
                    )}
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
}