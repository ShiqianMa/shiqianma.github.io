/* Static links work without JavaScript on the published website.
   This small helper preserves the old homepage anchor URLs and makes
   directory-style links work when opening the downloaded HTML in Finder. */
(() => {
  "use strict";
  const script = document.currentScript;
  if (!script) return;
  const siteRoot = new URL(".", script.src);
  const filePreview = window.location.protocol === "file:";

  if (filePreview) {
    document.querySelectorAll("a[href]").forEach((link) => {
      const url = new URL(link.getAttribute("href"), document.baseURI);
      if (url.protocol === "file:" && url.pathname.endsWith("/")) {
        url.pathname += "index.html";
        link.href = url.href;
      }
    });
  }

  if (document.body.dataset.page !== "home") return;
  const oldSections = {
    "#bio": "biography/",
    "#biography": "biography/",
    "#research": "research/",
    "#group": "group/"
  };
  const redirectOldSection = () => {
    const path = oldSections[window.location.hash.toLowerCase()];
    if (!path) return;
    const destination = new URL(path, siteRoot);
    if (filePreview) destination.pathname += "index.html";
    destination.search = window.location.search;
    window.location.replace(destination.href);
  };
  redirectOldSection();
  window.addEventListener("hashchange", redirectOldSection);
})();
