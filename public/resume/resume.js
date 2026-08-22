const root = document.querySelector('#resume')

const element = (tag, className, text) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

const sectionTitle = (index, label, title) => {
  const header = element('header', 'section-heading')
  header.append(element('span', 'section-number', index))
  const copy = element('div', 'section-heading-copy')
  copy.append(element('p', 'eyebrow', label))
  copy.append(element('h2', '', title))
  header.append(copy)
  return header
}

const list = (items, className = '') => {
  const node = element('ul', className)
  items.forEach((item) => node.append(element('li', '', item)))
  return node
}

const renderResume = (data) => {
  const page = element('article', 'resume-shell')
  const identity = element('header', 'identity')
  const topLine = element('div', 'identity-topline')
  topLine.append(element('span', 'identity-kicker', 'RESUME · 2026'))
  topLine.append(element('span', 'identity-name-en', data.profile.englishName))
  identity.append(topLine)

  const identityBody = element('div', 'identity-body')
  const titleWrap = element('div', 'identity-title-wrap')
  titleWrap.append(element('div', 'identity-marker'))
  const titleCopy = element('div', 'identity-copy')
  titleCopy.append(element('h1', '', data.profile.name))
  titleCopy.append(element('p', 'identity-role', data.profile.role))
  titleWrap.append(titleCopy)
  identityBody.append(titleWrap)

  const contact = element('address', 'contact-list')
  ;[
    ['EMAIL', data.profile.email, `mailto:${data.profile.email}`],
    ['PHONE', data.profile.phone, `tel:${data.profile.phone.replaceAll('-', '')}`],
    ['GITHUB', data.profile.github.replace('https://', ''), data.profile.github],
  ].forEach(([label, value, href]) => {
    const item = element('a', 'contact-item')
    item.href = href
    item.target = href.startsWith('http') ? '_blank' : ''
    item.rel = href.startsWith('http') ? 'noreferrer' : ''
    item.append(element('span', '', label), element('span', '', value))
    contact.append(item)
  })
  identityBody.append(contact)
  identity.append(identityBody)
  identity.append(element('p', 'profile-summary', data.profile.summary))
  page.append(identity)

  const skills = element('section', 'content-section skills-section')
  skills.append(sectionTitle('01', 'CAPABILITIES', '핵심 역량'))
  const skillGrid = element('div', 'skill-grid')
  data.skills.forEach((skill, index) => {
    const card = element('section', 'skill-card')
    card.append(element('span', 'skill-card-index', `0${index + 1}`))
    card.append(element('h3', '', skill.title))
    const tags = element('div', 'tag-list')
    skill.items.forEach((item) => tags.append(element('span', 'tag', item)))
    card.append(tags)
    skillGrid.append(card)
  })
  skills.append(skillGrid)
  page.append(skills)

  const experience = element('section', 'content-section experience-section')
  experience.append(sectionTitle('02', 'CAREER', '경력 사항'))
  const experienceList = element('div', 'experience-list')
  data.experience.forEach((entry) => {
    const row = element('article', 'experience-row')
    row.append(element('p', 'experience-period', entry.period))
    const detail = element('div', 'experience-detail')
    detail.append(element('h3', '', entry.company))
    detail.append(element('p', 'experience-role', entry.role))
    detail.append(element('p', 'experience-summary', entry.summary))
    row.append(detail)
    experienceList.append(row)
  })
  experience.append(experienceList)
  page.append(experience)

  const projects = element('section', 'content-section projects-section')
  projects.append(sectionTitle('03', 'SELECTED PROJECTS', '주요 프로젝트'))
  const projectList = element('div', 'project-list')
  data.projects.forEach((project) => {
    const card = element('article', 'project-card')
    const meta = element('div', 'project-meta')
    meta.append(element('span', 'project-number', project.number))
    meta.append(element('p', 'project-period', project.period))
    card.append(meta)
    const content = element('div', 'project-content')
    const heading = element('div', 'project-heading')
    heading.append(element('p', 'project-company', project.company))
    heading.append(element('h3', '', project.title))
    heading.append(element('p', 'project-role', project.role))
    content.append(heading)
    content.append(element('p', 'project-overview', project.overview))
    const columns = element('div', 'project-columns')
    const stack = element('div', 'project-stack')
    stack.append(element('p', 'column-label', 'TECH ENVIRONMENT'))
    const tags = element('div', 'tag-list')
    project.stack.forEach((item) => tags.append(element('span', 'tag', item)))
    stack.append(tags)
    const contribution = element('div', 'project-contribution')
    contribution.append(element('p', 'column-label', 'CONTRIBUTION'))
    contribution.append(list(project.details, 'detail-list'))
    columns.append(stack, contribution)
    content.append(columns)
    const result = element('p', 'project-result')
    result.append(element('strong', '', 'Result. '), document.createTextNode(project.result))
    content.append(result)
    card.append(content)
    projectList.append(card)
  })
  projects.append(projectList)
  page.append(projects)

  const training = element('section', 'content-section training-section')
  training.append(sectionTitle('04', 'LEARNING', '교육 이력'))
  const trainingList = element('div', 'training-list')
  data.training.forEach((course) => {
    const item = element('article', 'training-item')
    const label = element('div', 'training-label')
    label.append(element('h3', '', course.title))
    label.append(element('p', '', `${course.organization} · ${course.period}`))
    item.append(label)
    item.append(element('p', 'training-focus', course.focus))
    trainingList.append(item)
  })
  training.append(trainingList)
  page.append(training)

  const footer = element('footer', 'resume-footer')
  footer.append(element('span', '', 'SEO DONGJIN · RESUME'))
  footer.append(element('span', '', 'Updated 2026.08'))
  page.append(footer)
  return page
}

try {
  const response = await fetch('./resume-data.json')
  if (!response.ok) throw new Error('이력서 데이터를 불러오지 못했습니다.')
  root.replaceChildren(renderResume(await response.json()))
} catch (error) {
  root.replaceChildren(element('p', 'load-error', error.message))
}
