create type masterclass_type as enum ('free', 'paid');
create type masterclass_language as enum ('fr', 'en');
create type masterclass_status as enum ('scheduled', 'live', 'ended', 'archived');

create table public.masterclasses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  agenda text[] not null default '{}',
  requirements text[] not null default '{}',
  image_url text,
  scheduled_at timestamptz not null,
  type masterclass_type not null default 'free',
  price integer, -- en FCFA, null si gratuit
  language masterclass_language not null default 'fr',
  status masterclass_status not null default 'scheduled',
  host_id uuid references public.profiles(id),
  -- Champs dédiés à l'automatisation du live Agora (rempli plus tard, à l'étape live) :
  agora_channel_name text unique,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.masterclasses enable row level security;

-- Tout le monde peut voir les masterclasses (page publique du catalogue)
create policy "Anyone can view masterclasses"
  on public.masterclasses for select
  using (true);

-- Seuls les admins peuvent créer/modifier/supprimer des masterclasses
create policy "Admins can insert masterclasses"
  on public.masterclasses for insert
  with check (public.is_admin());

create policy "Admins can update masterclasses"
  on public.masterclasses for update
  using (public.is_admin());

create policy "Admins can delete masterclasses"
  on public.masterclasses for delete
  using (public.is_admin());

-- Maintient updated_at à jour automatiquement à chaque modification
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_masterclasses_updated_at
  before update on public.masterclasses
  for each row execute function public.set_updated_at();