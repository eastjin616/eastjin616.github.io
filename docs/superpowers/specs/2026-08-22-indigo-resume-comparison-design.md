# Indigo resume comparison design

## Goal

Create two comparable versions of Seo Dongjin's resume from the same verified career facts:

- a public, print-ready HTML resume at `/resume/` in the existing GitHub Pages repository;
- a conventional DOCX resume and an exported PDF for recruiter-oriented submission.

The current portfolio home page remains unchanged. The two resumes differ only in reading experience, not in factual claims or project ordering.

## HTML resume

The new route is implemented as static files under `public/resume/`, which Vite copies directly into the Pages artifact. It therefore works on a direct `/resume/` visit without SPA fallback logic and does not alter the portfolio's existing React application.

### Visual direction

Use the selected Indigo System direction:

- canvas: near-white `#F8F9FC`;
- ink: deep indigo `#20213D`;
- accent: indigo `#6257D8`;
- soft surface: lavender `#EBEAFA`;
- secondary text: slate `#666891`.

Do not retain the reference resume's green/blue palette, cover timeline, vertical dividers, or left/right project-page composition. The new cover uses a small identity line, a circular indigo marker, concise capability modules, and a numbered project index. Project details use compact technical cards and a linear reading flow.

### Content and ordering

Use four work projects, ordered for the target HR-system role:

1. KT DS DEV.AI Platform (React, Next.js, Python, FastAPI, PostgreSQL)
2. KT DS DEV.AI CODE CLI (Go, Cobra, cross-platform tooling)
3. Samsung Fire IPCC (system development and operations)
4. Korea Baduk Association Badukland (Java, Spring, MyBatis, Oracle)

Keep the career table, core capabilities, two training courses, and only the SQLD credential. Do not add personal projects, unverified contribution percentages, or unsupported metrics.

### Print behavior

The route supports screen and print styles. Chrome PDF export produces the HTML comparison PDF using the same content and preserves readable project sections without clipped or orphaned headings.

## DOCX resume

Use the supplied Jumpit guide only for information architecture, not for its watermark, comments, blue callout boxes, or visual styling:

1. identity and concise summary;
2. skill set;
3. work experience table;
4. selected project details with stack, role, implementation, and verified outcome;
5. education and SQLD.

The DOCX is a restrained, recruiter-friendly A4 portrait document with dark indigo headings, light lavender section fills, and no artificial graphics. It uses the same project order and text as the HTML version wherever the formats overlap.

## Deliverables

- GitHub Pages source additions under `public/resume/`.
- `/Users/seodongjin/Desktop/job/이력서/서동진_이력서_HTML_Indigo.pdf`.
- `/Users/seodongjin/Desktop/job/이력서/서동진_이력서_DOCX_표준형.docx`.
- `/Users/seodongjin/Desktop/job/이력서/서동진_이력서_DOCX_표준형.pdf`.

## Verification

- Run the existing repository check after the HTML additions.
- Render the HTML PDF and visually inspect every page.
- Render the DOCX to PNG pages and visually inspect every page before PDF delivery.
- Confirm the HTML and DOCX contain the same four selected projects and the same two training courses.
