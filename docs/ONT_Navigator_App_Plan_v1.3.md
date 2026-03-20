# ONT NAVIGATOR
**App Development Plan**
Ontario International Airport | iOS & Android | B2C + B2B Platform

---

## Document Version Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 13, 2026 | — | Initial app development plan: core map, navigation, boarding pass, flight scanner, wallet, lounge badges, B2B portal, in-app ordering (Phase 5) |
| 1.1 | March 18, 2026 | pfong001 | Added: Welcome screen (sign up, log in, guest flow); turquoise brand palette; home screen with map view; category filter pills (centered); quick access bar (bottom of screen); TSA checkpoint wait times with crowd-sourced reporting; baggage tracking with flight-to-carousel mapping; parking payments (pre-book and pay-now); updated tech stack with Stripe SDK; updated risks and mitigations; added 3 new immediate next steps |
| 1.2 | March 19, 2026 | pfong001 | Major redesign: switched to deep navy + gold luxury palette; new hub-style home screen with auto-rotating promo carousel, 2-row feature grid, and business ad cards; bottom tab bar navigation (Home, Map, My Flight, Profile); redesigned map page with pins inside terminal area, TSA wait time badges on checkpoint pins, floor switcher; redesigned flight scanner with departures/arrivals toggle, pinned "my flight" card, flight detail sheet; redesigned TSA page with collapsible tips card, collapsible checkpoint cards, summary stats bar; new profile page (dashboard style with minimal hub + sub-page navigation) including rewards with progress bar and redemption, order history with reorder, saved cards, travel preferences with inline editing (home airport, preferred airline, frequent flyer numbers, traveler programs with KTN/PASSID/CLEAR ID verification for TSA PreCheck, Global Entry, CLEAR, NEXUS, SENTRI, FAST), settings (account, notifications with toggles, app preferences, privacy), sign out; duty-free shopping placeholder added to feature grid |
| 1.3 | March 20, 2026 | pfong001 + Claude | Code audit + architecture refactor plan; added Track Changes page; identified critical gaps between plan and codebase; added Phase 0 (Architecture Refactor); updated development status per screen; added code quality standards; revised immediate next steps |
| 1.4 | March 20, 2026 | pfong001 + Claude | Full app demo rebuild with all screens functional; added auto-rotating promo carousel to Home screen; added Parking screen with lot selection, availability indicators, pre-booking, and pay-now; replaced Profile tab with Ticket tab (boarding pass scanner + QR display); profile now accessed via avatar icon on Home; added category menu modal to Duty Free; swipeable pills on Duty Free, wrapped pills on Map; TSA tips default to collapsed; added deals carousel to Duty Free; built Saved Cards sub-page with default/remove management; built Travel Preferences sub-page with home airport, preferred airline, frequent flyer numbers, and traveler program verification; added consistent back button (ScreenHeader component) to all screens; added StatusBar spacing (TopSpacer) to prevent overlap with phone system bar; flight card appears on Map screen when flight is selected; map shrinks to accommodate flight card |

---

## Track Changes — v1.3 → v1.4

### New Screens Added
- **Parking Screen** — lot selection (5 lots: short-term, economy, valet), real-time availability with color-coded status bars (green/orange/red), spot counts, hourly and daily rates, distance/shuttle info, pre-book and pay-now CTAs, payment method indicators (Saved Card, Apple Pay, Google Pay), active booking card with navigate-to-lot and extend-time buttons
- **Ticket Screen** (Boarding Pass) — replaces Profile in bottom tab bar; two states: (1) no-flight scan prompt with camera viewfinder and "Simulate Scan" for demo, (2) full boarding pass display with airline, flight number, FROM/TO airport codes, gate, time, seat, class, zone, status badge, and QR code placeholder for gate scanning

### New Components Added
- **PromoCarousel** — reusable auto-rotating carousel (4-second interval) with swipe support, snap-to-card behavior, and dot indicators; used on Home screen (airport promotions) and Duty Free screen (deals/sales)
- **ScreenHeader** — reusable header component with back button (gold ← in navy circle), title, and optional subtitle; applied to all screens except Home
- **TopSpacer** — status bar height spacer (50px iOS / dynamic Android) applied to all screens to prevent content overlapping phone system bar
- **SwipeablePills** — reusable centered wrap-layout category pills; used on Map screen

### Modified Screens
- **Home Screen**: Added promo carousel below search bar with 4 rotating promotions (Escape Lounge, 20% Off Duty Free, ONT Art Walk, Pre-Book Parking); replaced Ticket grid tile with Parking (🅿️); profile avatar in top-right now navigates to Profile screen
- **Map Screen**: Category pills changed from horizontal scroll to centered wrap layout; flight card appears above map when a flight is selected/scanned; map height shrinks from 300px to 220px to accommodate flight card; flight card shows flight info + "Navigate to Gate" and "Boarding Pass" buttons; added ScreenHeader with back button
- **Flights Screen**: Now accepts and passes myFlight/setMyFlight as shared state from App root; added ScreenHeader with back button
- **TSA Screen**: Tips card now starts collapsed (minimized) instead of expanded; added ScreenHeader with back button
- **Wallet Screen**: Added ScreenHeader with back button
- **Duty Free Screen**: Category pills changed to single-line horizontal swipeable; added ☰ menu icon to LEFT of search bar (same height) opening a bottom sheet category selector; added deals carousel with 4 rotating promotions (Flash Sale, Bundle Deal, New Arrival, Member Special); added ScreenHeader with back button
- **Profile Screen**: Removed from bottom tab bar; now accessed via avatar icon on Home screen; added back arrow navigating to Home; all 5 sub-pages now functional (Rewards, Order History, Saved Cards, Travel Preferences, Settings)
- **App Root**: Bottom tab bar changed from [Home, Map, Flights, Profile] to [Home, Map, Flights, Ticket]; myFlight state lifted to App root and passed to Map, Flights, and Ticket screens; added goHome callback passed to all screens

