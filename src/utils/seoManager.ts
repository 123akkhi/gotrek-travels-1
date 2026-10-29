import { DESTINATIONS_DATA } from "../data/destinationsData";
import { SEO_PAGES } from "../data/seoPagesData";
import { BLOG_ARTICLES } from "../data/blogsData";
import { EXPEDITIONS } from "../data/mockData";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article" | "product";
  keywords?: string[] | string;
  author?: string;
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: BreadcrumbItem[];
  schema?: Record<string, any> | Record<string, any>[];
}

export interface RouteState {
  destinationSlug?: string;
  packageSlug?: string;
  blogSlug?: string;
  seoSlug?: string;
  isAboutUsOpen?: boolean;
  isTeamPageOpen?: boolean;
  isCareersPageOpen?: boolean;
  isTermsPageOpen?: boolean;
  isPrivacyPageOpen?: boolean;
  isReelsPageOpen?: boolean;
  isMemoriesPageOpen?: boolean;
  isClothingGuideOpen?: boolean;
  isPithoragarhFlightsOpen?: boolean;
  isMedicalFitnessOpen?: boolean;
  currentPath?: string;
}

export const BASE_URL = "https://gotrek.in";
export const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200";
export const SITE_NAME = "GoTrek Travels Pithoragarh & Dharchula";
export const BRAND_NAME = "GoTrek Travels";

/**
 * Safely updates or creates a meta tag in document head
 */
function setMetaTag(nameOrProperty: string, value: string, isProperty = false) {
  if (typeof document === "undefined") return;
  const attribute = isProperty ? "property" : "name";
  let tag = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
  
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, nameOrProperty);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

/**
 * Safely updates or creates the canonical link tag in document head
 */
function setCanonicalUrl(url: string) {
  if (typeof document === "undefined") return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

/**
 * Safely injects dynamic Schema.org JSON-LD graph into document head
 */
function setStructuredData(schemas: (Record<string, any> | undefined)[]) {
  if (typeof document === "undefined") return;
  
  const validSchemas = schemas.filter(Boolean);
  if (validSchemas.length === 0) return;

  let script = document.getElementById("gotrek-dynamic-schema") as HTMLScriptElement;
  if (!script) {
    script = document.createElement("script");
    script.id = "gotrek-dynamic-schema";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": validSchemas,
  };

  script.textContent = JSON.stringify(jsonLd);
}

/**
 * Applies full SEO configuration to the live DOM
 */
export function updateSeoMetadata(config: SEOConfig) {
  if (typeof document === "undefined") return;

  // 1. Document Title
  document.title = config.title;

  // 2. Canonical URL
  setCanonicalUrl(config.canonicalUrl);

  // 3. Core Meta Tags
  setMetaTag("description", config.description);
  setMetaTag(
    "keywords",
    Array.isArray(config.keywords) ? config.keywords.join(", ") : config.keywords || ""
  );
  setMetaTag("author", config.author || "GoTrek Travels Dharchula Pithoragarh");
  setMetaTag("robots", config.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

  // 4. Open Graph Tags
  const ogTitle = config.ogTitle || config.title;
  const ogDesc = config.ogDescription || config.description;
  const ogImg = config.ogImage || DEFAULT_OG_IMAGE;
  const ogType = config.ogType || "website";

  setMetaTag("og:title", ogTitle, true);
  setMetaTag("og:description", ogDesc, true);
  setMetaTag("og:url", config.canonicalUrl, true);
  setMetaTag("og:image", ogImg, true);
  setMetaTag("og:type", ogType, true);
  setMetaTag("og:site_name", SITE_NAME, true);
  setMetaTag("og:locale", "en_IN", true);
  if (config.ogImageAlt) {
    setMetaTag("og:image:alt", config.ogImageAlt, true);
  }

  // 5. Twitter Card Tags
  setMetaTag("twitter:card", "summary_large_image");
  setMetaTag("twitter:title", ogTitle);
  setMetaTag("twitter:description", ogDesc);
  setMetaTag("twitter:image", ogImg);
  setMetaTag("twitter:url", config.canonicalUrl);
  setMetaTag("twitter:site", "@GoTrekTravels");

  // 6. Article Specific Meta
  if (ogType === "article") {
    if (config.publishedTime) {
      setMetaTag("article:published_time", config.publishedTime, true);
    }
    if (config.modifiedTime) {
      setMetaTag("article:modified_time", config.modifiedTime, true);
    }
    setMetaTag("article:section", "Himalayan Travel & Pilgrimage", true);
  }

  // 7. Dynamic Schema.org Generation
  const schemaList: Record<string, any>[] = [];

  // Breadcrumbs schema
  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    schemaList.push({
      "@type": "BreadcrumbList",
      "itemListElement": config.breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": crumb.url.startsWith("http") ? crumb.url : `${BASE_URL}${crumb.url}`,
      })),
    });
  }

  // Custom provided schemas
  if (config.schema) {
    if (Array.isArray(config.schema)) {
      schemaList.push(...config.schema);
    } else {
      schemaList.push(config.schema);
    }
  }

  if (schemaList.length > 0) {
    setStructuredData(schemaList);
  }
}

