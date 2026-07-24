-- ===== Demandes de replay =====
create type replay_request_status as enum ('pending', 'sent');

create table public.replay_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  masterclass_id uuid not null references public.masterclasses(id) on delete cascade,
  status replay_request_status not null default 'pending',
  replay_url text,
  created_at timestamptz not null default now(),
  unique (user_id, masterclass_id)
);

alter table public.replay_requests enable row level security;

create policy "Users can view own replay requests"
  on public.replay_requests for select
  using (auth.uid() = user_id);

create policy "Users can create own replay requests"
  on public.replay_requests for insert
  with check (auth.uid() = user_id);

create policy "Admins can view all replay requests"
  on public.replay_requests for select
  using (public.is_admin());

create policy "Admins can update replay requests"
  on public.replay_requests for update
  using (public.is_admin());


-- ===== Paiements =====
create type payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  registration_id uuid references public.registrations(id) on delete set null,
  amount integer not null, -- en FCFA
  provider text, -- ex: "orange_money", "wave", "paypal", "stripe"...
  status payment_status not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

create policy "Admins can view all payments"
  on public.payments for select
  using (public.is_admin());

-- Les paiements ne sont créés/modifiés que via le serveur (webhook du
-- prestataire de paiement plus tard), jamais directement par le client :
-- donc aucune policy insert/update pour les utilisateurs ou les admins ici.
-- Le serveur utilisera le client admin (clé secrète), qui contourne le RLS.


-- ===== Notifications =====
create type notification_type as enum ('info', 'reminder', 'payment', 'replay');

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type notification_type not null default 'info',
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

-- Un utilisateur peut marquer ses propres notifications comme lues
create policy "Users can update own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

-- Les notifications sont créées uniquement côté serveur (via le client admin),
-- jamais directement par un utilisateur — pas de policy insert ici non plus.