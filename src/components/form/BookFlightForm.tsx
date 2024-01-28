import React, { useContext, useEffect, useState } from "react";
import FormCardWrapper from "./FormCardWrapper";
import { LocationDropdown, AirportDropdownOption } from "./LocationDropdown";
import fetchAirports from "../../utils/fetchAirports";
import {
  postFormData,
  validateFormData,
} from "../../utils/submitFormFunctions";
import "../../styles/book-flight-form.scss";
import SubmitButton from "../ui/SubmitButton";
import { ScrollContext } from "../context/ScrollContext";

export interface FormInputErrors {
  firstNameError: string | null;
  lastNameError: string | null;
  departureAirportIdError: string | null;
  arrivalAirportIdError: string | null;
  departureDateError: string | null;
  returnDateError: string | null;
  departureAfterArrivalError: string | null;
}

const defaultFormInputErrors: FormInputErrors = {
  firstNameError: null,
  lastNameError: null,
  departureAirportIdError: null,
  arrivalAirportIdError: null,
  departureDateError: null,
  returnDateError: null,
  departureAfterArrivalError: null,
};

export interface FormData {
  firstName: string;
  lastName: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: string;
  returnDate: string;
}

const defaultFormData: FormData = {
  firstName: "",
  lastName: "",
  departureAirportId: 0,
  arrivalAirportId: 0,
  departureDate: "",
  returnDate: "",
};

interface Props {
  airports: AirportDropdownOption[];
}

function BookFlightForm({ airports }: Props) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [apiError, setApiError] = useState<string | null>(null);

  const [validationErrors, setValidationErrors] = useState<FormInputErrors>(
    defaultFormInputErrors
  );
  const [successfulBooking, setSuccessfulBooking] = useState<boolean>(false);
  const scrollContext = useContext(ScrollContext);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValidationErrors({
      ...validationErrors,
      [name + "Error"]: null,
      departureAfterArrivalError: null,
    });
    setFormData({ ...formData, [name]: value });
  };

  const onDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValidationErrors({ ...validationErrors, [name + "IdError"]: null });
    setFormData({ ...formData, [name + "Id"]: +value });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessfulBooking(false);
    const currentErrors = validateFormData(formData, defaultFormInputErrors);

    if (!Object.values(currentErrors).every((value) => value === null)) {
      setValidationErrors({ ...currentErrors });
      return;
    }

    try {
      await postFormData(formData);
    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setFormData(defaultFormData);
      setSuccessfulBooking(true);
    }
  };

  return (
    <section ref={scrollContext.formSectionRef}>
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
              {validationErrors.firstNameError && (
                <span className="error-message">
                  {validationErrors.firstNameError}
                </span>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={onInputChange}
              />
              {validationErrors.lastNameError && (
                <span className="error-message">
                  {validationErrors.lastNameError}
                </span>
              )}
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
              {validationErrors.departureDateError && (
                <span className="error-message">
                  {validationErrors.departureDateError}
                </span>
              )}
              {validationErrors.departureAfterArrivalError && (
                <span className="error-message">
                  {validationErrors.departureAfterArrivalError}
                </span>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="returnDate">Return Date:</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={onInputChange}
              />
              {validationErrors.returnDateError && (
                <span className="error-message">
                  {validationErrors.returnDateError}
                </span>
              )}
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
              {validationErrors.departureAirportIdError && (
                <span className="error-message">
                  {validationErrors.departureAirportIdError}
                </span>
              )}
            </div>

            <div className="form-control">
              <label>Choose arrival airport</label>
              <LocationDropdown
                options={airports}
                airportId={formData.arrivalAirportId}
                name={"arrivalAirport"}
                onChange={onDropdownChange}
              />
              {validationErrors.arrivalAirportIdError && (
                <span className="error-message">
                  {validationErrors.arrivalAirportIdError}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <SubmitButton>
              Book Ticket
              <i className="fa-solid fa-arrow-right"></i>
            </SubmitButton>
          </div>
        </form>
        {successfulBooking && (
          <span className="success-message">
            Your booking has been successful! You can book another trip.
          </span>
        )}
        {apiError && <span>Something went wrong! Please try again.</span>}
      </FormCardWrapper>
    </section>
  );
}

export default BookFlightForm;
