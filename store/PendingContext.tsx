import React, { useMemo, useState } from "react";

interface PendingContextType {
  pending: boolean;
  setPending: (pending: boolean) => void;
}

export const PendingContext = React.createContext<PendingContextType>({
  pending: false,
  setPending: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PendingProvider = ({ children }: Props) => {
  const [pending, setPending] = useState(false);

  const PendingContextValues = useMemo(
    () => ({
      pending,
      setPending,
    }),
    [pending],
  );

  return (
    <PendingContext.Provider value={PendingContextValues}>
      {children}
    </PendingContext.Provider>
  );
};
