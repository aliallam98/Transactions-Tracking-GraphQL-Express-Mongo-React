import Header from "@/components/Header";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <section>
      <Header title="Login" />
      <div className="container flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
