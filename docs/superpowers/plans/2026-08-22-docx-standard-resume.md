# DOCX Standard Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a recruiter-friendly DOCX resume and PDF that use the same verified content and project order as the HTML Indigo resume.

**Architecture:** A small local DOCX builder reads `public/resume/resume-data.json` from the GitHub Pages working copy. It writes an A4 portrait document using semantic Word styles and native tables, then the packaged renderer produces visual QA PNGs and the final PDF.

**Tech Stack:** Python DOCX tooling from the document runtime, LibreOffice-compatible renderer, PDF renderer, shared resume JSON.

---

### Task 1: Define the document rendering contract

**Files:**
- Create: `/private/tmp/docx-resume-work/build_resume.py`
- Create: `/private/tmp/docx-resume-work/check_resume_data.py`

- [ ] **Step 1: Write the shared-data verification script**

```python
import json
from pathlib import Path

data = json.loads(Path('/private/tmp/eastjin616.github.io/public/resume/resume-data.json').read_text())
assert [item['id'] for item in data['projects']] == ['ktds-platform', 'ktds-cli', 'samsung-ipcc', 'badukland']
assert len(data['training']) == 2
assert data['credential']['name'] == 'SQL 개발자 (SQLD)'
print('resume data verified')
```

- [ ] **Step 2: Run it before authoring**

Run: the document-runtime Python interpreter on `check_resume_data.py`.  
Expected: `resume data verified`.

- [ ] **Step 3: Record the intended output names**

Use the exact paths:

```text
/Users/seodongjin/Desktop/job/이력서/서동진_이력서_DOCX_표준형.docx
/Users/seodongjin/Desktop/job/이력서/서동진_이력서_DOCX_표준형.pdf
```

### Task 2: Create the standard recruiter-oriented DOCX

**Files:**
- Create: `/private/tmp/docx-resume-work/build_resume.py`
- Create: `/Users/seodongjin/Desktop/job/이력서/서동진_이력서_DOCX_표준형.docx`

- [ ] **Step 1: Start the document artifact operation**

Run:

```bash
node container_tools/mark_artifact_operation_started.mjs --operation-kind create --expected-output-count 1 --output-format docx
```

- [ ] **Step 2: Create the A4 document with explicit styles**

The builder must create these sections in order:

1. `서동진 | AI 플랫폼 · 시스템 운영 개발자` plus email, phone, GitHub;
2. `핵심 기술` with grouped skills;
3. `경력 사항` with employer, period, role, and summary table;
4. `주요 프로젝트` with four data-order project blocks, each containing environment, role, implementation, and verified result;
5. `교육 및 자격` with the two training courses and SQLD.

Use deep indigo heading text, a light lavender heading fill, dark body text, 10.5–11pt body type, 1.5cm margins, real Word bullets, and explicit table cell widths. Do not include guide-file annotations, Jumpit watermark graphics, placeholder text, or unsupported performance metrics.

- [ ] **Step 3: Render the DOCX to page PNGs and PDF**

Run the packaged `render_docx.py` with `--emit_pdf` into a QA directory. Copy the emitted PDF to `서동진_이력서_DOCX_표준형.pdf`.

- [ ] **Step 4: Inspect every rendered page and iterate**

Confirm the experience table has no clipping, project blocks stay readable, bullets align beneath their text, no heading is stranded at a page bottom, and all Korean glyphs appear correctly.

- [ ] **Step 5: Verify HTML/DOCX content parity**

Compare the selected project names and course names against `resume-data.json`; every HTML project must appear once in the DOCX and no personal project may appear only in one format.

