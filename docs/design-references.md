# Cibi Solar design references

Updated 22 September 2026.

## Reference websites

- https://hilitesolar.com/ — immersive solar photography, strong primary actions, clear product and service sections.
- https://www.waaree.com/ — spacious typography, a complete energy product range, prominent system planning, and a consistent visual identity.

## Applied direction

A premium editorial layout for Cibi Solar: deep navy (#122d3b), sunlight yellow (#f4cf4c), warm white, generous spacing, and lighter large headings. The homepage flows from an immersive photographic hero to customer needs, company introduction, an asymmetric five-category product grid, the existing interactive solar finder, a four-step service journey, and a yellow closing enquiry section.

Shared navigation, buttons, inner-page introductions, mobile quick actions, logos, product illustration accents, favicon and social preview adopt the same palette. Mobile layouts stack the content, preserve usable touch targets, and retain the existing accessible form and reduced-motion behavior.

The references are inspiration for layout and hierarchy. Their trademarks, product claims, client lists, certifications, statistics, testimonials and proprietary images are not reused.

## Photography

Locally hosted illustrative stock imagery from Unsplash, not photographs of Cibi Solar's staff or completed installations:

- public/images/solar-landscape.jpg — https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=85
- public/images/electrical-installation.jpg — https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=85

The image generator preserves these JPG files. Product illustrations remain illustrative catalogue artwork.

## Existing configuration

The catalogue and finder use the project's existing sample data. Real contact details and an enquiry endpoint still need to be supplied in data/site.ts and lib/enquiry.ts. This redesign does not activate enquiry delivery or deploy the website.

## Verification

- Production build completed: all 31 pages generated successfully.
- TypeScript check passed.
- Desktop and 390px mobile previews inspected; no horizontal overflow or broken homepage images detected.
- Mobile menu closes when Home is selected; the bottom system-finder shortcut reaches its section.
- Finder returns panel, hybrid inverter and battery recommendations for the tested household scenario, then clears dependent answers and results when the home size changes.
- Product navigation and enquiry links reach their corresponding pages; browser checks reported no errors.
