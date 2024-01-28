import { AirportDropdownOption } from "../components/form/LocationDropdown";

async function fetchAirports(): Promise<AirportDropdownOption[]> {
    const response = await fetch('https://interview.fio.de/core-frontend/api/airports');
    const data = await response.json();

    return data;
}

export default fetchAirports;