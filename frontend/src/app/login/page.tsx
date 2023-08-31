import LoginForm from "./components/LoginForm/LoginForm";
import FormContainer from "../UI/FormContainer/FormContainer";
import FormTitle from "../UI/FormTitle/FormTitle";
export default function Login() {
  return (
    <FormContainer>
      <FormTitle bolderDesc="Welcome Back" desc="Log In !" />
      <LoginForm />
    </FormContainer>
  );
}