### New Profile Sub-Pages Built
- **Saved Cards**: Shows 3 cards (Amex Platinum, Chase Sapphire Reserve, Capital One Venture X) with card type badge, last 4 digits, expiration, DEFAULT indicator, "Set as Default" and "Remove" actions, and "Add New Card" dashed-border button
- **Travel Preferences**: Home airport selector (ONT, LAX, SNA, BUR, LGB) with checkmark; preferred airline selector (Southwest, United, Delta, American, JetBlue, Alaska); frequent flyer numbers list with add/remove; traveler programs (TSA PreCheck verified, plus add buttons for Global Entry, CLEAR, NEXUS, SENTRI, FAST) with verified badge

### Architecture Changes
- **Shared state**: myFlight state lifted from Flights screen to App root component, enabling flight card on Map and boarding pass on Ticket screen
- **goHome pattern**: All screens receive a goHome callback for consistent back navigation to Home
- **StatusBar**: Set to translucent with light-content across entire app; TopSpacer component handles safe area spacing

---

## Track Changes — v1.2 → v1.3

### New Sections Added
- **Track Changes page** (this section) — restored from v1.1 format for change visibility
- **Section 12: Current Development Status** — audit of what's built vs. planned per screen
- **Section 13: Code Quality Standards** — variable naming, file structure, linting rules
- **Phase 0 (Architecture Refactor)** added to Section 6 — must complete before Phase 1 feature work continues

### Modified Sections
- **Section 5 (Tech Stack)**: Added `react-navigation` as required dependency; noted current dependencies are minimal (expo, react, react-native only)
- **Section 6 (Roadmap)**: Inserted Phase 0; shifted all phase timelines accordingly; updated Phase 1 to include modular screen extraction
- **Section 8 (Risks)**: Added new risks for single-file architecture, minified code, and missing navigation library
- **Section 11 (Immediate Next Steps)**: Replaced with prioritized refactor-first action items

### Issues Identified in Code Audit (March 20, 2026)
- **Single-file monolith**: All 8 screens (66KB) live in `App.js` — must be extracted to individual files
- **Minified variable names**: State variables use 1–2 character names (`sc`, `em`, `nm`, `pw`, `fl`, `sr`, `sel`, `rt`, `af`) — unreadable and unmaintainable
- **No React Navigation**: Screen switching uses a manual `switch` statement on a state variable instead of `react-navigation` bottom tabs
- **No external integrations installed**: Mapbox, FlightAware, Firebase, Stripe, ML Kit, BLE — none are in `package.json`; only `expo`, `react`, `react-native`, `react-native-web`, and `react-dom` are installed
- **Duplicate `src/screens/`**: `WelcomeScreen.js` (7.5KB) exists in `src/screens/` but App.js also contains its own inline `Welcome` function — unclear which is canonical
- **32 useState hooks**: Scattered across all screens with no shared state management or context
- **No TypeScript**: Entire codebase is plain JavaScript with no type safety

---

## 1. Executive Summary

ONT Navigator is a mobile application (iOS and Android) purpose-built for Ontario International Airport (ONT). The app features a deep navy and gold luxury design palette, delivering a premium airport companion experience. It solves a core traveler pain point — navigating a complex terminal environment — while layering in premium credit card perks, digital boarding pass management, real-time flight data, TSA checkpoint intelligence, baggage tracking, parking payments, traveler program verification, rewards, and live business promotions.

The platform serves two distinct audiences simultaneously:

**B2C — Travelers**
Passengers receive indoor wayfinding, lounge access intelligence based on their credit card portfolio, a contextual flight widget (shown only when a flight is set), a full-day flight scanner, TSA wait time tracking with crowd-sourced reporting, real-time baggage carousel tracking, parking payment and pre-booking, and a digital boarding pass — all in one seamless experience.

**B2B — Airport Businesses**
Restaurants, lounges, and retail operators gain a direct channel to update daily menus and specials in real-time, with instant push to relevant consumer map cards.

The result is an intelligent travel companion that reduces stress, unlocks hidden perks, and drives foot traffic to airport businesses — making every minute in the terminal count.

---

## 2. Goals & Success Metrics

### Primary Goals
- **Wayfinding**: Provide accurate, real-time indoor navigation across all ONT terminal floors
- **Personalization**: Surface lounge and amenity access based on each user's credit card portfolio
- **Travel Integration**: Deliver a seamless boarding pass, contextual flight widget, and gate navigation experience
- **Flight Awareness**: Surface a full-day KONT departure/arrival board powered by FlightAware AeroAPI
- **TSA Intelligence**: Provide real-time checkpoint wait times via crowd-sourced traveler reports
- **Baggage Tracking**: Map flights to baggage carousels with estimated arrival times and navigation
- **Parking Payments**: Allow travelers to pre-book or pay for parking on-the-go
- **B2B Value**: Give airport businesses a real-time channel to drive consumer awareness and sales

### Success Metrics

