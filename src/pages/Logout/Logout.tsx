import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../lib/firebase/firebase";

const Logout = () => {
  useEffect(() => {
    signOut(auth)
  }, []);

  
  return (
    <div>Logout</div>
  );
};

export default Logout;