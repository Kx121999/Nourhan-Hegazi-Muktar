# Nourhan Hegazi Muktar — Performance Atelier Portfolio

A self-contained static portfolio website. Campaign proof screenshots are embedded directly inside `index.html` as Base64 images, so no assets folder is required.

## Responsive coverage
The layout includes production responsive rules for:
- Desktop and compact laptops
- iPad Pro portrait
- iPad Air / iPad mini portrait
- Standard tablets
- iPhone 13 / 14 / 15 class screens
- Small Android phones down to 360px
- Short landscape phone screens
- Safe-area support for notched iPhones via `viewport-fit=cover` and `env(safe-area-inset-*)`

Responsive checks were run at 360, 375, 390, 430, 640, 768, 834, 1024, 1180 and 1440px widths with no document-level horizontal overflow.

## GitHub Pages
1. Create a new repository.
2. Upload `index.html` to the repository root.
3. Go to **Settings → Pages**.
4. Deploy from the main branch / root.

No build step, npm, React, or backend is required.
