import test from 'node:test'
import assert from 'node:assert/strict'
import { validateContent } from './validate-content.mjs'

const project = {
  slug: 'sample',
  title: 'Sample',
  problem: 'A concrete problem',
  role: 'Backend',
  stack: ['Java'],
  sections: {
    constraint: 'A real constraint',
    decision: 'A reasoned decision',
    system: 'A system explanation',
    recovery: 'A failure and recovery path',
    result: 'A verifiable result',
  },
}

test('requires exactly three featured projects', () => {
  const errors = validateContent({ featuredProjects: [project] })
  assert.ok(errors.some((error) => /exactly three/i.test(error)))
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
    problem: slug === 'two' ? '[확인 필요] 개선 수치' : project.problem,
  }))
  const errors = validateContent({ featuredProjects })
  assert.ok(errors.some((error) => /확인 필요/.test(error)))
})

test('requires every routing section', () => {
  const incomplete = {
    ...project,
    slug: 'incomplete',
    sections: { ...project.sections, recovery: '' },
  }
  const errors = validateContent({
    featuredProjects: [
      { ...project, slug: 'one' },
      { ...project, slug: 'two' },
      incomplete,
    ],
  })
  assert.ok(errors.some((error) => /recovery/i.test(error)))
})

test('rejects non-public link protocols', () => {
  const errors = validateContent({
    links: { resume: 'javascript:alert(1)' },
    featuredProjects: ['one', 'two', 'three'].map((slug) => ({ ...project, slug })),
  })
  assert.ok(errors.some((error) => /https or mailto/i.test(error)))
})
