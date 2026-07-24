-- Le lien de replay vit désormais sur la masterclass elle-même
-- (un seul lien YouTube, partagé par tous ceux qui l'ont demandé),
-- plutôt que dupliqué sur chaque demande individuelle.
alter table public.masterclasses add column replay_url text;

-- replay_requests garde uniquement la trace de qui a demandé le replay
-- et si on l'a prévenu, plus besoin d'y stocker le lien.
alter table public.replay_requests drop column if exists replay_url;