import React, { ChangeEvent, useEffect, useState } from "react";
import FormCardWrapper from "./FormCardWrapper";
import { LocationDropdown, AirportDropdownOption } from "./LocationDropdown";
import fetchAirports from "../../utils/fetchAirports";
import { postFormData } from "../../utils/submitFormFunctions";
import "../../styles/book-flight-form.scss";
import SubmitButton from "../ui/SubmitButton";

const defaultFormData: FormData = {
  firstName: "",
  lastName: "",
  departureAirportId: 0,
  arrivalAirportId: 0,
  departureDate: "",
  returnDate: "",
}

export interface FormData {
  firstName: string;
  lastName: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: string;
  returnDate: string;
}

function BookFlightForm() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [error, setsError] = useState<string | null>(
    null
  );
  const [airports, setAirports] = useState<AirportDropdownOption[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAirports();
        setAirports(data);
      } catch (error: any) {
        setsError(error.message);
      }
    }

    fetchData();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const onDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   //const formattedDate = changeDateFormat(value);
  //   setFormData({ ...formData, [name]: value });
  // }

  const onDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name + "Id"]: +value });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
    try {
      await postFormData(formData);
    } catch (error: any) {
      setsError(error.message);
    } finally {
      setFormData(defaultFormData)
    }
  
  }

  return (
    <FormCardWrapper>
      <h2>Please enter passenger and flight information: </h2>
      <form onSubmit={handleSubmit} className="book-flight-form">
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
              value={formData.departureDate}
              onChange={onInputChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="returnDate">Return Date:</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-control">
            <label>Choose departure airport</label>
            <LocationDropdown
              options={airports}
              airportId={formData.departureAirportId}
              name={"departureAirport"}
              onChange={onDropdownChange}
            />
          </div>

          <div className="form-control">
            <label>Choose arrival airport</label>
            <LocationDropdown
              options={airports}
              airportId={formData.arrivalAirportId}
              name={"arrivalAirport"}
              onChange={onDropdownChange}
            />
          </div>
        </div>

        <div className="form-row">
          <SubmitButton>
            Book Ticket
            <i className="fa-solid fa-arrow-right"></i>
          </SubmitButton>
        </div>
      </form>
    </FormCardWrapper>
  );
}

export default BookFlightForm;
