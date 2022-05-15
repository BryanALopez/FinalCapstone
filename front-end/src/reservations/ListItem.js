import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ListItem({ reservation }) {
    const history = useHistory();
    const [error, setError] = useState('');

    const handleSeat = () => history.push(`/reservations/${reservation.reservation_id}/seat`);
    const handleEdit = () => history.push(`/reservations/${reservation.reservation_id}/edit`);
    const handleCancel = async (event) => {
        event.preventDefault();

        if (window.confirm('Do you want to cancel this reservation? This cannot be undone.')) {
            const abortController = new AbortController();
            // reservation.status = "cancelled";
            updateReservationStatus({ ...reservation, status: "cancelled" }, abortController.signal)
                .then(() => { history.go(0); }) // refresh
                .catch(err => setError(err));
        }
    };

    return (
        <>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
            <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
            <td>
                {reservation.status === "booked" ?
                    <button href={`/reservations/${reservation.reservation_id}/seat`} type="button" onClick={handleSeat}>Seat</button>
                    : ""}
            </td>
            <td><button href={`/reservations/${reservation.reservation_id}/edit`} type="button" onClick={handleEdit}>Edit</button></td>
            <td><button data-reservation-id-cancel={reservation.reservation_id} type="button" onClick={handleCancel}>Cancel</button></td>
            <td><ErrorAlert error={error} /></td>
        </>
    );
}

export default ListItem;