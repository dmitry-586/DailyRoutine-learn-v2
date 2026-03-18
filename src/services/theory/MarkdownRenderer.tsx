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
    <h1 className='mb-6 text-3xl max-md:text-2xl max-sm:mb-4 max-sm:text-xl'>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className='mt-5 mb-4 scroll-mt-20 text-2xl max-sm:text-xl'>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className='mt-6 mb-3 scroll-mt-20 text-xl max-sm:text-lg'>
      {children}
    </h3>
  ),
  p: ({ children }) => <p className='mb-4'>{children}</p>,
  ul: ({ children }) => (
    <ul className='mb-4 list-outside list-disc space-y-1.5 pl-5'>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className='mb-4 list-outside list-decimal space-y-1.5 pl-5'>
      {children}
    </ol>
  ),
  li: ({ children }) => <li className='mb-1 indent-0'>{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href || '#'}
      className='text-primary hover:underline'
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className='bg-dark-gray rounded px-1 py-0.5'>{children}</code>
  ),
  pre: ({ children }) => (
    <pre className='bg-dark-gray custom-scrollbar mb-4 w-full overflow-auto rounded-lg px-2 py-1 indent-0 font-mono max-md:text-sm md:w-fit'>
      {children}
    </pre>
  ),
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
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
