import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { query as q } from "faunadb";
import { faunaClient } from "../../services/faunadb";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

const subscribe = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    if (request.method === "POST") {
      const session = await getSession({ req: request });

      const user = await faunaClient.query<User>(
        q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
      );

      let customer_id = user.data.stripe_customer_id;

      if (!customer_id) {
        const stripeCustomer = await stripe.customers.create({
          email: session.user.email,
          // metadata
        });

        await faunaClient.query(
          q.Update(q.Ref(q.Collection("users"), user.ref.id), {
            data: {
              stripe_customer_id: stripeCustomer.id,
            },
          })
        );

        customer_id = stripeCustomer.id;
      }

      const stripeCheckoutSesseion = await stripe.checkout.sessions.create({
        customer: customer_id,
        payment_method_types: ["card"],
        billing_address_collection: "required",
        line_items: [
          { price: process.env.STRIPE_API_PRODUCT_PRICE_ID, quantity: 1 },
        ],
        mode: "subscription",
        success_url: process.env.STRIPE_CHECKOUT_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CHECKOUT_CANCEL_URL,
      });

      return response
        .status(200)
        .json({ sessionId: stripeCheckoutSesseion.id });
    } else {
      response.setHeader("Allow", "POST");
      response.status(405).end("Method not allowed");
    }
  } catch (err) {
    console.error("Aconteceu um erro muito complicado");
    console.error(err);

    return response.status(500).json({ message: "sorry something happened" });
  }
};

export default subscribe;
