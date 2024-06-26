# nextjs-doh-reverse-proxy

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.

# 运行方式

设置环境变量 `DOH_ENDPOINT` 上游服务器地址

```
npx cross-env DOH_ENDPOINT=https://doh.pub/dns-query npm run dev
```

访问地址:

```
http://localhost:3000/dns-query
```

# 设置环境变量

设置环境变量 `DOH_ENDPOINT` 上游服务器地址

`DOH_ENDPOINT=https://doh.pub/dns-query`

设置环境变量 `DOH_PATHNAME` 为这个服务器的doh的路径

`DOH_PATHNAME=/dns-query`