/**
 * Builds SEO configuration for Destination Detail Pages
 */
export function getDestinationSeoConfig(slug: string): SEOConfig {
  const cleanSlug = slug.toLowerCase().trim();
  const dest = DESTINATIONS_DATA[cleanSlug] || 
    Object.values(DESTINATIONS_DATA).find(d => d.slug === cleanSlug || d.slug.includes(cleanSlug)) || 
    DESTINATIONS_DATA["adi-kailash"];

  const title = `${dest.title} Package 2027 | Permits, Itinerary & Cost | ${BRAND_NAME}`;
  const description = `${dest.overview.slice(0, 155)}... Book authorized 2027 ${dest.title} with local 4x4 Bolero, SDM Inner Line Permit clearance, homestays, and medical oxygen support.`;
  const canonicalUrl = `${BASE_URL}/destinations/${dest.slug}`;
  const ogImage = dest.bannerImage || DEFAULT_OG_IMAGE;

  const keywords = [
    dest.title,
    `${dest.title} 2027`,
    `${dest.title} package`,
    `${dest.title} permit`,
    `${dest.title} itinerary`,
    `${dest.location} tour`,
    "GoTrek Travels Dharchula",
    "Uttarakhand Pilgrimage 2027",
    "Inner Line Permit Dharchula",
    ...(dest.highlights || []).slice(0, 5)
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Destinations", url: "/#destinations" },
    { name: dest.title, url: `/destinations/${dest.slug}` }
  ];

  // Schema for TouristDestination & TouristTrip
  const destinationSchema = {
    "@type": "TouristDestination",
    "@id": `${canonicalUrl}#destination`,
    "name": dest.title,
    "description": dest.overview,
    "image": dest.bannerImage,
    "touristType": ["Pilgrims", "Adventure Seekers", "Nature Lovers"],
    "includesAttraction": (dest.famousSpots || []).map(spot => ({
      "@type": "TouristAttraction",
      "name": spot.name,
      "description": spot.significance || spot.description,
      "image": spot.image
    }))
  };

  const tripSchema = {
    "@type": "TouristTrip",
    "@id": `${canonicalUrl}#trip`,
    "name": `${dest.title} Expedition 2027`,
    "description": dest.overview,
    "touristType": "Pilgrimage",
    "offers": {
      "@type": "Offer",
      "price": dest.priceStandard,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": canonicalUrl,
      "validFrom": "2027-05-01"
    },
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": dest.itinerary.length,
      "itemListElement": dest.itinerary.map((day, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": `Day ${day.day}: ${day.title}`,
        "description": day.desc
      }))
    }
  };

  return {
    title,
    description,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageAlt: dest.title,
    ogType: "website",
    keywords,
    breadcrumbs,
    schema: [destinationSchema, tripSchema]
  };
}

/**
 * Builds SEO configuration for Package Detail Pages
 */
export function getPackageSeoConfig(slug: string): SEOConfig {
  const cleanSlug = slug.toLowerCase().trim();
  const expedition = EXPEDITIONS.find(e => e.slug === cleanSlug) || EXPEDITIONS[0];

  const title = `${expedition.title} 2027 (₹${expedition.price.replace(/[^0-9]/g, '')}) | GoTrek Travels`;
  const description = `${expedition.description} Official 2027 batch booking with 4x4 Bolero, complete SDM Inner Line Permit processing, and local guides from Dharchula.`;
  const canonicalUrl = `${BASE_URL}/packages/${expedition.slug}`;
  const ogImage = expedition.image || DEFAULT_OG_IMAGE;

  const keywords = [
    expedition.title,
    `${expedition.title} booking`,
    `${expedition.title} cost 2027`,
    expedition.location,
    "Adi Kailash Package 2027",
    "Char Dham Yatra Package",
    "GoTrek Travels Official Booking",
    ...(expedition.highlights || [])
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Yatra Packages", url: "/#packages" },
    { name: expedition.title, url: `/packages/${expedition.slug}` }
  ];

  const offerSchema = {
    "@type": "Product",
    "name": expedition.title,
    "image": expedition.image,
    "description": expedition.description,
    "brand": {
      "@type": "Brand",
      "name": "GoTrek Travels"
    },
    "offers": {
      "@type": "Offer",
      "price": expedition.price.replace(/[^0-9]/g, ""),
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": canonicalUrl
    }
  };

  return {
    title,
    description,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageAlt: expedition.title,
    ogType: "product",
    keywords,
    breadcrumbs,
    schema: [offerSchema]
  };
}

