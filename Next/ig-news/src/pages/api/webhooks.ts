import { NextApiRequest, NextApiResponse } from "next";

const webhooks = async (request: NextApiRequest, response: NextApiResponse) => {
  console.log("Webhooks acessiveis");

  return response.status(204).end();
};

export default webhooks;