| Metric | Target |
|--------|--------|
| Monthly Active Users (MAU) | 10,000+ within 6 months of launch |
| Navigation Sessions / Day | 500+ daily route completions |
| Boarding Pass / Flight Widget Activations | 30% of MAU set a flight via scanner or scan |
| TSA Report Submissions / Day | 50+ crowd-sourced reports daily |
| Baggage Tracking Usage | 25% of arriving passengers check carousel info |
| Parking Payment Adoption | 15% of parking users pay via app within Year 1 |
| Business Portal Adoption | 80%+ of ONT businesses onboarded in Year 1 |
| App Store Rating | 4.5+ stars on iOS & Android |
| Session Duration | Avg. 8+ minutes per visit |

---

## 3. Target Audiences

| ✈️ Leisure Traveler | 💳 Premium Traveler | 🏢 Airport Business |
|---------------------|---------------------|---------------------|
| First-time or infrequent flyer at ONT who needs clear navigation, gate reminders, TSA wait times, baggage tracking, and help finding food or amenities. | Frequent flyer with premium credit cards seeking lounge access, fast routing to their gate, parking pre-booking, and perk maximization. | Lounge managers, restaurant operators, and retail staff wanting to update specials and attract in-terminal foot traffic. |

---

## 4. Feature Overview & Prioritization

| Feature | Priority | Phase | Notes |
|---------|----------|-------|-------|
| Interactive 3D Indoor Map | P1 - Critical | Phase 1 | Geofenced ONT footprint, floor-based pin visibility |
| GPS / Blue Dot Navigation | P1 - Critical | Phase 1 | Real-time user location tracking across terminal floors |
| Dynamic Routing (Walking Line) | P1 - Critical | Phase 1 | Thick walking path from user location to destination |
| Smart Search Bar | P1 - Critical | Phase 1 | Keyword + name search with live dropdown suggestions |
| Category Filter Pills | P1 - Critical | Phase 1 | Centered quick-filter pills: Gates, Dining, Coffee, Lounges, Retail |
| Rich Location Detail Cards | P1 - Critical | Phase 1 | Name, category, rating, hours, reviews, amenity pills |
| Bottom Tab Bar Navigation | P1 - Critical | Phase 0 | Persistent bottom nav: Home, Map, Flights, Ticket; gold active state indicator; Profile accessed via Home avatar |
| Promo Carousel | P1 - Critical | Phase 1 | Auto-rotating every 4 seconds; swipe-enabled; airport promotions, exhibits, deals; dot indicators; used on Home and Duty Free |
| Business Ad Cards | P2 - High | Phase 1 | Scrollable business cards on home screen with icon, description, "View details" and "Navigate" buttons |
| Profile Dashboard | P2 - High | Phase 2 | Minimal hub with stats (reward pts, flights, orders); tappable menu rows navigating to sub-pages |
| Rewards System | P2 - High | Phase 2 | Points display with progress bar to next reward; redeemable rewards (free side, free drink, $5 off); earn rules (10 pts/order, +2 reorder bonus, streak bonus) |
| Order History | P2 - High | Phase 2 | Past orders with business icon, items, total, date, status; reorder and receipt buttons; most recent order shown on profile card; 24hr order count badge |
| Travel Preferences | P2 - High | Phase 2 | Inline editable: home airport dropdown, preferred airline dropdown, frequent flyer numbers (add/remove with airline-specific input), traveler programs (TSA PreCheck, Global Entry, CLEAR, NEXUS, SENTRI, FAST) with KTN/PASSID/Member ID verification |
| Traveler Program Verification | P2 - High | Phase 2 | Users select enrolled programs from list; verify with program-specific ID (KTN for PreCheck, PASSID for Global Entry/SENTRI, NEXUS Member ID, CLEAR Member ID, FAST Card Number); verified status badge with ID displayed |
| Settings Page | P2 - High | Phase 2 | Account management (edit profile, change password, linked accounts); notifications with toggles (push, gate alerts, TSA spikes, promotions, parking expiry); app preferences (language, distance units, map theme); privacy & data (privacy policy, terms, clear cache, delete account) |
| Duty-Free Shopping | P2 - High | Phase 3 | Placeholder in feature grid; full shopping experience planned for Phase 3 |
| User Accounts (Name + Email) | P1 - Critical | Phase 1 | Session creation synced to boarding pass data |
| Quick Access Bar | P1 - Critical | Phase 1 | Bottom-of-screen icons for Baggage, TSA Times, Flights, Boarding Pass, Orders |
| Boarding Pass Scanner | P1 - Critical | Phase 2 | Physical/digital scan — locks to gate, time, seat |
| Contextual Flight Widget | P1 - Critical | Phase 2 | Appears only after boarding pass scan or flight selection; collapsible pill/expanded toggle; shows flight, gate, status, baggage tracking link |
| TSA Checkpoint Wait Times | P2 - High | Phase 2 | Map pins + dedicated screen; color-coded wait status (green/yellow/red); crowd-sourced traveler reporting with slider input; report count and recency display |
| TSA Crowd-Source Reporting | P2 - High | Phase 2 | Slider-based wait time submission; aggregated estimates from traveler reports; builds accuracy over time |
| Baggage Tracking | P2 - High | Phase 2 | Flight-to-carousel mapping; estimated time until bags arrive; color-coded status (Unloading/Arriving/Scheduled/Delayed); navigate to carousel; accessible via quick access bar + flight widget; "View all arrivals" filter for when details are incorrect |
| My Wallet (Credit Cards) | P2 - High | Phase 2 | Card inventory selection (Amex Plat, CSR, etc.) |
| Dynamic Lounge Access Badges | P2 - High | Phase 2 | Green 'Access Granted' vs red 'Requires: [Card]' badges |
| Elevator / Floor UI | P2 - High | Phase 1 | Custom floor switcher for Levels 1, 2, 3 |
| Geofenced Arrival Detection | P2 - High | Phase 2 | 15m trigger fires 'You have arrived' prompt + clears route |
| Parking Payments | P2 - High | Phase 2 | Pre-book parking before arrival; pay for current parking session; lot selection with availability indicators; rate display (hourly/daily); payment via saved card, Apple Pay, Google Pay; parking timer with notifications; receipt generation; extend parking remotely |
| Flight-Aware Search Banner | P2 - High | Phase 2 | Intercepts airline searches to offer 1-tap flight tracker |
| Recent Search Memory | P2 - High | Phase 1 | Saves last 3 searches for quick re-access |
| Native Map POI Intercept | P2 - High | Phase 1 | Override Apple/Google POI taps with custom ONT data |
| B2B Business Portal | P2 - High | Phase 3 | Hidden long-press unlock, login, live menu publishing |
| Real-Time Specials Push | P2 - High | Phase 3 | Business update instantly appears on consumer detail card |
| Flight Scanner Screen | P2 - High | Phase 2 | Full-day dep/arrivals board for KONT; search/filter bar; flight detail sheet; "Set as My Flight" syncs widget + boarding pass + gate pills + baggage tracking; powered by FlightAware AeroAPI |
| FlightAware AeroAPI Integration | P2 - High | Phase 2 | Live FIDS board, flight lookup, KONT departures/arrivals endpoints; backend proxy required for production |
| Simulate Walk (Dev Tool) | P3 - Medium | Phase 1 | Teleport testing tool for route QA during development |
| Tap-to-Dismiss UX | P3 - Medium | Phase 1 | Empty space tap clears active cards for clean UI |
| Digital Boarding Pass Display | P3 - Medium | Phase 2 | Full-screen QR code view for physical gate scanning |
| Global ☰ Navigation Menu | P3 - Medium | Phase 1 | Top-level nav: Map, Flight Scanner, Wallet, Profile |
| Push Notifications | P4 - Low | Phase 4 | Gate change alerts, boarding reminders, daily specials, baggage ready alerts, parking expiry warnings |

