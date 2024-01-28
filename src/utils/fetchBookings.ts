import { PageableBookingList } from "../components/trips/BookingsListing";

async function fetchBookings(pageIndex: number, defaultPageSize: number): Promise<PageableBookingList> {
    const response = await fetch(`https://interview.fio.de/core-frontend/api/bookings?pageIndex=${pageIndex}&pageSize=${defaultPageSize}&authToken=r1pRdmNkyhqz6TvG2krEBeyX1ilv8P`);
    const data = await response.json();

    return data;
}

export default fetchBookings;