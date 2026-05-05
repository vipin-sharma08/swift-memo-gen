type Alignment = "left" | "right";

interface MemoTableProps {
  headers: string[];
  rows: (string | number)[][];
  alignments?: Alignment[];
}

const MemoTable = ({ headers, rows, alignments }: MemoTableProps) => {
  const alignFor = (i: number): Alignment => alignments?.[i] ?? (i === 0 ? "left" : "right");

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              scope="col"
              className={`label-eyebrow py-3 px-3 first:pl-0 last:pr-0 border-b border-rule ${
                alignFor(i) === "right" ? "text-right" : "text-left"
              }`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className="border-b border-rule last:border-b-0">
            {row.map((cell, ci) => {
              const isFirstCol = ci === 0;
              const align = alignFor(ci);
              return (
                <td
                  key={ci}
                  className={`py-3 px-3 first:pl-0 last:pr-0 text-ink ${
                    isFirstCol ? "font-sans text-[14px]" : "font-mono text-[14px]"
                  } ${align === "right" ? "text-right" : "text-left"}`}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemoTable;
