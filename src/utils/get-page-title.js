
const title = 'Thiết Bị Y Tế - Medisun' || 'CPC1HN'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
