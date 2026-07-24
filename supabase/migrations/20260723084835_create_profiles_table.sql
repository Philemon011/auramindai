-- Table des profils utilisateurs, reliée à auth.users (géré par Supabase Auth).
-- On ne modifie jamais auth.users directement : on stocke les infos propres
-- à l'application (rôle, nom complet...) dans cette table séparée.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- Active la sécurité au niveau des lignes : par défaut, personne ne peut
-- rien lire ni écrire tant qu'une policy ne l'autorise pas explicitement.
alter table public.profiles enable row level security;

-- Fonction utilitaire pour vérifier si l'utilisateur connecté est admin.
-- SECURITY DEFINER = s'exécute avec les droits du créateur de la fonction,
-- ce qui contourne le RLS À L'INTÉRIEUR de la fonction uniquement — évite
-- une récursion infinie qui se produirait si une policy sur `profiles`
-- interrogeait directement `profiles` avec le RLS actif.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Un utilisateur peut lire son propre profil
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Un utilisateur peut modifier son propre profil (nom, etc.)
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Un admin peut lire tous les profils
create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

-- Un admin peut modifier tous les profils (ex: promouvoir un utilisateur admin)
create policy "Admins can update all profiles"
  on public.profiles for update
  using (public.is_admin());

-- Empêche un utilisateur non-admin de changer son propre rôle via l'API,
-- même s'il essaie de manipuler la requête directement (sécurité en profondeur,
-- ne pas se reposer uniquement sur le frontend pour bloquer ça).
create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role <> old.role and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end;
$$;

create trigger before_profile_update
  before update on public.profiles
  for each row execute function public.prevent_role_change();

-- Crée automatiquement un profil (rôle "user" par défaut) à chaque
-- inscription — équivalent d'un "observer" Laravel sur la création d'un User.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();