import Link from 'next/link';
import { plans } from '@/content/plans';

export default function HomePage() {
  return (
    <>
      <div className="mb-8">
        <h1
          className="text-3xl font-semibold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Our Recipe Plans
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>
          AI-crafted meal plans built around what we love to cook and eat.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {plans.map((plan) => (
          <Link key={plan.slug} href={`/plan/${plan.slug}`} className="no-underline block">
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
                      {plan.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {new Date(plan.date + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                    style={{
                      background: 'var(--color-background-secondary)',
                      color: 'var(--color-text-secondary)',
                      border: '0.5px solid var(--color-border-tertiary)',
                    }}
                  >
                    {plan.description}
                  </span>
                </div>

                {/* Meal list */}
                <ul className="flex flex-col gap-1 mb-3">
                  {plan.meals.map((meal) => (
                    <li key={meal} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      <span style={{ color: 'var(--color-brand)' }}>—</span>
                      {meal}
                    </li>
                  ))}
                </ul>

                {/* Tags + CTA */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex gap-1.5 flex-wrap">
                    {plan.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: 'var(--color-background-warning)',
                          color: 'var(--color-text-warning)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-brand)' }}
                  >
                    View plan →
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
