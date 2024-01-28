import React, { ChangeEvent, useEffect, useState } from "react";
import FormCardWrapper from "./FormCardWrapper";
import { LocationDropdown, AirportDropdownOption } from "./LocationDropdown";
import fetchAirports from "../../utils/fetchAirports";
import "../../styles/book-flight-form.scss";

interface FormData {
  firstName: string;
  lastName: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: string;
  returnDate: string;
}

function BookFlightForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    departureAirportId: 0,
    arrivalAirportId: 0,
    departureDate: '',
    returnDate: ''
  });
  const [fetchAirportsError, setFetchAirportsError] = useState<string | null>(
    null
  );
  const [airports, setAirports] = useState<AirportDropdownOption[]>([]);
  const [departureAirportId, setDepartureAirportId] = useState<number>(0);
  const [arrivalAirportId, setArrivalAirportId] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAirports();
        setAirports(data);
      } catch (error: any) {
        setFetchAirportsError(error.message);
      }
    }

    fetchData();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({ ...formData, [name]: value});
  }

  const onDepartureAiportDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setDepartureAirportId(+event.target.value);
  };

  const onArrivalAiportDropdownChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setArrivalAirportId(+event.target.value);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <FormCardWrapper>
      <h2>Please enter passenger and flight information: </h2>
      <form className="book-flight-form">
        <div className="form-row">
          <div className="form-control">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-control">
            <label htmlFor="departureDate">Departure Date:</label>
            <input
              type="date"
              name="departureDate"
              min={today}
              value={formData.lastName}
              onChange={onInputChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="returnDate">Return Date:</label>
            <input
              type="date"
              name="returnDate"
              value={formData.lastName}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-control">
          <label>Choose departure airport</label>
            <LocationDropdown
              options={airports}
              airportId={departureAirportId}
              onChange={onDepartureAiportDropdownChange}
            />
          </div>

          <div className="form-control">
            <label>Choose arrival airport</label>
            <LocationDropdown
              options={airports}
              airportId={arrivalAirportId}
              onChange={onArrivalAiportDropdownChange}
            />
          </div>
        </div>

        {/* <button type="submit">Submit</button> */}
      </form>
    </FormCardWrapper>
  );
}

export default BookFlightForm;
