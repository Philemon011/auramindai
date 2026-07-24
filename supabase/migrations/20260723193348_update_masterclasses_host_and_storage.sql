-- Le champ intervenant devient un texte libre plutôt qu'une référence
-- vers un compte (n'importe qui peut être mentionné comme intervenant,
-- sans avoir de compte AURAMIND AI).
alter table public.masterclasses drop column if exists host_id;
alter table public.masterclasses add column host_name text not null default '';

-- Bucket de stockage pour les images de masterclasses.
-- public = true : les images sont accessibles via une URL publique
-- directe (nécessaire pour les afficher sur le site sans authentification).
insert into storage.buckets (id, name, public)
values ('masterclass-images', 'masterclass-images', true)
on conflict (id) do nothing;

-- Tout le monde peut voir les images (cohérent avec le bucket public)
create policy "Anyone can view masterclass images"
  on storage.objects for select
  using (bucket_id = 'masterclass-images');

-- Seuls les admins peuvent uploader des images
create policy "Admins can upload masterclass images"
  on storage.objects for insert
  with check (bucket_id = 'masterclass-images' and public.is_admin());

-- Seuls les admins peuvent supprimer des images (ex: remplacement)
create policy "Admins can delete masterclass images"
  on storage.objects for delete
  using (bucket_id = 'masterclass-images' and public.is_admin());