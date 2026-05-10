import Link from 'next/link';
import { allMeals } from '@/content/plans';

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
        {allMeals.map((meal, idx) => (
          <Link key={idx} href={`/plan/${meal.planSlug}`} className="no-underline block">
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
                      {meal.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      From {meal.planTitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {meal.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: 'var(--color-background-secondary)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description placeholder */}
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Click to view the full recipe in the meal plan.
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
