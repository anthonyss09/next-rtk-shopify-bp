"use client";
import FormRow from "../../components/FormRow";
import {
  useRegisterCustomerMutation,
  useCreateCustomerTokenMutation,
} from "../../../lib/features/authentication/authenticationSlice";
import { useRef } from "react";
import { createRedisCustomer } from "../../../services/redis";

export default function Register() {
  const [registerCustomer, { data, error, isLoading, isSuccess, isError }] =
    useRegisterCustomerMutation();
  const [createCustomerToken] = useCreateCustomerTokenMutation();

  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const newCustomer = await registerCustomer({
        firstName: refs.firstName.current,
        lastName: refs.lastName.current,
        email: refs.email.current,
        password: refs.password.current,
      });
      const customerId = newCustomer.data.customerCreate.customer.id;
      const newCustomerToken = await createCustomerToken({
        email: refs.email.current,
        password: refs.password.current,
      });
      const redisCustomer = await createRedisCustomer({
        customerId,
        cartId: "gid://shopify/Cart/null",
      });

      console.log("the redis customer is", redisCustomer);
      console.log("new customer is", newCustomer);
      console.log("the token is", newCustomerToken);
    } catch (error) {
      console.log("there was an error registering", error);
    }
  };

  const handleInputChange = (e) => {
    console.log(refs[e.target.id].current);
    refs[e.target.id].current = e.target.value;
  };
  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <h3>Register</h3>
      <FormRow label="First Name" id="firstName" onChange={handleInputChange} />
      <FormRow label="Last Name" id="lastName" onChange={handleInputChange} />
      <FormRow label="email" id="email" onChange={handleInputChange} />
      <FormRow label="password" id="password" onChange={handleInputChange} />
      <button>Register</button>
    </form>
  );
}
