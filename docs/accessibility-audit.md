# Accessibility audit — WCAG 2.2 Level AA

- **Parent tracking issue:** [#32 — Audit WCAG 2.2 AA accessibility and document actionable findings](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/32)
- **Audit date:** 2026-11-28
- **Audit status:** Initial source-review baseline; **not a completed WCAG audit**
- **Repository snapshot reviewed:** `main` at `1606ded99b973eafb7d75099094e3741b464b8c6`
- **Conformance statement:** None. The evidence below is not sufficient to claim WCAG 2.2 AA conformance.

## 1. Executive summary

This initial pass inspected selected shared components, global styles and representative route markup. It identified source-level accessibility defects and created focused implementation issues. A limited local browser fixture was used to reproduce selected source patterns, but the running Astro application was not tested in a browser. No automated accessibility scan, keyboard-only journey of the application, screen-reader, zoom, reflow or touch testing was performed.

The highest-priority observations are:

1. The closed mobile navigation drawer is visually translated off-screen but its links and close button remain ordinary focusable elements in the DOM.
2. The selected volunteer-interest chips use white text on orange with a calculated contrast ratio of **2.13:1**, below the 4.5:1 AA requirement for normal text.
3. The shared minimal-input focus style removes the default outline and uses an orange bottom border. The token contrast is approximately **2.13:1** against white and **2.02:1** against `#f9f9f9`, below 3:1 for applicable non-text state indicators.
4. Hindi text appears within pages whose root language is English, with no `lang="hi"` annotation on the identified passages.
5. Some CTAs nest a button inside a link.
6. Volunteer-interest checkbox inputs use a `hidden` class (display none), while their visible labels act as chips; this removes the checkbox inputs from keyboard navigation and the accessibility tree.

The report distinguishes source-confirmed markup/style observations from outcomes that still require a real browser or assistive technology to verify.

## 2. Scope and route coverage

The required audit scope is broader than this baseline. Status below describes source inspection in this first pass, not a completed route audit.

| Route or component                 | Initial source review                                  | Remaining work                                                                                                          |
| ---------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Shared desktop navigation          | Markup and link/button structure inspected             | Keyboard order, names/roles/states, contrast, browser/AT behavior                                                       |
| Shared mobile header and drawer    | Markup and drawer script inspected                     | Open/close, Escape, focus entry/trap/restore, overlay, scroll, AT behavior                                              |
| Shared footer                      | Landmarks, headings and links sampled                  | Full keyboard, link-purpose, contrast, reflow and repeated-use checks                                                   |
| Global typography and color tokens | Selected color pairs and input focus utility inspected | Full text/non-text contrast inventory, text spacing, resize and page-context checks                                     |
| `/`                                | Hero, language content and CTA markup sampled          | Full page, images, all sections, interaction and responsive checks                                                      |
| `/about/`                          | Heading and team-image alternatives sampled            | Full page structure, all images, bilingual content and responsive checks                                                |
| `/cause/`                          | Search/filter structure sampled in source              | Search, filters, announcements, reset, empty state and keyboard operation                                               |
| `/cause/education/`                | Generated route template reviewed                      | Rendered route and content-specific checks                                                                              |
| `/cause/health/`                   | Generated route template reviewed                      | Rendered route and content-specific checks                                                                              |
| `/cause/community-welfare/`        | Generated route template reviewed                      | Rendered route and content-specific checks                                                                              |
| `/cause/environment/`              | Generated route template reviewed                      | Rendered route and content-specific checks                                                                              |
| `/join/`                           | Form and interest checkbox markup sampled              | Form validation, checkbox interaction, error/status behavior and submission using safe synthetic data                   |
| `/contact/`                        | Partnership form controls sampled                      | Labels, validation/status behavior, map, keyboard use and synthetic submission                                          |
| `/donate/`                         | QR, copy/share controls and status markup sampled      | Keyboard/AT behavior, status announcements, QR alternative, download/share and mobile testing without making a donation |
| `/privacy/`                        | Document language and heading sampled                  | Full structure, link purpose, language passages, zoom and reflow                                                        |

The generated cause routes are based on the four records in `src/data/causes.ts`: `education`, `health`, `community-welfare` and `environment`. Each generated route must be opened and checked individually; inspecting the shared template is not a substitute for checking the rendered content.

Shared navigation must also be checked on multiple routes and in both responsive variants. In particular, the closed drawer behavior must be tested on a normal page and a generated cause-detail page.

## 3. Method, tools and limitations

### Work performed

- Inspected repository source files on the `main` snapshot listed above, including:
  - `src/components/Navigation.astro`
  - `src/components/Footer.astro`
  - `src/components/FooterLink.astro`
  - `src/layouts/BaseLayout.astro`
  - `src/styles/global.css`
  - selected markup in `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/cause.astro`, `src/pages/cause/[slug].astro`, `src/pages/join.astro`, `src/pages/contact.astro`, `src/pages/donate.astro` and `src/pages/privacy.astro`
  - `src/data/causes.ts`
- Calculated selected color-pair contrast using the WCAG relative-luminance method for sRGB colors and the contrast ratio formula `(L lighter + 0.05) / (L darker + 0.05)`.
- Compared repository markup and styles with the relevant WCAG 2.2 A/AA requirements to identify issues for browser verification and remediation.
- Built and exercised a local HTML fixture in headless Chromium with Playwright to reproduce selected DOM, CSS and JavaScript patterns from the source; this did not test the Astro application.

### Tool and environment record

| Item                                         | Actual value for this pass                                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Method                                       | Remote source-code inspection, static color-token calculation, and limited local Chromium reproduction fixture |
| Repository revision                          | `main` — `1606ded99b973eafb7d75099094e3741b464b8c6`                                                            |
| Browser and version                          | Headless Chromium 144.0.0.0 (via Playwright) — reproduction fixture only                                       |
| Browser automation                           | Playwright 1.57.0                                                                                              |
| Operating system                             | Linux container runtime; distribution/kernel version not recorded                                              |
| Fixture viewport                             | 390 × 844 CSS pixels, device scale factor 1, default 100% zoom                                                 |
| Actual website desktop viewport              | Not tested                                                                                                     |
| Actual website mobile viewport               | Not tested                                                                                                     |
| Browser zoom / text resize on actual website | Not tested                                                                                                     |
| Screen reader                                | None used                                                                                                      |
| Automated accessibility scanner              | None run                                                                                                       |
| Actual deployed website                      | Not reachable from this environment; app URL from `astro.config.mjs` is `https://vasudhaiva-kulam.vercel.app`  |
| Local production build                       | Not run as part of this audit baseline                                                                         |
| Date                                         | 2026-11-28                                                                                                     |

The repository's GitHub Actions workflow performs linting, formatting checks, type checking and a production build. Those checks are useful for software quality but are not an accessibility scan and do not replace manual testing. No new package, paid provider, API or external audit service was introduced for this baseline.

### Limited browser reproduction fixture — not the running website

A local HTML fixture was created to reproduce the relevant DOM, CSS and JavaScript patterns found in the inspected source. It was opened with headless Chromium using Playwright. This is a genuine browser execution of those patterns, but it is **not** a build of the Astro application and does not verify the deployed website, Tailwind-generated styles in the application, page-specific layout, or every route.

Environment: Headless Chromium 144.0.0.0 on the Linux container runtime; Playwright 1.57.0; viewport 390 × 844 CSS pixels; device scale factor 1; default zoom 100%.

Observed fixture results:

| Check                          | Browser observation                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Closed drawer keyboard access  | After focusing the menu trigger and pressing Tab, focus moved to the off-screen drawer's `closeDrawer` button.        |
| Initial menu state             | `aria-expanded` and `aria-controls` were absent from the trigger.                                                     |
| Focus on opening               | Clicking the menu trigger opened the drawer, but focus remained on the trigger instead of moving into the drawer.     |
| Escape behavior                | Pressing Escape left the drawer open.                                                                                 |
| Focus containment              | Tabbing through the open drawer moved through its three links, then escaped to the page's email input and Donate CTA. |
| Focus after close              | Clicking the drawer close button closed the drawer but left focus on `closeDrawer`, inside the off-screen drawer.     |
| Hidden checkbox                | Computed `display` was `none`; Playwright's role query found zero exposed checkboxes.                                 |
| Tab sequence after email input | Tab skipped the hidden checkbox and moved to the Donate link.                                                         |
| Input focus styling            | Computed outline was `none` with `0px` width; the bottom border changed to `rgb(255, 153, 51)`.                       |
| Selected chip colors           | Computed foreground was white and background was `rgb(255, 153, 51)`.                                                 |
| Nested interactive markup      | The fixture contained one `a button` pair, matching the source pattern identified in the homepage/navigation markup.  |
| Hindi passage language         | The fixture's Hindi paragraph inherited `lang="en"` from the root and had no local language annotation.               |

These results support the source-pattern findings VK-A11Y-001, VK-A11Y-002, VK-A11Y-003, VK-A11Y-004, VK-A11Y-005 and VK-A11Y-006. They do **not** establish that the actual running app has been browser-tested. The source inspection identified the partnership form label concern (VK-A11Y-007); it was not included in this fixture.

### Limitations

- No browser-rendered evidence from the actual Astro application is available yet. The local fixture only verifies isolated source patterns. CSS behavior, computed colors, focus visibility and responsive layout must be confirmed on the actual rendered pages.
- No keyboard-only journey of the running Astro application has been completed; the keyboard observations above are limited to the local fixture.
- No screen-reader/browser combination has been tested. NVDA with Firefox or Chrome on Windows and VoiceOver with Safari on macOS or iOS remain untested.
- No 320 CSS-pixel reflow, 200% text resizing, browser zoom, orientation, touch target or reduced-motion checks have been run.
- No form was submitted and no donation was initiated.
- No automated scan has been run. A future scan must record tool and version and include representative desktop and mobile pages.
- Some findings below are directly visible in source; their exact runtime impact and severity must still be confirmed in the documented test matrix.

## 4. Findings

Severity uses the parent issue's categories: blocker/critical, high, medium and low. The initial severity is a triage estimate, not a user-impact measurement from completed usability testing.

### VK-A11Y-001 — Closed mobile drawer can remain in keyboard tab order

- **Severity:** High
- **Status:** Reproduced in the local fixture; verification on the running Astro application remains pending
- **Affected component:** Mobile navigation drawer
- **Source:** `src/components/Navigation.astro`, approximately lines 101–148 and 175–212
- **WCAG:** 2.1.1 Keyboard (A), 2.4.3 Focus Order (A), 4.1.2 Name, Role, Value (A); verify 2.4.11 Focus Not Obscured (Minimum) (AA) during browser testing
- **Evidence:** The closed drawer is positioned off-screen with `-translate-x-full`. Its navigation links and close button remain in the DOM as normal focusable elements. The script changes the transform class and overlay visibility but does not make the closed drawer inert or otherwise remove its descendants from sequential focus navigation. The menu button receives `aria-expanded` only after a click; no initial state or `aria-controls` relationship is present in the inspected markup. No Escape-key handler or focus-restoration logic appears in the drawer script.
- **Expected:** When closed, drawer controls are not keyboard reachable or exposed as open navigation content. When opened, focus behavior and state are predictable and communicated to assistive technology. Closing returns focus to the menu trigger.
- **Actual source behavior:** Visual off-screen positioning is implemented, but there is no corresponding hidden/inert or focus-management behavior in the inspected source.
- **Reproduction to confirm:** At a mobile width, load a page with the drawer closed; use Tab and Shift+Tab through the header and page; record whether focus enters off-screen drawer links or the close button. Then open the drawer, traverse it, press Escape, close via the close button and overlay, and record focus destination each time.
- **Suggested remediation:** Give the menu button a clear accessible name, initial `aria-expanded="false"` and `aria-controls`. Use a deliberate disclosure or modal-dialog pattern. Ensure closed content is inert and not focusable. If modal, move focus into the drawer, keep focus within it, support Escape, and restore focus on close. Ensure link activation closes the drawer without leaving focus in hidden content.
- **Tracking:** [#46 — Make the mobile navigation drawer keyboard and screen-reader accessible](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/46)

### VK-A11Y-002 — Selected volunteer-interest chips fail text contrast

- **Severity:** Medium
- **Status:** Color calculation and fixture computed styles confirm the source color pair; verification on the running Astro application remains pending
- **Affected route/component:** `/join/`, volunteer-interest chips
- **Source:** `src/styles/global.css`, approximately lines 108–113; inputs and labels in `src/pages/join.astro`, approximately lines 73–124
- **WCAG:** 1.4.3 Contrast (Minimum) (AA)
- **Evidence:** The checked chip uses `--color-on-primary` (`#ffffff`) on `--color-primary-container` (`#ff9933`). Calculated contrast is **2.13:1**. Normal-size text requires at least **4.5:1**.
- **Expected:** Selected chip text meets the applicable text-contrast requirement and the selected state remains clearly identifiable.
- **Actual source colors:** White text on orange, 2.13:1.
- **Reproduction to confirm:** Open `/join/`, select an interest chip, inspect its computed foreground and background colors, and verify the browser-rendered pair against the recorded calculation.
- **Suggested remediation:** Use an existing dark foreground token with sufficient contrast on the orange background, or choose another accessible selected-state pair. Recheck hover, focus, checked and unchecked states.
- **Tracking:** [#47 — Fix WCAG contrast for selected volunteer-interest tags](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/47)

### VK-A11Y-003 — Minimal-input focus style may not meet non-text contrast

- **Severity:** Medium
- **Status:** The fixture reproduces the source focus styling; verification on the running Astro application remains pending
- **Affected components:** Inputs and selects using `input-minimal`
- **Source:** `src/styles/global.css`, approximately lines 116–129
- **WCAG:** 1.4.11 Non-text Contrast (AA), 2.4.7 Focus Visible (AA)
- **Evidence:** The focus rule sets `outline: none` and `box-shadow: none`, then changes only the bottom border to `#ff9933`. The calculated orange-to-white ratio is **2.13:1**; orange to the `#f9f9f9` surface is **2.02:1**. These are below 3:1 for applicable visual state indicators.
- **Expected:** Keyboard focus is clearly visible, with an applicable indicator that meets the required contrast against adjacent colors.
- **Actual source behavior:** The inspected rule removes the browser outline and relies on the orange bottom border. The exact rendered surface and the resulting focus indicator have not yet been checked in a browser.
- **Reproduction to confirm:** Keyboard-focus each input and select that uses this utility on its actual page background. Record computed colors, border dimensions and focus appearance at normal and 200% zoom.
- **Suggested remediation:** Provide a clear focus ring or other sufficiently contrasting focus indicator. Do not remove the native outline unless an equally visible replacement is provided. Measure each relevant surface/state combination.
- **Tracking:** [#48 — Restore a sufficiently contrasting keyboard focus indicator for minimal inputs](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/48)

### VK-A11Y-004 — Hindi passages are not annotated with their language

- **Severity:** Medium
- **Status:** Source inspection and the fixture confirm the missing language annotation; screen-reader pronunciation and route-wide verification remain pending
- **Affected routes/components:** Homepage and generated cause-detail pages; inspect all other Hindi passages during the full audit
- **Source:** `src/layouts/BaseLayout.astro` declares `<html lang="en">`; `src/pages/index.astro` contains Hindi hero text; `src/pages/cause/[slug].astro` renders `cause.titleHindi` in a paragraph without a language attribute; Hindi strings are supplied by `src/data/causes.ts`
- **WCAG:** 3.1.2 Language of Parts (AA)
- **Evidence:** The document language is English and the inspected Hindi passages do not have a nested `lang="hi"` annotation.
- **Expected:** The primary document language remains English and passages in another language are programmatically identified as Hindi.
- **Actual source behavior:** The sampled Hindi text inherits the root English language declaration.
- **Reproduction to confirm:** Inspect the rendered homepage and each generated cause-detail page's language attributes; listen to representative mixed Hindi/English passages with a documented screen reader.
- **Suggested remediation:** Annotate Hindi phrases or blocks with `lang="hi"` while retaining `lang="en"` on the document root. Audit all rendered Hindi labels, headings, descriptions and navigation content.
- **Tracking:** [#49 — Annotate Hindi text passages with the correct language](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/49)

### VK-A11Y-005 — CTAs contain nested interactive elements

- **Severity:** Medium
- **Status:** Source markup and one representative pair are reproduced in the local fixture; verification on the running application and with assistive technology remains pending
- **Affected routes/components:** Desktop navigation, mobile navigation drawer and homepage hero
- **Source:** `src/components/Navigation.astro` desktop and mobile Donate CTAs; `src/pages/index.astro` Donate and Volunteer CTAs
- **WCAG:** 4.1.2 Name, Role, Value (A); verify keyboard focus order and screen-reader output
- **Evidence:** The inspected source contains anchors wrapping buttons in the desktop and mobile navigation CTAs and in the homepage hero CTAs. The fixture reproduced one representative `a`-containing-`button` pair. Interactive elements should not be nested inside one another.
- **Expected:** Each action is represented by one semantic interactive element with one accessible name and one keyboard focus stop.
- **Actual source markup:** The desktop Donate CTA, mobile Donate CTA, and homepage Donate and Volunteer CTAs use nested anchor/button elements.
- **Reproduction to confirm:** Inspect the desktop navigation, mobile drawer and homepage hero. Tab through each at its relevant viewport and inspect the accessibility tree and screen-reader output for duplicate or inconsistent controls.
- **Suggested remediation:** Use a single anchor for navigation and style it as a button, or use a button only for an in-page action. Search all routes/components for other nested interactive elements.
- **Tracking:** [#50 — Replace nested link and button markup with single semantic controls](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/50)

### VK-A11Y-006 — Volunteer-interest checkboxes are hidden with display none

- **Severity:** High
- **Status:** The fixture confirms `display: none` and the absence of exposed checkbox roles; verification on the running form and with a screen reader remains pending
- **Affected route/component:** `/join/`, volunteer-interest options
- **Source:** `src/pages/join.astro`, approximately lines 73–124; `hidden` is applied to each checkbox input
- **WCAG:** 2.1.1 Keyboard (A), 4.1.2 Name, Role, Value (A)
- **Evidence:** The checkbox inputs use the Tailwind `hidden` class, which applies `display: none`. The visible chip is a label associated with the hidden input. The input is therefore removed from sequential keyboard navigation and the accessibility tree; a visible clickable label does not provide an equivalent keyboard-operable checkbox.
- **Expected:** Each interest option is exposed as a labelled checkbox, can receive keyboard focus, and announces its checked state.
- **Actual source behavior:** The form input itself is display-none; the visible label is the only presented chip.
- **Reproduction to confirm:** On `/join/`, try reaching every interest option with Tab and toggling with Space. Inspect the accessibility tree and test with a screen reader.
- **Suggested remediation:** Use a visually-hidden but accessible input pattern (not `display: none`) or a fully semantic alternative. Provide a visible focus indicator on the corresponding chip and preserve submitted field names and values.
- **Tracking:** [#51 — Make volunteer-interest checkbox chips keyboard and screen-reader accessible](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/51)

### VK-A11Y-007 — Partnership form controls rely on placeholders instead of associated labels

- **Severity:** Medium
- **Status:** Source-level issue identified; coordinate remediation with existing form work
- **Affected route/component:** `/contact/`, institutional partnership form
- **Source:** `src/pages/contact.astro`, approximately lines 95–137
- **WCAG:** 3.3.2 Labels or Instructions (A), 4.1.2 Name, Role, Value (A)
- **Evidence:** The sampled Organization Name, Contact Person and Corporate Email inputs and Partnership Type select have placeholder/option text but no visible associated `<label>` elements or explicit accessible-name attributes in the inspected markup.
- **Expected:** Every form control has a persistent, programmatically associated label; instructions and required status are clear without relying on placeholder text.
- **Actual source markup:** The sampled controls rely on placeholder or initial option text.
- **Reproduction to confirm:** Inspect each partnership form control's accessible name and verify labels remain available after a user enters a value or changes the select.
- **Suggested remediation:** Add visible `<label for>` elements with unique IDs for all existing and new controls; confirm required/optional status with the organization. Coordinate with the existing form implementation rather than duplicating work.
- **Tracking:** Coordinate with [#22 — Add phone number fields to volunteer and partnership forms](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/22); verify that its implementation covers every existing partnership control as well as any new phone field.

## 5. Contrast measurements recorded in this pass

These are calculations from source color tokens, not screenshots or browser-computed pixels. Recheck them against actual rendered foreground/background combinations.

| Foreground | Background |   Ratio |     Relevant threshold | Initial result                          |
| ---------- | ---------- | ------: | ---------------------: | --------------------------------------- |
| `#ffffff`  | `#ff9933`  |  2.13:1 |      4.5:1 normal text | Fail — selected volunteer chip text     |
| `#ff9933`  | `#ffffff`  |  2.13:1 | 3:1 non-text indicator | Below threshold — input focus candidate |
| `#ff9933`  | `#f9f9f9`  |  2.02:1 | 3:1 non-text indicator | Below threshold — input focus candidate |
| `#693800`  | `#ff9933`  |  4.55:1 |      4.5:1 normal text | Pass for this token pair only           |
| `#8f4e00`  | `#f9f9f9`  |  6.12:1 |      4.5:1 normal text | Pass for this token pair only           |
| `#1a1c1c`  | `#f9f9f9`  | 16.26:1 |      4.5:1 normal text | Pass for this token pair only           |
| `#554336`  | `#f9f9f9`  |  8.90:1 |      4.5:1 normal text | Pass for this token pair only           |

A passing token pair does not prove that all text using those tokens passes in context. Opacity, overlays, gradients, images, hover/focus/selected states and actual font size/weight must be checked on rendered pages.

## 6. WCAG 2.2 Level A and AA evaluation matrix

The following matrix is the audit checklist. A finding or selected token calculation is not a complete evaluation of a criterion across all routes. Items marked **Partial — finding recorded** still require runtime testing and route-wide review. All other criteria remain pending until tested or explicitly documented as not applicable with evidence.

| Success criterion                                          | Level | Status in this baseline                                                                                      |
| ---------------------------------------------------------- | ----: | ------------------------------------------------------------------------------------------------------------ |
| 1.1.1 Non-text Content                                     |     A | Pending — route-wide image and decorative content review                                                     |
| 1.2.1 Audio-only and Video-only (Prerecorded)              |     A | Pending — verify applicability and media alternatives                                                        |
| 1.2.2 Captions (Prerecorded)                               |     A | Pending — verify applicability and captions                                                                  |
| 1.2.3 Audio Description or Media Alternative (Prerecorded) |     A | Pending — verify applicability                                                                               |
| 1.2.4 Captions (Live)                                      |    AA | Pending — verify applicability                                                                               |
| 1.2.5 Audio Description (Prerecorded)                      |    AA | Pending — verify applicability                                                                               |
| 1.3.1 Info and Relationships                               |     A | Pending — landmarks, headings, forms, lists and relationships                                                |
| 1.3.2 Meaningful Sequence                                  |     A | Pending — reading and focus sequence                                                                         |
| 1.3.3 Sensory Characteristics                              |     A | Pending — instructions and visual references                                                                 |
| 1.3.4 Orientation                                          |    AA | Pending — portrait/landscape usability                                                                       |
| 1.3.5 Identify Input Purpose                               |    AA | Pending — form field autocomplete/input purposes                                                             |
| 1.4.1 Use of Color                                         |     A | Pending — state and information not conveyed by color alone                                                  |
| 1.4.2 Audio Control                                        |     A | Pending — verify applicability                                                                               |
| 1.4.3 Contrast (Minimum)                                   |    AA | Partial — finding VK-A11Y-002; full rendered contrast audit pending                                          |
| 1.4.4 Resize Text                                          |    AA | Pending — 200% resize                                                                                        |
| 1.4.5 Images of Text                                       |    AA | Pending — route-wide review                                                                                  |
| 1.4.10 Reflow                                              |    AA | Pending — 320 CSS-pixel width                                                                                |
| 1.4.11 Non-text Contrast                                   |    AA | Partial — finding VK-A11Y-003; rendered state/control review pending                                         |
| 1.4.12 Text Spacing                                        |    AA | Pending — user text-spacing overrides                                                                        |
| 1.4.13 Content on Hover or Focus                           |    AA | Pending — tooltips, overlays and dismissibility                                                              |
| 2.1.1 Keyboard                                             |     A | Partial — findings VK-A11Y-001 and VK-A11Y-006; full journey tests pending                                   |
| 2.1.2 No Keyboard Trap                                     |     A | Pending — full overlay and journey testing                                                                   |
| 2.1.4 Character Key Shortcuts                              |     A | Pending — verify applicability                                                                               |
| 2.2.1 Timing Adjustable                                    |     A | Pending — timers and time limits                                                                             |
| 2.2.2 Pause, Stop, Hide                                    |     A | Pending — moving/auto-updating content and animation                                                         |
| 2.3.1 Three Flashes or Below Threshold                     |     A | Pending — motion/flash content review                                                                        |
| 2.4.1 Bypass Blocks                                        |     A | Pending — skip navigation and repeated blocks                                                                |
| 2.4.2 Page Titled                                          |     A | Pending — every rendered route title                                                                         |
| 2.4.3 Focus Order                                          |     A | Partial — drawer issue recorded; all journeys pending                                                        |
| 2.4.4 Link Purpose (In Context)                            |     A | Pending — route-wide link review                                                                             |
| 2.4.5 Multiple Ways                                        |    AA | Pending — route discovery/navigation                                                                         |
| 2.4.6 Headings and Labels                                  |    AA | Pending — complete page and form review                                                                      |
| 2.4.7 Focus Visible                                        |    AA | Partial — focus style concern VK-A11Y-003; runtime visibility pending                                        |
| 2.4.11 Focus Not Obscured (Minimum)                        |    AA | Pending — sticky header, drawer and overlay focus checks                                                     |
| 2.5.1 Pointer Gestures                                     |     A | Pending — gesture-operated interactions                                                                      |
| 2.5.2 Pointer Cancellation                                 |     A | Pending — pointer activation behavior                                                                        |
| 2.5.3 Label in Name                                        |     A | Pending — visible-label and accessible-name comparison                                                       |
| 2.5.4 Motion Actuation                                     |     A | Pending — verify applicability                                                                               |
| 2.5.7 Dragging Movements                                   |    AA | Pending — verify applicability                                                                               |
| 2.5.8 Target Size (Minimum)                                |    AA | Pending — measure applicable controls and exceptions                                                         |
| 3.1.1 Language of Page                                     |     A | Pending — verify every generated document                                                                    |
| 3.1.2 Language of Parts                                    |    AA | Partial — finding VK-A11Y-004; full passage inventory pending                                                |
| 3.2.1 On Focus                                             |     A | Pending — interaction testing                                                                                |
| 3.2.2 On Input                                             |     A | Pending — search, filters, forms and selection behavior                                                      |
| 3.2.3 Consistent Navigation                                |    AA | Pending — compare navigation across routes                                                                   |
| 3.2.4 Consistent Identification                            |    AA | Pending — repeated component identification                                                                  |
| 3.2.6 Consistent Help                                      |     A | Pending — verify applicability and help placement                                                            |
| 3.3.1 Error Identification                                 |     A | Pending — form validation                                                                                    |
| 3.3.2 Labels or Instructions                               |     A | Partial — finding VK-A11Y-007; full forms review pending                                                     |
| 3.3.3 Error Suggestion                                     |    AA | Pending — validation and suggestions                                                                         |
| 3.3.4 Error Prevention (Legal, Financial, Data)            |    AA | Pending — verify applicability to submissions and donation actions                                           |
| 3.3.7 Redundant Entry                                      |     A | Pending — multi-step/repeated-entry review                                                                   |
| 3.3.8 Accessible Authentication (Minimum)                  |    AA | Pending — verify applicability                                                                               |
| 4.1.2 Name, Role, Value                                    |     A | Partial — findings VK-A11Y-001, VK-A11Y-005, VK-A11Y-006 and VK-A11Y-007; complete control inventory pending |
| 4.1.3 Status Messages                                      |    AA | Pending — search/filter, form and donation status announcements                                              |

WCAG 2.2 removed 4.1.1 Parsing; it is not included as a current WCAG 2.2 success criterion. Reduced-motion preference behavior is also a separate usability check here; it must not be represented as the AAA criterion 2.3.3 Animation from Interactions being an AA requirement.

## 7. Required test matrix — not yet run

Record the actual browser, OS, viewport, zoom and assistive-technology versions when each test is performed. Do not substitute an assumed current version.

| Test                           | Required setup                                                                   | Status                                                                       |
| ------------------------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Desktop route sampling         | Current desktop browser, approximately 1280 × 800 CSS px                         | Not run                                                                      |
| Mobile route sampling          | Current mobile browser, approximately 390 × 844 CSS px                           | Not run                                                                      |
| Source-pattern fixture         | Headless Chromium 144 / Playwright 1.57; 390 × 844 CSS px                        | Completed — isolated fixture only, not the Astro application                 |
| Reflow                         | 320 CSS-pixel viewport width                                                     | Not run                                                                      |
| Text resize                    | 200% text resize / browser zoom as applicable                                    | Not run                                                                      |
| Keyboard-only                  | Navigation, find a cause, join, contact and donation journeys                    | Partial — isolated source-pattern fixture only; actual site journeys not run |
| Desktop screen reader          | NVDA + Firefox or Chrome on Windows, versions recorded                           | Not run                                                                      |
| Apple screen reader            | VoiceOver + Safari on macOS or iOS, versions recorded, where available           | Not run                                                                      |
| Contrast                       | Text, controls, icons, focus, hover, selected, error and disabled states         | Partial — token calculations and fixture computed-style checks only          |
| Target size                    | Applicable controls at mobile and desktop sizes                                  | Not run                                                                      |
| Focus visibility / obstruction | Sticky navigation, drawer, dialogs/overlays, all form controls                   | Not run                                                                      |
| Reduced motion                 | OS/browser reduced-motion preference; counters, smooth scrolling and transitions | Not run                                                                      |
| Forms                          | Synthetic data only; no real personal information                                | Not run                                                                      |
| Donation                       | No real payment; test copy/share/download and status behavior only               | Not run                                                                      |
| Automated scan                 | Free/open-source or browser-provided scanner, tool/version recorded              | Not run                                                                      |

For form testing, use an approved test route or synthetic data only where submission testing is necessary and authorized. Do not make a real donation. Verify the donation page's copy/share/download feedback without initiating a payment.

## 8. Related implementation tracking

Confirmed source-level items with implementation tickets:

- [#46](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/46) — mobile navigation drawer keyboard and screen-reader behavior.
- [#47](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/47) — selected volunteer-interest chip text contrast.
- [#48](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/48) — minimal-input focus indicator contrast and visibility.
- [#49](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/49) — Hindi language annotations.
- [#50](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/50) — nested link/button CTA markup.
- [#51](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/51) — keyboard- and screen-reader-accessible volunteer-interest checkboxes.
- [#22](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/22) — coordinate partnership/volunteer form field work and verify every existing control is labelled.

Existing coordination points from #32:

- [#28](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/28) is closed by [PR #38](https://github.com/Lk-ux/vasudhaiva-kulam-website/pull/38); this does not prove drawer keyboard/focus behavior passes.
- [#29](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/29) is closed by [PR #41](https://github.com/Lk-ux/vasudhaiva-kulam-website/pull/41); search and filter states still need accessibility testing.
- [#31](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/31) tracks donation-flow implementation and must be coordinated with donation accessibility tests.
- [#36](https://github.com/Lk-ux/vasudhaiva-kulam-website/issues/36) tracks removal of the nonfunctional Hindi toggle; do not duplicate it.

Every confirmed finding must be retested after its implementation PR. Add the retest date, tested revision, environment, steps, outcome and evidence to this report. Do not mark the associated WCAG criterion as passing solely because the implementation ticket is closed or an automated scan reports no issue.

## 9. Next audit actions

1. Complete real desktop/mobile browser setup and run the automated scans on representative pages.
2. Verify VK-A11Y-001 through VK-A11Y-007 on the running application with keyboard and browser accessibility tools; attach screenshots, measurements and concise assistive-technology observations.
3. Complete manual keyboard journeys and the documented NVDA/VoiceOver combinations where available.
4. Inspect every route, including each generated cause detail route, and complete the pending criterion matrix.
5. Retest every fixed finding and update its status with evidence.

Until these steps are complete, this document is an initial audit baseline and the website's WCAG 2.2 AA conformance status remains **not determined**.
