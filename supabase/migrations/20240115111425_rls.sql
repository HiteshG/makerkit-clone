create or replace function assert_service_role() returns void as $$
begin
  if current_setting('role') != 'authenticated' AND current_setting('role') !=
   'service_role' then
    raise exception 'authentication required';
  end if;
end;
$$ language plpgsql;

create or replace function get_organizations_for_authenticated_user ()
returns setof bigint
as $$
begin
  return query select
    organization_id
  from
    memberships
  where
    user_id = auth.uid ()
    and code is null;
end;
$$ language plpgsql security definer set search_path = public;

create or replace function accept_invite_to_organization (invite_code text, invite_user_id uuid)
  returns json
  language PLPGSQL
  security definer
  set search_path = public
  as $$
declare
  organization bigint;
  membership bigint;
  target_role int;
begin
  perform assert_service_role();

  if not exists(select 1 from users where id = invite_user_id) then
    insert into users (id, onboarded)
      values (invite_user_id, true);
  end if;

  select "role" from memberships
  where code = invite_code
  into target_role;

  if target_role is null then
    raise exception 'Invite code not found';
  end if;

  if target_role = 2 then
    raise exception 'Owner cannot be invited';
  end if;

  update
    memberships
  set
    user_id = invite_user_id,
    code = null,
    invited_email = null
  where
    code = invite_code
  returning
    id,
    organization_id into membership,
    organization;
  return json_build_object('organization', organization, 'membership', membership);
end;
$$;

create or replace function transfer_organization (org_id bigint, target_user_membership_id bigint)
  returns void
  security definer
  set search_path = public
  language PLPGSQL
  as $$
declare
  current_user_role int;
  current_user_membership_id int;
begin
  perform assert_service_role();

  select id, role from memberships where user_id = auth.uid() into current_user_membership_id, current_user_role;

  if current_user_role != 2 then
    raise exception 'Only owners can transfer organizations';
  end if;

  if current_user_membership_id = target_user_membership_id then
    raise exception 'Cannot transfer organization to yourself';
  end if;

  update
    memberships
  set
    role = 2
  where
    id = target_user_membership_id;
  update
    memberships
  set
    role = 1
  where
    user_id = auth.uid ()
    and organization_id = org_id;
end;
$$;

CREATE OR REPLACE FUNCTION create_new_organization(org_name text, user_id uuid, create_user boolean DEFAULT true)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 set search_path = public
AS $function$
declare
  organization bigint;
  uid uuid;
begin
  perform assert_service_role();

  insert into organizations ("name")
    values (org_name)
  returning
    id, uuid into organization, uid;
  if create_user then
    insert into users (id, onboarded)
      values (user_id, true);
  end if;
  insert into memberships (user_id, organization_id, role)
    values (user_id, organization, 2);
  return uid;
end;
$function$
;

create or replace function can_update_user_role (membership_id bigint)
  returns bool
  language PLPGSQL
  as $$
declare
  current_user_role int;
  org_id bigint;
begin
  select organization_id from memberships where id = membership_id into org_id;

  select
    get_role_for_authenticated_user (org_id) into current_user_role;

  return current_user_role > get_role_for_user (membership_id);
end;
$$;

drop policy "Memberships can only be deleted if the user's role who updates
" on "public"."memberships";

drop policy "Memberships can only be read by members that belong to the
  or" on "public"."memberships";

drop policy "Memberships can only be updated if the user's role who updates
" on "public"."memberships";

drop policy "Pending memberships can be read by members assigned to one" on "public"."memberships";

drop policy "Organizations can be read by invited members to that organizati" on "public"."organizations";

drop policy "Organizations can only be selectable by the members of the
  or" on "public"."organizations";

drop policy "Organizations can only be updated by the members of the
  organ" on "public"."organizations";

drop policy "Users can read subscriptions if they belong to the organization" on "public"."organizations_subscriptions";

drop policy "Users can read the public data of users belonging to the same
 " on "public"."users";

drop policy "Users can select data to their records" on "public"."users";

drop policy "Users can update data to only their records" on "public"."users";

create policy "Memberships can only be deleted if the user's role who updates
"
on "public"."memberships"
as permissive
for delete
to authenticated
using (can_update_user_role(organization_id, id));

create policy "Memberships can only be read by Org members"
on "public"."memberships"
as permissive
for select
to authenticated
using (current_user_is_member_of_organization(organization_id));

create policy "Organizations can only be selectable by Org members"
on "public"."organizations"
as permissive
for select
to authenticated
using (current_user_is_member_of_organization(id));

create policy "Organizations can only be updated by the members of the
  organization"
on "public"."organizations"
as permissive
for update
to authenticated
using (current_user_is_member_of_organization(id))
with check (current_user_is_member_of_organization(id));

create policy "Users can read subscriptions if they belong to the organization"
on "public"."organizations_subscriptions"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM memberships
  WHERE ((memberships.user_id = auth.uid()) AND (memberships.organization_id = memberships.organization_id)))));

create policy "Users can read the public data of users belonging to the same"
on "public"."users"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM memberships
  WHERE (memberships.organization_id IN ( SELECT get_organizations_for_authenticated_user() AS get_organizations_for_authenticated_user)))));


create policy "Users can select data to their records"
on "public"."users"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "Users can update data to only their records"
on "public"."users"
as permissive
for update
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));

alter table "public"."organizations" add constraint "organizations_name_check" CHECK ((length(name) < 50)) not valid;

alter table "public"."organizations" validate constraint "organizations_name_check";

alter table "public"."users" add constraint "users_display_name_check" CHECK ((length(display_name) < 100)) not valid;

alter table "public"."users" validate constraint "users_display_name_check";