---

## 5. Recommended Tech Stack

| Layer | Recommendation | Rationale | Status |
|-------|---------------|-----------|--------|
| Mobile Framework | React Native (Expo) | Single codebase for iOS + Android; large ecosystem | ✅ Installed |
| Navigation | React Navigation (Bottom Tabs + Stack) | Industry standard for RN apps; supports bottom tabs, nested stacks, deep linking | ❌ Not installed — using manual switch statement |
| Maps & Indoor Routing | Mapbox SDK + Custom Indoor Tiles | Supports custom tile layers, indoor routing, geofencing | ❌ Not installed |
| Indoor Positioning | Bluetooth BLE Beacons + GPS Fallback | Best-in-class indoor accuracy for 15m geofence triggers | ❌ Not installed |
| Backend / API | Node.js + Express (REST API) | Fast to build, easy to scale; pairs well with React Native | ❌ Not started |
| Database | PostgreSQL + Firebase Realtime DB | Postgres for user/business data; Firebase for live specials push | ❌ Not started |
| Authentication | Firebase Auth (Email + OAuth) | Quick setup, supports future social login expansion | ❌ Not installed |
| Boarding Pass Scanning | Google ML Kit Barcode Scanner | Native-speed QR/barcode reading on both platforms | ❌ Not installed |
| Flight Data | FlightAware AeroAPI (v4) | Live KONT dep/arr boards, per-flight status; backend proxy required | ❌ Not installed |
| Payments | Stripe SDK | Parking payments, future in-app ordering; supports Apple Pay, Google Pay, saved cards | ❌ Not installed |
| B2B Portal Backend | Firebase Firestore + Cloud Functions | Real-time write to consumer map cards with minimal latency | ❌ Not started |
| App Hosting / CDN | AWS Amplify or Vercel (API) | Scalable hosting; easy CI/CD pipeline integration | ❌ Not started |
| Analytics | Mixpanel or Amplitude | Track search queries, route completions, wallet interactions | ❌ Not installed |

---

## 6. Development Phases & Roadmap

| Phase | Name | Timeline | Key Goal |
|-------|------|----------|----------|
| **Phase 0** | **Architecture Refactor** | **~2–3 weeks** | **Extract screens, install React Navigation, readable code, proper file structure** |
| Phase 1 | Foundation & Map Core | ~8–10 weeks | Shippable map with search, navigation, quick access bar, and basic UX |
| Phase 2 | Travel Companion | ~6–8 weeks | Boarding pass, flight scanner, wallet, lounge badges, TSA wait times, baggage tracking, parking payments, geofence arrival |
| Phase 3 | B2B Portal & Live Data | ~4–6 weeks | Business owner portal + real-time specials push to consumers |
| Phase 4 | Polish & Scale | ~4–6 weeks | Push notifications, performance tuning, App Store launch prep |

### Phase 0 — Architecture Refactor (NEW)
Phase 0 is a mandatory refactor sprint before any new feature work. The current codebase is a 66KB single-file monolith with minified variable names and no navigation library. This phase establishes the foundation that all future development depends on.

