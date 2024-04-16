import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// @ts-check
("use strict");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  webpack: (
    config,
    { dev } // { buildId, dev, isServer, defaultLoaders, webpack, ...rest }
  ) => {
    // console.log({
    //     buildId,
    //     dev,
    //     isServer,
    //     defaultLoaders,
    //     webpack,
    //     ...rest,
    // });
    const ftcwp = new ForkTsCheckerWebpackPlugin();
    config.plugins = [...config.plugins, ftcwp];

    if (!dev) {
      config.optimization.minimize = true;
    }
    // console.log({ config });
    return config;
  },
};
const config = withPWA({
  register: true,
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  runtimeCaching,
})(nextConfig);
export default config;
