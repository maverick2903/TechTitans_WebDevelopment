import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function Home() {
  const { auth } = useAuth();
  console.log("home has been hit");

  return auth.role == "client" ? (
    <Navigate to="clientpage" />
  ) : auth.role=="worker"?(
    <Navigate to="workerpage" />
  ):<Navigate to="/login" />
}
