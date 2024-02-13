drop function if exists "public"."create_new_organization"(org_name text, user_id uuid, create_user boolean);

alter table "public"."users" add column "source" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_new_organization(org_name text, user_id uuid, create_user boolean, ref_src text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
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
    insert into users (id, onboarded, source)
      values (user_id, true, ref_src);
  end if;
  insert into memberships (user_id, organization_id, role)
    values (user_id, organization, 2);
  return uid;
end;
$function$
;