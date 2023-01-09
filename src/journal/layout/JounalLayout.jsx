import { Box } from "@mui/system";
import { Navbar, Sidebar } from "../components";

export const JournalLayout = ({ children }) => {
  const drawerWith = 240;

  return (
    <Box sx={{ display: "flex" }} mt={5}>
      <Navbar drawerWith={drawerWith} />

      <Sidebar drawerWith={drawerWith} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
