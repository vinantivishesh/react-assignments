import { useState } from "react";
import "./styles.css";

function Table({ rows, columns }) {
  return (
    <table>
      <tbody>
        {Array.from({ length: rows }, () => 0).map((_, row) => (
          <tr key={row}>
            {Array.from({ length: columns }, () => 0).map((_, col) => (
              <td key={col}>
                {col % 2 === 0
                  ? rows * col + (row + 1)
                  : rows * (col + 1) - row}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function App() {
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.target);
          const rows = data.get("rows");
          setRows(Number(rows));
          const cols = data.get("cols");
          setCols(Number(cols));
        }}
      >
        <div>
          <label>Rows</label>
          <input
            defaultValue={rows}
            type="number"
            min={1}
            name="rows"
            id="rows"
          />
        </div>
        <div>
          <label>Columns</label>
          <input
            defaultValue={cols}
            type="number"
            min={1}
            name="cols"
            id="cols"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {Boolean(rows) && Boolean(cols) && <Table rows={rows} columns={cols} />}
    </div>
  );
}
