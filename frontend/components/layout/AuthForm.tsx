"use client";
import { Button } from "@/components/ui/button";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

export function InputField({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div
      className="space-y-1 mb-4"
    >
      <label htmlFor={id} className="auth-label">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword && showPassword ? "text" : type}
          className="auth-input pr-10"
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export function SubmitButton({
  children,
  isLoading,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <Button
      type="submit"
      className={`auth-button w-full cursor-pointer bg-blue-500 text-white hover:bg-blue-700/90 h-11 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

export function SocialButton({
  children,
  onClick,
  isLoading,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={`auth-button pointer cursor-pointer w-full h-11 border-blue-500/60 hover:blue-600/80 ${className}`}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

export function SignInForm() {
  const { login, isLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       login(email, password);
    } catch (error) {
        console.log("Erro ao enviar formulário:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="name@example.com"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        label="Senha"
        type="password"
        placeholder="••••••••"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex items-center justify-end">
        <a
          href="#"
          className="text-sm font-medium text-blue-500 hover:text-blue-500/80 transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <SubmitButton isLoading={isLoading}>Sign in</SubmitButton>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <SocialButton>Google</SocialButton>
      </div>
    </form>
  );
}

export function SignUpForm() {
  const { register, isLoading } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      register(name, email, password);
    } catch (error) {
        console.log("Erro ao enviar formulário:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        id="name"
        label="Name"
        placeholder="John Doe"
        required
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="name@example.com"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        label="Senha"
        type="password"
        placeholder="••••••••"
        required
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex items-center space-x-2 py-2">
        <input
          type="checkbox"
          id="terms"
          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-500 focus:ring-primary"
        />
        <label
          htmlFor="terms"
          className="text-xs font-medium text-muted-foreground"
        >
          I agree to the{" "}
          <a
            href="#"
            className="text-blue-500 hover:text-blue-500/80 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-500 hover:text-blue-500/80 transition-colors"
          >
            Privacy Policy
          </a>
        </label>
      </div>

      <SubmitButton className="cursor-pointer" isLoading={isLoading}>
        Criar conta
      </SubmitButton>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <SocialButton className="cursor-pointer">Google</SocialButton>
      </div>
    </form>
  );
}
