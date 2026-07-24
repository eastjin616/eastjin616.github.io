# 개발자 포트폴리오 웹사이트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 제조·공정 운영에서 웹, AI 제품, 금융권 인프라로 이어진 서동진의 경력을 `Diffusion Layers`와 `Routing Map`으로 보여주는 정적 개발자 포트폴리오를 만든다.

**Architecture:** React 19와 Vite로 하나의 정적 페이지를 만든다. 홈과 프로젝트 상세는 같은 문서에서 렌더링하고, 프로젝트 상세 주소는 `?project=<slug>` 쿼리 문자열로 공유한다. 모든 핵심 콘텐츠와 탐색은 일반 HTML로 제공하며, `@liquid-dom/react`는 WebGPU 지원 환경에서만 지연 로드되는 장식 레이어로 격리한다. 콘텐츠는 `src/content.json` 한 곳에서 관리하고 Node 내장 테스트로 공개 필수 항목을 검증한다.

**Tech Stack:** React 19.2, TypeScript, Vite 8, `@liquid-dom/react` 0.1.1, CSS, Node.js 내장 테스트 러너

---

## 구현 원칙

- 첫 화면에서 10초 안에 `백엔드 중심 풀스택`, `운영 경험`, `대표 프로젝트 3개`가 파악되어야 한다.
- liquid-dom이 실패하거나 WebGPU가 없어도 텍스트, 링크, 프로젝트 상세가 전부 동작해야 한다.
- 확인되지 않은 수치, 기간, 고객명과 인프라 상세는 공개 콘텐츠에 넣지 않는다.
- 별도 라우터, 상태 관리 라이브러리, CMS, 문의 백엔드, 애니메이션 라이브러리를 추가하지 않는다.
- 모바일과 `prefers-reduced-motion`을 첫 구현 범위에 포함한다.
- 커밋은 저장소의 Lore Commit Protocol을 따른다.

## Task 1: 최소 React/Vite 프로젝트 만들기

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `.gitignore`

- [ ] **Step 1: 저장소와 패키지 메타데이터 초기화**

Run:

```bash
git init
npm init -y
npm install react@19.2.8 react-dom@19.2.8 @liquid-dom/react@0.1.1
npm install -D vite@8.1.5 @vitejs/plugin-react@6.0.4 typescript@7.0.2 @types/react@19.2.17 @types/react-dom@19.2.3 @types/node@26.1.1 @webgpu/types@0.1.71
```

Expected: `package-lock.json`이 생성되고 peer dependency 오류가 없다.

- [ ] **Step 2: 스크립트와 TypeScript 설정 작성**

`package.json`의 스크립트를 다음처럼 둔다.

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "node --test scripts/*.test.mjs",
    "validate:content": "node scripts/validate-content.mjs",
    "check": "npm run test && npm run validate:content && npm run build"
  }
}
```

Vite의 React TypeScript 기본 설정을 사용하되 `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`를 유지한다.

- [ ] **Step 3: 가장 작은 렌더링 진입점 작성**

`src/App.tsx`:

```tsx
export default function App() {
  return <main id="content">Portfolio setup complete.</main>
}
```

`src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 4: 첫 빌드 확인**

Run:

```bash
npm run build
```

Expected: TypeScript 오류 없이 `dist/`가 생성된다.

- [ ] **Step 5: 기반 작업 커밋**

```bash
git add package.json package-lock.json index.html tsconfig*.json vite.config.ts src .gitignore
git commit -m "Establish a minimal, verifiable portfolio runtime

Keep the first implementation static and dependency-light so content and accessibility remain independent from WebGPU.

Constraint: liquid-dom React bindings require React 19
Rejected: Add a router and animation framework | one page and native browser APIs cover the approved scope
Confidence: high
Scope-risk: narrow
Tested: npm run build
Not-tested: Browser rendering"
```

## Task 2: 공개 콘텐츠를 한 곳에 모으고 검증하기

**Files:**

- Create: `src/content.json`
- Create: `scripts/validate-content.mjs`
- Create: `scripts/validate-content.test.mjs`

