import content from './content.json'
import { getProjectSlug } from './project-route'
import { useEffect, useRef, useState, type ReactNode } from 'react'

const { profile, links, featuredProjects, experience, training, nowBuilding } = content
type Project = (typeof featuredProjects)[number]
type NowItem = { name: string; status: string; tagline?: string }

export default function App() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof experience)[number] | null>(null)
  const [selectedTraining, setSelectedTraining] = useState<(typeof training)[number] | null>(null)
  const lastDialogTrigger = useRef<HTMLButtonElement | null>(null)
  const projectSlug = getProjectSlug(
    window.location.search,
    featuredProjects.map((project) => project.slug),
  )
  const project = featuredProjects.find((item) => item.slug === projectSlug)
  const orderedProjects = featuredProjects.slice().sort((a, b) => a.order - b.order)
  const workProjects = orderedProjects.filter((item) => item.category === 'work')
  const personalProjects = orderedProjects.filter((item) => item.category === 'project')

  const renderProjectList = (projects: Project[]) => (
    <ol className="work-list">
      {projects.map((project) => (
        <li key={project.slug}>
          <article className="work-item">
            {project.category === 'work' && (
              <div
                className={`project-visual project-visual--${project.visual.kind} project-visual--${project.slug}`}
                aria-hidden="true"
              >
                <img src={project.visual.src} alt="" loading="lazy" decoding="async" />
              </div>
            )}
            <h2>
              <a href={`?project=${project.slug}`}>{project.title}</a>
            </h2>
            <time>{project.period}</time>
            <p className="muted">{project.status}</p>
            <p className="project-evidence">{project.highlights.join(' · ')}</p>
            <p className="project__links">
              <a href={`?project=${project.slug}`}>case</a>
              {project.links.map((link) => (
                <PortfolioLink key={link.href} href={link.href}>
                  {link.label}
                </PortfolioLink>
              ))}
            </p>
          </article>
        </li>
      ))}
    </ol>
  )

  if (project) {
    return <ProjectDetail project={project} />
  }

  const closeDialog = () => {
    setSelectedExperience(null)
    setSelectedTraining(null)
    requestAnimationFrame(() => lastDialogTrigger.current?.focus())
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
          {links.github && <PortfolioLink href={links.github}>GitHub</PortfolioLink>}
          {links.resume && <PortfolioLink href={links.resume}>Resume</PortfolioLink>}
          {links.career && <PortfolioLink href={links.career}>Career</PortfolioLink>}
          {links.email && <PortfolioLink href={links.email}>Email</PortfolioLink>}
        </p>
      </aside>

      <main className="work">
        <WorkSection title="Work">{renderProjectList(workProjects)}</WorkSection>

        <WorkSection title="Project">{renderProjectList(personalProjects)}</WorkSection>

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
              <li
                className={`${item.year ? '' : 'no-year'} ${selectedExperience?.name === item.name ? 'is-selected' : ''}`}
                key={`${item.year}-${item.name}`}
              >
                <button
                  className="timeline-button"
                  type="button"
                  aria-haspopup="dialog"
                  aria-pressed={selectedExperience?.name === item.name}
                  onClick={(event) => {
                    lastDialogTrigger.current = event.currentTarget
                    setSelectedExperience(item)
                  }}
                >
                  <strong>
                    {item.name}
                    <span className="timeline-arrow" aria-hidden="true">↗</span>
                  </strong>
                  {item.year && <time>{item.year}</time>}
                </button>
              </li>
            ))}
          </ol>
        </WorkSection>

        <WorkSection title="Training">
          <ol className="timeline training-list">
            {training.map((item) => (
              <li className={selectedTraining?.name === item.name ? 'is-selected' : ''} key={item.name}>
                <button
                  className="timeline-button"
                  type="button"
                  aria-haspopup="dialog"
                  aria-pressed={selectedTraining?.name === item.name}
                  onClick={(event) => {
                    lastDialogTrigger.current = event.currentTarget
                    setSelectedTraining(item)
                  }}
                >
                  <span className="nb-main">
                    <strong>
                      {item.name}
                      <span className="timeline-arrow" aria-hidden="true">↗</span>
                    </strong>
                    <span className="nb-tagline">{item.summary}</span>
                  </span>
                  <time>{item.period}</time>
                </button>
              </li>
            ))}
          </ol>
        </WorkSection>
      </main>

      {selectedExperience && (
        <ExperienceDialog item={selectedExperience} onClose={closeDialog} />
      )}
      {selectedTraining && (
        <TrainingDialog item={selectedTraining} onClose={closeDialog} />
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
  const dialogRef = useDialogBehavior(onClose)

  return (
    <div className="experience-modal" role="presentation" onClick={onClose}>
      <section
        ref={dialogRef}
        className="experience-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-dialog-title"
        aria-describedby="experience-dialog-summary"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="dialog-close"
          type="button"
          onClick={onClose}
          aria-label="닫기"
          autoFocus
        >
          ×
        </button>
        <div className="dialog-heading">
          <p className="case-block__label">현재 보고 있는 경력</p>
          <h2 id="experience-dialog-title">{item.name}</h2>
          {item.year && <time>{item.year}</time>}
        </div>
        <p className="dialog-summary" id="experience-dialog-summary">{item.summary}</p>
        <ul className="dialog-details">
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="experience-stack" aria-label={`${item.name} 기술 스택`}>
          {item.stack.map((technology) => (
            <span key={technology} className="tech-token">
              <span className="tech-mark" aria-hidden="true">·</span>
              {technology}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

function TrainingDialog({
  item,
  onClose,
}: {
  item: (typeof training)[number]
  onClose: () => void
}) {
  const dialogRef = useDialogBehavior(onClose)

  return (
    <div className="experience-modal" role="presentation" onClick={onClose}>
      <section
        ref={dialogRef}
        className="experience-dialog training-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="training-dialog-title"
        aria-describedby="training-dialog-summary"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="dialog-close"
          type="button"
          onClick={onClose}
          aria-label="닫기"
          autoFocus
        >
          ×
        </button>
        <div className="dialog-heading">
          <p className="case-block__label">Training</p>
          <h2 id="training-dialog-title">{item.name}</h2>
          <time>{item.period}</time>
        </div>
        <p className="dialog-summary" id="training-dialog-summary">{item.summary}</p>
        <ul className="dialog-details">
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="experience-stack" aria-label={`${item.name} 학습 기술`}>
          {item.stack.map((technology) => (
            <span key={technology} className="tech-token">
              <span className="tech-mark" aria-hidden="true">·</span>
              {technology}
            </span>
          ))}
        </div>

        {item.projects.length > 0 && (
          <section className="training-projects" aria-labelledby="training-projects-title">
            <p className="case-block__label" id="training-projects-title">Projects</p>
            {item.projects.map((project) => (
              <article className="training-project" key={project.title}>
                <header className="training-project__heading">
                  <h3>{project.title}</h3>
                  <time>{project.period}</time>
                </header>
                <p className="stack">{project.stack.join(' / ')}</p>
                <p className="training-project__summary">{project.summary}</p>
                <ul className="training-project__highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <p className="project__links">
                  {project.links.map((link) => (
                    <PortfolioLink key={link.href} href={link.href}>
                      {link.label}
                    </PortfolioLink>
                  ))}
                </p>
              </article>
            ))}
          </section>
        )}
      </section>
    </div>
  )
}

function useDialogBehavior(onClose: () => void) {
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return dialogRef
}

function WorkSection({ title, children }: { title: string; children: ReactNode }) {
  const sectionId = `${title.toLowerCase().replace(/\s+/g, '-')}-title`

  return (
    <section aria-labelledby={sectionId}>
      <p className="section-label" id={sectionId}>
        {title}
      </p>
      {children}
    </section>
  )
}

function PortfolioLink({ href, children }: { href: string; children: ReactNode }) {
  const opensNewTab = href.startsWith('https://')

  return (
    <a
      href={href}
      target={opensNewTab ? '_blank' : undefined}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

function ProjectDiagram({ slug }: { slug: string }) {
  if (slug === 'plainpaper') {
    return (
      <div className="case-diagram" aria-label="Plainpaper 문서 분석 흐름 개략">
        <div className="flow-row">
          <span className="flow-node">문서 업로드</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">Chunk·Context 유지</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">FastAPI·OpenAI</span>
          <span className="flow-arrow" aria-hidden="true">→</span>
          <span className="flow-node">요약·핵심·주의</span>
        </div>
        <p className="flow-note">실패 시 재시도·fallback 처리</p>
      </div>
    )
  }

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
                <PortfolioLink key={link.href} href={link.href}>
                  {link.label}
                </PortfolioLink>
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
