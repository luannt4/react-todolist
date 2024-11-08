export const getIdFromSlug = (slug: string, separator: string = '-'): number => {
    const parts = slug.split(separator)
    const lastPart = parts.pop()
  
    if (lastPart && /^\d+$/.test(lastPart)) {
        return parseInt(lastPart, 10)
    }
    return 0
  }