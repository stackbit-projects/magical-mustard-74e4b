const base = {
  name: 'NIK LAL',
  url: 'https://niklal.me'
};

const config = {
  /* meta tags */
  siteTitle: `${base.name}`,
  siteTitlePostfix: ` - ${base.name}`,
  siteDescription: `${
    base.name
  }  engineer, innovator, designer, outdoorsman`,
  siteImage: 'preview.jpg',
  siteLanguage: 'en',

  /* site header */
  headerTitle: `${base.name}`,
//  headerSubTitle: 'a series of starters for GatsbyJS',

  /* url */
  siteUrl: base.url
  // pathPrefix: '',
};

module.exports = config;
