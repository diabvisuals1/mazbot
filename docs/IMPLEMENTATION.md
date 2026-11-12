# Screen inventory and implementation map

Source: https://www.figma.com/design/wrPTvTEE9x1sIAjnvgfrRj/design

Page: **Main Flow**, `1643:1844`. All existing artboards are 375px wide. Original positions, images, text, spacing, radii, and color values form the baseline. Shared navigation uses the original icons and is fixed to the current viewport instead of being frozen at its artboard Y position.

| Source node | Original screen | Route | Connected behavior |
| --- | --- | --- | --- |
| 2051:1878 | Home page (Home Owner) | `/` | Offers, service entry, schedule, monitoring, chats, date selection, profile |
| 2051:2267 | Categories (Home Owner) | `/services` | Horizontal service carousel and helper profiles |
| 2051:1435 | Helpers List & Filters | `/helpers` | Filtered/reflowed list, favorites, helper selection |
| 2051:1594 | Filters | `/helpers/filters` | Accessible sheet retaining the banner/title and extending the unfinished form |
| 2051:1778 | Profile details | `/helpers/profile` | Selected helper, booking, conversation, review and verification information |
| 2051:2475 | Chats main | `/chats` | Favorite conversations, search, draggable list handle |
| 2051:2607 | Chats | `/chats/all` | Search, online filtering, conversation selection |
| 2051:2752 | Store | `/store` | Category navigation, search, favorites, product detail, cart |
| 2051:2892 | Product list — Mobility aids | `/store/mobility` | Product search, favorites, cart, product detail |
| 2051:3069 | Product list — Monitoring Equipments | `/store/monitoring` | Product search, favorites, cart, product detail |
| 2051:3241 | Product details | `/store/product` | Original gallery with horizontal movement, quantity control, optional setup selections, cart |
| 2051:2015 | Monitoring | `/monitoring` | Tracking, cameras, chat, call information, schedule |
| 2051:2106 | Monitoring (Live Tracking) | `/monitoring/tracking` | Source progress timeline, chat, call information, issue reporting |
| 2051:2188 | Monitoring (Home Cameras) | `/monitoring/cameras` | Room preview, offline feedback, recent alerts, camera preferences |

## Gaps completed

No booking form, booking confirmation, schedule content, account settings, cart/checkout, or individual conversation screen exists on Main Flow. These use the established petrol, peach, cream, and mint palette; rounded surfaces; original assets; and concise content. They are accessible at `/booking`, `/schedule`, `/account`, `/cart`, `/chats/conversation`, `/store/nursing`, and `/store/cleaning`.

The filter sheet has only its heading, service chips, and availability labels in the source. Date, budget, rating, reset, and apply controls complete it. Product detail benefit/add-on blocks have no labels in the source; concise illustrative labels complete those blocks. Review body text and real phone numbers were not supplied; these are explained instead of fabricated.

## Source inspection

The implementation was preceded by page enumeration, full Main Flow metadata inspection, individual design-context extraction and reference screenshots for all 14 screens, and a read of prototype reactions, fonts, and variable collections. Native connections were followed where present; missing links were completed according to visible labels. Component variant destinations outside Main Flow represent navigation/button states rather than additional requested screens.

Assets were extracted through Figma's file API after direct download URLs were blocked. Original individual raster layers were exported with transparency and measured crops. Vector layers remain SVG. Invisible source layers remain empty. Static frame screenshots are not used as application screens.

## Validation

Chromium browser checks visited all 21 routes at 375 × 810, checked image loading and runtime errors, and captured each screen for visual comparison. All routes loaded, all referenced image files loaded, and no React runtime errors were observed.

End-to-end checks verified:

1. Service selection and budget filters.
2. Favorites surviving refresh.
3. Booking validation, selected helper data, and persisted schedule.
4. Chat search, sending, and persistence.
5. Product quantity controls, cart totals, and persistence.
6. Room preview controls and Escape dismissal.
7. Account name propagation to home.
8. Reduced-motion rendering and centered 375px desktop layout.

Visual passes corrected image transparency, ramp/camera asset selection, avatar cropping, shadows, inherited transform offsets, and active navigation icon contrast. The remaining font and panorama boundaries are documented in README.md; this is not a claim of a zero-difference pixel match on every operating system.
