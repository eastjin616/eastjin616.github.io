import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const requiredFields = ['slug', 'title', 'problem', 'role']
const requiredSections = ['constraint', 'decision', 'system', 'recovery', 'result']
const unresolvedMarker = /\[확인 필요\]|\bTODO\b|\bTBD\b/i

export function validateContent(content) {
  const errors = []
  const projects = content?.featuredProjects ?? []

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
    requiredSections.forEach((section) => {
      if (!project.sections?.[section]) {
        errors.push(`Project ${index + 1} is missing ${section}.`)
      }
    })
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
