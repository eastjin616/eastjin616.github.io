import test from 'node:test'
import assert from 'node:assert/strict'
import { getProjectSlug, isResumeView } from '../src/project-route.ts'

const slugs = ['kt-ds-dev-ai', 'plainpaper', 'ipcc-infrastructure']

test('returns a known project slug', () => {
  assert.equal(getProjectSlug('?project=plainpaper', slugs), 'plainpaper')
})

test('recognizes the editable resume route', () => {
  assert.equal(isResumeView('?resume=1'), true)
  assert.equal(isResumeView('?resume=0'), false)
})