- **File Extraction**: Move each screen from `App.js` into its own file under `src/screens/` (WelcomeScreen.js, HomeScreen.js, MapScreen.js, FlightsScreen.js, TSAScreen.js, WalletScreen.js, DutyFreeScreen.js, ProfileScreen.js)
- **Variable Renaming**: Replace all minified state variable names with descriptive names (e.g., `sc` → `currentScreen`, `em` → `email`, `nm` → `name`, `pw` → `password`, `fl` → `flights`, `sr` → `searchQuery`, `sel` → `selectedItem`, `rt` → `route`, `af` → `activeFilter`)
- **Install React Navigation**: Add `@react-navigation/native`, `@react-navigation/bottom-tabs`, and `@react-navigation/stack`; replace the manual switch statement with a proper `BottomTabNavigator` (Home, Map, My Flight, Profile tabs)
- **Shared State**: Create a `src/context/AppContext.js` for global state (user session, selected flight, wallet cards) using React Context + useReducer
- **Constants File**: Extract the color palette object (`C`) and any shared constants to `src/constants/theme.js`
- **Helper Extraction**: Move helper functions (`wc`, `wb`, `wl`, `BT`) to `src/components/` with descriptive names
- **Resolve Duplicate**: Determine canonical Welcome screen (inline `App.js` version vs `src/screens/WelcomeScreen.js`) and remove the duplicate
- **Install Core Dependencies**: `react-navigation`, `react-native-safe-area-context`, `react-native-screens`, `react-native-gesture-handler`, `@expo/vector-icons`
- **Add ESLint + Prettier**: Enforce consistent code style across the team
- **Folder Structure Target**:
  ```
  /src
    /screens        (one file per screen)
    /components     (reusable UI: Button, Card, Badge, TabBar)
    /context        (AppContext, AuthContext)
    /constants      (theme.js, colors.js, config.js)
    /services       (api.js, flightService.js, tsaService.js)
    /utils          (formatters, validators)
    /assets         (images, fonts, icons)
  ```

### Phase 1 — Foundation & Map Core
Phase 1 delivers the core product: a fully functional, geofenced indoor map of ONT with search, navigation, quick access bar, and the foundational UX patterns that all future features build on.

- Map Setup: Implement Mapbox with ONT custom tile layers; configure geofenced bounding box
- Floor Switcher: Build Elevator UI for Levels 1, 2, 3 with dynamic pin visibility per floor
- POI System: Intercept native Apple/Google POI taps and replace with ONT business data
- Smart Search: Build keyword/name search with live dropdown, recent search memory (last 3)
- Category Filter Pills: Centered row of quick-filter pills (Gates, Dining, Coffee, Lounges, Retail) with active state highlighting
- Location Cards: Design rich detail cards with name, category, rating, hours, amenity pills
- Dynamic Routing: Draw walking route from user blue dot to selected destination
- Navigation Controls: Floating "End Route" button + developer Simulate Walk teleport tool
- Quick Access Bar: Bottom-of-screen icon buttons for fast access to key features (Baggage, TSA Times, Flights, Boarding Pass, Orders)
- User Accounts: Name + email session creation; data hooked to boarding pass later
- Tap-to-Dismiss: Ensure tapping empty map space / search bar clears active cards

### Phase 2 — Travel Companion
Phase 2 transforms the app from a map into a full travel companion. Key additions include the boarding pass scanner, contextual flight widget, flight scanner with pinned "my flight" card, TSA checkpoint intelligence with collapsible cards and crowd-sourced reporting, baggage tracking, parking payments, profile dashboard with rewards and order history, travel preferences with traveler program verification, wallet, lounge access intelligence, and arrival geofencing.

- Boarding Pass Scanner: Scan physical/digital boarding pass; extract gate, time, seat number
- Contextual Flight Widget: Floating widget appears ONLY after a flight is set (via scanner or Flight Scanner). Shows flight number, gate, and status in a truncated pill. Tap to expand for full details + nav/boarding pass/baggage tracking buttons. Tap "—" to collapse back to pill. Widget is hidden by default on a clean map.
- Flight Scanner Screen: Full-day departure and arrival board for KONT with departures/arrivals toggle. Search bar allows filtering by flight number, airline, city, or gate. Flights grouped by boarding, upcoming, departed/arrived, and cancelled with color-coded status badges (gold=boarding, green=on time, red=delayed, gray=cancelled, blue=arrived). Tap any flight for a detail sheet with 2x2 info grid + "Set as My Flight" CTA. Pinned "my flight" card with gold border appears at top when set, with navigate and remove buttons.
- FlightAware AeroAPI: Powers live FIDS board and per-flight lookups. Backend proxy (Node.js/Express) required in production.
- TSA Checkpoint Wait Times: Collapsible checkpoint cards showing color-coded wait time badge, wait status label, and trend indicator (steady/increasing/decreasing) in minimized view. Expanded view shows location, hours, report count, last report time, available lanes in gold pills, report and navigate buttons. Collapsible tips card at top. Summary stats bar showing average wait, total reports, and best option.
- TSA Crowd-Source Reporting: Bottom sheet with large color-coded time display, quick-select buttons (5m, 10m, 15m, 20m, 30m, 45m), and submit button with success confirmation animation.
- Baggage Tracking: Flight-to-carousel mapping with demo data. Default view shows only user's flight baggage info. "View all arrivals" filter button. Accessible via quick access bar and flight widget.
- Parking Payments: Lot selection, pre-booking, pay-now, multiple payment methods, parking timer, extend remotely, receipts, navigate to lot.
- Profile Dashboard: Minimal hub with three stat cards (reward pts, flights tracked, orders). Tappable menu rows navigating to sub-pages: Rewards, Order History, Saved Cards, Travel Preferences, Settings. Each sub-page has back navigation.
- Rewards System: Points display (340 pts) with progress bar toward next reward (600 pts). How to earn section (10 pts/order, +2 reorder bonus, 2x streak bonus). Redeemable rewards with "Redeem" buttons.
- Order History: Past orders with business icon, items ordered, total, date, and green "Completed" status badge. "Reorder" and "Receipt" action buttons. Most recent purchase shown on profile menu card. 24-hour order count badge on profile.
- Travel Preferences: Inline editable with dropdowns for home airport (ONT, LAX, SNA, etc.) and preferred airline (Southwest, United, Delta, etc.). Frequent flyer numbers with add/remove and airline-specific input. Traveler programs (TSA PreCheck, Global Entry, CLEAR, NEXUS, SENTRI, FAST) — users select programs to add, then verify with program-specific ID entry (KTN, PASSID, CLEAR Member ID, NEXUS Member ID, SENTRI PASSID, FAST Card Number) with contextual hints.
- Settings: Account management (edit profile, change password, linked accounts). Notifications with toggle switches (push notifications, gate change alerts, TSA wait spikes, promotions & deals, parking expiry). App preferences (language, distance units, map theme). Privacy & data (privacy policy, terms of service, clear cache, delete account).
- Digital Boarding Pass: Full-screen QR code display for use at physical turnstile
- My Wallet: Card selection UI for premium travel cards (Amex Platinum, Chase Sapphire Reserve, etc.)
- Dynamic Lounge Badges: Green "Access Granted" or red "Requires: [Card]" on lounge detail cards
- Geofence Arrival: 15m proximity trigger fires "You have arrived" prompt + clears route

