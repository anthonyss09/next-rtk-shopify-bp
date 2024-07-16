"use client";
import FormRow from "../../components/FormRow";
import { useCreateCustomerTokenMutation } from "../../../lib/features/authentication/authenticationSlice";
import { useRef } from "react";

export default function Login() {
  const [createCustomerToken] = useCreateCustomerTokenMutation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      emailRef.current = value;
    } else if (id === password) {
      passwordRef.current = value;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCustomerToken({
        email: emailRef.current,
        password: passwordRef.current,
      });
      const customerAccessTokenData = response.data.customerAccessTokenCreate;
      console.log("the new token is", customerAccessTokenData);
      if (customerAccessTokenData.customerAccessToken === null) {
        alert(customerAccessTokenData.customerUserErrors[0].message);
      }
    } catch (error) {
      console.log("the biggest error youve ever seen jsut occured", error);
    }
  };
  return (
    <form className="form" onSubmit={handleFormSubmit} role="form">
      <h3>Login</h3>
      <FormRow label="email" id="email" onChange={handleChange} />
      <FormRow label="password" id="password" onChange={handleChange} />
      <button>login</button>
    </form>
  );
}
