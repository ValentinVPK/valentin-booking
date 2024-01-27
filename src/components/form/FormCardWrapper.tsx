import React from "react";
import '../../styles/shared/form-card-wrapper.scss';

interface Props {
    children: React.ReactNode;
  }

function FormCardWrapper({ children }: Props) {
  return (
    <div className="form-wrapper">
      {children}
    </div>
  );
}

export default FormCardWrapper;