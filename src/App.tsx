import React from 'react';
import './App.scss'
import MainLayout from './components/layout/MainLayout';
import WelcomeBanner from './components/WelcomeBanner';
import BookFlightForm from './components/form/BookFlightForm';
import TripsListing from './components/trips/TripsListing';


function App() {
  return (
    <MainLayout>
      <WelcomeBanner />
      <BookFlightForm />
      <TripsListing />
    </MainLayout>
  );
}

export default App;
