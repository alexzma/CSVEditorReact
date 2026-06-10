import { useState } from 'react';

function FileInput(setList) {
    function processFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n');
            const csvList = lines.map(line => line.split(','));
            setList(csvList);
        }
        reader.readAsText(file);
    }

    return (
        <div className="fileInput">
            <label htmlFor="fileInput">Choose a CSV file</label>
            <input id="fileInput" type="file" onChange={(e) => processFile(e.target.files[0])} />
        </div>
    );
}

function DownloadButton(list) {
    function downloadCSV() {
        const rows = list.map(row => row.join(',')).join('\n');
        const blob = new Blob([rows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    return (
        <div className="downloadButton">
            <button onClick={downloadCSV}>Download CSV</button>
        </div>
    )
}

function Table(list, setList) {
    return (
        <table>
            <thead>
                <tr>
                    {list.length > 0 && list[0].map((value, index) => (
                        <th key={index}>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {list.length > 1 && list.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((value, cellIndex) => (
                            <td key={cellIndex}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default function App() {
  const [list, setList] = useState(Array());

    return (
        <div className="app" data-testid="app">
            <FileInput setList={setList} />
            <DownloadButton list={list} />
            <Table list={list} setList={setList} />
        </div>
    )
}
