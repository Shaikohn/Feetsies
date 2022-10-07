import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const AccountConfirmed = () => {
  const { confirmationCode } = useParams();

  console.log(confirmationCode);

  //   if (props.match?.route.path === "/confirm/:confirmationCode") {
  //     axios
  //       .get(
  //         `http://localhost:3001/user/auth/confirm/${props.match.params.confirmationCode}`
  //       )
  //       .then((response) => {
  //         return response.data;
  //       });
  //   }

  useEffect(() => {
    axios.get(`http://localhost:3001/user/auth/confirm/${confirmationCode}`);
  }, []);

  return (
    <>
      <h1>Account Confirmed</h1>
      <Link to="/signIn">Please Login</Link>
    </>
  );
};

export default AccountConfirmed;
