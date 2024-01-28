import { AirportDropdownOption } from "../components/form/LocationDropdown";

export const getAirportName = (airportId: number, airports: AirportDropdownOption[]): AirportDropdownOption | undefined => {
    return airports.find(({id}) => id === airportId);
};