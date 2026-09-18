# Advanced Editorial Portfolio Refinement

## Goal
Refine Sanjay S’s current portfolio into a more sophisticated, content-first experience inspired by the clarity of Brittany Chiang, the role separation of Matt Farley, and the project framing of Pratibha Joshi—without copying their layouts.

## Experience and structure
- Replace the small top-link emphasis with a desktop sticky identity/navigation rail and a compact mobile header.
- Keep Sanjay’s name, portrait, current positioning, direct contact links, and theme control persistently easy to reach.
- Lead with a concise introduction and a “selected highlights” area showing the strongest ventures and current teaching role immediately.
- Separate the content into clear editorial chapters: Profile, Selected Work, Experience, Capabilities, Credentials, Community, and Contact.
- Present Nexcubic, SowMate, Nurturex, and Upbring Hut as distinct case-study-style entries with role, category, one-line value, and concise scope; avoid invented results or metrics.
- Reduce wall-of-text density through stronger typography, numbered chapters, short summaries, and progressive details.

## Visual direction
- Preserve the dark-first near-black and amber identity, Space Grotesk headings, and JetBrains Mono accents.
- Use asymmetric editorial grids, restrained glass surfaces, fine rules, and larger type rather than generic rounded cards.
- Keep the portrait prominent but integrated into the identity rail and opening composition.
- Add restrained scroll reveals, active chapter feedback, subtle image movement, and precise hover/focus states with reduced-motion support.
- Maintain a polished light theme using the same semantic design tokens.

## Functionality
- Keep every navigation item, venture URL, LinkedIn/Instagram link, email, phone number, contact form, theme toggle, and back-to-top action functional.
- Correct the LinkedIn URL to the previously supplied verified profile URL.
- Remove the React ref warning caused by wrapping animated sections with button-linked content.
- Preserve HashRouter and GitHub Pages compatibility.

## Validation
- Check desktop and mobile layouts, including navigation, section jumps, theme switching, links, and contact form behavior.
- Confirm no text overlap, blank states, runtime errors, or build errors remain.