### Phase 3 — B2B Portal & Live Data
Phase 3 unlocks the revenue and retention layer for airport businesses. The hidden admin portal gives business owners a real-time publishing tool directly tied to the consumer map.

- Hidden Portal Trigger: Long-press 'ONT Navigator' title for 1.5 seconds to unlock admin mode
- Business Login: Secure authentication for business owners (e.g., Escape Lounge manager)
- Live Menu Editor: Rich text editor for daily specials, menu items, and promotional content
- Instant Push: On publish, update instantly propagates to the 'Today's Menu' box on consumer detail card

### Phase 4 — Polish & Scale
Phase 4 prepares the app for public launch: performance optimization, push notifications, App Store submission, and onboarding flows for both consumers and businesses.

- Push Notifications: Gate change alerts, boarding time reminders, new daily specials notifications, baggage carousel ready alerts, parking expiry warnings, TSA wait time spikes
- Onboarding Flow: First-launch walkthrough of key features for new users
- Performance Audit: Map tile caching, BLE beacon calibration, load time optimization
- Accessibility: VoiceOver / TalkBack support, minimum contrast ratios, large text support
- App Store Submission: iOS App Store + Google Play Store: screenshots, metadata, review process
- Analytics Integration: Instrument Mixpanel/Amplitude events for key user actions
- B2B Onboarding: Outreach and onboarding support for all ONT business partners

---

## 7. System Architecture

| Layer | Components |
|-------|-----------|
| Mobile Client | React Native (iOS + Android) — Map, Search, Navigation, Wallet, Boarding Pass, Flight Widget, Flight Scanner, TSA Wait Times, Baggage Tracking, Parking Payments, Quick Access Bar |
| Indoor Positioning | BLE Beacons throughout ONT terminal + GPS fallback for location services |
| Maps Layer | Mapbox SDK — custom ONT tile layers, geofenced bounding box, routing engine |
| REST API | Node.js / Express — business data, user profiles, lounge access rules, FlightAware proxy, TSA report aggregation, baggage carousel mapping, parking availability and payments |
| Realtime Layer | Firebase Firestore — live specials published by businesses, instant consumer push, TSA crowd-sourced reports |
| Database | PostgreSQL — user accounts, card inventory, lounge requirements, POI metadata, parking transactions, TSA report history |
| Auth | Firebase Authentication — email/password + future OAuth (Apple, Google) |
| Payments | Stripe SDK — parking payments, future in-app ordering; Apple Pay, Google Pay support |
| 3rd Party APIs | FlightAware AeroAPI (KONT live boards + per-flight status); Google ML Kit (barcode scanning) |
| Analytics | Mixpanel / Amplitude — event tracking, funnel analysis, retention metrics |

---

## 8. Risks & Mitigations

| Risk | Severity | Mitigation |
|------|----------|-----------|
| **Single-file monolith (App.js = 66KB)** | **Critical** | **Phase 0 refactor: extract all screens to individual files, install React Navigation, rename minified variables** |
| **Minified/unreadable variable names** | **High** | **Phase 0: systematic rename of all 32 useState variables to descriptive names; add ESLint rules to prevent future short names** |
| **No navigation library installed** | **High** | **Phase 0: install react-navigation with bottom tabs; replace manual switch statement** |
| Indoor GPS inaccuracy | High | Deploy BLE beacon grid across all ONT terminal floors; tune 15m geofence threshold |
| ONT map data not publicly available | High | Engage ONT airport authority early for official floor plan data and partnership approval |
| Credit card perk data changes | Medium | Maintain a managed database of card requirements; build admin UI to update lounge rules |
| B2B portal adoption resistance | Medium | Simplify onboarding; assign dedicated support contact per business during launch |
| App Store approval delays | Medium | Submit 6–8 weeks before target launch; resolve any guideline issues in earlier beta phases |
| FlightAware AeroAPI CORS / key exposure | Medium | All AeroAPI calls must route through the Node.js backend proxy in production — never expose key client-side |
| Flight data API reliability | Medium | Use FlightAware AeroAPI; implement graceful fallback UI when data unavailable |
| TSA wait time data accuracy | Medium | Combine crowd-sourced reports with weighted recency (newer reports count more); display report count and recency for transparency; explore official TSA data partnership |
| Baggage carousel data sourcing | Medium | Start with demo data; partner with ONT airport authority or airline ground handlers for live feed; allow "View all arrivals" as fallback when data is incorrect |
| Parking payment integration with ONT systems | Medium | Engage ONT parking operator early for API access or partnership; build manual fallback (enter lot/space number) if direct integration is delayed |
| Boarding pass scan failures | Low | Support both QR and PDF417 barcode formats; allow manual gate/flight entry as fallback |

