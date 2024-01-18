drop policy "Users can read subscriptions if they belong to the organization"  on "public"."organizations_subscriptions";

create policy "Users can read subscriptions if they belong to the organization"
on "public"."organizations_subscriptions"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM memberships
  WHERE ((memberships.user_id = auth.uid()) AND (organizations_subscriptions.organization_id = memberships.organization_id)))));