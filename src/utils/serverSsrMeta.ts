import { 
  resolveCurrentSeoConfig, 
  RouteState, 
  SEOConfig, 
  BASE_URL, 
  DEFAULT_OG_IMAGE 
} from "./seoManager";
import { DESTINATIONS_DATA } from "../data/destinationsData";
import { EXPEDITIONS } from "../data/mockData";
import { BLOG_ARTICLES } from "../data/blogsData";
import { SEO_PAGES } from "../data/seoPagesData";

/**
 * Escapes characters for safe HTML attribute and text interpolation
 */
function escapeHtml(str: string | undefined): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Parses request URL path into RouteState
 */
export function parsePathToRouteState(urlPath: string): { routeState: RouteState; path: string } {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0].split("#")[0])
    .trim()
    .replace(/^\//, "")
    .replace(/\/$/, "");

  const routeState: RouteState = {};

  if (!cleanPath || cleanPath === "") {
    return { routeState, path: "/" };
  }

  // Destination route: /destinations/:slug or /destination/:slug
  if (cleanPath.startsWith("destinations/") || cleanPath.startsWith("destination/")) {
    routeState.destinationSlug = cleanPath.replace(/^destinations?\//, "");
    return { routeState, path: `/${cleanPath}` };
  }

  // Package route: /packages/:slug or /package/:slug
  if (cleanPath.startsWith("packages/") || cleanPath.startsWith("package/")) {
    routeState.packageSlug = cleanPath.replace(/^packages?\//, "");
    return { routeState, path: `/${cleanPath}` };
  }

  // Blog route: /blogs/:slug or /blog/:slug or /blogs
  if (cleanPath.startsWith("blogs/") || cleanPath.startsWith("blog/")) {
    routeState.blogSlug = cleanPath.replace(/^blogs?\//, "");
    return { routeState, path: `/${cleanPath}` };
  } else if (cleanPath === "blogs" || cleanPath === "blog") {
    routeState.blogSlug = "all";
    return { routeState, path: `/${cleanPath}` };
  }

  // Static informative views
  if (cleanPath === "about-us" || cleanPath === "about") {
    routeState.isAboutUsOpen = true;
    return { routeState, path: "/about-us" };
  }
  if (cleanPath === "team" || cleanPath === "our-team") {
    routeState.isTeamPageOpen = true;
    return { routeState, path: "/team" };
  }
  if (cleanPath === "careers" || cleanPath === "jobs") {
    routeState.isCareersPageOpen = true;
    return { routeState, path: "/careers" };
  }
  if (cleanPath === "what-to-wear" || cleanPath === "packing-list" || cleanPath === "clothing-guide") {
    routeState.isClothingGuideOpen = true;
    return { routeState, path: "/what-to-wear" };
  }
  if (cleanPath === "terms" || cleanPath === "terms-and-conditions") {
    routeState.isTermsPageOpen = true;
    return { routeState, path: "/terms" };
  }
  if (cleanPath === "privacy-policy" || cleanPath === "privacy") {
    routeState.isPrivacyPageOpen = true;
    return { routeState, path: "/privacy-policy" };
  }
  if (cleanPath === "reels" || cleanPath === "yatra-reels") {
    routeState.isReelsPageOpen = true;
    return { routeState, path: "/reels" };
  }
  if (cleanPath === "memories" || cleanPath === "gallery" || cleanPath === "yatra-memories") {
    routeState.isMemoriesPageOpen = true;
    return { routeState, path: "/memories" };
  }
  if (
    cleanPath === "pithoragarh-flights" ||
    cleanPath === "flights" ||
    cleanPath === "flights-to-pithoragarh" ||
    cleanPath === "how-to-reach-pithoragarh" ||
    cleanPath === "flight-details"
  ) {
    routeState.isPithoragarhFlightsOpen = true;
    return { routeState, path: "/pithoragarh-flights" };
  }

  // Direct SEO page match (e.g. /adi-kailash-yatra-2027)
  const matchedSeo = SEO_PAGES.find(
    (p) => p.slug === cleanPath || p.slug.replace(/-/g, " ") === cleanPath.replace(/-/g, " ")
  );
  if (matchedSeo) {
    routeState.seoSlug = matchedSeo.slug;
    return { routeState, path: `/${cleanPath}` };
  }

  // Direct destination slug match (e.g. /adi-kailash)
  const matchedDest = Object.values(DESTINATIONS_DATA).find((d) => d.slug === cleanPath);
  if (matchedDest) {
    routeState.destinationSlug = matchedDest.slug;
    return { routeState, path: `/destinations/${matchedDest.slug}` };
  }

  // Direct expedition match
  const matchedExp = EXPEDITIONS.find((e) => e.slug === cleanPath);
  if (matchedExp) {
    routeState.packageSlug = matchedExp.slug;
    return { routeState, path: `/packages/${matchedExp.slug}` };
  }

  // Direct blog match
  const matchedBlog = BLOG_ARTICLES.find((b) => b.slug === cleanPath);
  if (matchedBlog) {
    routeState.blogSlug = matchedBlog.slug;
    return { routeState, path: `/blogs/${matchedBlog.slug}` };
  }

  return { routeState, path: `/${cleanPath}` };
}

/**
 * Builds crawler-friendly HTML fallback snippet for rich initial payload
 */
function buildCrawlerSemanticFallback(routeState: RouteState, seoConfig: SEOConfig): string {
  if (routeState.destinationSlug) {
    const cleanSlug = routeState.destinationSlug.toLowerCase().trim();
    const dest = DESTINATIONS_DATA[cleanSlug] || 
      Object.values(DESTINATIONS_DATA).find(d => d.slug === cleanSlug || d.slug.includes(cleanSlug)) || 
      DESTINATIONS_DATA["adi-kailash"];

    return `
      <header style="padding: 2rem 1rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2rem; color: #1e293b; margin-bottom: 0.5rem;">${escapeHtml(dest.title)}</h1>
        <p style="font-size: 1.125rem; color: #b45309; font-weight: bold; margin-bottom: 1rem;">${escapeHtml(dest.tagline || dest.subtitle)}</p>
        <p style="color: #475569; line-height: 1.6; margin-bottom: 1.5rem;">${escapeHtml(dest.overview)}</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.25rem; color: #0f172a; margin-top: 0;">Expedition Overview & 2027 Yatra Pricing</h2>
          <p><strong>Duration:</strong> ${escapeHtml(dest.duration)} | <strong>Altitude:</strong> ${escapeHtml(dest.altitude)} | <strong>Difficulty:</strong> ${escapeHtml(dest.difficulty)}</p>
          <p><strong>Standard Package:</strong> ₹${dest.priceStandard.toLocaleString('en-IN')} / person | <strong>VIP Premium Package:</strong> ₹${dest.pricePremium.toLocaleString('en-IN')} / person</p>
          <p><strong>Inner Line Permit:</strong> Clearances processed directly via SDM Dharchula Desk with 4x4 Bolero transport and medical oxygen cylinders.</p>
        </div>
        ${dest.highlights && dest.highlights.length > 0 ? `
          <h3 style="font-size: 1.1rem; color: #1e293b;">Key Highlights & Sacred Darshans</h3>
          <ul>
            ${dest.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
          </ul>
        ` : ""}
      </header>
    `;
  }

  if (routeState.packageSlug) {
    const cleanSlug = routeState.packageSlug.toLowerCase().trim();
    const pkg = EXPEDITIONS.find(e => e.slug === cleanSlug) || EXPEDITIONS[0];

    return `
      <header style="padding: 2rem 1rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2rem; color: #1e293b; margin-bottom: 0.5rem;">${escapeHtml(pkg.title)}</h1>
        <p style="font-size: 1.25rem; color: #d97706; font-weight: bold;">Official 2027 Price: ${escapeHtml(pkg.price)}</p>
        <p style="color: #475569; line-height: 1.6; margin-bottom: 1.5rem;">${escapeHtml(pkg.description)}</p>
        <p><strong>Location:</strong> ${escapeHtml(pkg.location)} | <strong>Duration:</strong> ${escapeHtml(pkg.duration)} | <strong>Batch:</strong> May & June 2027 Batches</p>
      </header>
    `;
  }

  if (routeState.blogSlug && routeState.blogSlug !== "all") {
    const cleanSlug = routeState.blogSlug.toLowerCase().trim();
    const blog = BLOG_ARTICLES.find(b => b.slug === cleanSlug) || BLOG_ARTICLES[0];

    return `
      <article style="padding: 2rem 1rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2rem; color: #1e293b; margin-bottom: 0.5rem;">${escapeHtml(blog.title)}</h1>
        <p style="color: #64748b; font-size: 0.9rem;">By ${escapeHtml(blog.author.name)} (${escapeHtml(blog.author.role)}) | ${escapeHtml(blog.publishedAt)} | ${escapeHtml(blog.readTime)}</p>
        <p style="color: #334155; font-size: 1.1rem; line-height: 1.6;">${escapeHtml(blog.summary)}</p>
      </article>
    `;
  }

  if (routeState.seoSlug) {
    const cleanSlug = routeState.seoSlug.toLowerCase().trim();
    const page = SEO_PAGES.find(p => p.slug === cleanSlug) || SEO_PAGES[0];

    return `
      <header style="padding: 2rem 1rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;">
        <h1 style="font-size: 2rem; color: #1e293b; margin-bottom: 0.5rem;">${escapeHtml(page.h1 || page.title)}</h1>
        <p style="color: #b45309; font-weight: bold;">${escapeHtml(page.subtitle)}</p>
        <p style="color: #475569; line-height: 1.6;">${escapeHtml(page.metaDescription)}</p>
      </header>
    `;
  }

  return "";
}

/**
 * Injects dynamic SSR metadata, Open Graph tags, canonical URLs, and structured data into HTML
 */
export function injectSsrMetadata(htmlTemplate: string, requestUrl: string): string {
  const { routeState } = parsePathToRouteState(requestUrl);
  const seoConfig = resolveCurrentSeoConfig(routeState);

  const title = escapeHtml(seoConfig.title);
  const description = escapeHtml(seoConfig.description);
  const keywords = Array.isArray(seoConfig.keywords)
    ? escapeHtml(seoConfig.keywords.join(", "))
    : escapeHtml(seoConfig.keywords || "");
  const canonicalUrl = seoConfig.canonicalUrl;
  const ogTitle = escapeHtml(seoConfig.ogTitle || seoConfig.title);
  const ogDesc = escapeHtml(seoConfig.ogDescription || seoConfig.description);
  const ogImg = seoConfig.ogImage || DEFAULT_OG_IMAGE;
  const ogType = seoConfig.ogType || "website";
  const author = escapeHtml(seoConfig.author || "GoTrek Travels Dharchula Pithoragarh");
  const robots = escapeHtml(seoConfig.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

  // Format dynamic Schema.org JSON-LD
  let schemaScript = "";
  const schemas: any[] = [];
  if (seoConfig.breadcrumbs && seoConfig.breadcrumbs.length > 0) {
    schemas.push({
      "@type": "BreadcrumbList",
      "itemListElement": seoConfig.breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": crumb.url.startsWith("http") ? crumb.url : `${BASE_URL}${crumb.url}`,
      })),
    });
  }
  if (seoConfig.schema) {
    if (Array.isArray(seoConfig.schema)) {
      schemas.push(...seoConfig.schema);
    } else {
      schemas.push(seoConfig.schema);
    }
  }
  if (schemas.length > 0) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": schemas,
    };
    schemaScript = `\n    <script id="gotrek-dynamic-schema" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
  }

  // Replace or inject <title>
  let modifiedHtml = htmlTemplate;
  if (/<title>.*?<\/title>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  } else {
    modifiedHtml = modifiedHtml.replace("</head>", `  <title>${title}</title>\n</head>`);
  }

  // Replace or inject <link rel="canonical">
  if (/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    modifiedHtml = modifiedHtml.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // Replace or inject meta description
  if (/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${description}" />`
    );
  }

  // Replace or inject meta keywords
  if (/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="keywords" content="${keywords}" />`
    );
  }

  // Replace Open Graph Tags
  if (/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${ogTitle}" />`
    );
  }
  if (/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${ogDesc}" />`
    );
  }
  if (/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
  }
  if (/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${ogImg}" />`
    );
  }
  if (/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:type" content="${ogType}" />`
    );
  }

  // Replace Twitter Card Tags
  if (/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${ogTitle}" />`
    );
  }
  if (/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${ogDesc}" />`
    );
  }
  if (/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:image" content="${ogImg}" />`
    );
  }
  if (/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i.test(modifiedHtml)) {
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:url" content="${canonicalUrl}" />`
    );
  }

  // Preload route-specific LCP hero image if not already in document
  if (ogImg && !modifiedHtml.includes(`href="${ogImg}"`)) {
    modifiedHtml = modifiedHtml.replace("</head>", `<link rel="preload" as="image" href="${ogImg}" fetchpriority="high">\n</head>`);
  }

  // Inject dynamic structured data right before </head>
  if (schemaScript) {
    modifiedHtml = modifiedHtml.replace("</head>", `${schemaScript}\n</head>`);
  }

  // Inject semantic crawler fallback into #root if route has specific content
  const fallbackHtml = buildCrawlerSemanticFallback(routeState, seoConfig);
  if (fallbackHtml && modifiedHtml.includes('<div id="root"></div>')) {
    modifiedHtml = modifiedHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${fallbackHtml}</div>`
    );
  }

  return modifiedHtml;
}
