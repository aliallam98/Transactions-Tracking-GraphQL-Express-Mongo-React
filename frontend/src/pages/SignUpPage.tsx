import Header from "@/components/Header";
import RegisterForm from "@/components/auth/register-form";

const SignUpPage = () => {
  return (
    <section>
      <Header title="Sign Up" />
      <div className="container flex flex-col justify-center items-center">
        <RegisterForm />
      </div>
    </section>
  );
};

export default SignUpPage;
