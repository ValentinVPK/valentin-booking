import React, { useContext, useEffect, useState } from "react";
import { AirportDropdownOption } from "../form/LocationDropdown";
import fetchBookings from "../../utils/fetchBookings";
import "../../styles/bookings-listing.scss";
import { getAirportName } from "../../utils/getAirportName";
import DeleteButton from "../ui/DeleteButton";
import { ScrollContext } from "../context/ScrollContext";

const DEFAULT_PAGE_SIZE = 5;

export interface BookingData {
  id: number;
  firstName: string;
  lastName: string;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: string;
  returnDate: string;
}

export interface PageableBookingList {
  list: BookingData[];
  totalCount: number;
}

const defaultPageableBookingList: PageableBookingList = {
  list: [],
  totalCount: 0,
};

interface Props {
  airports: AirportDropdownOption[];
}

function BookingsListing({ airports }: Props) {
  const [bookingsList, setBookingsData] = useState<PageableBookingList>(
    defaultPageableBookingList
  );
  const [page, setPage] = useState<number>(0);
  const [bookingsApiError, setBookingsApiError] = useState<string | null>(null);
  const [bookingRemovalError, setBookingRemovalError] = useState<string | null>(
    null
  );
  const scrollContext = useContext(ScrollContext);

  useEffect(() => {
    async function fetchBookingData() {
      try {
        const data = await fetchBookings(page, DEFAULT_PAGE_SIZE);
        //setBookingsData(data);
        setBookingsData({...bookingsList, list: [...bookingsList.list, ...data.list ]});
      } catch (error: any) {
        setBookingsApiError(error.message);
      }
    }

    fetchBookingData();
  }, [page, bookingsList.totalCount]);


  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollHandler = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  const removeBookingHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const bookingId = event.currentTarget.getAttribute("value");

    try {
      const response = await fetch(
        `https://interview.fio.de/core-frontend/api/bookings/delete/${bookingId}?authToken=r1pRdmNkyhqz6TvG2krEBeyX1ilv8P`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setBookingsData({
          ...bookingsList,
          list: bookingsList.list.filter((b) => b.id !== +bookingId!),
        });
      } else {
        setBookingRemovalError(response.statusText);
      }
    } catch (error: any) {
      setBookingRemovalError(error.message);
    }
  };

  

  return (
    <section ref={scrollContext.bookingListingSectionRef} className="bookings-listing">
      <h2>Bookings List</h2>
      {bookingsList.list.map(
        ({
          id,
          firstName,
          lastName,
          departureAirportId,
          arrivalAirportId,
          departureDate,
          returnDate,
        }) => (
          <div key={id} className={`booking-card ${id}`}>
            <span className="booked-by-name">
              Booked by: {firstName + " " + lastName}
            </span>
            <div className="booking-info">
              <div className="info-section">
                <span className="small-title">From</span>
                <span className="info-span">
                  {getAirportName(departureAirportId, airports)?.title}
                </span>
              </div>
              <div className="separator"></div>
              <div className="info-section">
                <span className="small-title">To</span>
                <span className="info-span">
                  {getAirportName(arrivalAirportId, airports)?.title}
                </span>
              </div>
              <div className="separator"></div>
              <div className="info-section">
                <span className="small-title">Departure</span>
                <span className="info-span">{departureDate.split("T")[0]}</span>
              </div>
              <div className="separator"></div>
              <div className="info-section">
                <span className="small-title">Return</span>
                <span className="info-span">{returnDate.split("T")[0]}</span>
              </div>
              <DeleteButton
                bookingId={id}
                onBookingRemoval={removeBookingHandler}
              >
                <i className="fa-solid fa-trash"></i>
              </DeleteButton>
            </div>
          </div>
        )
      )}
    </section>
  );
}

export default BookingsListing;
