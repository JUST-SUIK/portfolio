import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
});

export const config = {
  matcher: ['/((?!_next|images|favicon.ico|robots.txt|sitemap.xml|resume.pdf).*)'],
};
