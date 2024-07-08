# Makerkit Clone (Supabase Next14 Stripe Tailwindcss Multi-Organization starter template)
This is a [Next.js](https://nextjs.org/) starter template for a premier multi-tenant SaaS business. Use this All in One launchpad to jumpstart development. This code includes Admin Panel for business management, pre-built user authentication, Supabase integration, Resend, Stripe, UX Animations and more. 

🚀 Launch your saas in 5 minutes, instead of days!


## Getting Started

Clone this repo then start editing strings located in public/locales/en

Edit experiences in /app 
- /dashboard
- /admin
- /site (landing page)


First, run the development server:

```bash
npm install --force
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Quick link to [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Instant deploy
Click below to clone and deploy instantly. Enjoy your new SaaS.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Fcameronking4%2Flra-saas-kit&demo-title=Launch%20Ready%20SaaS&demo-description=The%20ultimate%20startboard%20for%20multi%20organization%20SaaS%20business%20with%20Admin%20Panel%2C%20Auth%2C%20Supabase%2C%20Resend%2C%20Stripe%2C%20Animations%20and%20more.&demo-url=https%3A%2F%2Flra-saas.vercel.app%2F&demo-image=https%3A%2F%2Flra-saas.vercel.app%2F_next%2Fimage%3Furl%3D%252Fassets%252Fimages%252Fdashboard-dark.jpg%26w%3D3840%26q%3D75&showOptionalTeamCreation=false&project-name=lra-saas-kit&framework=nextjs&totalProjects=1&remainingProjects=1)


## Build Settings
Within Vercel, be sure to override the build settings with the following.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Use the sample .env to deploy your application. It will not build correctly without all accurate variables present.
