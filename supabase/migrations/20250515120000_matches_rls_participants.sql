-- Run in Supabase: SQL Editor → New query → paste → Run.
-- Fixes: INSERT / upsert on public.matches blocked by RLS (42501).
-- Rule: only the two people in the row may read or write that match.

alter table public.matches enable row level security;

-- Replace if you re-run this migration (idempotent policy names)
drop policy if exists "matches_select_participants" on public.matches;
drop policy if exists "matches_insert_participants" on public.matches;
drop policy if exists "matches_update_participants" on public.matches;

create policy "matches_select_participants"
  on public.matches
  for select
  to authenticated
  using (auth.uid() = user1_id or auth.uid() = user2_id);

create policy "matches_insert_participants"
  on public.matches
  for insert
  to authenticated
  with check (auth.uid() = user1_id or auth.uid() = user2_id);

-- PostgREST upsert (Prefer: resolution=merge-duplicates) may UPDATE on conflict
create policy "matches_update_participants"
  on public.matches
  for update
  to authenticated
  using (auth.uid() = user1_id or auth.uid() = user2_id)
  with check (auth.uid() = user1_id or auth.uid() = user2_id);
