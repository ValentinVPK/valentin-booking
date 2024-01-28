
const EMPTY_NAME_ERROR_MESSAGE = 'This field cannot be empty!';
const INCORRECT_DATES_MESSAGE = 'Departure date cannot be after return date!';
const AIRPORT_NOT_CHOSEN_MESSAGE = 'Please select airport!';

function validateEmptyTextInputFields(text: string) : string | null {
    if(text === '') {
        return EMPTY_NAME_ERROR_MESSAGE;
    }

    return null;
} 

export { validateEmptyTextInputFields }

function validateDateInputFields(departureDate: string, returnDate: string) : string | null {

    if(departureDate && returnDate) {
        if(Date.parse(departureDate) > Date.parse(returnDate)) {
            return INCORRECT_DATES_MESSAGE;
        }
    }

    return null;
}

export { validateDateInputFields }

function validateAirportDropdownFields(airportId: number) : string | null {
    if(airportId === 0 ) {
        return AIRPORT_NOT_CHOSEN_MESSAGE;
    }

    return null;
}

export { validateAirportDropdownFields }