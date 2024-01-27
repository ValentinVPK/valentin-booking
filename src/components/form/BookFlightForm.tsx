import React, { useState } from "react";
import FormCardWrapper from "./FormCardWrapper";
import '../../styles/book-flight-form.scss';

interface FormData {
  firstName: string;
  lastName: string;
}

function BookFlightForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
  });

  const handleInputChange = () => {

  }

  return (
    <FormCardWrapper>
      <h2>Please enter passenger and flight information: </h2>
      <form className="book-flight-form">
        <div className="form-row">
          <div className="form-control">
            <label>
              First Name:
              <input
                type="text"
                name="first-name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="form-control">
            <label>
              Last Name:
              <input
                type="text"
                name="last-name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <div className="form-row">

          <div className="form-control">
            <label>
              Last Name:
              <input
                type="date"
                name="departure-date"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="form-control">
            <label>
              Return Date:
              <input
                type="date"
                name="return-date"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>

        </div>

        <button type="submit">Submit</button>
      </form>
    </FormCardWrapper>
  );
}

export default BookFlightForm;
