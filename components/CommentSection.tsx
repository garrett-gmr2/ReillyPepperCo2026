'use client';

import { useEffect, useRef, useState } from 'react';

type Comment = { id: string; author_name: string; body: string; created_at: string };

export default function CommentSection({ planSlug }: { planSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`/api/comments?planSlug=${planSlug}`)
      .then((r) => r.json())
      .then((d) => setComments(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [planSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planSlug, authorName: name.trim(), body: body.trim() }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      const newComment = await res.json();
      setComments((prev) => [newComment, ...prev]);
      setBody('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h3
        className="text-base font-semibold mb-4"
        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
      >
        Comments {comments.length > 0 && <span style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>({comments.length})</span>}
      </h3>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          ref={nameRef}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          required
          className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
          style={{
            border: '1px solid var(--color-border-tertiary)',
            background: 'var(--color-background-primary)',
            color: 'var(--color-text-primary)',
          }}
        />
        <textarea
          placeholder="Leave a comment — what did you think? Did you try it? Any tweaks?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          maxLength={1000}
          required
          className="w-full px-3 py-2.5 rounded-lg text-sm resize-none outline-none"
          style={{
            border: '1px solid var(--color-border-tertiary)',
            background: 'var(--color-background-primary)',
            color: 'var(--color-text-primary)',
          }}
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting || !name.trim() || !body.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-40"
            style={{ background: 'var(--color-brand)' }}
          >
            {submitting ? 'Posting…' : 'Post comment'}
          </button>
          {success && (
            <span className="text-sm" style={{ color: 'var(--color-text-success)' }}>
              Comment posted!
            </span>
          )}
          {error && (
            <span className="text-sm" style={{ color: '#dc2626' }}>
              {error}
            </span>
          )}
        </div>
      </form>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-sm italic" style={{ color: 'var(--color-text-tertiary)' }}>
          No comments yet — be the first!
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="rounded-lg p-4"
              style={{
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  {c.author_name}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  {new Date(c.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
