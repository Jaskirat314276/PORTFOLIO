/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json exists in the home directory; pin the
  // workspace root so Turbopack doesn't guess wrong.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
