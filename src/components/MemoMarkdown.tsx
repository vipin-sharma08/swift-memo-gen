import MemoTable from "./memo/MemoTable";

interface MemoMarkdownProps {
  content: string;
}

const MemoMarkdown = ({ content }: MemoMarkdownProps) => {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let listItems: { text: string; ordered: boolean }[] = [];
  let inList = false;
  let key = 0;
  let sectionCount = 0;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const header = tableRows[0];
    const body = tableRows
      .slice(1)
      .filter((r) => !r.every((c) => /^[-:]+$/.test(c.trim())));
    elements.push(
      <div key={key++} className="my-8 overflow-x-auto">
        <MemoTable headers={header} rows={body} />
      </div>,
    );
    tableRows = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    const Tag = listItems[0].ordered ? "ol" : "ul";
    elements.push(
      <Tag
        key={key++}
        className={`mb-5 space-y-2 font-serif text-[17px] leading-[1.65] text-ink ${
          Tag === "ol" ? "list-decimal" : "list-disc"
        } pl-6 marker:text-ink-faint`}
      >
        {listItems.map((item, i) => (
          <li key={i}>{renderInline(item.text)}</li>
        ))}
      </Tag>,
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (inList) {
        flushList();
        inList = false;
      }
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
      if (inList) {
        flushList();
        inList = false;
      }
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (inList) {
        flushList();
        inList = false;
      }
      sectionCount += 1;
      const num = String(sectionCount).padStart(2, "0");
      elements.push(
        <header
          key={key++}
          className="flex items-center gap-4 mt-16 mb-6 first:mt-0"
        >
          <span className="font-mono text-[14px] text-ink-faint tracking-wider">
            {num}
          </span>
          <span className="label-eyebrow text-ink whitespace-nowrap">
            {trimmed.slice(3)}
          </span>
          <div className="flex-1 border-t border-rule" aria-hidden="true" />
        </header>,
      );
    } else if (trimmed.startsWith("### ")) {
      if (inList) {
        flushList();
        inList = false;
      }
      elements.push(
        <h4
          key={key++}
          className="font-serif text-[20px] leading-[1.25] text-ink mt-8 mb-3"
        >
          {trimmed.slice(4)}
        </h4>,
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      inList = true;
      listItems.push({ text: trimmed.replace(/^\d+\.\s/, ""), ordered: true });
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      listItems.push({ text: trimmed.slice(2), ordered: false });
    } else {
      if (inList) {
        flushList();
        inList = false;
      }
      elements.push(
        <p
          key={key++}
          className="font-serif text-[17px] leading-[1.65] text-ink mb-4"
        >
          {renderInline(trimmed)}
        </p>,
      );
    }
  }

  if (inTable) flushTable();
  if (inList) flushList();

  return <div>{elements}</div>;
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="lead-in">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default MemoMarkdown;