/**
 * Builds SEO configuration for Blog Articles
 */
export function getBlogSeoConfig(slug: string): SEOConfig {
  const cleanSlug = slug.toLowerCase().trim();
  const blog = BLOG_ARTICLES.find(b => b.slug === cleanSlug) || BLOG_ARTICLES[0];

  const title = `${blog.title} | Official GoTrek Guide`;
  const description = `${blog.summary.slice(0, 155)}... Read essential travel tips, permit guidelines, and altitude safety by ${blog.author.name}.`;
  const canonicalUrl = `${BASE_URL}/blogs/${blog.slug}`;
  const ogImage = blog.coverImage || DEFAULT_OG_IMAGE;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Pilgrimage Blogs & Guides", url: "/#blogs" },
    { name: blog.title, url: `/blogs/${blog.slug}` }
  ];

  const blogSchema = {
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.summary,
    "image": blog.coverImage,
    "datePublished": blog.publishedAt,
    "dateModified": blog.publishedAt,
    "author": {
      "@type": "Person",
      "name": blog.author.name,
      "jobTitle": blog.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "GoTrek Travels",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.jpg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return {
    title,
    description,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageAlt: blog.title,
    ogType: "article",
    publishedTime: blog.publishedAt,
    keywords: [blog.title, blog.category, "Adi Kailash Guide", "Uttarakhand Travel Blog", "Inner Line Permit Guide"],
    breadcrumbs,
    schema: [blogSchema]
  };
}

/**
 * Builds SEO configuration for SEO Keyword Landers
 */
export function getSeoPageConfig(slug: string): SEOConfig {
  const cleanSlug = slug.toLowerCase().trim();
  const page = SEO_PAGES.find(p => p.slug === cleanSlug) || SEO_PAGES[0];

  const title = page.metaTitle || `${page.h1} | GoTrek Travels`;
  const description = page.metaDescription;
  const canonicalUrl = `${BASE_URL}/${page.slug}`;
  const ogImage = DEFAULT_OG_IMAGE;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: page.category, url: `/${page.slug}` },
    { name: page.title, url: `/${page.slug}` }
  ];

  const faqSchema = page.faqs && page.faqs.length > 0 ? {
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : undefined;

  return {
    title,
    description,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogImageAlt: page.title,
    ogType: "website",
    keywords: page.keywords,
    breadcrumbs,
    schema: faqSchema ? [faqSchema] : undefined
  };
}

/**
 * Static page configurations
 */
