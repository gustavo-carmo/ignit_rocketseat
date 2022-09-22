import { query as q } from "faunadb";
import NextAuth from "next-auth";
import providers from "next-auth/providers";
import { faunaClient } from "../../../services/faunadb";

export default NextAuth({
  providers: [
    providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const { email } = user;
      try {
        await faunaClient.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
          )
        );

        return true;
      } catch (err) {
        console.error("ERRO AO CADASTRAR O USUÁRIO");
        return false;
      }
    },
  },
});
