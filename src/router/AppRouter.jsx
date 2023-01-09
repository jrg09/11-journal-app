import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/auth/JournalRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      {/* login y registro */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* journal */}
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};