export function getStaticPageSeoConfig(pageType: string): SEOConfig {
  switch (pageType) {
    case "about-us":
    case "about":
      return {
        title: "About GoTrek Travels Dharchula | Uttarakhand Tourism Reg #UTTR/PITHORAGARH/04-2026/450066",
        description: "Learn about GoTrek Travels — Dharchula's premier local ground operator for Adi Kailash, Om Parvat & sacred Kumaon pilgrimages. Direct SDM permit desk & 15+ years Himalayan expertise.",
        canonicalUrl: `${BASE_URL}/about-us`,
        keywords: ["About GoTrek Travels", "Dharchula tour operator", "Uttarakhand Tourism Registered", "Adi Kailash local guide"],
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about-us" }
        ]
      };

    case "team":
      return {
        title: "Meet the GoTrek Mountain Leaders & Dharchula Ground Team | GoTrek Travels",
        description: "Meet our certified local Kumaoni trek leaders, high-altitude 4x4 drivers, medical officers, and SDM permit filing specialists in Dharchula & Pithoragarh.",
        canonicalUrl: `${BASE_URL}/team`,
        keywords: ["GoTrek Team", "Dharchula Guides", "Himalayan Expedition Leaders", "Adi Kailash Local Staff"],
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Our Team", url: "/team" }
        ]
      };

    case "careers":
      return {
        title: "Careers at GoTrek Travels | Join Our Himalayan Expedition Team",
        description: "Explore career opportunities in mountain guiding, high-altitude logistics, customer support, and travel operations in Uttarakhand with GoTrek Travels.",
        canonicalUrl: `${BASE_URL}/careers`,
        keywords: ["GoTrek Careers", "Travel Jobs Uttarakhand", "Trekking Guide Hiring", "Dharchula Jobs"],
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" }
        ]
      };

    case "what-to-wear":
    case "clothing-guide":
      return {
        title: "Adi Kailash Packing List & What to Wear at 14,500 ft | GoTrek Essentials Guide",
        description: "Comprehensive clothing and equipment checklist for Adi Kailash, Om Parvat, and Jolingkong. Layering guide, thermal wear, boots, and medical kit essentials.",
        canonicalUrl: `${BASE_URL}/what-to-wear`,
        keywords: ["Adi Kailash packing list", "What to wear in Jolingkong", "High altitude trekking clothes", "Om Parvat gear guide"],
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "What to Wear & Packing Guide", url: "/what-to-wear" }
        ]
      };

    case "reels":
      return {
        title: "Adi Kailash & Om Parvat Yatra Reels & Live Field Videos | GoTrek Travels",
        description: "Watch live footage, stunning snow darshan videos, homestay experiences, and pilgrim testimonials directly from Vyas Valley and Jolingkong.",
        canonicalUrl: `${BASE_URL}/reels`,
        keywords: ["Adi Kailash Reels", "Om Parvat Videos", "Dharchula Field Footage", "Yatra Testimonials"],
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Yatra Reels", url: "/reels" }
        ]
      };

    case "memories":
    case "gallery":
      return {
        title: "Pilgrim Photo Gallery & Yatra Memories 2026-2027 | GoTrek Travels",
        description: "High-resolution photos of Parvati Sarovar, Gauri Kund, Om Parvat, Gunji village, and happy yatris guided by GoTrek Travels.",
        canonicalUrl: `${BASE_URL}/memories`,
        keywords: ["Adi Kailash Photos", "Parvati Sarovar Gallery", "Om Parvat Pictures", "GoTrek Yatra Memories"],
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Photo Gallery", url: "/memories" }
        ]
      };

    case "terms":
    case "terms-and-conditions":
      return {
        title: "Terms & Conditions | GoTrek Travels Dharchula Booking & Cancellation Policy",
        description: "Read official booking guidelines, permit verification policies, advance refund rules, and weather contingency terms for GoTrek Himalayan tours.",
        canonicalUrl: `${BASE_URL}/terms`,
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Terms & Conditions", url: "/terms" }
        ]
      };

    case "privacy-policy":
    case "privacy":
      return {
        title: "Privacy Policy | GoTrek Travels Dharchula Pilgrim Data Security",
        description: "Our commitment to protecting pilgrim identity documents, Aadhar details for Inner Line Permit filing, and secure payment processing.",
        canonicalUrl: `${BASE_URL}/privacy-policy`,
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" }
        ]
      };

    case "pithoragarh-flights":
    case "how-to-reach-pithoragarh":
    case "flights-to-pithoragarh":
      return {
        title: "Flights to Pithoragarh (NGH) from Delhi & Dehradun: Timetable, Schedules & 4x4 Transfers | GoTrek Travels",
        description: "Complete guide to reaching Pithoragarh by flight from Delhi (DEL, 80 mins, 11:00 AM) and Dehradun (DED, 45 mins, 01:55 PM). Alliance Air ATR-42 schedules, operating days, UDAN fares, baggage rules & private 4x4 pickups to Dharchula.",
        canonicalUrl: `${BASE_URL}/pithoragarh-flights`,
        keywords: [
          "Pithoragarh flights",
          "Delhi to Pithoragarh flight timing",
          "Dehradun to Pithoragarh flight schedule",
          "Naini Saini Airport flight",
          "Alliance Air Pithoragarh",
          "How to reach Pithoragarh by air",
          "Adi Kailash flight route",
          "Dharchula airport pickup"
        ],
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "Yatra Logistics", url: "/blogs" },
          { name: "Flights to Pithoragarh (Delhi & Dehradun)", url: "/pithoragarh-flights" }
        ]
      };

    case "medical-fitness":
    case "medical-fitness-checklist":
    case "fitness-clearance":
      return {
        title: "Adi Kailash Medical Fitness Checklist & Altitude Clearance Pass | GoTrek Safety",
        description: "Interactive high-altitude medical fitness checklist and instant clearance pass for Adi Kailash, Om Parvat (14,950 ft), and Char Dham Yatra. Download official PDF pass aligned with SDM Dharchula ILP requirements.",
        canonicalUrl: `${BASE_URL}/medical-fitness`,
        keywords: [
          "Adi Kailash medical fitness",
          "high altitude medical checklist",
          "SDM Dharchula medical certificate",
          "AMS guidelines Adi Kailash",
          "Om Parvat fitness criteria",
          "Yatra medical pass",
          "Vyas Valley oxygen requirements"
        ],
        breadcrumbs: [
          { name: "Home", url: "/" },
          { name: "High-Altitude Safety", url: "/blogs" },
          { name: "Medical Fitness & Clearance Pass", url: "/medical-fitness" }
        ]
      };

    default:
      return getDefaultSeoConfig();
  }
}

