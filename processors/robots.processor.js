const config = require("config")

module.exports = () => {

  if (process.env.NODE_ENV === "development") return { UserAgent: '*', Disallow: '/' }

  return {
    UserAgent: '*',
    Disallow: [ '/admin', '/dashboard' ],
    Host: config.get("baseUrl"),
    Sitemap: config.get("baseUrl") + "/sitemap.xml"
  }
}