- [ ] **Step 1: 실패하는 콘텐츠 검증 테스트 작성**

`scripts/validate-content.test.mjs`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { validateContent } from './validate-content.mjs'

const validProject = {
  slug: 'sample',
  title: 'Sample',
  problem: 'A concrete problem',
  role: 'Backend',
  stack: ['Java'],
  sections: {
    constraint: 'A real constraint',
    decision: 'A reasoned decision',
    system: 'A system explanation',
    recovery: 'A failure and recovery path',
    result: 'A verifiable result without an invented number',
  },
}

test('requires exactly three featured projects with unique slugs', () => {
  const errors = validateContent({ featuredProjects: [validProject, validProject] })
  assert.match(errors.join('\n'), /exactly three/i)
  assert.match(errors.join('\n'), /unique/i)
})

test('rejects unresolved publication markers', () => {
  const projects = ['one', 'two', 'three'].map((slug) => ({
    ...validProject,
    slug,
    problem: slug === 'two' ? '[확인 필요] 개선 수치' : validProject.problem,
  }))
  assert.match(validateContent({ featuredProjects: projects }).join('\n'), /확인 필요/)
})
```

- [ ] **Step 2: 테스트 실패 확인**

Run:

```bash
npm test
```

Expected: `ERR_MODULE_NOT_FOUND` 또는 `validateContent` 미구현으로 실패한다.

- [ ] **Step 3: 최소 검증기 구현**

`scripts/validate-content.mjs`는 다음만 검증한다.

1. 대표 프로젝트가 정확히 3개인지
2. `slug`가 중복되지 않는지
3. 프로젝트 공통 필드와 Routing Map 5개 섹션이 비어 있지 않은지
4. 공개 전 미확인 표식(`[확인 필요]`, `TODO`, `TBD`)이 남아 있지 않은지
5. 외부 링크가 `https:` 또는 `mailto:`인지

직접 실행될 때는 `src/content.json`을 읽고, 오류가 있으면 목록을 출력한 뒤 종료 코드 1을 반환한다. 테스트에서 import할 때는 자동 실행하지 않는다.

- [ ] **Step 4: 검증된 실제 콘텐츠 작성**

`src/content.json`의 최상위 구조:

```json
{
  "profile": {
    "name": "서동진",
    "role": "백엔드 중심 풀스택 개발자",
    "headline": "현장에서 쌓은 운영 감각 위에 소프트웨어를 쌓았습니다.",
    "description": "화면, 서버, 데이터와 운영을 연결해 실제 환경에서 오래 쓰이는 서비스를 만듭니다."
  },
  "links": {
    "email": "mailto:",
    "github": "",
    "resume": "https://app.notion.com/p/346457fc0c60814fbce3e2cf3357de2b",
    "career": "https://app.notion.com/p/33f457fc0c60809fbee4e9879cc2425c"
  },
  "layers": [],
  "featuredProjects": [],
  "experience": []
}
```

구현 시에는 다음 안전한 범위만 사용한다.

- Layers: `Physical`, `Backend`, `AI Product`, `Reliability`
- Featured: `KT DS DEV.AI`, `Plainpaper`, `금융권 IPCC 인프라`
- Experience: `LG Display`, `SK hynix`, `Badukland`, `KT DS`, `금융권 IPCC`
- KT DS의 40% 수치는 측정 기준 확인 전까지 제외하고 `대량 이력 조회 흐름을 개선`으로 표현한다.
- IPCC는 고객명, 내부 주소, 구성 수량, 장애 이력을 공개하지 않는다.
- 교육·학력 기간과 Badukland DB 종류는 이번 사이트 본문에 넣지 않는다.
- 이메일과 GitHub가 아직 확인되지 않았다면 빈 링크를 렌더링하지 않도록 하고, 검증기는 빈 선택 링크를 허용한다.

- [ ] **Step 5: 테스트와 콘텐츠 검증 확인**

Run:

```bash
npm test
npm run validate:content
```

Expected: 모든 테스트가 통과하고 `Content validation passed`가 출력된다.

- [ ] **Step 6: 콘텐츠 기반 커밋**

```bash
git add src/content.json scripts
git commit -m "Protect the public portfolio from unverified claims

