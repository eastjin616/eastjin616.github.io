# 서동진 개발자 포트폴리오

제조 현장 운영, 웹 개발, AI 제품, 금융권 인프라 경험을 `Diffusion Layers`와 `Routing Map`으로 보여주는 정적 포트폴리오입니다.

## 실행

Node.js 24 이상을 권장합니다.

```bash
npm install
npm run dev
```

전체 검증과 배포용 빌드:

```bash
npm run check
npm run preview
```

## 콘텐츠 수정

공개 문구와 프로젝트 데이터는 [`src/content.json`](src/content.json)에 있습니다. 수정 후 `npm run validate:content`를 실행합니다. 대표 프로젝트는 정확히 세 개여야 하며 `[확인 필요]`, `TODO`, `TBD` 표식이 남으면 검증이 실패합니다.

프로젝트 상세 URL은 다음 형식입니다.

```text
/?project=kt-ds-dev-ai
/?project=plainpaper
/?project=ipcc-infrastructure
```

## 렌더링 원칙

핵심 콘텐츠와 링크는 일반 HTML입니다. `liquid-dom`은 히어로의 장식 렌즈만 담당합니다. WebGPU가 없거나 렌더링에 실패하면 CSS 웨이퍼와 렌즈가 그대로 남습니다.

## 공개 전 확인

- 이메일과 GitHub URL
- 이력서·경력기술서의 최종 공개 링크
- 성과 수치의 측정 기준
- 프로젝트별 공개 가능한 이미지와 코드
- 금융권 프로젝트의 공개 범위

확인 전에는 수치나 내부 시스템 정보를 임의로 추가하지 않습니다.