---

## 9. Future Requirement: In-App Ordering

**Phase 5 Feature Addition — Modeled after the Domino's App Experience**

This feature is scoped as a future Phase 5 addition, after the core app and B2B portal are live and stable. The ordering experience is modeled after the Domino's app: a carryout-first, profile-driven flow built around a saved Food Profile, one-tap Easy Order reordering, deep item customization across 34M+ combinations, a live multi-step Order Tracker, and a points-per-order rewards system. Every design decision is adapted for the airport context — optimized for speed, minimal taps, and always keeping the traveler aware of their gate time.

### 9.1 Consumer-Facing Order Flow
- Step 1 — Discovery: User taps a participating business on the map. The detail card displays an 'Order Now' CTA
- Step 2 — Easy Order (Returning Users): Saved Food Profile pre-populates the last order; one tap to checkout
- Step 3 — Menu Browse (New/Custom Orders): Full-screen menu organized by category with photo, name, price
- Step 4 — Deep Item Customization: Multi-tab builder — size/base, sauce/cheese, toppings across three tabs
- Step 5 — Cart & Coupon Review: Persistent floating cart with item count and subtotal; coupon code validation
- Step 6 — Payment & Confirmation: Supports saved card, Apple Pay, Google Pay, Cash App Pay, gift cards
- Step 7 — ONT Order Tracker: Live 5-stage tracker: Order Placed → Confirmed → Being Prepared → Quality Check → Ready
- Step 8 — Pickup Navigation: When order is 'Ready for Pickup,' routes traveler to the counter on the ONT map

### 9.2 Rewards Program — Points Per Order
- Earn 10 points per qualifying order at any participating ONT business — no minimum spend
- Every 60 points unlocks a free reward (free side, free drink, discount on next order)
- Streak Bonus: 3+ separate-visit orders earn double-points on the third order
- Easy Order Bonus: +2 points per transaction for one-tap reorders
- Points expire after 12 months of account inactivity

---

## 10. Recommended Team Structure

| Role | Responsibilities |
|------|-----------------|
| Product Manager | Feature prioritization, stakeholder alignment, roadmap ownership, business portal onboarding |
| Lead Mobile Developer | React Native architecture, Mapbox integration, routing engine, BLE beacon setup |
| Backend Developer | Node.js API, PostgreSQL schema, Firebase Firestore, auth, FlightAware proxy, Stripe integration |
| UI/UX Designer | Map UI, card designs, wallet screens, boarding pass display, TSA/baggage screens, parking flow, B2B portal interface |
| QA Engineer | Device testing (iOS + Android), simulate walk validation, geofence trigger accuracy, payment flow testing |
| Business Dev / Partnerships | ONT airport authority relationship, FlightAware licensing, parking operator partnership, business partner onboarding |

---

## 11. Immediate Next Steps

1. **🔴 PRIORITY — Phase 0 Refactor**: Extract all 8 screens from `App.js` into individual files under `src/screens/`; rename all minified variables to descriptive names
2. **Install React Navigation**: Add `@react-navigation/native` + `@react-navigation/bottom-tabs` + `@react-navigation/stack`; replace the manual switch statement with a proper `createBottomTabNavigator`
3. **Resolve WelcomeScreen duplicate**: Compare inline `Welcome` function in App.js with `src/screens/WelcomeScreen.js` (7.5KB) — keep the more complete version and delete the other
4. **Create shared context**: Build `src/context/AppContext.js` with useReducer for user session, selected flight, and wallet state
5. **Extract theme constants**: Move the color palette object `C` to `src/constants/theme.js` and import everywhere
6. **Install ESLint + Prettier**: Add `.eslintrc.js` and `.prettierrc` to enforce readable variable names and consistent formatting
7. Secure ONT airport authority approval and obtain official terminal floor plan data
8. Confirm team composition and assign a Product Manager to own the roadmap
9. Select and configure the Mapbox account; begin ONT indoor tile layer setup
10. Sign up for FlightAware AeroAPI (Personal tier free; 10 queries/hr); build Node.js backend proxy
11. Engage ONT parking operator to discuss API access or partnership for parking payments feature

---

## 12. Current Development Status (as of March 20, 2026)