/**
 * Default Homepage SEO Configuration
 */
export function getDefaultSeoConfig(): SEOConfig {
  return {
    title: "Adi Kailash Yatra 2027 Package | Om Parvat & Vyas Valley Inner Line Permit | GoTrek Travels Dharchula",
    description: "Official GoTrek Travels Dharchula (Uttarakhand Tourism Reg #UTTR/PITHORAGARH/04-2026/450066, MSME #UDYAM-UK-09-0011014) — Book Adi Kailash Yatra 2027, Om Parvat, Parvati Sarovar & Panchachuli Base Camp. Complete 4x4 Bolero, SDM Inner Line Permit filing, Rung Homestays, doctor-certified oxygen support & Helicopter packages.",
    canonicalUrl: `${BASE_URL}/`,
    ogTitle: "Adi Kailash Yatra 2027 & Om Parvat Expedition | GoTrek Official Permits",
    ogDescription: "Guaranteed SDM Inner Line Permit, 4x4 Bolero, Oxygen Support & Rung Community Homestays. Book May & June 2027 Batches with ₹3,000 advance.",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "Adi Kailash and Om Parvat Sacred Peak",
    ogType: "website",
    keywords: [
      "Adi Kailash Yatra 2027",
      "Adi Kailash package from Delhi",
      "Adi Kailash tour from Mumbai",
      "Adi Kailash Yatra from Ahmedabad",
      "Adi Kailash booking from Bangalore",
      "Adi Kailash tour from Pune",
      "Adi Kailash tour from Kolkata",
      "Adi Kailash tour from Lucknow",
      "Om Parvat package 2027",
      "Inner Line Permit Dharchula",
      "Vyas Valley trek",
      "Chota Kailash registration",
      "Parvati Sarovar altitude",
      "Jolingkong homestay",
      "KMVN alternative tour operator",
      "Char Dham Yatra 2027",
      "Gunji homestay",
      "Pithoragarh helicopter booking",
      "GoTrek Travels Dharchula",
      "Kumaon Mandal Vikas Nigam",
      "Panchachuli Base Camp Trek",
      "आदि कैलाश यात्रा 2027",
      "ॐ पर्वत पैकेज 2027",
      "धारचूला इनर लाइन परमिट",
      "छोटा कैलाश यात्रा बुकिंग"
    ],
    breadcrumbs: [
      { name: "Home", url: "/" }
    ]
  };
}

/**
 * Master Resolver for the current active page/route
 */
export function resolveCurrentSeoConfig(state: RouteState): SEOConfig {
  if (state.destinationSlug) {
    return getDestinationSeoConfig(state.destinationSlug);
  }

  if (state.packageSlug) {
    return getPackageSeoConfig(state.packageSlug);
  }

  if (state.blogSlug) {
    return getBlogSeoConfig(state.blogSlug);
  }

  if (state.seoSlug) {
    return getSeoPageConfig(state.seoSlug);
  }

  if (state.isAboutUsOpen) return getStaticPageSeoConfig("about-us");
  if (state.isTeamPageOpen) return getStaticPageSeoConfig("team");
  if (state.isCareersPageOpen) return getStaticPageSeoConfig("careers");
  if (state.isClothingGuideOpen) return getStaticPageSeoConfig("what-to-wear");
  if (state.isReelsPageOpen) return getStaticPageSeoConfig("reels");
  if (state.isMemoriesPageOpen) return getStaticPageSeoConfig("memories");
  if (state.isTermsPageOpen) return getStaticPageSeoConfig("terms");
  if (state.isPrivacyPageOpen) return getStaticPageSeoConfig("privacy-policy");
  if (state.isPithoragarhFlightsOpen) return getStaticPageSeoConfig("pithoragarh-flights");
  if (state.isMedicalFitnessOpen) return getStaticPageSeoConfig("medical-fitness");

  return getDefaultSeoConfig();
}
