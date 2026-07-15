"use client";

import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";

export function ScreenshotLightbox() {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#screenshot-gallery",
      children: "a[data-pswp-width]",
      pswpModule: () => import("photoswipe"),
    });
    // PhotoSwipe manages its own overlay but doesn't lock background scroll.
    lightbox.on("beforeOpen", () => {
      import("photoswipe/style.css");
      document.documentElement.style.overflow = "hidden";
    });
    lightbox.on("close", () => {
      document.documentElement.style.overflow = "";
    });
    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return null;
}
