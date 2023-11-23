import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../prismaInstance/prismaInstance";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email.toLowerCase(), status: true },
          });
          console.log(user);

          if (user) {
            /* valida contraseñas */
            if (bcrypt.compareSync(credentials.password, user.password)) {
              const userReturned = {
                id: user.id.toString(),
                name: user.email,
                email: user.email,
              };

              return userReturned;
            }
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        const userLogin = await prisma.user.findUnique({
          where: {
            email: token.email ?? "",
          },
        });
        token.userId = userLogin?.id;
      }

      return token;
    },

    async session({ session, token, user }) {
      const userSession = session as any;

      userSession.userId = token.userId;

      return userSession;
    },
  },
};
