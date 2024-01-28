import React, { useEffect, useState } from "react";
import "./App.scss";
import MainLayout from "./components/layout/MainLayout";
import WelcomeBanner from "./components/ui/WelcomeBanner";
import BookFlightForm from "./components/form/BookFlightForm";
import fetchAirports from "./utils/fetchAirports";
import { AirportDropdownOption } from "./components/form/LocationDropdown";
import BookingsListing from "./components/trips/BookingsListing";
import ScrollContextProvider from "./components/context/ScrollContext";

function App() {
  const [airports, setAirports] = useState<AirportDropdownOption[]>([]);
  const [airportsApiError, setAirportsApiError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAirports();
        setAirports(data);
      } catch (error: any) {
        setAirportsApiError(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollContextProvider>
      <MainLayout>
        <WelcomeBanner />
        <BookFlightForm airports={airports} />
        <BookingsListing airports={airports} />
      </MainLayout>
    </ScrollContextProvider>
  );
}

export default App;