Centralize display copy and fail validation when required case-study structure or publication markers are missing.

Constraint: Several dates, metrics, and infrastructure details still need owner verification
Rejected: Publish provisional numbers | an omitted claim is safer than a misleading one
Confidence: high
Scope-risk: narrow
Directive: Do not add performance numbers without recording their measurement basis
Tested: npm test; npm run validate:content
Not-tested: Copy review by the portfolio owner"
```

## Task 3: 의미 구조가 완전한 홈페이지 구현하기

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: 일반 HTML만으로 전체 홈페이지 작성**

`App.tsx`는 별도 컴포넌트 파일을 늘리지 않고 다음 섹션을 순서대로 렌더링한다.

```text
header
  이름 / 2026
  Layers · Work · Experience · Contact
main
  Layer 00 / Introduction
  Layer 01 / Origin
  Layer 02 / Selected Work
  Layer 03 / Experience
  Final Layer / Contact
footer
```

필수 구현:

- 페이지 첫 링크로 `본문 바로가기`
- `header`, `nav`, `main`, `section`, `article`, `footer` 사용
- 제목 순서 `h1 → h2 → h3` 유지
- 대표 프로젝트는 버튼처럼 꾸민 링크가 아니라 실제 `<a href="?project=slug">`
- 링크가 비어 있으면 요소 자체를 렌더링하지 않음
- 외부 링크에는 새 창 강제 대신 기본 동작 사용

- [ ] **Step 2: 핵심 카피와 레이어 표현 연결**

히어로:

```text
LAYER 00 / INTRODUCTION
Layer by layer,
I build systems
that keep running.

현장에서 쌓은 운영 감각 위에 소프트웨어를 쌓았습니다.
```

Origin 섹션은 경력 전환을 변명처럼 설명하지 않고, 각 경험이 개발 관점에 추가한 것을 4개 레이어로 보여준다.

- [ ] **Step 3: 빌드 및 문서 구조 확인**

Run:

```bash
npm run build
npm run dev -- --host 127.0.0.1
```

브라우저에서 확인:

- JavaScript가 로드되면 모든 섹션이 보인다.
- Tab 키로 내비게이션과 프로젝트 링크를 순서대로 이동한다.
- 375px 폭에서 가로 스크롤이 없다.

- [ ] **Step 4: 홈페이지 구조 커밋**

```bash
git add src/App.tsx src/styles.css
git commit -m "Make the career narrative readable before visual effects

Render the approved layer story and three representative projects with semantic HTML and direct links.

