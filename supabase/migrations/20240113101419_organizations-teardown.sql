create policy "Users can select data to their records" on users
  for select
    using (auth.uid () = users.id);

alter table memberships
drop constraint if exists memberships_organization_id_fkey,
add constraint memberships_organization_id_fkey
foreign key (organization_id)
references public.organizations
on delete cascade;

alter table memberships
drop constraint if exists memberships_user_id_fkey,
add constraint memberships_user_id_fkey
foreign key (user_id)
references public.users
on delete cascade;

alter table users
drop constraint if exists users_id_fkey,
add constraint users_id_fkey
foreign key (id)
references auth.users
on delete cascade;