"use client";

import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

// Binds every screenshot anchor (see ScreenshotFrame) into one swipeable
// gallery, regardless of which section of the page it's in.
export function ScreenshotLightbox() {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "body",
      children: "a[data-pswp-width]",
      pswpModule: () => import("photoswipe"),
    });
    // PhotoSwipe manages its own overlay but doesn't lock background scroll.
    lightbox.on("beforeOpen", () => {
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
