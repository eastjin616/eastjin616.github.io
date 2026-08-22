# HTML Indigo Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a print-ready Indigo System resume at `/resume/` without changing the existing portfolio home page.

**Architecture:** Add a self-contained static route in `public/resume/`, which Vite copies verbatim into the GitHub Pages build. A shared `resume-data.json` is the source of truth for both this route and the DOCX builder, and the route renders it into semantic HTML through `resume.js`.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Vite public assets, Chrome headless PDF export.

---

### Task 1: Lock the static resume contract

**Files:**
- Create: `scripts/resume-assets.test.mjs`
- Create: `public/resume/resume-data.json`

- [ ] **Step 1: Write the failing static-asset test**

```js
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const route = new URL('../public/resume/', import.meta.url)

test('resume route has the required source files', () => {
  for (const file of ['index.html', 'resume.css', 'resume.js', 'resume-data.json']) {
    assert.equal(existsSync(new URL(file, route)), true, `${file} must exist`)
  }
  const data = JSON.parse(readFileSync(new URL('resume-data.json', route), 'utf8'))
  assert.equal(data.projects.length, 4)
  assert.deepEqual(data.projects.map((project) => project.id), ['ktds-platform', 'ktds-cli', 'samsung-ipcc', 'badukland'])
  assert.equal(data.training.length, 2)
})
```

- [ ] **Step 2: Run the test to confirm the route is absent**

Run: `node --test scripts/resume-assets.test.mjs`  
Expected: FAIL because `public/resume/index.html` does not exist.

- [ ] **Step 3: Create the canonical data file**

Create `public/resume/resume-data.json` with the keys `profile`, `skills`, `experience`, `projects`, `training`, and `credential`. Use the four project IDs in the asserted order, the 40% DEV.AI entry improvement only where already verified, and the two training courses already approved in the comparison design.

- [ ] **Step 4: Run the contract test**

Run: `node --test scripts/resume-assets.test.mjs`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add public/resume/resume-data.json scripts/resume-assets.test.mjs
git commit -m "Centralize facts for the comparable resume formats"
```

### Task 2: Build the Indigo System resume route

**Files:**
- Create: `public/resume/index.html`
- Create: `public/resume/resume.css`
- Create: `public/resume/resume.js`

- [ ] **Step 1: Add semantic route markup**

Create an `index.html` with this document shell and render target:

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="서동진 개발자 이력서" />
    <title>서동진 | Resume</title>
    <link rel="stylesheet" href="./resume.css" />
  </head>
  <body>
    <main id="resume" aria-live="polite"></main>
    <script type="module" src="./resume.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Implement the Indigo visual system**

Define the route CSS tokens and use them consistently:

```css
:root {
  --canvas: #f8f9fc;
  --ink: #20213d;
  --accent: #6257d8;
  --soft: #ebeafa;
  --muted: #666891;
  --line: #d9d9eb;
}
```

Use a compact identity header, circular indigo marker, capability modules, a numbered project index, and linear project blocks. Do not use the previous green/blue colors, a vertical timeline, or the copied left/right project-slide geometry. Add `@media print` rules with A4 page sizing, `break-inside: avoid` for project sections, and no printed navigation controls.

- [ ] **Step 3: Render the JSON data without inventing content**

In `resume.js`, fetch `./resume-data.json`, then render identity, skills, experience, projects, training, and credential with escaped text nodes. A minimal load sequence is:

```js
const root = document.querySelector('#resume')
const response = await fetch('./resume-data.json')
if (!response.ok) throw new Error('이력서 데이터를 불러오지 못했습니다.')
const data = await response.json()
root.replaceChildren(renderResume(data))
```

Keep the four project IDs in data order and use only the fields contained in the JSON.

- [ ] **Step 4: Verify development and production builds**

Run: `npm run check`  
Expected: the existing test suite, content validation, TypeScript build, and Vite build all pass.

- [ ] **Step 5: Commit**

```bash
git add public/resume/index.html public/resume/resume.css public/resume/resume.js
git commit -m "Add the Indigo System resume route"
```

### Task 3: Produce and inspect the HTML comparison PDF

**Files:**
- Create: `/Users/seodongjin/Desktop/job/이력서/서동진_이력서_HTML_Indigo.pdf`

- [ ] **Step 1: Serve the route locally**

Run: `npm run dev -- --host 127.0.0.1`  
Expected: Vite serves `/resume/` locally.

- [ ] **Step 2: Export via headless Chrome**

Run Chrome against the local `/resume/` URL with background graphics enabled and write `서동진_이력서_HTML_Indigo.pdf` to the requested output folder.

- [ ] **Step 3: Render every PDF page to PNG and inspect it**

Check that headings are not orphaned, project cards do not split awkwardly, Korean glyphs render correctly, and the four projects remain in the intended order.

- [ ] **Step 4: Commit source-only PDF export support if added**

```bash
git add scripts
git commit -m "Make the resume route exportable for review"
```

