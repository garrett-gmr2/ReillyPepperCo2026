'use client';

import { useEffect, useState } from 'react';

type RatingData = { average: number; count: number; userStars: number | null };

export default function StarRating({ recipeSlug }: { recipeSlug: string }) {
  const [data, setData] = useState<RatingData>({ average: 0, count: 0, userStars: null });
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate or retrieve anonymous session ID
    let id = localStorage.getItem('rpc_session');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('rpc_session', id);
    }
    setSessionId(id);

    fetch(`/api/ratings?recipeSlug=${recipeSlug}&sessionId=${id}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, [recipeSlug]);

  async function submitRating(stars: number) {
    if (!sessionId || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeSlug, sessionId, stars }),
      });
      if (res.ok) {
        const updated = await res.json();
        setData(updated);
      }
    } finally {
      setSubmitting(false);
    }
  }

  const displayStars = hover || data.userStars || 0;

  return (
    <div>
      <h3
        className="text-base font-semibold mb-3"
        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
      >
        Rate this plan
      </h3>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1" role="group" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="star-btn text-3xl leading-none transition-transform active:scale-90"
              style={{ color: star <= displayStars ? '#f59e0b' : 'var(--color-border-tertiary)' }}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => submitRating(star)}
              aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
              disabled={submitting}
            >
              ★
            </button>
          ))}
        </div>

        {data.count > 0 && (
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {data.average.toFixed(1)} avg · {data.count} {data.count === 1 ? 'rating' : 'ratings'}
          </span>
        )}

        {data.userStars && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{
            background: 'var(--color-background-success)',
            color: 'var(--color-text-success)',
          }}>
            You rated {data.userStars}★
          </span>
        )}
      </div>
    </div>
  );
}
