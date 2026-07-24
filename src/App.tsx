import content from './content.json'
import { getProjectSlug } from './project-route'

const { profile, links, featuredProjects, experience } = content
type Project = (typeof featuredProjects)[number]

export default function App() {
  const projectSlug = getProjectSlug(
    window.location.search,
    featuredProjects.map((project) => project.slug),
  )
  const project = featuredProjects.find((item) => item.slug === projectSlug)

  if (project) {
    return <ProjectDetail project={project} />
  }

  return (
    <div className="page">
      <header className="masthead">
        <a href="/" className="name">
          {profile.name}
        </a>
        <nav aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#notes">Notes</a>
          <a href="#about">About</a>
          <a href="#links">Links</a>
        </nav>
      </header>

      <main>
        <section className="intro" aria-labelledby="intro-title">
          <p className="kicker">{profile.role}</p>
          <h1 id="intro-title">{profile.headline}</h1>
          <p>{profile.description}</p>
        </section>

        <section id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">Projects</h2>
          <ol className="project-list">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <article className="project">
                  <div className="project__meta">
                    <span>{project.index}</span>
                    <span>{project.period}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>
                    <a href={`?project=${project.slug}`}>{project.title}</a>
                  </h3>
                  <p>{project.problem}</p>
                  <p className="muted">{project.role}</p>
                  <p className="stack">{project.stack.join(' / ')}</p>
                  <p className="project__links">
                    <a href={`?project=${project.slug}`}>Case note</a>
                    {'url' in project && project.url && <a href={project.url}>Live</a>}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section id="notes" aria-labelledby="notes-title">
          <h2 id="notes-title">Notes</h2>
          <ul className="plain-list">
            <li>공개 가능한 작업은 링크로 보여주고, 비공개 작업은 제약과 판단을 짧게 남깁니다.</li>
            <li>반도체와 운영 경험은 메인이 아니라 문제를 좁히는 습관의 배경으로만 둡니다.</li>
            <li>완성된 서비스와 개발 중인 도구를 같은 목록에 두되 상태를 명확히 구분합니다.</li>
          </ul>
        </section>

        <section id="about" aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <ol className="timeline">
            {experience.map((item) => (
              <li key={`${item.year}-${item.name}`}>
                <time>{item.year}</time>
                <strong>{item.name}</strong>
                <span>{item.summary}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="links" aria-labelledby="links-title">
          <h2 id="links-title">Links</h2>
          <p className="link-row">
            {links.github && <a href={links.github}>GitHub</a>}
            {links.resume && <a href={links.resume}>Resume</a>}
            {links.career && <a href={links.career}>Career</a>}
            {links.email && <a href={links.email}>Email</a>}
          </p>
        </section>
      </main>
    </div>
  )
}

function ProjectDetail({ project }: { project: Project }) {
  const routes = [
    ['Problem', project.problem],
    ['Constraint', project.sections.constraint],
    ['Decision', project.sections.decision],
    ['System', project.sections.system],
    ['Recovery', project.sections.recovery],
    ['Result', project.sections.result],
    ['Evidence', project.evidence],
    ['Retrospective', project.retrospective],
  ]

  return (
    <div className="page">
      <header className="masthead">
        <a href="/" className="name">
          {profile.name}
        </a>
        <nav aria-label="Project navigation">
          <a href="/#projects">Projects</a>
          {links.resume && <a href={links.resume}>Resume</a>}
        </nav>
      </header>

      <main>
        <article className="case">
          <p className="kicker">
            {project.index} / {project.period} / {project.status}
          </p>
          <h1>{project.title}</h1>
          <p>{project.role}</p>
          <p className="stack">{project.stack.join(' / ')}</p>
          {'url' in project && project.url && (
            <p className="link-row">
              <a href={project.url}>Live service</a>
            </p>
          )}

          <div className="case-sections">
            {routes.map(([label, copy]) => (
              <section key={label}>
                <h2>{label}</h2>
                <p>{copy}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}
