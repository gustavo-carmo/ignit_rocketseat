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
    async session(data) {
      try {
        const userActiveSubscription = await faunadb.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(data.session.user.email)
                    )
                  )
                )
              ),
              q.Match(q.Index("subscription_by_status"), "active"),
            ])
          )
        );

        return {
          ...data,
          activeSubscription: userActiveSubscription,
        };
      } catch {
        return {
          ...data,
          activeSubscription: null,
        };
      }
    },
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
