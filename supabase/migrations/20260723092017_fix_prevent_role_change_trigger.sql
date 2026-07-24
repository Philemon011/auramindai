-- Corrige le trigger précédent : il bloquait TOUT changement de rôle,
-- y compris depuis le SQL Editor (accès direct à la base), empêchant
-- de créer le tout premier admin. On distingue maintenant :
-- - auth.uid() est NULL  → requête faite hors du contexte API (SQL Editor,
--   migration, service role) → autorisé, car seul le propriétaire du
--   projet Supabase a cet accès
-- - auth.uid() n'est pas NULL → requête faite par un utilisateur connecté
--   via l'API → autorisé uniquement si c'est déjà un admin
create or replace function public.prevent_role_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role <> old.role
     and auth.uid() is not null
     and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end;
$$;