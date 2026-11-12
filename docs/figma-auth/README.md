# Main Flow entry screens

Source: Figma file `wrPTvTEE9x1sIAjnvgfrRj`, Main Flow page `1643:1844`, inspected 2026-11-12.

| Route | Frame |
| --- | --- |
| /start | Welcome · 2140:2420 |
| /onboarding | On1 Screen · 2140:2443 |
| /onboarding/2 | On2 Screen · 2140:2527 |
| /onboarding/3 | On3 Screen · 2140:2563 |
| /auth | Login Screen · 2140:2704 |
| /signup | Signup Screen · 2140:2616 |
| /forgot-password | Forgot Pass Screen · 2140:2756 |
| /verify | Phone Verification Screen · 2140:2666 |

The JSX in this folder is the supplied design context, retained for provenance. `scripts/import-auth-design.mjs` converts it to scoped plain CSS and React views, without adding Tailwind. The original 375 × 812 artboard and layered illustration geometry are retained to match the reference. Behaviors live in `src/pages/AuthPages.jsx` and `src/pages/auth/controls.jsx`.

All 87 original image/vector assets are local in `public/assets/auth`. Short Figma filenames are not global content hashes: do not replace these assets with same-named older project files. SVG intrinsic dimensions are retained; PNGs use their design slots. The second onboarding frame has no central character in the supplied design, and that empty area is preserved intentionally.

Inter's missing weights are supplied by the official Inter variable font, with its license. Arial/Arial Black use installed system fonts, as in the source. The Welcome status-bar clock specifies SF Pro Text; Windows falls back to Arial if SF Pro Text is unavailable. This is a known typography difference, not a pixel-identical font match across operating systems.

Validation: production build passes; all eight screens visually inspected against the Figma renders; every visible image loads; 375 × 812 artboards verified; navigation/back, signup, password visibility, terms dialog, invalid OTP, successful OTP, recovery/reset, and login exercised in the collaborative browser. Asset callsites and rendered geometry are recorded in `../auth-design-audit.json`. Original local user data was restored after testing.

Authentication remains a local prototype: no real SMS, identity checks, account login, or password reset. Preview OTP is `123456`; passwords are never persisted. The production privacy/terms content and backend integration remain pending. Form errors and recovery completion use functional states beyond the supplied eight static designs.
