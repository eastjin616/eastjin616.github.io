import content from './content.json'
import { getProjectSlug } from './project-route'
import { useEffect, useState, type ReactNode } from 'react'

const { profile, links, featuredProjects, experience, nowBuilding } = content
type Project = (typeof featuredProjects)[number]
type NowItem = { name: string; status: string; tagline?: string }

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof experience)[number] | null>(null)
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
        <p className="stack">{profile.aiTools.join(' / ')}</p>
        <p className="link-row">
          {links.github && <a href={links.github}>GitHub</a>}
          {links.resume && <a href={links.resume}>Resume</a>}
          {links.career && <a href={links.career}>Career</a>}
          {links.email && <a href={links.email}>Email</a>}
        </p>
      </aside>

      <main className="work">
        <WorkSection title="Project">
          <ol className="work-list">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <article className="work-item">
                  <h2>
                    <a href={`?project=${project.slug}`}>{project.title}</a>
                  </h2>
                  <time>{project.period}</time>
                  <p className="muted">{project.status}</p>
                  <p className="project__links">
                    <a href={`?project=${project.slug}`}>case</a>
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href}>
                        {link.label}
                      </a>
                    ))}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </WorkSection>

        <WorkSection title="Now Building">
          <ol className="quiet-list">
            {nowBuilding.map((item: NowItem) => (
              <li key={item.name}>
                <span className="nb-main">
                  <strong>{item.name}</strong>
                  {item.tagline && <span className="nb-tagline">{item.tagline}</span>}
                </span>
                <span className="nb-status">{item.status}</span>
              </li>
            ))}
          </ol>
        </WorkSection>

        <WorkSection title="Experience">
          <ol className="timeline">
            {experience.map((item) => (
              <li className={item.year ? undefined : 'no-year'} key={`${item.year}-${item.name}`}>
                <button className="timeline-button" type="button" onClick={() => setSelectedExperience(item)}>
                  <strong>{item.name}</strong>
                  {item.year && <time>{item.year}</time>}
                </button>
              </li>
            ))}
          </ol>
        </WorkSection>

        <WorkSection title="Contact">
          <ul className="contact-list">
            <li>
              <a href={links.email}>email</a>
            </li>
          </ul>
        </WorkSection>
      </main>

      {selectedExperience && (
        <ExperienceDialog item={selectedExperience} onClose={() => setSelectedExperience(null)} />
      )}
    </div>
  )
}

function ExperienceDialog({
  item,
  onClose,
}: {
  item: (typeof experience)[number]
  onClose: () => void
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="experience-modal" role="presentation" onClick={onClose}>
      <section
        className="experience-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" type="button" onClick={onClose} aria-label="닫기">
          ×
        </button>
        <p className="case-block__label">Experience</p>
        <h2 id="experience-dialog-title">{item.name}</h2>
        {item.year && <time>{item.year}</time>}
        <p>{item.summary}</p>
      </section>
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

function ProjectDiagram({ slug }: { slug: string }) {
  if (slug === 'badukland') {
    return (
      <div className="case-diagram" aria-label="Badukland 요청 흐름 개략">
        <div className="flow-row">
          <span className="flow-node">브라우저 화면</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">Spring 컨트롤러·서비스</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">MyBatis 조회/갱신</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">DB</span>
        </div>
        <p className="flow-note">개략 흐름 · 내부 세부 비공개</p>
      </div>
    )
  }

  if (slug === 'ktds') {
    return (
      <div className="case-diagram" aria-label="DEV.AI 흐름 개략">
        <div className="flow-row">
          <span className="flow-tag">web</span>
          <span className="flow-node">React/Next.js 조회</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">FastAPI</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">플랫폼 API</span>
        </div>
        <div className="flow-row">
          <span className="flow-tag">cli</span>
          <span className="flow-node">Go CLI</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">로컬 설치·점검·업데이트</span>
        </div>
        <p className="flow-note">개략 흐름 · 내부 세부 비공개</p>
      </div>
    )
  }

  if (slug === 'samsung-fire-ipcc') {
    return (
      <div className="case-diagram" aria-label="IPCC 추적 흐름 개략">
        <div className="flow-row">
          <span className="flow-node">콜·요청</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">서비스·인프라</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">로그 추적</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">영향 범위·복구 판단</span>
        </div>
        <p className="flow-note">↳ 이상 시: 변경보다 복구 경로 확인이 먼저</p>
      </div>
    )
  }

  return null
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="case-page">
      <header className="masthead">
        <a href="/" className="name">
          {profile.name}
        </a>
        <nav aria-label="Project navigation">
          <a href="/">Projects</a>
          {links.resume && <a href={links.resume}>Resume</a>}
        </nav>
      </header>

      <main>
        <article className="case">
          <p className="case-index" aria-hidden="true">
            {project.index}
          </p>
          <h1>{project.title}</h1>
          <p className="case-meta">
            <span>{project.role}</span>
            <span>{project.period}</span>
            <span>{project.status}</span>
          </p>
          <p className="stack">{project.stack.join(' / ')}</p>
          <p className="case-lede">{project.lede}</p>
          {project.links.length > 0 && (
            <p className="link-row">
              {project.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </p>
          )}

          <ProjectDiagram slug={project.slug} />

          <div className="case-blocks">
            {project.blocks.map((block) => (
              <section className="case-block" key={block.title}>
                <p className="case-block__label">{block.title}</p>
                <p>{block.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}