| Screen | Status | What's Built | What's Missing |
|--------|--------|-------------|----------------|
| Welcome | 🟡 UI Complete | Sign up / log in / guest flow with form fields, validation hints, auth page switching | Firebase Auth integration; OAuth (Apple, Google); actual form validation; secure password handling |
| Home | 🟢 UI Complete | Auto-rotating promo carousel (4s interval, swipeable, dot indicators); 2x3 feature grid (Map, Flights, TSA, Wallet, Duty Free, Parking); "Near You" business cards with Navigate button; profile avatar top-right; search bar | Real search functionality; dynamic promo content from backend; personalized greeting |
| Map | 🟢 UI Complete | Category filter pills (centered wrap); floor switcher (L1/L2/L3); location pins with tap-to-select; selected location detail card with Navigate/Details; flight card above map when flight is set; map shrinks to fit; blue dot user position; terminal outlines; ScreenHeader with back button | Mapbox SDK integration; real indoor tile layers; GPS/BLE positioning; actual routing engine; geofencing; real POI data |
| Flights | 🟢 UI Complete | Departures/arrivals toggle; search/filter bar; flight cards with status badges (Boarding/On Time/Delayed/Arrived); tap to expand with "Set as My Flight" and Navigate; pinned "My Flight" card with gold border and remove; baggage carousel info on arrivals; ScreenHeader with back button | FlightAware AeroAPI integration; real-time data; flight detail sheet with 2x2 grid |
| TSA | 🟢 UI Complete | Summary stats bar (avg wait, reports, best); collapsible tips card (starts minimized); 3 checkpoint cards with color-coded wait badges, trend indicators, expandable details with lanes/hours/report count; crowd-source report bottom sheet with quick-select buttons and confirmation; ScreenHeader with back button | Real crowd-sourced data; weighted recency algorithm; official TSA data integration |
| Wallet | 🟢 UI Complete | 3 credit cards (Amex Platinum, Chase Sapphire Reserve, Capital One Venture X) with expandable perks; lounge access badges (green Access Granted / red Requires); ScreenHeader with back button | Actual card data management; integration with lounge detail cards on map |
| Duty Free | 🟢 UI Complete | ☰ category menu (left of search bar, bottom sheet selector); single-line swipeable category pills; deals carousel (4 rotating promotions); product grid with favorites (hearts), duty-free pricing with savings, pre-order buttons; search bar; ScreenHeader with back button | Real product catalog; cart/checkout system; inventory management; payment processing |
| Parking | 🟢 UI Complete | Summary stats (best rate, total open, pre-book savings); 5 lot cards with availability bars, spot counts, hourly/daily rates, distance; tap to expand with Pre-Book Now and Pay Now; payment method indicators; active booking card with Navigate to Lot and Extend Time; ScreenHeader with back button | Real parking API integration; live availability from ONT parking operator; Stripe payment processing; parking timer with notifications; receipt generation |
| Ticket | 🟢 UI Complete | Two states: (1) empty state with scan prompt and camera viewfinder overlay with "Simulate Scan", (2) full boarding pass with airline, flight number, FROM/TO codes, gate, time, seat, class, zone, status, QR code placeholder; Remove Boarding Pass; ScreenHeader with back button | Google ML Kit barcode scanner; real boarding pass parsing (QR/PDF417); actual QR code generation |
| Profile | 🟢 UI Complete | Avatar + name/email header; 3 stat cards (reward pts, flights, orders); 5 menu rows → sub-pages; back navigation to Home | Firebase user data; real authentication state |
| Profile → Rewards | 🟢 UI Complete | Points display (340), progress bar (57% to 600), earn rules, 3 redeemable rewards with Redeem/Need More | Real points tracking; redemption processing |
| Profile → Order History | 🟢 UI Complete | 3 past orders with business icon, items, date, total; Reorder and Receipt buttons | Real order data; actual reorder flow; receipt generation |
| Profile → Saved Cards | 🟢 UI Complete | 3 cards with type badge, last 4, expiration; DEFAULT indicator; Set as Default and Remove actions; Add New Card button | Stripe integration; actual card tokenization; PCI compliance |
| Profile → Travel Prefs | 🟢 UI Complete | Home airport selector (5 airports); preferred airline selector (6 airlines); frequent flyer numbers with add/remove; traveler programs with verified badges and add from list | Real verification API for KTN/PASSID; persistent storage |
| Profile → Settings | 🟢 UI Complete | Account management rows; notification toggles; app preferences; privacy & data with delete account | Actual toggle persistence; real account operations |
| App (Root) | 🟢 Functional | Bottom tab bar [Home, Map, Flights, Ticket]; switch-based screen routing; shared myFlight state; goHome callback; StatusBar translucent + TopSpacer on all screens; ScreenHeader with back button on all non-Home screens | React Navigation; deep linking; screen transition animations |

**Legend**: 🟢 UI Complete (all planned UI elements built, no real data/integrations) | 🟡 UI Complete (functional but missing planned elements) | 🔴 Not Started

---

## 13. Code Quality Standards

### Variable Naming
All state variables must use descriptive camelCase names. The following minified names must be replaced during Phase 0:

| Current | Required | Screen |
|---------|----------|--------|
| `sc` | `currentScreen` | App |
| `em` | `email` | Welcome |
| `nm` | `fullName` | Welcome |
| `pw` | `password` | Welcome |
| `ap` | `authPage` | Welcome |
| `fl` | `flights` | Flights |
| `sr` | `searchQuery` | Multiple |
| `sel` | `selectedItem` | Map |
| `rt` | `route` | Map |
| `af` | `activeFilter` | Map |
| `tab` | `activeTab` | Flights |
| `sf` | `selectedFlight` | Flights |
| `mf` | `myFlight` | Flights |
| `ex` | `expanded` | TSA |
| `tips` | `showTips` | TSA |
| `rc` | `reportCheckpoint` | TSA |
| `rv` | `reportValue` | TSA |
| `dn` | `done` | TSA |
| `exC` | `expandedCards` | TSA |
| `ac` | `activeCategory` | DutyFree |
| `fvs` | `favorites` | DutyFree |
| `sp` | `subPage` | Profile |
| `w` | `walletCards` | Wallet |

### File Structure Rules
- One screen component per file
- Maximum 300 lines per file (split into sub-components if larger)
- Shared components in `src/components/`
- All API calls in `src/services/`
- No inline styles longer than 3 properties — use StyleSheet.create

---

*ONT Navigator | Turning transit time into a premium experience | ontario.fly*