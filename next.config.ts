/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "pt"], // Supported locales
    defaultLocale: "en", // Default locale if no locale is detected
    localeDetection: false,
  },
};

module.exports = nextConfig;

export default nextConfig;
