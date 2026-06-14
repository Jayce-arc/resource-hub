/**
 * ════════════════════════════════════════════════════════════════
 *  CURATED RESOURCE HUB — app.js
 *  © 2025 Resource Hub. All rights reserved.
 *
 *  Sections:
 *    1. RESOURCES  — all data in one place; edit here only
 *    2. CONFIG     — badge/category metadata
 *    3. HELPERS    — pure utility functions
 *    4. CARD       — DOM builder for one resource entry
 *    5. FILTER     — matching logic (pure, testable)
 *    6. UI UPDATE  — applies visibility + counter
 *    7. BOOTSTRAP  — wires DOM events on DOMContentLoaded
 * ════════════════════════════════════════════════════════════════
 */

"use strict";

/* ════════════════════════════════════════════════════════════════
   1. RESOURCES
   ────────────────────────────────────────────────────────────────
   Each entry:
     id       {string}       unique kebab-case slug
     name     {string}       display title
     category {string}       one of the keys in CATEGORY_CONFIG
     desc     {string}       description; **text** renders as bold
     url      {string|null}  null = no outbound link (avoid cards)
   ════════════════════════════════════════════════════════════════ */

const RESOURCES = [

  /* ── PC APPLICATIONS ─────────────────────────────────── */
  {
    id: "spicetify",
    name: "Spicetify",
    category: "pc-applications",
    desc: "Customise your Spotify desktop app — themes, extensions, and visual tweaks without modifying the app binaries.",
    url: "https://spicetify.app/",
  },
  {
    id: "malwarebytes",
    name: "Malwarebytes",
    category: "pc-applications",
    desc: "Reliable on-demand antivirus scanner. Not mandatory if you're careful about downloads, but a solid safety net.",
    url: "https://www.malwarebytes.com/",
  },
  {
    id: "nearby-share",
    name: "Nearby Share Beta",
    category: "pc-applications",
    desc: "Share files wirelessly between your PC and Android phone. **Bluetooth required.** Works like AirDrop on Windows.",
    url: "https://android.com/better-together/nearby-share-app/",
  },
  {
    id: "mullvad",
    name: "Mullvad VPN",
    category: "pc-applications",
    desc: "**Paid VPN** at a very fair flat rate. No email or account required at sign-up — one of the strongest privacy stances in the industry.",
    url: "https://mullvad.net/",
  },
  {
    id: "windscribe",
    name: "Windscribe",
    category: "pc-applications",
    desc: "**Free VPN** with a generous monthly data allowance. Also available as a browser extension for lighter use.",
    url: "https://windscribe.com/",
  },
  {
    id: "flow-launcher",
    name: "Flow Launcher",
    category: "pc-applications",
    desc: "Windows app launcher modelled after macOS Spotlight. Press a shortcut, search apps or files instantly. Plugin support included.",
    url: "https://www.flowlauncher.com/",
  },
  {
    id: "fitgirl-repacks",
    name: "FitGirl Repacks",
    category: "pc-applications",
    desc: "Trusted torrent site for highly compressed PC game repacks. **Tip:** Close other apps during installation — the unpacker is **RAM-intensive.**",
    url: "https://fitgirl-repacks.site/",
  },
  {
    id: "qbittorrent",
    name: "qBittorrent",
    category: "pc-applications",
    desc: "The recommended open-source torrent client. Clean, ad-free, and actively maintained. Use this instead of uTorrent.",
    url: "https://www.qbittorrent.org/",
  },

  /* ── BROWSER EXTENSIONS ──────────────────────────────── */
  {
    id: "ublock-origin",
    name: "uBlock Origin",
    category: "browser-extensions",
    desc: "**The best ad and tracker blocker.** Lightweight, open-source, and highly effective. Should be the first extension you install.",
    url: "https://ublockorigin.com/",
  },
  {
    id: "colorpicker",
    name: "ColorPicker",
    category: "browser-extensions",
    desc: "Pick any colour from any webpage and get its HEX, RGB, or HSL value instantly. Essential for designers.",
    url: "https://chrome.google.com/webstore/detail/color-picker-eyedropper/ikbgendfjbneogpgnlkeioekflgajhck",
  },
  {
    id: "aha-music",
    name: "AHA Music",
    category: "browser-extensions",
    desc: "Identify any song playing in your browser tab — essentially Shazam for Chrome and Firefox.",
    url: "https://www.aha-music.com/identify-songs-music-recognition-online",
  },
  {
    id: "authenticator",
    name: "Authenticator",
    category: "browser-extensions",
    desc: "OTP and two-factor authenticator built into your browser. Supports standard TOTP codes as a Google Authenticator alternative.",
    url: "https://authenticator.cc/",
  },
  {
    id: "dashlane",
    name: "Dashlane",
    category: "browser-extensions",
    desc: "Free and paid password manager. **Refer friends to earn 6 months of premium for free** when they sign up.",
    url: "https://www.dashlane.com/",
  },
  {
    id: "bitwarden",
    name: "Bitwarden",
    category: "browser-extensions",
    desc: "Free, **open-source** password manager and the recommended Dashlane alternative. Sync across all devices at no cost.",
    url: "https://bitwarden.com/",
  },
  {
    id: "enhancer-youtube",
    name: "Enhancer for YouTube",
    category: "browser-extensions",
    desc: "Upgrades the YouTube experience — custom themes, ad blocking, autoplay control, cinema mode, and more.",
    url: "https://www.mrfdev.com/enhancer-for-youtube",
  },
  {
    id: "sponsorblock",
    name: "SponsorBlock",
    category: "browser-extensions",
    desc: "Community-powered extension that automatically skips **sponsored segments and intros** in YouTube videos.",
    url: "https://sponsor.ajay.app/",
  },
  {
    id: "page-ruler",
    name: "Page Ruler",
    category: "browser-extensions",
    desc: "Draw a ruler on any webpage to measure element dimensions in pixels. Useful for developers and designers.",
    url: "https://chrome.google.com/webstore/detail/page-ruler/jcbmcnpepaddcedmjdcmkpkmkdkacljg",
  },
  {
    id: "whatfont",
    name: "WhatFont",
    category: "browser-extensions",
    desc: "Hover over text on any website to instantly see the font family, size, weight, and colour being used.",
    url: "https://www.chengyinliu.com/whatfont.html",
  },
  {
    id: "privacy-badger",
    name: "Privacy Badger",
    category: "browser-extensions",
    desc: "Blocks invisible trackers and creates a masked alias email address to shield your real inbox from data harvesters.",
    url: "https://privacybadger.org/",
  },

  /* ── USEFUL SITES ────────────────────────────────────── */
  {
    id: "theindex",
    name: "TheIndex.moe",
    category: "useful-sites",
    desc: "The central directory for anime — streaming sites, manga readers, fansub groups, and more, all categorised and rated.",
    url: "https://theindex.moe/",
  },
  {
    id: "noobsubs",
    name: "NoobSubs",
    category: "useful-sites",
    desc: "High-quality anime fansub releases. **Torrents available** for downloading episodes.",
    url: "https://www.noobsubs.com/",
  },
  {
    id: "9anime",
    name: "9anime.gs",
    category: "useful-sites",
    desc: "Large anime streaming library with direct playback. **No ads.** Good video quality across most titles.",
    url: "https://9anime.gs/home",
  },
  {
    id: "subsplease",
    name: "SubsPlease",
    category: "useful-sites",
    desc: "Weekly anime releases ripped directly from official simulcast streams. **Torrents available** — reliable and consistent.",
    url: "https://subsplease.org/",
  },
  {
    id: "movie-web",
    name: "movie-web",
    category: "useful-sites",
    desc: "Stream movies and TV series with a clean minimal interface. Multiple source options and **no ads.**",
    url: "https://movie-web.app/search/movie",
  },
  {
    id: "vk-fonts",
    name: "vk.com — Typefaces",
    category: "useful-sites",
    desc: "Source for free and paid font files shared across communities. **VPN required** to access from some regions.",
    url: "https://vk.com/",
  },
  {
    id: "mobilism",
    name: "Mobilism Forum",
    category: "useful-sites",
    desc: "Modded and premium Android apps. **No root required.** Active community with verified and scanned uploads.",
    url: "https://forum.mobilism.me/",
  },
  {
    id: "steamdb-free",
    name: "SteamDB Free Packages",
    category: "useful-sites",
    desc: "Live list of all free-to-keep Steam games. Mass-claim them to your library in one click.",
    url: "https://steamdb.info/freepackages/",
  },
  {
    id: "12ft",
    name: "12ft.io",
    category: "useful-sites",
    desc: "Bypass paywalls on articles from sites like WSJ, Medium, and Bloomberg. Prepend the URL and read freely.",
    url: "https://12ft.io/",
  },
  {
    id: "archive-ph",
    name: "archive.ph",
    category: "useful-sites",
    desc: "Alternative paywall bypass and webpage archiver. Use as a backup when 12ft.io doesn't work.",
    url: "https://archive.ph/",
  },
  {
    id: "sendcm",
    name: "send.cm",
    category: "useful-sites",
    desc: "Anonymous file sharing with no account needed. Supports uploads up to **100 GB per file.**",
    url: "https://send.cm/upload",
  },
  {
    id: "alphacoders",
    name: "Alphacoders Mobile",
    category: "useful-sites",
    desc: "Huge library of high-resolution mobile wallpapers. Well-tagged, fast to browse, and constantly updated.",
    url: "https://mobile.alphacoders.com/",
  },

  /* ── THINGS TO AVOID ─────────────────────────────────── */
  {
    id: "utorrent",
    name: "uTorrent",
    category: "things-to-avoid",
    desc: "Recent versions ship **bundled with spyware, adware, and keyloggers.** Use qBittorrent — it's free, clean, and open-source.",
    url: null,
  },
  {
    id: "tlauncher",
    name: "TLauncher",
    category: "things-to-avoid",
    desc: "Minecraft launcher with **shady background processes** — documented to harvest hardware data and redirect users to suspicious domains without consent.",
    url: null,
  },
  {
    id: "avast",
    name: "Avast Antivirus",
    category: "things-to-avoid",
    desc: "**Caught selling users' browsing history** to third-party advertisers through a subsidiary. Not trustworthy as a privacy tool.",
    url: null,
  },
  {
    id: "avg",
    name: "AVG Antivirus",
    category: "things-to-avoid",
    desc: "**Owned by Avast.** Inherits the same data-collection and resale practices. Same parent, same risks — avoid both.",
    url: null,
  },
  {
    id: "opera",
    name: "Opera Browser",
    category: "things-to-avoid",
    desc: "**Linked to predatory short-term loan apps** and known for poor data privacy practices. Use Brave or Firefox instead.",
    url: null,
  },
];


