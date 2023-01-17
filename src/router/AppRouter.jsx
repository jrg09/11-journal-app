import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { JournalRoutes } from "../journal/auth/JournalRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";

export const AppRouter = () => {
  const status = useCheckAuth();

  console.log(status);

  if (status === "checking") return <CheckingAuth />;

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
      {/* login y registro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}

      {/* journal */}
      {/* <Route path="/*" element={<JournalRoutes />} /> */}
    </Routes>
  );
};
