# Team-Gated Informational TRUSTED-V Website

TRUSTED-V will be a focused, informative website for exploring the RISC-V platform, products, services, marketplace, and partner ecosystem.
During development, only the internal team can enter the website; once signed in, everyone sees the same finished-site experience.

## Who it’s for

- Internal TRUSTED-V team members reviewing pages, content, and design before public release.
- Prospective embedded engineers, partners, and customers once the site is ready to be opened publicly.

## Core features and experience

- Keep the sign-in gate as the sole development-phase restriction, so non-team visitors cannot browse the work-in-progress site.
- Remove the Admin Dashboard and every administrative destination, control, shortcut, and navigation entry.
- Remove administrative management screens for hardware, middleware, software components, IDE downloads, applications, users, and retired model settings.
- Keep the public-facing informational pages: homepage, platform, product suite, secure software products, marketplace, services, partner information, contact, and supporting resource pages.
- Keep existing product and marketplace information readable and browseable; there will be no private management interface behind the team login.
- Direct links to former admin URLs will show the same clear unavailable screen used for retired features, rather than exposing a dashboard or a broken page.

## User flow

1. A visitor reaches the website and is asked to sign in while the development gate is active.
2. An approved team member signs in and lands on the informational TRUSTED-V website.
3. The team member browses the platform, products, marketplace, services, and contact information without encountering admin tools or management areas.
4. A former admin link displays a simple unavailable page with links back to relevant public-facing sections.
5. When the site is finalized, the sign-in gate can be removed in a separate release so visitors can browse the same website publicly.

## UI/UX feel

- Preserve the existing TRUSTED-V editorial semiconductor visual language, typography, responsive layouts, and platform-focused navigation.
- Keep the experience calm and product-led: no dashboard cards, operational counters, internal management controls, or development-only language.
- Make unavailable legacy destinations clear and neutral, with an obvious route back to products or services.

## Implementation phases

### Phase 1 — Informational website only (build now)
- Remove all admin pages, admin navigation, user-menu admin access, and related management controls from the active website.
- Retire all former admin browser destinations with the clear unavailable screen.
- Retire admin-only service requests safely so old links cannot reveal management functionality.
- Retain the existing sign-in gate and send authenticated team members to the same informational site experience.
- Verify that the platform, products, marketplace, services, contact flows, and responsive navigation remain intact.

### Phase 2 — Content and design completion (not built now)
- Complete remaining page content, product positioning, imagery, and design-team homepage updates.
- Review each informational page for launch-ready copy and remove any remaining development-era wording.

### Phase 3 — Public launch preparation (not built now)
- Define the approval criteria for opening the website publicly.
- Remove the sign-in gate only after the pages and design are finalized.
- Decide separately whether internal administration should return in a private, purpose-built workspace.

## Assumptions

- The current login remains available only to restrict access during development; it is not an admin portal.
- All signed-in team members receive the same website access, with no role-specific dashboard or private landing page.
- Existing informational pages and contact/partner submission flows remain available unless they are explicitly identified later as internal-only.
- Former admin URLs should be unavailable rather than redirected to an unrelated page.
- The future public release will be handled as a separate, deliberate change after the website is finalized.