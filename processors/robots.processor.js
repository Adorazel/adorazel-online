const config = require("config")

module.exports = () => {

  if (process.env.NODE_ENV === "development") return { UserAgent: '*', Disallow: '/' }

  return {
    UserAgent: '*',
    Disallow: [ '/admin', '/dashboard' ],
    Host: config.get("sitemapBaseUrl"),
    Sitemap: config.get("sitemapBaseUrl") + "/sitemap.xml"
  }
}