/* ════════════════════════════════════════════════════════════════
   2. CONFIG — category metadata for badges and filters
   ════════════════════════════════════════════════════════════════ */

const CATEGORY_CONFIG = {
  "pc-applications": {
    label:    "PC App",
    badge:    "badge--pc",
    dotColor: "var(--color-accent)",
  },
  "browser-extensions": {
    label:    "Extension",
    badge:    "badge--ext",
    dotColor: "var(--color-ext)",
  },
  "useful-sites": {
    label:    "Site",
    badge:    "badge--sites",
    dotColor: "var(--color-safe)",
  },
  "things-to-avoid": {
    label:    "Avoid",
    badge:    "badge--avoid",
    dotColor: "var(--color-danger)",
  },
};


/* ════════════════════════════════════════════════════════════════
   3. HELPERS
   ════════════════════════════════════════════════════════════════ */

/**
 * Escape HTML entities to safely inject user-defined strings into innerHTML.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#39;");
}

/**
 * Convert **double-star** markdown into <strong> tags.
 * Escapes first so the source text can never inject raw HTML.
 * @param {string} str
 * @returns {string} safe HTML string
 */
function parseBold(str) {
  return escapeHtml(str).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

/**
 * Return a short human-readable domain label from a full URL.
 * @param {string} url
 * @returns {string}
 */
function domainLabel(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Return a pluralised word: "1 result" vs "5 results".
 * @param {number} n
 * @param {string} word
 * @returns {string}
 */
function pluralise(n, word) {
  return `${n.toLocaleString()} ${word}${n !== 1 ? "s" : ""}`;
}


/* ════════════════════════════════════════════════════════════════
   4. CARD BUILDER
   Builds and returns one <article> element for a resource.
   ════════════════════════════════════════════════════════════════ */

/**
 * @param {Object} resource — single entry from RESOURCES
 * @returns {HTMLElement}
 */
function buildCard(resource) {
  const { id, name, category, desc, url } = resource;
  const config  = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG["useful-sites"];
  const isAvoid = category === "things-to-avoid";

  /* ── Article element ── */
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.category = category;
  article.dataset.id       = id;
  article.setAttribute("role", "listitem");
  article.setAttribute("aria-label", `${name} — ${config.label}`);

  /* ── Header row: title + badge ── */
  const header = document.createElement("div");
  header.className = "card-header";

  const titleEl = document.createElement("h2");
  titleEl.className   = "card-title";
  titleEl.textContent = name;

  const badgeEl = document.createElement("span");
  badgeEl.className = `badge ${config.badge}`;
  badgeEl.setAttribute("aria-label", `Category: ${config.label}`);
  badgeEl.textContent = config.label;

  header.appendChild(titleEl);
  header.appendChild(badgeEl);
  article.appendChild(header);

  /* ── Description ── */
  const descEl = document.createElement("p");
  descEl.className = "card-desc";
  descEl.innerHTML  = parseBold(desc); // safe: escaped before bold transform
  article.appendChild(descEl);

  /* ── Warning banner (Things to Avoid only) ── */
  if (isAvoid) {
    const warn = document.createElement("div");
    warn.className = "card-warn-banner";
    warn.setAttribute("role", "alert");

    const warnIcon = document.createElement("span");
    warnIcon.className   = "warn-icon";
    warnIcon.setAttribute("aria-hidden", "true");
    warnIcon.innerHTML   = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;

    const warnText = document.createElement("span");
    warnText.textContent = "Not recommended — avoid this software.";

    warn.appendChild(warnIcon);
    warn.appendChild(warnText);
    article.appendChild(warn);
  }

  /* ── Link button (non-avoid only) ── */
  if (!isAvoid && url) {
    const footer = document.createElement("div");
    footer.className = "card-footer";

    const link = document.createElement("a");
    link.className  = "btn-link";
    link.href       = url;
    link.target     = "_blank";
    link.rel        = "noopener noreferrer";
    link.textContent = "Visit site";
    link.setAttribute(
      "aria-label",
      `Visit ${name} at ${domainLabel(url)} (opens in new tab)`
    );

    footer.appendChild(link);
    article.appendChild(footer);
  }

  return article;
}


/* ════════════════════════════════════════════════════════════════
   5. FILTER — pure matching logic (no DOM side effects)
   ════════════════════════════════════════════════════════════════ */

/**
 * Returns true if a resource passes both the category filter and search query.
 * @param {Object} resource
 * @param {string} query  — lower-cased, trimmed user input
 * @param {string} filter — active category slug, or "all"
 * @returns {boolean}
 */
function resourceMatches(resource, query, filter) {
  if (filter !== "all" && resource.category !== filter) return false;
  if (!query) return true;

  const searchable = [
    resource.name,
    resource.desc,
    resource.category.replace(/-/g, " "),
    CATEGORY_CONFIG[resource.category]?.label ?? "",
    resource.url ?? "",
  ].join(" ").toLowerCase();

  return searchable.includes(query);
}


/* ════════════════════════════════════════════════════════════════
   6. UI UPDATE — applies visibility, counter, empty state
   ════════════════════════════════════════════════════════════════ */

/**
 * @param {NodeList} cards
 * @param {string}   query
 * @param {string}   filter
 */
function applyFilters(cards, query, filter) {
  let visible = 0;

  cards.forEach((card) => {
    const resource = RESOURCES.find((r) => r.id === card.dataset.id);
    const show     = resource ? resourceMatches(resource, query, filter) : false;
    card.hidden    = !show;
    if (show) visible++;
  });

  /* Update counter */
  const countEl = document.getElementById("results-count");
  if (countEl) {
    if (query || filter !== "all") {
      countEl.textContent = `Showing ${pluralise(visible, "result")} of ${RESOURCES.length}`;
    } else {
      countEl.textContent = `${pluralise(RESOURCES.length, "resource")} total`;
    }
  }

  /* Toggle empty state */
  const emptyEl = document.getElementById("empty-state");
  if (emptyEl) emptyEl.hidden = visible > 0;
}


/* ════════════════════════════════════════════════════════════════
   7. BOOTSTRAP — runs once on DOMContentLoaded
   ════════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── DOM references ── */
  const grid        = document.getElementById("resource-grid");
  const searchInput = document.getElementById("search-input");
  const clearBtn    = document.getElementById("search-clear");
  const filterBtns  = document.querySelectorAll(".filter-btn");
  const statTotal   = document.getElementById("stat-total");
  const footerYear  = document.getElementById("footer-year");

  if (!grid || !searchInput) {
    console.error("[app.js] Critical DOM elements missing — aborting.");
    return;
  }

  /* ── Set dynamic values ── */
  if (statTotal)  statTotal.textContent  = RESOURCES.length;
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  /* ── 7a. Render all cards into grid (DocumentFragment for performance) ── */
  const fragment = document.createDocumentFragment();
  RESOURCES.forEach((resource) => fragment.appendChild(buildCard(resource)));
  grid.appendChild(fragment);

  /* Cache NodeList after render */
  const allCards = grid.querySelectorAll(".card");

  /* ── 7b. State ── */
  let currentQuery  = "";
  let currentFilter = "all";

  /* ── 7c. Initial display ── */
  applyFilters(allCards, currentQuery, currentFilter);

  /* ── 7d. Search: real-time filter ── */
  searchInput.addEventListener("input", () => {
    currentQuery    = searchInput.value.trim().toLowerCase();
    clearBtn.hidden = currentQuery.length === 0;
    applyFilters(allCards, currentQuery, currentFilter);
  });

  /* ── 7e. Clear button ── */
  function clearSearch() {
    searchInput.value = "";
    currentQuery      = "";
    clearBtn.hidden   = true;
    searchInput.focus();
    applyFilters(allCards, currentQuery, currentFilter);
  }

  clearBtn.addEventListener("click", clearSearch);
  clearBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); clearSearch(); }
  });

  /* ── 7f. Category filter buttons ── */
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      currentFilter = btn.dataset.filter;
      applyFilters(allCards, currentQuery, currentFilter);
    });
  });

  /* ── 7g. Keyboard shortcut: "/" opens search ── */
  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

});