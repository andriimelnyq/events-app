import { ReactNode, useContext } from "react";
import { MainHeader } from "../MainHeader";
import { Alert, createTheme, Snackbar, ThemeProvider } from "@mui/material";
import { NotificationContext } from "@/store/NotificationContext";
import { PendingContext } from "@/store/PendingContext";
import { Loader } from "../Loader";

type Props = {
  children: ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const { notification, setNotification } = useContext(NotificationContext);
  const { pending } = useContext(PendingContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#34eb9b",
      },
      secondary: {
        main: "#ebcd34",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MainHeader />

      <main>{children}</main>

      <Snackbar
        open={notification !== null}
        autoHideDuration={5000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={notification?.severity}>{notification?.text}</Alert>
      </Snackbar>

      {pending && <Loader />}
    </ThemeProvider>
  );
};
