import 'highlight.js/styles/github-dark.css'
import React from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className='mt-6 mb-4 text-xl font-semibold'>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className='mt-5 mb-3 text-lg font-medium'>{children}</h2>
  ),
  h3: ({ children }) => <h3 className='mt-4 mb-2 font-medium'>{children}</h3>,
  p: ({ children }) => <p className='mb-4 max-sm:text-sm'>{children}</p>,
  ul: ({ children }) => <ul className='mb-4 list-disc pl-5'>{children}</ul>,
  ol: ({ children }) => <ol className='mb-4 list-decimal pl-5'>{children}</ol>,
  li: ({ children }) => <li className='mb-1'>{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href || '#'}
      className='text-primary text-sm hover:underline'
      target='_blank'
      rel='noopener'
    >
      {children}
    </a>
  ),
  code: ({ className, children }) => (
    <code className={className}>{children}</code>
  ),
  pre: ({ children }) => (
    <pre className='bg-dark-gray custom-scrollbar w-full overflow-auto rounded-lg p-1 font-mono max-md:text-sm md:w-fit'>
      {children}
    </pre>
  ),
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  return (
    <div className={className}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
