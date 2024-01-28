import React from "react";
import '../../styles/delete-button.scss';

interface Props {
  children: React.ReactNode;
  bookingId: number;
  onBookingRemoval: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function DeleteButton({ children, bookingId, onBookingRemoval }: Props) {
  return <button value={bookingId} onClick={onBookingRemoval} type="submit" className="delete-btn">{children}</button>;
}

export default DeleteButton;