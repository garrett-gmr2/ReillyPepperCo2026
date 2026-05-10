import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecipeBySlug, recipes } from '@/content/recipes';
import StarRating from '@/components/StarRating';
import CommentSection from '@/components/CommentSection';

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  return { title: `${recipe.title} — Reilly Pepper Co.` };
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <>
      {/* Back link */}
      <div className="mb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm no-underline"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <i className="ti ti-arrow-left" aria-hidden="true" />
          All recipes
        </Link>
      </div>

      {/* Recipe header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {recipe.title}
        </h1>
        <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          {recipe.ethnicity} · {recipe.servings} servings
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {recipe.description}
        </p>
      </div>

      {/* Meta info */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <i className="ti ti-clock" aria-hidden="true" />
          <span className="text-sm">{recipe.prepTime} prep</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="ti ti-flame" aria-hidden="true" />
          <span className="text-sm">{recipe.cookTime} cook</span>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Ingredients
        </h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
              <span style={{ color: 'var(--color-brand)' }}>—</span>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Instructions
        </h2>
        <ol className="space-y-3">
          {recipe.steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 text-sm" style={{ color: 'var(--color-text-primary)' }}>
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-current text-white flex items-center justify-center text-xs font-medium" style={{ backgroundColor: 'var(--color-brand)', color: 'white' }}>
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Equipment */}
      {recipe.equipment && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-background-warning)', border: '0.5px solid var(--color-border-tertiary)' }}>
          <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-warning)' }}>
            <i className="ti ti-flame mr-1" aria-hidden="true" />
            Equipment Notes
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-text-warning)' }}>
            {recipe.equipment}
          </p>
        </div>
      )}

      {/* Nutrition */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Nutrition (per serving)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <div className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{recipe.nutrition.calories}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Calories</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <div className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{recipe.nutrition.protein}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Protein</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <div className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{recipe.nutrition.carbs}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Carbs</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <div className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{recipe.nutrition.highlight}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Highlight</div>
          </div>
        </div>
      </div>

      {/* Ratings and Comments */}
      <div className="space-y-6">
        <StarRating recipeSlug={recipe.slug} />
        <CommentSection recipeSlug={recipe.slug} />
      </div>
    </>
  );
}