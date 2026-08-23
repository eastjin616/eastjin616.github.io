import { resumeData, type ResumeEducation, type ResumeProject } from './resume-content'
import { useEffect } from 'react'

function Header({ title = '경력 기술서' }: { title?: string }) {
  return <header className="resume-header resume-reference-header"><h2>{title}</h2><span aria-hidden="true" /></header>
}

function ContactIcon({ name }: { name: 'calendar' | 'mail' | 'phone' | 'github' }) {
  const common = { className: 'resume-contact-icon', 'aria-hidden': true }

  if (name === 'calendar') {
    return <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
  }

  if (name === 'mail') {
    return <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 7 9-7" /></svg>
  }

  if (name === 'phone') {
    return <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.6 3.5 4.3 5.8c-1 1 1.4 6.6 5.4 10.6s9.6 6.4 10.6 5.4l2.2-2.2-4.1-4.1-2.4 2.4c-1.3-.6-2.5-1.4-3.6-2.5s-1.9-2.3-2.5-3.6l2.4-2.4Z" /></svg>
  }

  return <svg {...common} viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.73c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" /></svg>
}

function CoreSkills() {
  return (
    <section className="resume-core-skills" aria-labelledby="resume-core-skills-title">
      <h2 id="resume-core-skills-title">[핵심 역량]</h2>
      <dl>
        {resumeData.profile.coreSkills.map(({ label, skills }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{skills}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Cover() {
  return <section id="resume-cover" className="resume-sheet resume-cover resume-reference-cover" aria-labelledby="resume-cover-title">
    <Header />
    <div className="resume-cover-grid resume-reference-cover-grid">
      <div className="resume-cover-intro resume-reference-cover-intro">
        <h1 id="resume-cover-title">{resumeData.profile.name}</h1>
        <p className="resume-role">{resumeData.profile.role}</p>
        <dl className="resume-contact resume-reference-contact">
          <div><ContactIcon name="calendar" /><dt>Birth</dt><dd>{resumeData.profile.birth}</dd></div>
          <div><ContactIcon name="mail" /><dt>Email</dt><dd><a href={`mailto:${resumeData.profile.email}`}>{resumeData.profile.email}</a></dd></div>
          <div><ContactIcon name="phone" /><dt>Phone</dt><dd>{resumeData.profile.phone}</dd></div>
          <div><ContactIcon name="github" /><dt>Github</dt><dd><a href={resumeData.profile.githubUrl}>Profile</a></dd></div>
        </dl>
        <CoreSkills />
      </div>
      <ol className="resume-timeline resume-reference-timeline">
        {resumeData.timeline.map((item) => <li key={`${item.period}-${item.title}`}>
          <div className="resume-reference-timeline-years" aria-label={`${item.startYear}부터 ${item.endYear}`}><time>{item.startYear}</time><span aria-hidden="true" /><time>{item.endYear}</time></div>
          <div className="resume-reference-timeline-middle"><strong>{item.role}</strong><span>{item.company}</span></div>
          <div className="resume-reference-timeline-rule" aria-hidden="true" />
          <div className="resume-reference-timeline-project"><strong>{item.title}</strong><time>{item.period}</time></div>
        </li>)}
      </ol>
    </div>
  </section>
}

function ProjectPage({ project }: { project: ResumeProject }) {
  return <section id={`resume-sheet-${project.slug}`} className="resume-sheet resume-project resume-reference-project" aria-labelledby={`resume-project-${project.slug}`}>
    <Header title="프로젝트" />
    <div className="resume-project-grid resume-reference-project-grid">
      <aside className="resume-project-aside resume-reference-project-aside">
        <h1 id={`resume-project-${project.slug}`}>
          {project.title.split('\n').map((line) => <span key={line}>{line}</span>)}
        </h1>
        <ul className="resume-meta resume-reference-project-meta"><li><span>-</span>{project.period}</li><li><span>-</span>{project.company}</li><li><span>-</span>역할: {project.role}</li></ul>
        <h2 className="resume-reference-stack-title">[사용 기술]</h2>
        <ul className="resume-stack resume-reference-stack">{project.stack.map((line) => <li key={line}><span aria-hidden="true">-</span>{line}</li>)}</ul>
      </aside>
      <div className="resume-project-body resume-reference-project-body">
        <div className="resume-section-heading resume-reference-section-heading"><span aria-hidden="true">○</span><h2>설명</h2></div>
        <p className="resume-project-summary resume-reference-project-summary">{project.summary}</p>
        <div className="resume-detail-heading resume-reference-detail-heading"><span aria-hidden="true">○</span><h2>상세 내용 및 성과</h2></div>
        <div className="resume-detail-grid resume-reference-detail-grid">{project.sections.map((section) => <article className="resume-detail resume-reference-detail" key={section.title}><h3>{section.title}</h3><ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div>
      </div>
    </div>
  </section>
}

function EducationPage() {
  return <section id="resume-education" className="resume-sheet resume-education resume-reference-education" aria-labelledby="resume-education-title">
    <Header title="교육 이력" />
    <div className="resume-education-grid resume-reference-education-grid">
      <aside className="resume-education-intro resume-reference-education-intro"><h1 id="resume-education-title">교육 이력</h1><p>{resumeData.educationIntro.summary}</p><h2>핵심 학습 분야</h2><ul>{resumeData.educationIntro.learningFields.map((field) => <li key={field}>{field}</li>)}</ul></aside>
      <div className="resume-education-list resume-reference-education-list"><div className="resume-section-heading"><span aria-hidden="true">○</span><h2>주요 교육 과정</h2></div>{resumeData.education.map((item) => <EducationItem key={`${item.organization}-${item.title}`} item={item} />)}</div>
    </div>
  </section>
}

function EducationItem({ item }: { item: ResumeEducation }) {
  return <article className="resume-education-item resume-reference-education-item"><h3>{item.title}</h3><p className="resume-education-meta">{item.organization} · {item.period}</p><p className="resume-education-accent">{item.detail}</p><ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>
}

export default function Resume() {
  useEffect(() => { const previousTitle = document.title; document.title = `${resumeData.profile.name} | 경력 기술서`; return () => { document.title = previousTitle } }, [])

  useEffect(() => {
    const target = window.location.hash.slice(1)
    if (!target) return
    requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ block: 'start' }))
  }, [])

  return <main className="resume-page"><nav className="resume-toolbar" aria-label="이력서 도구"><a href="/">Portfolio</a><button type="button" onClick={() => window.print()}>인쇄 / PDF 저장</button></nav><div className="resume-book"><Cover />{resumeData.projects.map((project) => <ProjectPage key={project.slug} project={project} />)}<EducationPage /></div></main>
}
