# Minimal Portfolio Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the current minimal portfolio UI while making project evidence easier to scan and improving keyboard, link, and sharing behavior.

**Architecture:** Keep the existing data-driven React page and add a short `highlights` array to each featured project. Render those highlights inside the current ruled list, enhance the existing experience dialog in place, and update static document metadata without adding dependencies or restructuring the application.

**Tech Stack:** React 19, TypeScript, CSS, JSON content, Node test runner, Vite

---

## File structure

- `src/content.json`: profile copy and the three public-safe project highlight lists.
- `scripts/validate-content.mjs`: publication validation for highlight count and text.
- `scripts/validate-content.test.mjs`: regression coverage for missing and oversized highlight lists.
- `src/App.tsx`: highlight rendering, consistent external-link behavior, and accessible modal focus management.
- `src/styles.css`: small highlight and interaction affordance styles within the current visual system.
- `index.html`: canonical and Open Graph metadata aligned with the portfolio copy.

### Task 1: Lock and add project highlights

**Files:**
- Modify: `scripts/validate-content.test.mjs`
- Modify: `scripts/validate-content.mjs`
- Modify: `src/content.json`

- [ ] **Step 1: Write failing validation tests**

Add tests that expect `validateContent` to reject a project without highlights and a project with more than three highlights:

```js
test('requires one to three project highlights', () => {
  const withoutHighlights = ['one', 'two', 'three'].map((slug) => ({ ...project, slug }))
  assert.ok(validateContent({ featuredProjects: withoutHighlights }).some((error) => /highlights/i.test(error)))

  const withTooMany = ['one', 'two', 'three'].map((slug) => ({
    ...project,
    slug,
    highlights: ['one', 'two', 'three', 'four'],
  }))
  assert.ok(validateContent({ featuredProjects: withTooMany }).some((error) => /highlights/i.test(error)))
})
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test scripts/validate-content.test.mjs`  
Expected: FAIL because the validator does not inspect `highlights`.

- [ ] **Step 3: Validate highlight arrays**

Inside the per-project validation loop, require one to three non-empty strings:

```js
if (
  !Array.isArray(project.highlights) ||
  project.highlights.length < 1 ||
  project.highlights.length > 3 ||
  project.highlights.some((highlight) => typeof highlight !== 'string' || !highlight.trim())
) {
  errors.push(`Project ${index + 1} must contain one to three highlights.`)
}
```

- [ ] **Step 4: Add public-safe evidence to content**

Add one three-item `highlights` array to each featured project:

```json
"highlights": ["교육 콘텐츠 화면", "공지 관리자 CRUD", "MyBatis 연동"]
```

Use `Go CLI 단독 설계`, `중복 API 호출 개선`, `크로스 플랫폼 업데이트` for DEV.AI and `IVR·ADNS 운영`, `상암–춘천 DR 이중화`, `로그 기반 장애 분석` for IPCC. Replace the profile description with a concise Korean description of Java/Spring services, Go CLI, AI tools, and operations.

- [ ] **Step 5: Run validation tests**

Run: `node --test scripts/validate-content.test.mjs && npm run validate:content`  
Expected: all tests pass and output includes `Content validation passed`.

### Task 2: Render evidence without changing the layout

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Render highlights in the existing project row**

Insert the following between status and links:

```tsx
<p className="project-evidence">{project.highlights.join(' · ')}</p>
```

- [ ] **Step 2: Style the line using existing tokens**

```css
.work-item .project-evidence {
  grid-column: 1 / -1;
  margin: 2px 0 0;
  color: #191815;
  font-size: 0.9rem;
  line-height: 1.6;
}
```

Keep the 760px container, background, borders, type scale, and existing grid unchanged.

- [ ] **Step 3: Make external links consistent**

Add a local `PortfolioLink` component that applies `target="_blank"` and `rel="noopener noreferrer"` only to `https:` URLs, then use it for profile, project, and project-detail external links. Keep internal case links and `mailto:` links in the current tab.

- [ ] **Step 4: Add a minimal experience affordance**

Append `<span className="timeline-arrow" aria-hidden="true">↗</span>` beside the company name and style it with the existing accent at `0.72rem`. Do not change row height or introduce buttons, cards, or badges.

- [ ] **Step 5: Run build verification**

Run: `npm run build`  
Expected: TypeScript and Vite builds exit successfully.

### Task 3: Complete modal keyboard behavior

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Remember the opening trigger**

Store the clicked `HTMLButtonElement` in a ref before setting `selectedExperience`, and restore focus with `requestAnimationFrame` after close.

- [ ] **Step 2: Focus and describe the dialog**

Give the dialog section a ref, add `aria-describedby="experience-dialog-summary"`, add that id to the summary, and put `autoFocus` on the close button.

- [ ] **Step 3: Trap Tab and lock background scroll**

In the dialog effect, query focusable anchors and buttons. Wrap Tab from last to first and Shift+Tab from first to last; continue supporting Escape. Save and restore `document.body.style.overflow` on mount and cleanup.

- [ ] **Step 4: Verify the implementation compiles**

Run: `npm run build`  
Expected: exit 0 with no TypeScript errors.

### Task 4: Align metadata and run full verification

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Align static metadata**

Set the description and `og:description` to mention Java/Spring services, Go CLI, AI developer tools, and operations. Add:

```html
<link rel="canonical" href="https://eastjin616.github.io/" />
<meta property="og:url" content="https://eastjin616.github.io/" />
```

Do not add `og:image` until a real share image exists.

- [ ] **Step 2: Run the complete project check**

Run: `npm run check`  
Expected: Node tests pass, content validation passes, TypeScript compiles, and Vite emits the production build.

- [ ] **Step 3: Inspect the production output and diff**

Run: `git diff --check && git status --short && git diff --stat`  
Expected: no whitespace errors; only the planned source, test, metadata, spec, and plan files are changed, excluding the user's pre-existing `.idea/` and `_workspace/` directories.

- [ ] **Step 4: Commit the verified implementation**

Create a Lore-format commit describing the minimal UI constraint, rejected visual redesign, verification evidence, and the browser-automation gap.
