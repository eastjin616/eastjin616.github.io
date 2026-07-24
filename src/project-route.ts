export function getProjectSlug(search: string, validSlugs: string[]) {
  const slug = new URLSearchParams(search).get('project')
  return slug && validSlugs.includes(slug) ? slug : null
}
