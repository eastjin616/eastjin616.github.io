import { lazy, Suspense, useEffect, useState } from 'react'
import content from './content.json'
import { getProjectSlug } from './project-route'

const { profile, links, layers, featuredProjects, experience } = content
type Project = (typeof featuredProjects)[number]
const LiquidLayer = lazy(() => import('./LiquidLayer'))

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
    <div className="site">
      <a className="skip-link" href="#content">
        본문 바로가기
      </a>

      <header className="site-header home-header">
        <a className="identity" href="/" aria-label="서동진 포트폴리오 홈">
          <span>SEO DONGJIN</span>
          <span className="identity__mark">S/DJ · 2026</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#layers">Layers</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="section-code">Layer 00 / Introduction</p>
            <h1 id="hero-title">
              <span>Layer by layer,</span>
              <span>I build systems</span>
              <span>that keep running.</span>
            </h1>
            <p className="hero__statement">{profile.headline}</p>
            <p className="hero__description">{profile.description}</p>
            <div className="hero__actions">
              <a className="text-link text-link--strong" href="#layers">
                Explore my layers <span aria-hidden="true">↓</span>
              </a>
              {links.resume && (
                <a className="text-link" href={links.resume}>
                  Resume <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="wafer">
              <span className="wafer__ring wafer__ring--1" />
              <span className="wafer__ring wafer__ring--2" />
              <span className="wafer__ring wafer__ring--3" />
              <span className="wafer__ring wafer__ring--4" />
              <span className="wafer__axis wafer__axis--x" />
              <span className="wafer__axis wafer__axis--y" />
              <span className="wafer__notch" />
              <span className="wafer__index">00—04</span>
              <span className="wafer__caption">OPERATION / CODE / RECOVERY</span>
              <span className="wafer__lens" />
              <HeroLiquid />
            </div>
            <p className="hero__coordinates">37.5665° N / 126.9780° E</p>
          </div>

          <p className="hero__rail" aria-hidden="true">
            BACKEND / FULL STACK / OPERATIONS
          </p>
        </section>

        <section className="origin page-section" id="layers" aria-labelledby="layers-title">
          <header className="section-heading">
            <p className="section-code">Layer 01 / Origin</p>
            <h2 id="layers-title">
              시스템을 사용하는 사람에서,
              <br />
              시스템을 만드는 사람으로.
            </h2>
            <p>
              현장 경험은 이전 경력이 아니라 지금의 개발 방식을 만든 첫 번째 레이어입니다.
              상태를 보고, 원인을 좁히고, 복구까지 생각하는 습관은 코드 안에서도 이어집니다.
            </p>
          </header>

          <ol className="layer-list">
            {layers.map((layer) => (
              <li key={layer.number} className={`layer layer--${layer.number}`}>
                <div className="layer__disc" aria-hidden="true">
                  <span>{layer.number}</span>
                </div>
                <p className="layer__label">{layer.label}</p>
                <div className="layer__body">
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                </div>
                <ul className="layer__keywords" aria-label={`${layer.label} 기술과 관점`}>
                  {layer.keywords.map((keyword) => (
                    <li key={keyword}>{keyword}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="work__inner">
            <header className="work__heading">
              <p className="section-code section-code--light">Layer 02 / Selected Work</p>
              <h2 id="work-title">Systems, traced from problem to recovery.</h2>
              <p>
                화면 결과보다 그 뒤에 있는 제약, 판단, 실패와 복구 경로를 보여주는 세 가지
                작업입니다.
              </p>
            </header>

            <div className="project-list">
              {featuredProjects.map((project) => (
                <article className="project-row" key={project.slug}>
                  <a href={`?project=${project.slug}`} aria-label={`${project.title} 사례 자세히 보기`}>
                    <div className="project-row__index">
                      <span>{project.index}</span>
                      <span>{project.period}</span>
                    </div>
                    <div className="project-row__main">
                      <h3>{project.title}</h3>
                      <p>{project.problem}</p>
                      <p className="project-row__role">{project.role}</p>
                    </div>
                    <div className="project-row__open">
                      <span>Open case</span>
                      <span aria-hidden="true">↗</span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience page-section" id="experience" aria-labelledby="experience-title">
          <header className="experience__heading">
            <p className="section-code">Layer 03 / Experience</p>
            <h2 id="experience-title">One career, accumulating viewpoints.</h2>
          </header>

          <ol className="timeline">
            {experience.map((item, index) => (
              <li key={`${item.year}-${item.name}`}>
                <span className="timeline__index">{String(index + 1).padStart(2, '0')}</span>
                <time>{item.year}</time>
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
              </li>
            ))}
          </ol>

          {links.career && (
            <a className="text-link text-link--strong experience__link" href={links.career}>
              Full career description <span aria-hidden="true">↗</span>
            </a>
          )}
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="section-code">Final Layer / Contact</p>
            <h2 id="contact-title">
              다음 시스템을
              <br />
              함께 쌓아볼까요?
            </h2>
          </div>
          <div className="contact__body">
            <p>
              {profile.name} · {profile.role}
            </p>
            <div className="contact__links">
              {links.email && <a href={links.email}>Email ↗</a>}
              {links.github && <a href={links.github}>GitHub ↗</a>}
              {links.resume && <a href={links.resume}>Resume ↗</a>}
              {links.career && <a href={links.career}>Career description ↗</a>}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>SEO DONGJIN / PORTFOLIO 2026</p>
        <a href="#content">Back to top ↑</a>
      </footer>
    </div>
  )
}

function HeroLiquid() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return ready ? (
    <Suspense fallback={null}>
      <LiquidLayer />
    </Suspense>
  ) : null
}

function ProjectDetail({ project }: { project: Project }) {
  const routes = [
    { id: 'problem', label: 'Problem', copy: project.problem },
    { id: 'constraint', label: 'Constraint', copy: project.sections.constraint },
    { id: 'decision', label: 'Decision', copy: project.sections.decision },
    { id: 'system', label: 'System', copy: project.sections.system },
    { id: 'recovery', label: 'Recovery', copy: project.sections.recovery },
    { id: 'result', label: 'Result', copy: project.sections.result },
  ]
  const currentIndex = featuredProjects.findIndex((item) => item.slug === project.slug)
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length]

  return (
    <div className="site case-site">
      <a className="skip-link" href="#case-content">
        본문 바로가기
      </a>

      <header className="site-header case-header">
        <a className="identity" href="/" aria-label="서동진 포트폴리오 홈">
          <span>SEO DONGJIN</span>
          <span className="identity__mark">CASE / {project.index}</span>
        </a>
        <nav aria-label="프로젝트 메뉴">
          <a href="/#work">All work</a>
          {links.resume && <a href={links.resume}>Resume</a>}
        </nav>
      </header>

      <main id="case-content">
        <section className="case-hero" aria-labelledby="case-title">
          <div className="case-hero__index">
            <p className="section-code section-code--light">Selected work / {project.index}</p>
            <p>{project.period}</p>
          </div>
          <div className="case-hero__title">
            <h1 id="case-title">{project.title}</h1>
            <p>{project.problem}</p>
          </div>
          <dl className="case-meta">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(' · ')}</dd>
            </div>
            <div>
              <dt>Disclosure</dt>
              <dd>Public-safe case study</dd>
            </div>
          </dl>
        </section>

        <section className="route-panel" aria-labelledby="route-title">
          <div className="route-panel__heading">
            <p className="section-code">Routing map / 00—05</p>
            <h2 id="route-title">Follow the decision path.</h2>
            <p>문제에서 결과까지, 구현 과정에서 실제로 이어진 판단과 복구의 순서입니다.</p>
          </div>
          <nav aria-label="프로젝트 상세 목차" className="routing-map">
            <ol>
              {routes.map((route, index) => (
                <li
                  key={route.id}
                  className={route.id === 'decision' || route.id === 'recovery' ? 'is-liquid' : ''}
                >
                  <a href={`#${route.id}`}>
                    <span>{String(index).padStart(2, '0')}</span>
                    {route.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        <div className="case-body">
          {routes.map((route, index) => (
            <section className="case-section" id={route.id} key={route.id}>
              <div className="case-section__label">
                <span>{String(index).padStart(2, '0')}</span>
                <p>{route.label}</p>
              </div>
              <h2>{route.label}</h2>
              <p>{route.copy}</p>
            </section>
          ))}

          <section className="case-proof" aria-labelledby="evidence-title">
            <div>
              <p className="section-code">Evidence</p>
              <h2 id="evidence-title">What can be shown.</h2>
            </div>
            <p>{project.evidence}</p>
          </section>

          <section className="case-retro" aria-labelledby="retro-title">
            <p className="section-code section-code--light">Retrospective</p>
            <h2 id="retro-title">{project.retrospective}</h2>
          </section>
        </div>

        <a className="next-case" href={`?project=${nextProject.slug}`}>
          <span>Next case / {nextProject.index}</span>
          <strong>{nextProject.title}</strong>
          <span aria-hidden="true">↗</span>
        </a>
      </main>

      <footer className="site-footer">
        <p>SEO DONGJIN / PORTFOLIO 2026</p>
        <a href="/#work">Back to selected work ←</a>
      </footer>
    </div>
  )
}
