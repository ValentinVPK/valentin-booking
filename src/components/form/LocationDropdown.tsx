import React, { ChangeEvent } from "react";
import "../../styles/shared/dropdown.scss";

export interface AirportDropdownOption {
  title: string;
  id: number;
}

interface Props {
  airportId?: number;
  disabled?: boolean;
  name?: string;
  options: AirportDropdownOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function LocationDropdown({
  airportId,
  disabled,
  name,
  options,
  onChange,
}: Props) {
  const dowpdownBox = (
    <select value={airportId} name={name} disabled={disabled} onChange={onChange}>
      {airportId === 0 && <option value="0">Select your option...</option>}
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
