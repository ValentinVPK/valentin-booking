import React from "react";
import '../../styles/submit-button.scss';

interface Props {
  children: React.ReactNode;
}

function SubmitButton({ children }: Props) {
  return <button type="submit" className="submit-btn">{children}</button>;
}

export default SubmitButton;
