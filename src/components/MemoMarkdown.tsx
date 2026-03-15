interface MemoMarkdownProps {
  content: string;
}

const MemoMarkdown = ({ content }: MemoMarkdownProps) => {
  // Basic markdown-to-JSX renderer for memo content
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let key = 0;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const header = tableRows[0];
    const body = tableRows.slice(1).filter((r) => !r.every((c) => /^[-:]+$/.test(c.trim())));
    elements.push(
      <div key={key++} className="overflow-x-auto mb-6">
        <table className="w-full text-[14px] text-left">
          <thead>
            <tr>
              {header.map((h, i) => (
                <th
                  key={i}
                  className="text-[11px] text-[hsl(var(--text-tertiary))] uppercase tracking-wider font-medium py-2 px-3 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  {renderInline(h.trim())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="py-2 px-3 text-[hsl(var(--text-secondary))] border-b font-mono-data"
                    style={{ borderColor: "rgba(255,255,255,0.04)" }}
                  >
                    {renderInline(cell.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Table row
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      inTable = true;
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      tableRows.push(cells);
      continue;
    }

    if (inTable) {
      flushTable();
      inTable = false;
    }

    if (!trimmed) {
      continue;
    }

    // Headers
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h3 key={key++} className="text-caption text-primary mb-3 mt-8 first:mt-0">
          {trimmed.slice(3)}
        </h3>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h4 key={key++} className="text-[15px] font-semibold text-[hsl(var(--text-primary))] mb-2 mt-6">
          {trimmed.slice(4)}
        </h4>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(
        <li key={key++} className="flex gap-2 text-[14px] text-[hsl(var(--text-secondary))] mb-1.5 ml-2">
          <span className="text-[hsl(var(--text-tertiary))] mt-0.5 text-[8px]">●</span>
          <span>{renderInline(trimmed.slice(2))}</span>
        </li>
      );
    } else {
      elements.push(
        <p key={key++} className="text-[15px] text-[hsl(var(--text-secondary))] leading-relaxed mb-3">
          {renderInline(trimmed)}
        </p>
      );
    }
  }

  if (inTable) flushTable();

  return <div>{elements}</div>;
};

function renderInline(text: string) {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[hsl(var(--text-primary))]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default MemoMarkdown;
