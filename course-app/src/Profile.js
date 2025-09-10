import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div>
        <h2>Guest Profile 👤</h2>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>My Profile 👤</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.username}@example.com</p>
      <p>Role: Authorized User</p>
    </div>
  );
}

export default Profile;
