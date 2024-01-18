alter table "public"."organizations" add column "uuid" uuid not null default gen_random_uuid();

CREATE UNIQUE INDEX organizations_uuid_key ON public.organizations USING btree (uuid);

alter table "public"."organizations" add constraint "organizations_uuid_key" UNIQUE using index "organizations_uuid_key";

DROP FUNCTION public.create_new_organization;

CREATE OR REPLACE FUNCTION public.create_new_organization(org_name text, user_id uuid, create_user boolean DEFAULT true)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  organization bigint;
  uid uuid;
begin
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