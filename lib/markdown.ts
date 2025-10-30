import matter from 'gray-matter'

export function parseMarkdown(content: string) {
  const { data, content: markdown } = matter(content)
  return { frontmatter: data, markdown }
}
