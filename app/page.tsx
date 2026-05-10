import HomeContent from '@/components/HomeContent';

export default function HomePage() {
  return <HomeContent />;
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
