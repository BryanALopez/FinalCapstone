import React, { useState } from "react";
import { listReservationsByNumber } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsListItem from "../reservations/ListItem";

/**
 * Defines the search page.
 * @returns {JSX.Element}
 */
function Search() {
  const initialFormState = {
    mobile_number: '',
  };
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFind = async (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    listReservationsByNumber(formData.mobile_number, abortController.signal)
      .then(data => {
        if (data && data.length) setReservations(data)
        else setError({ message: `No reservations found for mobile_number=${formData.mobile_number}` });
      })
      .catch(err => setError(err));
  };

  const reservationsList = reservations.map(
    (reservation) => <tr key={`rsv-${reservation.reservation_id}`}><ReservationsListItem reservation={reservation} /></tr>
  );

  return (
    <main>
      <h1>Search</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <form onSubmit={handleFind}>
                <input
                  name="mobile_number"
                  onChange={handleChange}
                  value={formData.mobile_number}
                  type='tel'
                  placeholder="Enter a customer's phone number"
                  required />
                  <button type="submit">Submit</button>
              </form>
            </td>
          </tr>
          {reservationsList}
        </tbody>
      </table>
      <ErrorAlert error={error} />
    </main>
  );
}

export default Search;
