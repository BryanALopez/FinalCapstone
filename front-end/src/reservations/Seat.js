import React, { useEffect, useState } from "react";
import { listTables, reserveTable } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
    const { reservation_id } = useParams();
    const [tables, setTables] = useState([]);
    const history = useHistory();
    const [error, setError] = useState('');

    function loadTables() {
        const abortController = new AbortController();
        setError(null);
        listTables(abortController.signal)
            .then(setTables)
            .catch(setError);
        return () => abortController.abort();
    }
    useEffect(loadTables, []);

    var e = document.getElementsByName("table_id")[0];
    const handleSubmit = async (event) => {
        event.preventDefault();

        const abortController = new AbortController();
        reserveTable(e.options[e.selectedIndex].value, Number(reservation_id), abortController.signal)
            .then(() => history.push(`/dashboard`))
            .catch(setError);
    };
    const handleCancel = () => history.go(-1);

    const tablesList = [];
    tables.forEach((table) => {
        if (table.is_seated === false) {
            tablesList.push(
                <option key={table.table_id} id={table.table_name} value={table.table_id}>{table.table_name} - {table.capacity}</option>
            );
        }
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="table_id" required={true}>
                    <option key="default-tbl-key" defaultValue value="">Table Number - Capacity Amount</option>
                    {tablesList}
                </select>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
            <ErrorAlert error={error} />
        </div>
    );
}

export default Seat;