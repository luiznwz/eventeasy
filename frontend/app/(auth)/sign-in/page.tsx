"use client";
import { SignInForm } from "@/components/layout/AuthForm";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useAutoLogin } from "@/hooks/auth/useAutoLogin";

export default function SignIn() {

    useAutoLogin();

    return (
      <AuthLayout
        title="Bem-vindo de volta"
        subtitle="Entre com suas credenciais"
        footerText="Não possui uma conta?"
        footerLinkText="Crie uma"
        footerLinkHref="/sign-up"
      >
        <SignInForm />
      </AuthLayout>
    );
}
