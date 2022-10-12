import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const AccountConfirmed = () => {
  const { confirmationCode } = useParams();
  const navigate = useNavigate();

  console.log(confirmationCode);

  useEffect(() => {
    axios
      .get(`/user/auth/confirm/${confirmationCode}`)
      .catch((error) => {
        alert(error);
        navigate("/");
      });
  }, []);

  return (
    <>
      <h1>Account Confirmed</h1>
      <Link to="/signIn">Please Login</Link>
    </>
  );
};

export default AccountConfirmed;
