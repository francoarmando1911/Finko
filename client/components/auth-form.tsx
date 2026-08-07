"use client";

/**
 * @description Formulario de autenticación compartido para login y registro de Finko.
 * Maneja validación client-side, envío a Better Auth y estados de carga/error.
 */
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinkoLogo } from "@/components/finko-logo";
import { ThemeToggle } from "@/components/theme-toggle";

type AuthMode = "login" | "register";

/** @description Errores de validación por campo */
type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
};

const STRENGTH_LABELS = ["Débil", "Regular", "Buena", "Fuerte"];
const STRENGTH_COLORS = ["bg-destructive", "bg-orange-500", "bg-accent", "bg-primary"];

/** @description Calcula la fortaleza de una contraseña en una escala de 0 a 4 */
function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

/** @description Valida formato de email */
function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Ingresá tu email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Ingresá un email válido.";
  return undefined;
}

/** @description Formulario de login/registro. El modo determina campos y copy visibles */
export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const strength = getPasswordStrength(password);
  const strengthIdx = Math.max(0, strength - 1);

  /** @description Valida todos los campos relevantes según el modo actual */
  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!isLogin && !name.trim()) next.name = "Ingresá tu nombre.";

    const emailError = validateEmail(email);
    if (emailError) next.email = emailError;

    if (!password) next.password = "Ingresá tu contraseña.";
    else if (!isLogin && password.length < 8) next.password = "Mínimo 8 caracteres.";

    if (!isLogin) {
      if (!confirm) next.confirm = "Confirmá tu contraseña.";
      else if (confirm !== password) next.confirm = "Las contraseñas no coinciden.";
    }

    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    setFormError("");
    if (Object.keys(validation).length > 0) return;

    setLoading(true);

    if (isLogin) {
      const { error } = await authClient.signIn.email({ email, password });
      setLoading(false);
      if (error) {
        setFormError("Credenciales inválidas. Verificá tu email y contraseña.");
        return;
      }
    } else {
      const { error } = await authClient.signUp.email({ email, password, name });
      setLoading(false);
      if (error) {
        setFormError(error.message ?? "No pudimos crear tu cuenta. Intentá de nuevo.");
        return;
      }
    }

    router.push("/dashboard");
    router.refresh();
  }

  /** @description Dispara el flujo de OAuth con Google via Better Auth */
  async function handleGoogleSignIn() {
    await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
  }

  return (
    <div className="flex min-h-svh w-full flex-col items-center bg-background text-foreground">
      <div className="flex w-full max-w-2xl justify-end p-5">
        <ThemeToggle />
      </div>

      <div className="flex w-full flex-1 items-center justify-center p-6">
        <div className="flex w-full max-w-sm flex-col gap-7">
          <div className="flex justify-center">
            <FinkoLogo />
          </div>

          <div className="flex flex-col gap-6 rounded-[20px] border border-border bg-card p-7 shadow-lg">
            <div className="flex flex-col gap-1.5 text-center">
              <h1 className="font-heading text-2xl">
                {isLogin ? "Bienvenido de nuevo" : "Creá tu cuenta"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Ingresá a tu cuenta de Finko" : "Empezá a manejar tus finanzas hoy"}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {!isLogin && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@email.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  {isLogin && (
                    <Link
                      href="/olvide-password"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-11"
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="Mostrar u ocultar contraseña"
                    className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/10"
                  >
                    {showPassword ? (
                      <EyeOff className="h-[18px] w-[18px]" />
                    ) : (
                      <Eye className="h-[18px] w-[18px]" />
                    )}
                  </button>
                </div>
                {errors.password && <span className="text-xs text-destructive">{errors.password}</span>}

                {!isLogin && password.length > 0 && (
                  <div className="mt-0.5 flex flex-col gap-1.5">
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            strength >= i + 1 ? STRENGTH_COLORS[strengthIdx] : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[11.5px] text-muted-foreground">
                      {STRENGTH_LABELS[strengthIdx] ?? "Débil"}
                    </span>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirm">Confirmar contraseña</Label>
                  <Input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    aria-invalid={!!errors.confirm}
                  />
                  {errors.confirm && <span className="text-xs text-destructive">{errors.confirm}</span>}
                </div>
              )}

              {formError && (
                <div className="rounded-lg border border-destructive/25 bg-destructive/10 px-3.5 py-3">
                  <span className="text-sm leading-relaxed text-destructive">{formError}</span>
                </div>
              )}

              <Button type="submit" disabled={loading} className="h-[46px] gap-2">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading
                  ? isLogin
                    ? "Ingresando…"
                    : "Creando cuenta…"
                  : isLogin
                    ? "Iniciar sesión"
                    : "Crear cuenta"}
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="whitespace-nowrap text-xs text-muted-foreground">o continuá con</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-[46px] gap-2.5"
                onClick={handleGoogleSignIn}
              >
                <GoogleIcon />
                Continuar con Google
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              {isLogin ? "¿No tenés cuenta? " : "¿Ya tenés cuenta? "}
              <Link
                href={isLogin ? "/registro" : "/login"}
                className="font-semibold text-primary hover:underline"
              >
                {isLogin ? "Registrate" : "Iniciá sesión"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** @description Ícono multicolor de Google para el botón de OAuth */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}