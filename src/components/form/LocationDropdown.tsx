import React, { ChangeEvent } from "react";
import "../../styles/shared/dropdown.scss";

export interface AirportDropdownOption {
  title: string;
  id: number;
}

interface Props {
  airportId?: number;
  disabled?: boolean;
  className?: string;
  options: AirportDropdownOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function LocationDropdown({
  airportId,
  disabled,
  className,
  options,
  onChange,
}: Props) {
  const dowpdownBox = (
    <select defaultValue="0" className={className} disabled={disabled} onChange={onChange}>
      <option value="0" disabled>Select your option...</option>
      {options.map(({ id, title }) => (
        <option key={id} value={id}>
          {title}
        </option>
      ))}
    </select>
  );

  return <div className="dropdown-menu">{dowpdownBox}</div>
}

export { LocationDropdown };
