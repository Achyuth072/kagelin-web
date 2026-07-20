import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function LegalContent({ markdown }: { markdown: string }) {
  return (
    <div className="type-body text-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="type-h1 text-balance">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="type-h2 mt-10 first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => <h3 className="type-h3 mt-6">{children}</h3>,
          p: ({ children }) => (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              {children}
            </ul>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-brand-strong underline underline-offset-2 hover:text-foreground"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="type-ui not-italic text-muted-foreground">
              {children}
            </em>
          ),
          hr: () => <hr className="my-8 border-border" />,
          table: ({ children }) => (
            <div className="mt-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-[14px]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary/60">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border px-3 py-2 font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/60 px-3 py-2 align-top text-muted-foreground">
              {children}
            </td>
          ),
          code: ({ children }) => (
            <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px] text-foreground">
              {children}
            </code>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