Constraint: The portfolio must remain useful without WebGPU
Rejected: Put copy inside the liquid canvas | canvas content is a progressive enhancement, not the document
Confidence: high
Scope-risk: moderate
Tested: npm run build; keyboard navigation; 375px responsive check
Not-tested: Screen reader announcement order"
```

## Task 4: Diffusion Layers 시각 시스템 구현하기

**Files:**

- Modify: `src/styles.css`
- Create: `public/favicon.svg`

- [ ] **Step 1: 디자인 토큰과 기본 레이아웃 추가**

CSS 사용자 정의 속성은 한 곳에만 둔다.

```css
:root {
  --paper: #e8e8e3;
  --ink: #111927;
  --muted: #5f6871;
  --night: #111512;
  --line: color-mix(in srgb, var(--ink) 18%, transparent);
  --steel: #86a4b8;
  --violet: #b8afc8;
  --sage: #aebead;
  --apricot: #d5aa88;
  --signal: #b8d94a;
  --page: min(1180px, calc(100vw - 40px));
}
```

폰트는 외부 요청 없이 시스템 폰트 조합으로 시작한다.

- 영문 디스플레이: `Georgia`, `Times New Roman`, serif
- 한글·본문: `Pretendard`, `Apple SD Gothic Neo`, sans-serif
- 레이어 번호: `SFMono-Regular`, `Consolas`, monospace

- [ ] **Step 2: CSS 웨이퍼와 레이어 그래픽 만들기**

히어로 우측의 기본 그래픽은 pseudo-element, 동심원, 얇은 격자로 만든다. liquid-dom 없이도 완성된 형태여야 한다.

필수 상태:

- 기본: 실버 그레이 배경과 4개 레이어 링
- hover 가능한 환경: 프로젝트 행의 라우팅 선만 이동
- 모바일: 웨이퍼가 텍스트 뒤가 아닌 아래에 배치
- `prefers-reduced-motion: reduce`: 모든 자동 애니메이션 제거
- `forced-colors: active`: 장식 숨김, 텍스트와 링크 유지

- [ ] **Step 3: Selected Work를 카드 모음이 아닌 시스템 목록으로 표현**

각 프로젝트 행은 다음 3열을 사용한다.

```text
02.1 / PROJECT NAME
문제 정의와 담당 범위
OPEN CASE →
```

작은 화면에서는 자연스럽게 한 열로 쌓는다. 반복되는 둥근 카드, 보라색 글로우, 과도한 drop-shadow는 사용하지 않는다.

- [ ] **Step 4: 시각 회귀용 화면 확인**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

다음 뷰포트에서 스크린샷을 남기고 확인한다.

- 1440 × 1000: 히어로, 웨이퍼, Selected Work의 위계
- 768 × 1024: 내비게이션과 레이어 겹침
- 375 × 812: 줄바꿈, 터치 대상, 가로 스크롤

Expected: 첫 화면이 흔한 SaaS 랜딩페이지나 동일 크기 카드 그리드처럼 보이지 않는다.

- [ ] **Step 5: 시각 시스템 커밋**

```bash
git add src/styles.css public/favicon.svg
git commit -m "Give the portfolio a career-specific visual identity

Translate process layers and routing paths into restrained editorial layouts that still work as plain CSS.

Constraint: Avoid the generic neon-glass AI portfolio look
Rejected: Use a component library | its visual grammar would overpower the approved concept
Confidence: high
Scope-risk: moderate
Tested: 1440px, 768px, and 375px viewport review; reduced-motion review
Not-tested: Older Safari color-mix rendering"
```

## Task 5: 공유 가능한 프로젝트 상세와 Routing Map 구현하기

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: 네이티브 쿼리 문자열 상태 구현**

`URLSearchParams`로 `project`를 읽는다. 알려진 slug이면 상세를, 없거나 잘못된 slug이면 홈을 렌더링한다.

동작:

- `?project=kt-ds-dev-ai` 직접 접속 가능
- 상세의 `Back to selected work`는 `/?#work`
- 브라우저 뒤로가기/앞으로가기 시 현재 화면 갱신
- 같은 문서 안의 프로젝트 링크는 `history.pushState`로 전환하고 맨 위에 포커스를 이동
- JavaScript 이벤트가 실패해도 링크의 기본 탐색이 동작

- [ ] **Step 2: 하나의 공통 케이스 스터디 템플릿 작성**

상세 페이지 순서:

```text
프로젝트 한 줄 정의
역할 · 기술 · 공개 범위
PROBLEM
CONSTRAINT
DECISION
SYSTEM
RECOVERY
RESULT
EVIDENCE / 공개 가능한 링크
RETROSPECTIVE
```

Evidence가 없으면 가짜 링크나 빈 이미지 자리를 만들지 않고 `공개 가능한 범위에서 구조와 판단을 설명했습니다.`라고 표시한다.

- [ ] **Step 3: Routing Map을 보조 목차로 구현**

각 노드는 실제 앵커 링크다.

```tsx
<nav aria-label="프로젝트 상세 목차" className="routing-map">
  <a href="#problem">Problem</a>
  <a href="#constraint">Constraint</a>
  <a href="#decision">Decision</a>
  <a href="#system">System</a>
  <a href="#recovery">Recovery</a>
  <a href="#result">Result</a>
</nav>
```

CSS 선과 노드는 시각적 보조일 뿐이며, 읽는 순서는 DOM 순서와 동일하게 유지한다.

