import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import configuration from "../../../configuration";

export function withAuthProps(context: GetServerSidePropsContext) {
  const cookies = getCookie("sessionId", context);

  if (cookies) {
    return {
      redirect: {
        destination: configuration.paths.appHome,
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
