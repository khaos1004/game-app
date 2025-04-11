const pages = [
    '/',
    '/cart',
    '/companyintro',
    '/contact',
    '/gamelist',
    '/login',
    '/signup',
  ];
  
  module.exports = {
    siteUrl: 'https://jcodelab.shop',
    generateRobotsTxt: true,
    sitemapIndex: false, // index 말고 단일 sitemap
    outDir: './public',
    transform: async (config, path) => {
      return {
        loc: `${config.siteUrl}${path}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      };
    },
    additionalPaths: async (config) => {
      return pages.map((page) => ({
        loc: `${config.siteUrl}${page}`,
        lastmod: new Date().toISOString(),
      }));
    },
  };
  