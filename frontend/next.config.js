const repoName = "mvst-coffee-code-challenge";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`
};

export default nextConfig;