create type registration_payment_status as enum ('free', 'pending', 'paid', 'failed');

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  masterclass_id uuid not null references public.masterclasses(id) on delete cascade,
  payment_status registration_payment_status not null default 'free',
  attended boolean not null default false,
  created_at timestamptz not null default now(),
  -- Un utilisateur ne peut s'inscrire qu'une seule fois à la même masterclass
  unique (user_id, masterclass_id)
);

alter table public.registrations enable row level security;

-- Un utilisateur voit uniquement ses propres inscriptions
create policy "Users can view own registrations"
  on public.registrations for select
  using (auth.uid() = user_id);

-- Un utilisateur peut s'inscrire lui-même (insert avec son propre user_id)
create policy "Users can create own registrations"
  on public.registrations for insert
  with check (auth.uid() = user_id);

-- Un admin voit toutes les inscriptions (utile pour la liste des inscrits + export)
create policy "Admins can view all registrations"
  on public.registrations for select
  using (public.is_admin());

-- Un admin peut modifier une inscription (ex: marquer "présent", changer le statut de paiement)
create policy "Admins can update registrations"
  on public.registrations for update
  using (public.is_admin());

-- Petite fonction utilitaire : compte le nombre d'inscrits à une masterclass.
-- Utile côté interface pour éviter de recompter à la main à chaque affichage.
create or replace function public.masterclass_attendee_count(mc_id uuid)
returns integer
language sql
stable
as $$
  select count(*)::integer from public.registrations where masterclass_id = mc_id;
$$;