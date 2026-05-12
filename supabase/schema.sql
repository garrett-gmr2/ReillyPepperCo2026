-- Run this in the Supabase SQL editor (Project → SQL Editor → New query)

create table if not exists ratings (
  id          uuid primary key default gen_random_uuid(),
  recipe_slug   text not null,
  session_id  text not null,
  stars       smallint not null check (stars between 1 and 5),
  created_at  timestamptz default now(),
  unique (recipe_slug, session_id)
);

create table if not exists comments (
  id          uuid primary key default gen_random_uuid(),
  recipe_slug   text not null,
  author_name text not null,
  body        text not null,
  created_at  timestamptz default now()
);

create table if not exists garrett_takes (
  recipe_slug text primary key,
  rating      smallint not null check (rating between 1 and 5),
  take        text not null,
  updated_at  timestamptz not null default now()
);

-- Enable Row Level Security but allow all anonymous reads and writes.
-- This app has no auth — family members interact anonymously.
alter table ratings enable row level security;
alter table comments enable row level security;
alter table garrett_takes enable row level security;

create policy "public read ratings"   on ratings for select using (true);
create policy "public insert ratings" on ratings for insert with check (true);
create policy "public update ratings" on ratings for update using (true);

create policy "public read comments"   on comments for select using (true);
create policy "public insert comments" on comments for insert with check (true);

create policy "public read garrett takes"   on garrett_takes for select using (true);
create policy "public insert garrett takes" on garrett_takes for insert with check (true);
create policy "public update garrett takes" on garrett_takes for update using (true);
