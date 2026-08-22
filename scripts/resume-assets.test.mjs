import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const route = new URL('../public/resume/', import.meta.url)

test('resume route has the required source files', () => {
  for (const file of ['index.html', 'resume.css', 'resume.js', 'resume-data.json']) {
    assert.equal(existsSync(new URL(file, route)), true, `${file} must exist`)
  }

  const data = JSON.parse(readFileSync(new URL('resume-data.json', route), 'utf8'))
  assert.equal(data.projects.length, 4)
  assert.deepEqual(
    data.projects.map((project) => project.id),
    ['ktds-platform', 'ktds-cli', 'samsung-ipcc', 'badukland'],
  )
  assert.equal(data.training.length, 2)
})
