# Design System Strategy: The Quiet Authority

### 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Quiet Authority."** 

In the context of school management, the interface must act as a sophisticated, invisible partner to the educator. We are moving away from the "cluttered dashboard" trope and toward a **High-End Editorial** experience. This means treating data with the same respect a premium magazine treats typography. 

We achieve this by breaking the "standard template" look. Instead of a grid of identical boxes, we utilize **intentional asymmetry** and **tonal layering**. This system prioritizes high information density without sacrificing the "calm" required for administrative tasks. We replace aggressive structural lines with subtle background shifts, creating a UI that feels carved rather than constructed.

---

### 2. Colors & The Tonal Architecture
The palette is rooted in a technical, neutral base punctuated by a singular, authoritative Indigo.

*   **Primary Identity:** Use `primary` (#4d44e3) sparingly. It is a beacon, not a background. 
*   **The "No-Line" Rule:** To achieve a high-end feel, **prohibit 1px solid borders for sectioning.** Boundaries must be defined through background color shifts. For example, a main content area using `surface` should be distinguished from a sidebar using `surface-container-low`.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of fine paper. 
    *   **Level 0 (Canvas):** `surface` (#f7f9fb)
    *   **Level 1 (Sections):** `surface-container-low` (#f0f4f7)
    *   **Level 2 (Active Cards):** `surface-container-lowest` (#ffffff)
*   **The "Glass & Gradient" Rule:** For floating elements (like popovers or command palettes), use `surface-container-lowest` with a 80% opacity and a `backdrop-blur-md`. main Action buttons should utilize a subtle linear gradient from `primary` (#4d44e3) to `primary_dim` (#4034d7) to provide a "jewel-like" depth that flat colors lack.

---

### 3. Typography: The Editorial Scale
We use **Inter** to maintain a technical, precise feel, but we apply it with strict, editorial hierarchy to guide the eye.

*   **Metric Display:** Use `display-md` for primary data points. These should be tight-tracked (-0.02em) to feel cohesive and authoritative.
*   **The Label System:** In high-density dashboards, `label-md` and `label-sm` are your most used tokens. Use `on_surface_variant` (#566166) for labels to create a clear visual distinction from the data values, which should always be `on_surface` (#2a3439).
*   **Intentional Hierarchy:** Avoid using the same font weight for both a label and its value. If the value is `title-sm` (Medium 500), the label must be `label-sm` (Regular 400).

---

### 4. Elevation & Depth
Depth is conveyed through **Tonal Layering** rather than traditional shadows. This creates a "tool-first" environment that feels grounded and stable.

*   **The Layering Principle:** To "lift" a card, do not add a shadow. Instead, place a `surface-container-lowest` card onto a `surface-container-low` background. This creates a "soft lift" that is easier on the eyes during long work sessions.
*   **Ambient Shadows:** Shadows are reserved exclusively for Modals and Menus. Use a wide blur (24px+) with a very low opacity (4%-8%). The shadow color should be tinted with `primary` (e.g., a deep indigo-tinted shadow) to ensure the shadow feels like part of the environment’s lighting.
*   **The Ghost Border:** If a container requires a border for accessibility (e.g., an input field), use the `outline_variant` token at **20% opacity**. This creates a "Ghost Border" that defines space without adding visual noise.

---

### 5. Components: Precision Primitives
Components are inspired by `shadcn/ui` but refined for a custom, premium feel.

*   **Buttons:** Use a `DEFAULT` radius (4px). Primary buttons use the `primary` gradient. Secondary buttons must use `surface-container-high` as a background with no border, creating a seamless "embedded" look.
*   **Input Fields:** Use `surface-container-lowest` for the fill. The focus state should not be a thick glow; use a 1px solid `primary` border with a subtle `primary_container` outer ring (2px).
*   **Data Cards:** **Forbid the use of divider lines.** Separate header and body content using a change in background fill (e.g., `surface-container-high` for the header, `surface-container-lowest` for the body).
*   **Status Badges:** Use the "Dim" tokens (e.g., `error_container` text on a 10% opacity `error` background). This ensures high readability without the "neon" look of standard SaaS apps.
*   **The "Data-Grid":** For tables, use `surface-container-lowest` for the row background. Instead of lines, use a 4px vertical margin between rows and a subtle `surface-container-low` hover state.

---

### 6. Do’s and Don’ts

**Do:**
*   Use **asymmetric layouts** (e.g., a narrow 25% column for secondary metrics paired with a 75% wide column for a primary chart) to create visual interest.
*   Trust **vertical whitespace.** High-density doesn't mean lack of breathing room; it means high-information-to-ink ratio.
*   Apply `surface-tint` at 2% opacity over large background areas to give the grays a sophisticated, "cool" temperature.

**Don’t:**
*   **Never use 100% black.** Even for text, stay within the `on_surface` (#2a3439) range to maintain the "Calm" aesthetic.
*   **Avoid "Floating" elements.** If an element doesn't need to be a modal, it should be "docked" into a surface container.
*   **No "Standard" Grids.** Avoid the 12-column bootstrap look. Think in terms of "Data Blocks" that stack and nest based on the priority of the school administrator's workflow.