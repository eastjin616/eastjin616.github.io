import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const requiredFields = ['slug', 'title', 'role', 'lede']
const unresolvedMarker = /\[확인 필요\]|\bTODO\b|\bTBD\b/i

export function validateContent(content) {
  const errors = []
  const projects = content?.featuredProjects ?? []
  const sideProjects = content?.sideProjects ?? []
  const training = content?.training ?? []

  if (projects.length < 3) {
    errors.push('Featured projects must contain at least three entries.')
  }

  const slugs = projects.map((project) => project.slug)
  if (new Set(slugs).size !== slugs.length) {
    errors.push('Project slugs must be unique.')
  }

  projects.forEach((project, index) => {
    requiredFields.forEach((field) => {
      if (!project[field]) {
        errors.push(`Project ${index + 1} is missing ${field}.`)
      }
    })
    if (!Array.isArray(project.stack) || project.stack.length === 0) {
      errors.push(`Project ${index + 1} is missing stack.`)
    }
    if (
      !Array.isArray(project.highlights) ||
      project.highlights.length < 1 ||
      project.highlights.length > 3 ||
      project.highlights.some(
        (highlight) => typeof highlight !== 'string' || !highlight.trim(),
      )
    ) {
      errors.push(`Project ${index + 1} must contain one to three highlights.`)
    }
    if (!Array.isArray(project.blocks) || project.blocks.length === 0) {
      errors.push(`Project ${index + 1} is missing blocks.`)
    } else {
      project.blocks.forEach((block, blockIndex) => {
        if (!block?.body) {
          errors.push(`Project ${index + 1} block ${blockIndex + 1} is missing body.`)
        }
      })
    }
  })

  const serialized = JSON.stringify(content)
  const marker = serialized.match(unresolvedMarker)
  if (marker) {
    errors.push(`Unresolved publication marker found: ${marker[0]}`)
  }

  Object.entries(content?.links ?? {}).forEach(([name, href]) => {
    if (href && !/^(https:|mailto:)/.test(href)) {
      errors.push(`Link "${name}" must use https or mailto.`)
    }
  })

  sideProjects.forEach((project, index) => {
    const missingField = ['title', 'period', 'summary', 'stack', 'highlights', 'links'].find(
      (field) => !project[field] || (Array.isArray(project[field]) && project[field].length === 0),
    )
    if (missingField) {
      errors.push(`Side project ${index + 1} is missing ${missingField}.`)
    }
    const projectLinks = project.links ?? []
    projectLinks.forEach((link) => {
      if (!/^https:/.test(link.href ?? '')) {
        errors.push(`Side project ${index + 1} links must use https.`)
      }
    })
  })

  training.forEach((item, index) => {
    const missingField = ['name', 'period', 'summary'].find((field) => !item[field])
    if (missingField) {
      errors.push(`Training ${index + 1} is missing ${missingField}.`)
    }
  })

  const experienceYears = (content?.experience ?? []).map((item) =>
    Number.parseInt(item.year?.slice(0, 4), 10),
  )
  if (experienceYears.some((year, index) => index > 0 && year > experienceYears[index - 1])) {
    errors.push('Experience entries must be ordered newest first.')
  }

  return errors
}

async function run() {
  const contentUrl = new URL('../src/content.json', import.meta.url)
  const content = JSON.parse(await readFile(contentUrl, 'utf8'))
  const errors = validateContent(content)

  if (errors.length) {
    console.error(errors.join('\n'))
    process.exitCode = 1
    return
  }

  console.log('Content validation passed')
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await run()
}
