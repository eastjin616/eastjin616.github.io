import { resumeData, type ResumeEducation, type ResumeProject } from './resume-content'
import { useEffect } from 'react'

function Header({ title = '경력 기술서' }: { title?: string }) {
  return <header className="resume-header resume-reference-header"><h2>{title}</h2><span aria-hidden="true" /></header>
}

function Cover() {
  return <section id="resume-cover" className="resume-sheet resume-cover resume-reference-cover" aria-labelledby="resume-cover-title">
    <Header />
    <div className="resume-cover-grid resume-reference-cover-grid">
      <div className="resume-cover-intro resume-reference-cover-intro">
        <h1 id="resume-cover-title">{resumeData.profile.name}</h1>
        <p className="resume-role">{resumeData.profile.role}</p>
        <dl className="resume-contact resume-reference-contact">
          <div><span className="resume-contact-icon resume-contact-icon--calendar" aria-hidden="true" /><dt>Birth</dt><dd>{resumeData.profile.birth}</dd></div>
          <div><span className="resume-contact-icon resume-contact-icon--mail" aria-hidden="true" /><dt>Email</dt><dd><a href={`mailto:${resumeData.profile.email}`}>{resumeData.profile.email}</a></dd></div>
          <div><span className="resume-contact-icon resume-contact-icon--phone" aria-hidden="true" /><dt>Phone</dt><dd>{resumeData.profile.phone}</dd></div>
          <div><span className="resume-contact-icon resume-contact-icon--github" aria-hidden="true" /><dt>Github</dt><dd><a href={resumeData.profile.githubUrl}>Profile</a></dd></div>
        </dl>
      </div>
      <ol className="resume-timeline resume-reference-timeline">
        {resumeData.timeline.map((item) => <li key={`${item.period}-${item.title}`}>
          <div className="resume-reference-timeline-years" aria-label={`${item.startYear}부터 ${item.endYear}`}><time>{item.startYear}</time><span aria-hidden="true" /><time>{item.endYear}</time></div>
          <div className="resume-reference-timeline-middle"><strong>{item.role}</strong><span>{item.company}</span><small>{item.period}</small></div>
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
        <ul className="resume-stack resume-reference-stack">{project.stack.map((line) => <li key={line}>{line}</li>)}</ul>
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
