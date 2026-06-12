function CellInput({value, rowIndex, cellIndex, onChange}) {
    function handleChange(e) {
        onChange(rowIndex, cellIndex, e.target.value);
    }

    return (
        <input value={value} onChange={handleChange} />
    )
}

function AddColumnButton({list, setList}) {
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
        <button onClick={addColumn} aria-label="Add Column">Add Column +</button>
    )
}

function DeleteColumnButton({list, setList, column}) {
    function deleteColumn() {
        if (list.length === 0) {
            return;
        }
        const newList = list.map(row => row.filter((_, index) => index !== column));
        setList([...newList]);
    }

    return (
        <button onClick={deleteColumn} aria-label="Delete Column">Delete Column -</button>
    )
}

function AddRowButton({list, setList}) {
    function addRow() {
        if (list.length === 0) {
            setList([[]]);
            return;
        }
        const row = new Array(list[0].length).fill('');
        setList([...list, row]);
    }

    return (
        <button class="addRowButton" onClick={addRow} aria-label="Add Row">Add Row +</button>
    )
}

function DeleteRowButton({rowIndex, list, setList}) {
    function deleteRow() {
        const newList = list.filter((_, index) => index !== rowIndex);
        setList(newList);
    }

    return (
        <button class="deleteRowButton" onClick={deleteRow} aria-label="Delete Row">Delete Row -</button>
    )
}

export default function Table({list, setList}) {
    function handleCellChange(rowIndex, cellIndex, value) {
        const newList = [...list];
        newList[rowIndex][cellIndex] = value;
        setList(newList);
    }

    return (
        <table class="table" data-testid="table">
            <thead>
                {list.length > 0 && (
                    <tr>
                        {list[0].map((_, index) => (
                            <th><DeleteColumnButton list={list} setList={setList} column={index} /></th>
                        ))}
                        <th></th>
                    </tr>
                )}
                <tr>
                    {list.length > 0 && list[0].map((value, index) => (
                        <th class="tableHeader" key={index}><CellInput value={value} rowIndex={0} cellIndex={index} onChange={handleCellChange} /></th>
                    ))}
                    <th><AddColumnButton list={list} setList={setList} /></th>
                </tr>
            </thead>
            <tbody>
                {list.length > 1 && list.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((value, cellIndex) => (
                            <td key={cellIndex}><CellInput value={value} rowIndex={rowIndex+1} cellIndex={cellIndex} onChange={handleCellChange} /></td>
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