- [ ] **Step 4: 상세 경로 수동 검증**

확인 URL:

```text
/?project=kt-ds-dev-ai
/?project=plainpaper
/?project=ipcc-infrastructure
/?project=unknown
```

Expected:

- 세 개 상세 URL이 각각 올바른 콘텐츠를 보여준다.
- 잘못된 slug는 빈 화면이나 오류 대신 홈으로 돌아간다.
- Routing Map을 키보드로 이동할 수 있다.
- 뒤로가기 후 이전 스크롤 위치 또는 `#work` 위치로 복귀한다.

- [ ] **Step 5: 상세 화면 커밋**

```bash
git add src/App.tsx src/styles.css
git commit -m "Expose engineering decisions through shareable case studies

Use native URLs and anchor-based routing maps so each project can be reviewed without adding a routing dependency.

Constraint: Static hosting must serve every portfolio state
Rejected: Add React Router | three query-addressed details do not justify it
Confidence: high
Scope-risk: moderate
Tested: three project URLs; unknown slug fallback; browser history; keyboard routing
Not-tested: Social crawler rendering of query-specific descriptions"
```

## Task 6: liquid-dom을 안전한 점진 향상으로 추가하기

**Files:**

- Create: `src/LiquidLayer.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: WebGPU 지원 확인과 오류 경계 작성**

`LiquidLayer.tsx`에 다음 세 가지를 둔다.

1. `'gpu' in navigator` 지원 확인
2. React class error boundary
3. `LiquidCanvas onError` 발생 시 정적 폴백으로 전환하는 상태

캔버스는 `aria-hidden="true"`인 wrapper 안에 두고 pointer event를 받지 않는다. CSS 웨이퍼가 항상 아래에 남아 있으므로 오류 시 별도 오류 문구를 사용자에게 노출하지 않는다.

- [ ] **Step 2: 패키지를 초기 번들에서 분리**

`App.tsx`:

```tsx
import { lazy, Suspense } from 'react'

const LiquidLayer = lazy(() => import('./LiquidLayer'))
```

히어로가 마운트된 뒤에만 렌더링하고, `Suspense` fallback은 `null`로 둔다. 핵심 HTML을 이 컴포넌트의 자식으로 넣지 않는다.

- [ ] **Step 3: 최소 liquid-dom 장면 구현**

공식 React API만 사용한다.

```tsx
<LiquidCanvas
  className="liquid-layer"
  canvasClassName="liquid-layer__canvas"
  frameloop={reducedMotion ? 'demand' : 'always'}
  maxDpr={1.5}
  onError={handleError}
>
  <GlassContainer
    blur={6}
    spacing={24}
    bezelWidth={14}
    thickness={64}
    tint={{ r: 0.45, g: 0.55, b: 0.62, a: 0.32 }}
  >
    <Glass cornerRadius={96}>
      <Frame width={190} height={190} />
    </Glass>
  </GlassContainer>
</LiquidCanvas>
```

`Html` 컴포넌트는 사용하지 않는다. 한 개의 렌즈만 구현하고, 프로젝트 전환 애니메이션이나 다중 캔버스는 실제 화면 검증 뒤에도 필요할 때만 추가한다.

- [ ] **Step 4: 폴백과 성능 검증**

확인:

- Chrome WebGPU 지원: 렌즈가 보이고 텍스트 클릭을 방해하지 않음
- 브라우저 개발자 도구에서 `navigator.gpu` 분기 비활성화: CSS 웨이퍼만 보임
- `prefers-reduced-motion: reduce`: 연속 프레임 렌더링 없음
- 네트워크: liquid-dom 청크가 별도 파일로 생성됨
- 콘솔: 초기화 오류와 unhandled rejection 없음

Run:

```bash
npm run build
```

Expected: `dist/assets`에 liquid-dom이 포함된 별도 지연 로드 청크가 생성된다.

- [ ] **Step 5: 점진 향상 커밋**

```bash
git add src/LiquidLayer.tsx src/App.tsx src/styles.css
git commit -m "Use liquid refraction without making the portfolio depend on it

