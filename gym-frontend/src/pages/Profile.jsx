import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    const res = await API.get("/profile");

    setProfile(res.data.profile);

  };

  const handleProfile = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  };

  const handlePassword = (e) => {

    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });

  };

  const saveProfile = async () => {

    await API.put("/profile", profile);

    alert("Profile Updated");

  };

  const changePassword = async () => {

    await API.put("/profile/password", password);

    alert("Password Changed");

    setPassword({
      currentPassword: "",
      newPassword: "",
    });

  };

  return (

<div className="container mt-4">

<h2>👤 Admin Profile</h2>

<div className="card shadow mt-3">

<div className="card-body">

<input
className="form-control mb-3"
placeholder="Name"
name="name"
value={profile.name}
onChange={handleProfile}
/>

<input
className="form-control mb-3"
placeholder="Email"
name="email"
value={profile.email}
onChange={handleProfile}
/>

<input
className="form-control mb-3"
placeholder="Phone"
name="phone"
value={profile.phone}
onChange={handleProfile}
/>

<button
className="btn btn-primary"
onClick={saveProfile}
>
Save Profile
</button>

</div>

</div>

<div className="card shadow mt-4">

<div className="card-body">

<h4>🔒 Change Password</h4>

<input
type="password"
className="form-control mb-3"
placeholder="Current Password"
name="currentPassword"
value={password.currentPassword}
onChange={handlePassword}
/>

<input
type="password"
className="form-control mb-3"
placeholder="New Password"
name="newPassword"
value={password.newPassword}
onChange={handlePassword}
/>

<button
className="btn btn-danger"
onClick={changePassword}
>
Change Password
</button>

</div>

</div>

</div>

  );
}

export default Profile;