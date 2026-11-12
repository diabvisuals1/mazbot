# MAZBOT

Local React application built from the **Main Flow** page in the supplied Figma file.

## Run on your computer

Install Node.js 20.19+ or 22.12+ first. Extract this project, then run:

```sh
cd mazbot
npm install
npm run dev
```

Open the localhost URL printed by Vite. The app stays at its original 375px mobile width on desktop. On a phone it uses the available height and keeps the navigation above the bottom safe area.

```sh
npm run build
npm run preview
```

`dist/` contains the production build. `vercel.json` configures the `index.html` fallback required for direct React Router links on Vercel.

## Deploy to Vercel

Import this repository into Vercel and keep the detected Vite defaults: build command `npm run build`, output directory `dist`, and install command `npm install`.

## Included

- React, Vite, JavaScript/JSX, plain CSS, Motion for React, and React Router.
- All 14 Main Flow screens are represented by routes or application states.
- Original Figma illustrations, portraits, icons, room images, and local font files; no stock image substitutions or runtime Figma asset URLs.
- Connected helper selection, filters, favorites, booking validation, schedule, chat search, local messages, product detail, quantity selection, and cart.
- Animated routes, navigation selection, dialogs, button feedback, and reduced-motion support.
- Browser-local persistence. Clear `mazbot:*` keys in localStorage to reset the demo.

## Boundaries

Bookings, payments, messages, tracking, availability, camera status, and verification labels are frontend demonstrations. They do not contact a production service.

The source includes flat room images and a link to a separate Figma prototype, but no equirectangular panorama or video stream. The room viewer supports dragging, zooming, and resetting the static image and explicitly identifies that limitation. A genuine 360° viewer needs a compatible panorama asset.

The source uses proprietary Arial Black and SF Pro Text in some screens. These are requested through system font fallbacks; they are not redistributed. Plus Jakarta Sans, Inter, and Outfit are bundled locally. Exact proprietary-font metrics depend on fonts installed on your computer.

The camera uses one EGP 300 preview price across product cards, details, and cart. Product names, prices and benefits follow the selected item.

See `docs/IMPLEMENTATION.md` for the screen inventory, flow decisions, and testing evidence.

## Connected persona flow

Start at `/start` for onboarding, phone-code preview and role selection. Preview code: `123456`. Switch roles through `/roles` or Profile ? Switch persona.

The owner, helper and company workspaces share booking records in this browser. Requests support accept/decline, proposed changes, agreement, optional equipment, preview payment, trial, support, replacement, refund review, completion and reviews. Companies can publish jobs and review helper applications. Checkout records an order and retains its history.

`docs/flow-coverage.json` maps every group of nodes in the supplied Complete Connected User Flow to its route and state. `docs/route-audit.json` records the route inspection. Run state-transition checks with `node --test tests/booking-flow.test.mjs`.

Authentication/SMS, document verification, payments/refunds/payouts, streaming, messaging and cross-device synchronization still require real external services. Uploaded document names are stored locally; document contents are not uploaded. The local role switch is a prototype tool, not a production authorization system.
