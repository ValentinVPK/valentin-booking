import { FormData, FormInputErrors } from "../components/form/BookFlightForm";
import { validateEmptyTextInputFields, validateDateInputFields, validateAirportDropdownFields } from "./validationFunctions";

function validateFormData(formData: FormData, defaultFormInputError: FormInputErrors) : FormInputErrors {
    const errors: FormInputErrors = {...defaultFormInputError};

    errors.firstNameError = validateEmptyTextInputFields(formData.firstName);
    errors.lastNameError = validateEmptyTextInputFields(formData.lastName);
    errors.departureDateError = validateEmptyTextInputFields(formData.departureDate); 
    errors.returnDateError = validateEmptyTextInputFields(formData.returnDate);
    errors.departureAfterArrivalError = validateDateInputFields(formData.departureDate, formData.returnDate);
    errors.departureAirportIdError = validateAirportDropdownFields(formData.departureAirportId);
    errors.arrivalAirportIdError = validateAirportDropdownFields(formData.arrivalAirportId);

    return errors;
} 

export { validateFormData }

async function postFormData(formData: FormData) : Promise<void> {

    await fetch('https://interview.fio.de/core-frontend/api/bookings/create?authToken=r1pRdmNkyhqz6TvG2krEBeyX1ilv8P', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(formData)
    });
}

export { postFormData };