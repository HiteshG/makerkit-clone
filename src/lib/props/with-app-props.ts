import { GetServerSidePropsContext } from "next";
import admin from "@/lib/firebaseAdmin";
import { getCookie } from "cookies-next";
import configuration from "../../../configuration";
import { getOrganizationById } from "../organizations/server/get-organization";

export async function withAppProps(context: GetServerSidePropsContext) {
  const cookies = getCookie("sessionId", context);

  if (cookies) {
    try {
      const auth = admin.auth();
      const decodedClaims = await auth.verifySessionCookie(cookies, true);

      const user = await auth.getUser(decodedClaims.uid);
      console.log(user);

      const { organizationId } = context.query;

      let organization: any = null;
      if (organizationId) {
        organization = await getOrganizationById(organizationId as string);
      }
      console.log(organization);

      return {
        props: {
          userData: JSON.stringify(user),
          organizationData: JSON.stringify(organization),
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: configuration.paths.signIn,
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: configuration.paths.signIn,
        permanent: false,
      },
    };
  }
}
