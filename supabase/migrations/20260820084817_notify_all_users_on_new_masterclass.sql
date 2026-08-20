-- Ajoute un lien optionnel aux notifications, pour pouvoir rediriger
-- l'utilisateur directement vers la ressource concernée au clic.
alter table public.notifications add column link text;

-- Fonction déclenchée après la création d'une masterclass : crée une
-- notification pour CHAQUE profil existant (sauf celui qui vient de la
-- créer, pas besoin de se notifier soi-même).
create or replace function public.notify_all_users_new_masterclass()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notifications (user_id, type, title, message, link)
  select
    id,
    'info',
    'Nouvelle masterclass disponible',
    new.title || ' — ' || to_char(new.scheduled_at, 'DD Mon YYYY à HH24:MI'),
    '/masterclasses/' || new.id
  from public.profiles
  where id <> new.created_by;

  return new;
end;
$$;

create trigger on_masterclass_created_notify_users
  after insert on public.masterclasses
  for each row execute function public.notify_all_users_new_masterclass();