export function getProjectSlug(search: string, validSlugs: string[]) {
  const slug = new URLSearchParams(search).get('project')
  return slug && validSlugs.includes(slug) ? slug : null
}

export function isResumeView(search: string) {
  return new URLSearchParams(search).get('resume') === '1'
}
