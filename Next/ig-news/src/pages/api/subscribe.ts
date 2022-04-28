/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const session = await getSession({ req: request });

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      // metadata
    });

    const stripeCheckoutSesseion = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        { price: process.env.STRIPE_API_PRODUCT_PRICE_ID, quantity: 1 },
      ],
      mode: "subscription",
      success_url: process.env.STRIPE_CHECKOUT_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CHECKOUT_CANCEL_URL,
    });

    return response.status(200).json({ sessionId: stripeCheckoutSesseion.id });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};
