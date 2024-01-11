import { GetServerSidePropsContext } from "next";
import { getAuth } from "firebase/auth";

export async function withAppProps(context: GetServerSidePropsContext) {
  const auth = getAuth();
  const cookies = context.req.headers.cookies;
  const csrfToken = context.req.headers["x-csrf-token"];
  console.log(auth);

  //   if (!auth.currentUser) {
  //     return {
  //       redirect: {
  //         destination: "/auth/sign-in",
  //         permanent: false,
  //       },
  //     };
  //   }

  return {
    props: {
      //   cookies,
      //   csrfToken,
    },
  };
}
