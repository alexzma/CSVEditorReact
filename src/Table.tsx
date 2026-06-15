function CellInput({value, rowIndex, cellIndex, onChange}: {value: string, rowIndex: number, cellIndex: number, onChange: (rowIndex: number, cellIndex: number, value: string) => void}) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(rowIndex, cellIndex, e.target.value);
    }

    const testId = `cellInput-${rowIndex}-${cellIndex}`;

    return (
        <input data-testid={testId} value={value} onChange={handleChange} />
    )
}

function AddColumnButton({list, setList}: {list: string[][], setList: (list: string[][]) => void}) {
    function addColumn() {
        if (list.length === 0) {
            setList([['']]);
            return;
        }
        for (const row of list) {
            row.push('');
        }
        setList([...list]);
    }

    return (
        <button data-testid="addColumnButton" onClick={addColumn} aria-label="Add Column">Add Column +</button>
    )
}

function DeleteColumnButton({list, setList, column}: {list: string[][], setList: (list: string[][]) => void, column: number}) {
    function deleteColumn() {
        if (list.length === 0) {
            return;
        }
        const newList = list.map(row => row.filter((_, index) => index !== column));
        setList([...newList]);
    }

    return (
        <button data-testid={"deleteColumnButton-" + column} onClick={deleteColumn} aria-label="Delete Column">Delete Column -</button>
    )
}

function AddRowButton({list, setList}: {list: string[][], setList: (list: string[][]) => void}) {
    function addRow() {
        if (list.length === 0) {
            setList([[]]);
            return;
        }
        const row = new Array(list[0].length).fill('');
        setList([...list, row]);
    }

    return (
        <button data-testid="addRowButton" className="addRowButton" onClick={addRow} aria-label="Add Row">Add Row +</button>
    )
}

function DeleteRowButton({rowIndex, list, setList}: {rowIndex: number, list: string[][], setList: (list: string[][]) => void}) {
    function deleteRow() {
        const newList = list.filter((_, index) => index !== rowIndex);
        setList(newList);
    }

    return (
        <button data-testid={"deleteRowButton-" + rowIndex} className="deleteRowButton" onClick={deleteRow} aria-label="Delete Row">Delete Row -</button>
    )
}

export default function Table({list, setList}: {list: string[][], setList: (list: string[][]) => void}) {
    function handleCellChange(rowIndex: number, cellIndex: number, value: string) {
        const newList = [...list];
        newList[rowIndex][cellIndex] = value;
        setList(newList);
    }

    return (
        <table className="table" data-testid="table">
            <thead>
                {list.length > 0 && (
                    <tr key="deleteColumnRow">
                        {list[0].map((_, index) => (
                            <th key={'deleteColumn-' + index}><DeleteColumnButton list={list} setList={setList} column={index} /></th>
                        ))}
                        <th></th>
                    </tr>
                )}
                <tr key="header">
                    {list.length > 0 && list[0].map((value, index) => (
                        <th className="tableHeader" key={'column-' + index}><CellInput value={value} rowIndex={0} cellIndex={index} onChange={handleCellChange} /></th>
                    ))}
                    <th><AddColumnButton list={list} setList={setList} /></th>
                </tr>
            </thead>
            <tbody>
                {list.length > 1 && list.slice(1).map((row, rowIndex) => (
                    <tr key={'row-' + rowIndex}>
                        {row.map((value, cellIndex) => (
                            <td key={rowIndex + '-' + cellIndex}><CellInput value={value} rowIndex={rowIndex+1} cellIndex={cellIndex} onChange={handleCellChange} /></td>
                        ))}
                        <td><DeleteRowButton rowIndex={rowIndex+1} list={list} setList={setList} /></td>
                    </tr>
                ))}
                {list.length > 0 && (
                    <tr>
                        <td colSpan={list.length > 0 ? list[0].length + 1 : 1}>
                            <AddRowButton list={list} setList={setList} />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}