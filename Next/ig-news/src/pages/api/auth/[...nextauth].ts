import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { faunadb } from "../../../services/faunadb";
import { query as q } from "faunadb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "read:user" },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await faunadb.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), {
              data: { email },
            }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
          )
        );

        return true;
      } catch (err) {
        console.error("FaunaDB Error -> ", err);

        return false;
      }
    },
  },
  secret: process.env.SIGNIN_KEY,
};

export default NextAuth(authOptions);
