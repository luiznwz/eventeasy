import { SignUpForm } from "@/components/layout/AuthForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

export default function SignUp() {
  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Para organizar seus eventos"
      footerText="Ja possui uma conta?"
      footerLinkText="Entre agora"
      footerLinkHref="/sign-in"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
