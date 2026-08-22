export type ResumeProject = {
  title: string
  subtitle: string
  company: string
  period: string
  role: string
  stack: string[]
  summary: string
  sections: Array<{ title: string; bullets: string[] }>
}

export type ResumeEducation = {
  title: string
  organization: string
  period: string
  detail: string
  accent: string
  bullets: string[]
}

export const resumeData = {
  profile: {
    name: '서동진',
    role: 'AI 플랫폼 · 시스템 운영 개발자',
    summary: '사용자와 운영 환경을 함께 이해하고, 서비스가 안정적으로 이어지는 구조를 만드는 개발자입니다.',
    email: 'djseo9812@naver.com',
    phone: '010-8803-2951',
    github: 'github.com/eastjin616',
  },
  timeline: [
    { period: '2026.05 ~ 현재', label: '삼성화재 IPCC', role: '콜 인프라 운영 · 개발' },
    { period: '2026.01 ~ 2026.05', label: 'KT DS DEV.AI CODE CLI', role: 'CLI 설계 · 개발' },
    { period: '2025.08 ~ 2025.12', label: 'KT DS DEV.AI Platform', role: '웹 · AI API 개발' },
    { period: '2024.05 ~ 2024.11', label: '한국기원 바둑랜드', role: 'Java/Spring 웹 서비스 개발' },
  ],
  projects: [
    {
      title: '삼성화재 IPCC',
      subtitle: '콜 인프라 운영 · 개발',
      company: '효성ITX · 삼성화재 콜 인프라 운영·개발팀',
      period: '2026.05 ~ 현재',
      role: 'IVR · ADNS 개발 / 운영 / 유지보수',
      stack: ['Linux', 'Node.js', 'Java', 'Spring', 'Tomcat', 'DR'],
      summary: '콜센터의 통화 흐름과 서버 인프라가 안정적으로 동작하도록 운영하고, 장애 원인을 추적해 서비스를 복구했습니다.',
      sections: [
        { title: '담당 업무', bullets: ['IVR 콜 시스템 및 ADNS 서버 개발·운영·유지보수', '콜 라우팅, 음성 응답 흐름, DNS 기반 서비스 연계 관리'] },
        { title: '운영 환경', bullets: ['상암–춘천 DR 이중화 환경 운영', '상암 서버 장애 시 춘천 서버로 자동 절체되는 서비스 지속성 관리'] },
        { title: '장애 대응', bullets: ['로그와 모니터링 데이터를 기반으로 장애 원인 분석', '유관 부서와 협업하여 조치 및 재발 방지 대응'] },
      ],
    },
    {
      title: 'KT DS DEV.AI CODE CLI',
      subtitle: 'AI 개발환경 설치 · 관리 CLI',
      company: '이트리즈시스템 SI사업부 · KT DS',
      period: '2026.01 ~ 2026.05',
      role: 'CLI 아키텍처 설계 및 개발',
      stack: ['Go', 'Cobra', 'Bubble Tea', 'Lip Gloss', 'MCP', 'macOS · Linux · Windows'],
      summary: 'AI 개발 도구를 팀 환경에 빠르고 일관되게 배포할 수 있도록 단일 바이너리 CLI를 설계했습니다.',
      sections: [
        { title: '설계 및 구현', bullets: ['Go와 Cobra 기반 devai CLI 아키텍처 및 단일 바이너리 구조 설계', 'init, config, auth, update, mcp 서브커맨드 체계 구현'] },
        { title: '업데이트 흐름', bullets: ['서버·로컬 버전 비교 기반 자동 업데이트 및 바이너리 교체 로직 개발', 'Unix re-exec와 Windows rename 방식의 플랫폼 차이 처리'] },
        { title: '사용자 경험', bullets: ['Bubble Tea·Lip Gloss 기반 progress screen, confirm, model picker 구현', 'macOS·Linux·Windows 크로스 플랫폼 빌드 및 실행 환경 검증'] },
      ],
    },
    {
      title: 'KT DS DEV.AI Platform',
      subtitle: '웹 기반 AI 코드 어시스턴트 플랫폼',
      company: '이트리즈시스템 SI사업부 · KT DS',
      period: '2025.08 ~ 2025.12',
      role: 'React 웹 UI · Python AI API 개발',
      stack: ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'],
      summary: '웹 UI와 AI API를 연결해 개발 에이전트의 실행과 결과를 확인할 수 있는 흐름을 구현했습니다.',
      sections: [
        { title: '웹 서비스', bullets: ['React·Next.js·TypeScript 기반 웹 UI 개발', '에이전트 실행 상태와 결과를 확인하는 사용자 흐름 구현'] },
        { title: 'AI API', bullets: ['Python·FastAPI 기반 AI API 개발 및 PostgreSQL 연동', 'SW 설계 에이전트와 코드 분석 에이전트 기능 개발'] },
        { title: '개선 결과', bullets: ['무한 스크롤을 적용해 초기 로딩 부담을 약 40% 개선', 'API 테스트 자동화로 반복 검증 비용 절감'] },
      ],
    },
    {
      title: '한국기원 바둑랜드',
      subtitle: '교육 콘텐츠 · 관리자 웹 서비스',
      company: '우나무',
      period: '2024.05 ~ 2024.11',
      role: 'Java/Spring 웹 서비스 개발',
      stack: ['Java', 'Spring', 'MyBatis', 'Oracle', 'JSP', 'JavaScript', 'Jenkins', 'AWS'],
      summary: '바둑 입문자용 교육 화면과 운영자용 콘텐츠 관리 기능을 하나의 서비스 흐름으로 연결했습니다.',
      sections: [
        { title: '사용자 화면', bullets: ['바둑 입문자 가이드 및 교육 콘텐츠 하위 메뉴 설계', '콘텐츠를 자연스럽게 탐색할 수 있는 화면 흐름 구현'] },
        { title: '관리자 기능', bullets: ['공지사항 관리자 페이지 기본 CRUD 구현', '화면 요청부터 Spring·MyBatis 조회·갱신까지 서버 처리 연결'] },
        { title: '배포 및 운영', bullets: ['Jenkins 기반 배포 흐름 경험', 'AWS EC2·RDS 환경에서 서비스 운영 구조 이해'] },
      ],
    },
  ] satisfies ResumeProject[],
  educationIntro: {
    summary: '백엔드와 AI 서비스 개발에 필요한 기술을 실습하며 익혔습니다.',
    learningFields: [
      'Python · FastAPI · LLM API',
      'React · 웹 서비스 개발',
      'Java · Spring · MyBatis',
      'Oracle SQL · 데이터베이스 설계',
    ],
  },
  education: [
    {
      title: '소프트웨어공학 학사',
      organization: '세종사이버대학교',
      period: '2022.02 ~ 2024.02',
      detail: 'GPA 3.78 / 4.5',
      accent: '전공 교육',
      bullets: ['소프트웨어공학 전공', '웹 서비스와 데이터베이스를 중심으로 개발 기초를 확장']
    },
    {
      title: 'AI 서비스 엔지니어링 트랙',
      organization: '팀스파르타',
      period: '2025.12 ~ 2026.03 · 200시간',
      detail: 'AI API와 문서 기반 서비스 구현 역량 강화',
      accent: '주요 교육 과정',
      bullets: ['Python·Streamlit 기반 데이터 처리와 대시보드 구현 실습', 'OCR·LLM·ChatGPT API를 활용한 AI 서비스 구성 경험', 'LangChain·RAG를 활용한 문서 기반 질의응답 흐름 학습']
    },
    {
      title: '자바 개발자 양성교육',
      organization: 'KH정보교육원',
      period: '2024.11 ~ 2025.05 · 888시간',
      detail: 'Java·Spring 기반 백엔드 개발 및 데이터베이스 설계',
      accent: '주요 교육 과정',
      bullets: ['Java·JSP/Servlet 기반 웹 애플리케이션 구현과 객체지향 프로그래밍 학습', 'Spring·MyBatis 기반 백엔드 구조와 Oracle SQL·DB 설계 실습', 'HTML·CSS·JavaScript·React 활용 및 공공데이터 팀 프로젝트 수행']
    },
    {
      title: '자격 및 어학',
      organization: 'SQLD · OPIc',
      period: '2024.12 · 2026.03',
      detail: '데이터 활용과 커뮤니케이션 역량',
      accent: 'Credentials',
      bullets: ['SQLD 취득 · 2024.12', 'OPIc IM1 · 2026.03']
    },
  ] satisfies ResumeEducation[],
} as const
