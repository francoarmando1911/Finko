/** @description Cliente de Better Auth para uso en componentes 'use client' */
import { createAuthClient } from "better-auth/react";

/* baseURL se resuelve automáticamente al origin actual — no hace falta configurarlo
   porque el handler vive en /api/auth dentro de la misma app. */
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;