import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2"

const AccountConfirmed = () => {
  const { confirmationCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/user/auth/confirm/${confirmationCode}`)
      .catch((error) => {
        Swal.fire({
          title: "AUTENTICATION FAILED",
          text: error,
          icon: "error",
          timer: 2000,
        });
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