Isolate one decorative lens behind feature detection, lazy loading, reduced-motion handling, and a persistent CSS fallback.

Constraint: liquid-dom rendering requires WebGPU
Rejected: Render navigation or project copy through liquid-dom | experimental rendering must not own essential content
Confidence: medium
Scope-risk: moderate
Directive: Keep future liquid effects decorative and preserve the static fallback
Tested: WebGPU path; forced fallback; reduced motion; production build chunking
Not-tested: Broad mobile GPU compatibility"
```

## Task 7: 메타데이터와 최종 검증

**Files:**

- Modify: `index.html`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Create: `README.md`
- Optional Create: `public/og-cover.png`

- [ ] **Step 1: 기본 메타데이터 작성**

`index.html`에 다음을 포함한다.

- 한국어 문서 언어
- title: `서동진 — 백엔드 중심 풀스택 개발자`
- description: 승인된 확장 문장
- theme-color
- favicon
- Open Graph 기본 제목·설명

실제 배포 주소가 정해지기 전에는 가짜 canonical URL을 넣지 않는다.

- [ ] **Step 2: README에 운영 방법 기록**

README에는 다음만 적는다.

```text
요구 환경
설치 / 개발 / 검사 / 빌드 명령
콘텐츠 수정 위치
공개 전 사실 확인 목록
WebGPU 폴백 원칙
정적 호스팅 배포 방법
```

- [ ] **Step 3: 자동 검증 전체 실행**

Run:

```bash
npm run check
```

Expected:

- Node 테스트 통과
- 콘텐츠 검증 통과
- TypeScript와 Vite 빌드 통과

- [ ] **Step 4: 수동 수용 기준 검증**

체크리스트:

- 홈에서 포지셔닝, 대표 프로젝트 3개, 커리어 흐름을 찾는 데 10초 이상 걸리지 않는다.
- 모든 링크와 Routing Map을 키보드로 사용할 수 있다.
- 375px, 768px, 1440px에서 레이아웃 오류가 없다.
- WebGPU on/off에서 핵심 콘텐츠가 동일하다.
- 모션 감소 설정에서 자동 모션이 중지된다.
- 개발자 콘솔에 오류가 없다.
- 미확인 수치, 비공개 고객명, 내부 인프라 정보가 없다.
- 이력서와 경력기술서 링크가 열리며 접근 권한 문제가 없다.

- [ ] **Step 5: 최종 커밋**

```bash
git add index.html src README.md public
git commit -m "Prepare the portfolio for factual review and static deployment

Add discoverability metadata, maintenance notes, and a final verification path without inventing a deployment URL.

Constraint: Final contact details, PDFs, and publication domain remain owner-controlled
Confidence: high
Scope-risk: narrow
Tested: npm run check; responsive, keyboard, fallback, and content review
Not-tested: Production domain analytics and social preview cache"
```

## 공개 직전 사용자 확인 항목

다음 항목은 구현을 막지 않지만 실제 공개 전에 반드시 확정한다.

- 이메일 주소와 GitHub 프로필 URL
- 이력서와 경력기술서를 Notion 링크로 유지할지 PDF로 교체할지
- KT DS 개선 수치를 공개할 경우 측정 대상, 전후 기준과 기간
- Plainpaper 데모·GitHub의 공개 가능 여부
- 금융권 IPCC에서 공개 가능한 역할 범위
- 대표 프로젝트의 이미지 또는 비식별화 목업
- 팀스파르타·세종사이버대학교 기간과 Badukland DB 종류

## 완료 조건

아래가 모두 충족되어야 구현 완료로 본다.

1. `npm run check`가 성공한다.
2. 세 프로젝트 상세 URL을 직접 열 수 있다.
3. WebGPU가 없어도 동일한 핵심 콘텐츠와 링크가 보인다.
4. 모바일, 키보드, 모션 감소 환경에서 사용할 수 있다.
5. 공개 금지 또는 확인되지 않은 정보가 없다.
6. 배포 가능한 `dist/`가 생성된다.
