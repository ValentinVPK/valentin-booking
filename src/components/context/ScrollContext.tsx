import React, { useRef, ReactNode } from "react";

interface ScrollContextProps {
  formSectionRef: React.MutableRefObject<HTMLSelectElement | null>;
  bookingListingSectionRef: React.MutableRefObject<HTMLSelectElement | null>;
}

export const ScrollContext = React.createContext<ScrollContextProps>({
  formSectionRef: { current: null },
  bookingListingSectionRef: { current: null },
});

interface Props {
  children: React.ReactNode;
}

function ScrollContextProvider({ children }: Props) {
  const formSectionRef = useRef<HTMLSelectElement>(null);
  const bookingListingSectionRef = useRef<HTMLSelectElement>(null);

  return (
    <ScrollContext.Provider value={{ formSectionRef, bookingListingSectionRef }}>
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollContextProvider;
