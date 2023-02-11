import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth"

export default function Home() {
  const { Auth } = useAuth();
  return (
    Auth.user.role=="client"?<Navigate to="userpage" />:<Navigate to="hostpage" />
  )
}
