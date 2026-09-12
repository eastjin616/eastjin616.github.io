import test from 'node:test'
import assert from 'node:assert/strict'
import { validateContent } from './validate-content.mjs'

const project = {
  slug: 'sample',
  title: 'Sample',
  category: 'work',
  role: 'Backend',
  lede: 'A concrete opening line',
  highlights: ['A concrete contribution'],
  visual: { kind: 'image', src: '/project-art/sample.png' },
  stack: ['Java'],
  blocks: [
    { kind: 'constraint', title: 'Constraint', body: 'A real constraint' },
    { kind: 'result', title: 'Result', body: 'A verifiable result' },
  ],
}

test('requires at least three featured projects', () => {
  const errors = validateContent({ featuredProjects: [project] })
  assert.ok(errors.some((error) => /at least three/i.test(error)))
})

test('requires unique project slugs', () => {
  const errors = validateContent({
    featuredProjects: [project, project, { ...project, slug: 'other' }],
  })
  assert.ok(errors.some((error) => /unique/i.test(error)))
})

test('rejects unresolved publication markers', () => {
  const featuredProjects = ['one', 'two', 'three'].map((slug) => ({
    ...project,
    slug,
    lede: slug === 'two' ? '[확인 필요] 개선 수치' : project.lede,
  }))
  const errors = validateContent({ featuredProjects })
  assert.ok(errors.some((error) => /확인 필요/.test(error)))
})

test('requires non-empty block bodies', () => {
  const incomplete = {
    ...project,
    slug: 'incomplete',
    blocks: [{ kind: 'result', title: 'Result', body: '' }],
  }
  const errors = validateContent({
    featuredProjects: [
      { ...project, slug: 'one' },
      { ...project, slug: 'two' },
      incomplete,
    ],
  })
  assert.ok(errors.some((error) => /block/i.test(error) && /body/i.test(error)))
})

test('requires one to three project highlights', () => {
  const withoutHighlights = ['one', 'two', 'three'].map((slug) => {
    const { highlights: _highlights, ...projectWithoutHighlights } = project
    return { ...projectWithoutHighlights, slug }
  })
  assert.ok(
    validateContent({ featuredProjects: withoutHighlights }).some((error) =>
      /highlights/i.test(error),
    ),
  )

  const withTooMany = ['one', 'two', 'three'].map((slug) => ({
    ...project,
    slug,
    highlights: ['one', 'two', 'three', 'four'],
  }))
  assert.ok(
    validateContent({ featuredProjects: withTooMany }).some((error) => /highlights/i.test(error)),
  )
})

test('requires a local project visual', () => {
  const featuredProjects = ['one', 'two', 'three'].map((slug) => ({ ...project, slug }))
  const errors = validateContent({
    featuredProjects: [
      { ...featuredProjects[0], visual: undefined },
      featuredProjects[1],
      featuredProjects[2],
    ],
  })

  assert.ok(errors.some((error) => /local project visual/i.test(error)))
})

test('requires a work or project category', () => {
  const featuredProjects = ['one', 'two', 'three'].map((slug) => ({ ...project, slug }))
  const errors = validateContent({
    featuredProjects: [{ ...featuredProjects[0], category: undefined }, featuredProjects[1], featuredProjects[2]],
  })

  assert.ok(errors.some((error) => /work or project category/i.test(error)))
})

test('requires experience entries in newest-first order', () => {
  const featuredProjects = ['one', 'two', 'three'].map((slug) => ({ ...project, slug }))
  const errors = validateContent({
    featuredProjects,
    experience: [
      { year: '2021.07~2022.10', name: 'Older role' },
      { year: '2026.05~', name: 'Current role' },
    ],
  })

  assert.ok(errors.some((error) => /experience/i.test(error) && /newest/i.test(error)))
})

test('requires complete training entries and nested projects', () => {
  const featuredProjects = ['one', 'two', 'three'].map((slug) => ({ ...project, slug }))
  const errors = validateContent({
    featuredProjects,
    training: [
      {
        name: 'Incomplete training',
        projects: [{ title: 'Incomplete project', links: [{ href: 'javascript:alert(1)' }] }],
      },
    ],
  })

  assert.ok(errors.some((error) => /training/i.test(error)))
  assert.ok(errors.some((error) => /training project/i.test(error)))
  assert.ok(errors.some((error) => /https/i.test(error)))
})

test('rejects non-public link protocols', () => {
  const errors = validateContent({
    links: { resume: 'javascript:alert(1)' },
    featuredProjects: ['one', 'two', 'three'].map((slug) => ({ ...project, slug })),
  })
  assert.ok(errors.some((error) => /https or mailto/i.test(error)))
})
