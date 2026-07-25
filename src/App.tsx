import content from './content.json'
import { getProjectSlug } from './project-route'
import type { ReactNode } from 'react'

const { profile, links, featuredProjects, notes, experience } = content
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
      <aside className="profile" aria-label="Profile">
        <img className="avatar" src={profile.avatar} alt={`${profile.name} GitHub avatar`} />
        <h1 className="profile-title">
          <a href="/">{profile.name}</a>
        </h1>
        <p className="kicker">
          {profile.role}
          <br />
          {profile.location}
        </p>
        <p>{profile.description}</p>
        <p className="stack">{profile.skills.join(' / ')}</p>
        <p className="link-row">
          {links.github && <a href={links.github}>GitHub</a>}
          {links.resume && <a href={links.resume}>Resume</a>}
          {links.career && <a href={links.career}>Career</a>}
          {links.email && <a href={links.email}>Email</a>}
        </p>
      </aside>

      <main className="work">
        <WorkSection title="Projects">
          <ol className="work-list">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <article className="work-item">
                  <time>{project.period}</time>
                  <div>
                    <h2>
                      <a href={`?project=${project.slug}`}>{project.title}</a>
                    </h2>
                    <p>{project.problem}</p>
                    <p className="muted">{project.status}</p>
                    <p className="project__links">
                      <a href={`?project=${project.slug}`}>case</a>
                      {project.links.map((link) => (
                        <a key={link.href} href={link.href}>
                          {link.label}
                        </a>
                      ))}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </WorkSection>

        <WorkSection title="Notes">
          <ul className="plain-list">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </WorkSection>

        <WorkSection title="Experience">
          <ol className="timeline">
            {experience.map((item) => (
              <li className={item.year ? undefined : 'no-year'} key={`${item.year}-${item.name}`}>
                {item.year && <time>{item.year}</time>}
                <strong>{item.name}</strong>
                <span>{item.summary}</span>
              </li>
            ))}
          </ol>
        </WorkSection>
      </main>
    </div>
  )
}

function WorkSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${title.toLowerCase()}-title`}>
      <p className="section-label" id={`${title.toLowerCase()}-title`}>
        {title}
      </p>
      {children}
    </section>
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
    <div className="case-page">
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
          <p className="link-row">
            {project.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </p>

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
