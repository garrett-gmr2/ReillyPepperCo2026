import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlanBySlug, plans } from '@/content/plans';
import PlanViewer from '@/components/PlanViewer';
import StarRating from '@/components/StarRating';
import CommentSection from '@/components/CommentSection';

export async function generateStaticParams() {
  return plans.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) return {};
  return { title: `${plan.title} — Reilly Pepper Co.` };
}

export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plan = getPlanBySlug(slug);
  if (!plan) notFound();

  const htmlPath = path.join(process.cwd(), 'content', 'plans', plan.file);
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

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
          All plans
        </Link>
      </div>

      {/* Plan header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-semibold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          {plan.title}
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {new Date(plan.date + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
          {' · '}
          {plan.description}
        </p>
      </div>

      {/* Recipe HTML */}
      <PlanViewer html={htmlContent} />

      {/* Divider */}
      <div
        className="my-8 h-px"
        style={{ background: 'var(--color-border-tertiary)' }}
      />

      {/* Rating + Comments */}
      <div className="flex flex-col gap-8">
        <StarRating planSlug={plan.slug} />
        <CommentSection planSlug={plan.slug} />
      </div>
    </>
  );
}
