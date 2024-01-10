import { GoogleAuthProvider } from "firebase/auth";

enum Themes {
  Light = "light",
  Dark = "dark",
}

const configuration = {
  site: {
    name: "Awesomely - Your SaaS Title",
    description: "Your SaaS Description",
    themeColor: "#ffffff",
    themeColorDark: "#0a0a0a",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
    siteName: "Awesomely",
    twitterHandle: "",
    githubHandle: "",
    language: "en",
    convertKitFormId: "",
    locale: process.env.DEFAULT_LOCALE,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  auth: {
    // Enable MFA. You must upgrade to GCP Identity Platform to use it.
    // see: https://cloud.google.com/identity-platform/docs/product-comparison
    enableMultiFactorAuth: true,
    // When enabled, users will be required to verify their email address
    // before being able to access the app
    requireEmailVerification:
      process.env.NEXT_PUBLIC_REQUIRE_EMAIL_VERIFICATION === "true",
    // NB: Enable the providers below in the Firebase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      oAuth: [GoogleAuthProvider],
    },
  },
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
  emulatorHost: process.env.NEXT_PUBLIC_EMULATOR_HOST,
  emulator: process.env.NEXT_PUBLIC_EMULATOR === "true",
  production: process.env.NODE_ENV === "production",
  features: {
    enableThemeSwitcher: true,
  },
  theme: Themes.Dark,
  paths: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    emailLinkSignIn: "/auth/link",
    onboarding: `/onboarding`,
    appHome: "/dashboard",
    settings: {
      profile: "/settings/profile",
      authentication: "/settings/profile/authentication",
      email: "/settings/profile/email",
      password: "/settings/profile/password",
    },
    api: {
      checkout: `/api/stripe/checkout`,
      billingPortal: `/api/stripe/portal`,
    },
  },
  navigation: {},
  appCheckSiteKey: process.env.NEXT_PUBLIC_APPCHECK_KEY,
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  stripe: {
    products: [
      {
        name: "Basic",
        description: "Description of your Basic plan",
        badge: `Up to 20 users`,
        features: [
          "Basic Reporting",
          "Up to 20 users",
          "1GB for each user",
          "Chat Support",
        ],
        plans: [
          {
            name: "Monthly",
            price: "$9",
            stripePriceId: "<price_id>",
          },
          {
            name: "Yearly",
            price: "$90",
            stripePriceId: "<price_id>",
          },
        ],
      },
      {
        name: "Pro",
        badge: `Most Popular`,
        recommended: true,
        description: "Description of your Pro plan",
        features: [
          "Advanced Reporting",
          "Up to 50 users",
          "5GB for each user",
          "Chat and Phone Support",
        ],
        plans: [
          {
            name: "Monthly",
            price: "$29",
            stripePriceId: "<price_id>",
          },
          {
            name: "Yearly",
            price: "$200",
            stripePriceId: "<price_id>",
          },
        ],
      },
      {
        name: "Premium",
        description: "Description of your Premium plan",
        badge: ``,
        features: [
          "Advanced Reporting",
          "Unlimited users",
          "50GB for each user",
          "Account Manager",
        ],
        plans: [
          {
            name: "",
            price: "Contact us",
            stripePriceId: "",
            label: `Contact us`,
            href: `/contact`,
          },
        ],
      },
    ],
  },
};

export default configuration;
