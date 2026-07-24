import test from 'node:test'
import assert from 'node:assert/strict'
import { getProjectSlug } from '../src/project-route.ts'

const slugs = ['kt-ds-dev-ai', 'plainpaper', 'ipcc-infrastructure']

test('returns a known project slug', () => {
  assert.equal(getProjectSlug('?project=plainpaper', slugs), 'plainpaper')
})
