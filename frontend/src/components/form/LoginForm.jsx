import AppTitle from "../../util/AppTitle";
import Form from "./Form";

const LoginForm = () => {
  return (
    <>
      <div className="login-form-app-title" style={{display: "flex", position: "absolute", fontStyle: "italic", fontSize: "40px", fontFamily: "Candara, serif", color: "black", top: "5%", left: "5%"}}>SavoryServe</div>
        {/* <AppTitle /> */}
        <Form />
    </>
  );
};
export default LoginForm;
