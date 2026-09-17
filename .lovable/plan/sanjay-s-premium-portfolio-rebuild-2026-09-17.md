# Sanjay S — Premium Portfolio Rebuild

## Goal
Replace the authenticated Founder OS interface with a public, single-page portfolio for Sanjay S. Keep GitHub Pages compatibility, retain the existing profile photo, and make every navigation item and call-to-action usable.

## Experience and layout
- Build a dark-first editorial portfolio with an amber accent, geometric display typography, subtle glass surfaces, an asymmetric grid, and generous spacing.
- Add a compact sticky navigation with section links, mobile menu, smooth scrolling, active-section feedback, and a dark/light theme toggle.
- Create a full-height hero featuring Sanjay’s photo, an animated grid/mesh backdrop, rotating role text, and working “View Work” and “Get in Touch” actions.
- Build sections in the requested order: About, Experience, Ventures, Skills, Certifications, Community & Talks, Connect, and Contact.
- End with a compact footer containing copyright, working social links, and a back-to-top control.

## Content
- Use the supplied biography, education, experience, ventures, technologies, certifications, speaking activity, phone number, and email.
- Use the existing Instagram profile (`sanjay.s.journey`) and the LinkedIn URL supplied in this request.
- Present experience as an animated vertical timeline and ventures as concise cards with keyboard-accessible hover/focus details.
- Group skills into four professional categories with recognizable technology marks where available and restrained text badges elsewhere.
- Show certifications as issuer-led credential tiles rather than generic cards.

## Interactions
- Use Framer Motion for typewriter transitions, section reveals, timeline progress, and restrained hover movement; respect reduced-motion preferences.
- Make the contact form validate required fields and open a pre-addressed email draft, avoiding a fake successful submission.
- Link LinkedIn and Instagram directly. Do not fabricate live posts or follower counts; provide a polished social preview area that can later accept an authenticated Instagram widget.
- Ensure focus states, semantic landmarks, readable contrast, useful alt text, and mobile-safe spacing.

## Technical details
- Simplify routing so the public portfolio is the main `HashRouter` route and remove the login gate from the visible experience while leaving unrelated backend data untouched.
- Rework the global design tokens for dark and light themes, load fonts from the document head, and remove the remote CSS font import.
- Keep asset paths compatible with the existing GitHub Pages build workflow and hash-based routing.
- Update page metadata for Sanjay S’s portfolio and remove stale Founder OS social metadata.
- Verify the live preview at desktop and mobile widths, test navigation/theme/form interactions, and confirm the latest build diagnostics are clean.
