export type ResumeDetailSection = { title: string; bullets: string[] }
export type ResumeProject = { slug: string; title: string; company: string; period: string; role: string; stack: [string, string]; summary: string; sections: [ResumeDetailSection, ResumeDetailSection] }
export type ResumeEducation = { title: string; organization: string; period: string; detail: string; accent: string; bullets: string[] }

export const resumeData = {
  profile: { name: '서동진', role: 'AI 플랫폼 · 시스템 운영 개발자', birth: '1998.06.16', email: 'djseo9812@naver.com', phone: '010-8803-2951', githubUrl: 'https://github.com/eastjin616' },
  timeline: [
    { startYear: '2026', endYear: '현재', role: '시스템 개발·운영', company: '효성ITX', period: '2026.05 - 현재', title: '삼성화재 IPCC 콜센터 인프라 운영 및 개발' },
    { startYear: '2026', endYear: '2026', role: 'CLI 설계·개발', company: '이트리즈시스템', period: '2026.01 - 2026.05', title: 'KT DS DEV.AI CODE CLI 개발' },
    { startYear: '2025', endYear: '2025', role: '웹·API 개발', company: '이트리즈시스템', period: '2025.08 - 2025.12', title: 'KT DS DEV.AI 플랫폼 개발' },
    { startYear: '2024', endYear: '2024', role: '웹 서비스 개발', company: '우나무', period: '2024.05 - 2024.11', title: '한국기원 바둑랜드 프로젝트' },
  ],
  projects: [
    { slug: 'samsung-ipcc', title: '삼성화재 IPCC 콜센터\n인프라 운영 및 개발', company: '효성ITX', period: '2026.05 - 현재', role: '시스템 개발·운영', stack: ['Linux / Node.js / Java / Spring', 'Tomcat'], summary: '삼성화재 IPCC 콜센터의 IVR와 ADNS 시스템을 개발·운영하고 있습니다. 콜 라우팅과 음성 응답 흐름, DNS 기반 서비스 연계를 관리하며 장애 발생 시 로그와 처리 데이터를 바탕으로 원인을 분석하고 대응합니다.', sections: [{ title: '[IVR·ADNS 시스템 운영 및 유지보수]', bullets: ['IVR 콜 시스템과 ADNS 서버 개발·운영·유지보수', '콜 라우팅, 음성 응답 흐름, DNS 기반 서비스 연계 관리', 'Linux·Tomcat 환경의 프로그램 반영, 재기동, 오류 확인 절차 수행'] }, { title: '[DR 이중화 환경 및 장애 대응]', bullets: ['상암-춘천 DR 이중화 환경과 장애 시 절체 체계 운영', '로그·모니터링 데이터 기반 장애 원인 분석', '유관부서 협업을 통한 장애 조치 및 결과 확인'] }] },
    { slug: 'devai-cli', title: 'KT DS DEV.AI CODE\nCLI 개발', company: '이트리즈시스템', period: '2026.01 - 2026.05', role: 'CLI 설계·개발', stack: ['Go / Cobra / Bubble Tea', 'Lip Gloss / Git / MCP'], summary: '개발환경의 설치, 인증, 설정, 업데이트 과정을 표준화하기 위한 DEV.AI CODE CLI를 단독으로 설계·개발했습니다. 운영체제와 개발환경이 달라도 동일한 흐름으로 도구를 사용할 수 있도록 설치와 실행 과정을 구성했습니다.', sections: [{ title: '[CLI 아키텍처와 개발환경 자동화]', bullets: ['Go·Cobra 기반 단일 바이너리 CLI 구조를 설계하고 전체 기능 구현', 'init / config / auth / update / mcp 서브커맨드 체계 설계', '서버-로컬 버전 비교 기반 업데이트와 운영체제별 바이너리 교체 로직 구현'] }, { title: '[크로스 플랫폼과 터미널 UI 구현]', bullets: ['macOS·Linux·Windows 크로스 플랫폼 빌드 및 실행 이슈 해결', 'Bubble Tea·Lip Gloss 기반 진행 상태, 확인, 모델 선택 UI 구성', 'Claude Code·Cursor와 MCP 기반 도구 연동을 실무에 적용'] }] },
    { slug: 'devai-platform', title: 'KT DS DEV.AI\n플랫폼 개발', company: '이트리즈시스템', period: '2025.08 - 2025.12', role: '웹·API 개발', stack: ['React / Next.js / TypeScript', 'Python / FastAPI / PostgreSQL'], summary: 'KT DS 개발자의 설계와 코드 분석 업무를 지원하는 AI 코드 어시스턴트 플랫폼 고도화 프로젝트입니다. 프론트엔드부터 AI API 연동, 결과 확인 흐름까지 사용자 관점에서 기능을 개발했습니다.', sections: [{ title: '[웹 UI와 AI API 기반 서비스 개발]', bullets: ['React·Next.js 기반 웹 UI 개발 및 기능별 컴포넌트 구조 개선', 'Python·FastAPI 기반 AI API 구현과 프론트엔드 연동', 'SW 설계·코드 분석 에이전트의 실행 및 결과 확인 흐름 개발'] }, { title: '[코드 분석 이력 화면과 검증 흐름 개선]', bullets: ['코드 분석 이력 화면에 무한 스크롤 적용', '초기 로딩 시 필요한 데이터만 우선 조회하도록 화면 흐름 조정', '초기 진입 속도 약 40% 개선 및 반복 확인이 필요한 API 테스트 자동화 구축'] }] },
    { slug: 'badukland', title: '한국기원 바둑랜드\n프로젝트', company: '우나무', period: '2024.05 - 2024.11', role: '웹 서비스 개발', stack: ['Java / Spring / MyBatis / Oracle', 'JSP / JavaScript / Jenkins / AWS'], summary: '한국기원 공식 바둑 콘텐츠 플랫폼 구축 프로젝트입니다. 바둑 입문자와 교육 수강자를 위한 콘텐츠 화면을 개발하고, 운영에 필요한 공지사항 관리자 기능을 구현했습니다.', sections: [{ title: '[콘텐츠 페이지 및 관리자 기능 개발]', bullets: ['바둑 입문 가이드와 교육 콘텐츠의 하위 메뉴 구조 및 화면 개발', '공지사항 등록·수정·삭제·조회가 가능한 관리자 CRUD 기능 구현', 'Java·Spring·MyBatis 기반 기능 개발 및 Oracle 데이터 처리 로직 작성'] }, { title: '[서비스 운영 흐름 경험]', bullets: ['Jenkins 기반 배포 흐름과 AWS EC2·RDS 운영 환경 경험', '화면, 백엔드, 데이터베이스가 연결되는 웹 서비스 흐름을 직접 구현'] }] },
  ] satisfies ResumeProject[],
  educationIntro: { summary: '백엔드와 AI 서비스 개발에 필요한 기술을 실습하며 익혔습니다.', learningFields: ['Python · FastAPI · LLM API', 'React · 웹 서비스 개발', 'Java · Spring · MyBatis', 'Oracle SQL · 데이터베이스 설계'] },
  education: [
    { title: 'AI 서비스 엔지니어링 트랙', organization: '팀스파르타', period: '2025.12 ~ 2026.03 · 200시간', detail: 'AI API와 문서 기반 서비스 구현 역량 강화', accent: '주요 교육 과정', bullets: ['Python·Streamlit 기반 데이터 처리와 대시보드 구현 실습', 'OCR·LLM·ChatGPT API를 활용한 AI 서비스 구성 경험', 'LangChain·RAG를 활용한 문서 기반 질의응답 흐름 학습'] },
    { title: '자바 개발자 양성교육', organization: 'KH정보교육원', period: '2024.11 ~ 2025.05 · 888시간', detail: 'Java·Spring 기반 백엔드 개발 및 데이터베이스 설계', accent: '주요 교육 과정', bullets: ['Java·JSP/Servlet 기반 웹 애플리케이션 구현과 객체지향 프로그래밍 학습', 'Spring·MyBatis 기반 백엔드 구조와 Oracle SQL·DB 설계 실습', 'HTML·CSS·JavaScript·React 활용 및 공공데이터 팀 프로젝트 수행'] },
  ] satisfies ResumeEducation[],
} as const
