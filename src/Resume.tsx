import { resumeData, type ResumeEducation, type ResumeProject } from './resume-content'
import { useEffect } from 'react'

function Header({ title = '경력 기술서' }: { title?: string }) {
  return <header className="resume-header"><h2>{title}</h2><span aria-hidden="true" /></header>
}

function Cover() {
  return <section className="resume-sheet resume-cover" aria-labelledby="resume-cover-title">
    <Header />
    <div className="resume-cover-grid">
      <div className="resume-cover-intro">
        <p className="resume-kicker">PROJECT · CAREER · EDUCATION</p>
        <h1 id="resume-cover-title">{resumeData.profile.name}</h1>
        <p className="resume-role">{resumeData.profile.role}</p>
        <p className="resume-summary">{resumeData.profile.summary}</p>
        <dl className="resume-contact">
          <div><dt>EMAIL</dt><dd>{resumeData.profile.email}</dd></div>
          <div><dt>PHONE</dt><dd>{resumeData.profile.phone}</dd></div>
          <div><dt>GITHUB</dt><dd>{resumeData.profile.github}</dd></div>
        </dl>
      </div>
      <ol className="resume-timeline">
        {resumeData.timeline.map((item) => <li key={`${item.period}-${item.label}`}>
          <time>{item.period}</time><div><strong>{item.label}</strong><span>{item.role}</span></div>
        </li>)}
      </ol>
    </div>
  </section>
}

function ProjectPage({ project, index }: { project: ResumeProject; index: number }) {
  return <section className="resume-sheet resume-project" aria-labelledby={`resume-project-${index}`}>
    <Header />
    <div className="resume-project-grid">
      <aside className="resume-project-aside">
        <p className="resume-page-number">0{index + 1}</p>
        <h1 id={`resume-project-${index}`}>{project.title}</h1>
        <p className="resume-project-subtitle">{project.subtitle}</p>
        <dl className="resume-meta">
          <div><dt>COMPANY</dt><dd>{project.company}</dd></div>
          <div><dt>PERIOD</dt><dd>{project.period}</dd></div>
          <div><dt>ROLE</dt><dd>{project.role}</dd></div>
        </dl>
        <ul className="resume-stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
      </aside>
      <div className="resume-project-body">
        <div className="resume-section-heading"><span aria-hidden="true">○</span><h2>설명</h2></div>
        <p className="resume-project-summary">{project.summary}</p>
        <div className="resume-detail-heading"><span aria-hidden="true" /> <h2>상세 내용 및 성과</h2></div>
        <div className="resume-detail-grid">
          {project.sections.map((section) => <article className="resume-detail" key={section.title}>
            <h3>{section.title}</h3>
            <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </article>)}
        </div>
      </div>
    </div>
  </section>
}

function EducationPage() {
  return <section className="resume-sheet resume-education" aria-labelledby="resume-education-title">
    <Header title="교육 이력" />
    <div className="resume-education-grid">
      <aside className="resume-education-intro">
        <h1 id="resume-education-title">교육 이력</h1>
        <p>{resumeData.educationIntro.summary}</p>
        <h2>핵심 학습 분야</h2>
        <ul>{resumeData.educationIntro.learningFields.map((field) => <li key={field}>{field}</li>)}</ul>
      </aside>
      <div className="resume-education-list">
        <div className="resume-section-heading"><span aria-hidden="true">○</span><h2>주요 교육 과정</h2></div>
        {resumeData.education.map((item) => <EducationItem key={`${item.organization}-${item.title}`} item={item} />)}
      </div>
    </div>
  </section>
}

function EducationItem({ item }: { item: ResumeEducation }) {
  return <article className="resume-education-item">
    <h3>{item.title}</h3><p className="resume-education-meta">{item.organization} · {item.period}</p>
    <p className="resume-education-accent">{item.detail}</p>
    <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
  </article>
}

export default function Resume() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = `${resumeData.profile.name} | 경력 기술서`
    return () => {
      document.title = previousTitle
    }
  }, [])

  return <main className="resume-page">
    <nav className="resume-toolbar" aria-label="이력서 도구">
      <a href="/">Portfolio</a><button type="button" onClick={() => window.print()}>인쇄 / PDF 저장</button>
    </nav>
    <div className="resume-book">
      <Cover />
      {resumeData.projects.map((project, index) => <ProjectPage key={project.title} project={project} index={index} />)}
      <EducationPage />
    </div>
  </main>
}
