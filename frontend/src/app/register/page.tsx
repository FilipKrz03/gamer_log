import FormContainer from "../UI/FormContainer/FormContainer";
import FormTitle from "../UI/FormTitle/FormTitle";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
  return (
    <FormContainer>
      <FormTitle bolderDesc="Welcome" desc="Register !" />
      <RegisterForm />
    </FormContainer>
  );
}
