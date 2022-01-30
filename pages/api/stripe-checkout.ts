// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import fs from 'fs';
import matter from 'gray-matter';
import { Item } from '../../context/cart';

console.log(process.env.TEST_DOMAIN_URL);

const stripe = new Stripe(process.env.TEST_STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27'
});

type Data = {
  message?: string;
  url?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const items: Item[] = req.body.items;

      console.log(items);

      const session = await stripe.checkout.sessions.create({
        line_items: items.map((item) => {
          const directory = `${process.cwd()}/content/`;
          const filePath = `${directory}/${item.id}.md`;
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(fileContent);

          return {
            price_data: {
              currency: 'cad',
              product_data: {
                name: item.id
              },
              unit_amount: data.price
            },
            quantity: item.qty
          };
        }),
        mode: 'payment',
        success_url: `${process.env.TEST_DOMAIN_URL}/cart?sucess=true`,
        cancel_url: `${process.env.TEST_DOMAIN_URL}/cart?canceled=true`
      });

      if (session && session.url) {
        res.status(200).json({ url: session.url });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Oops! Something went wrong.' });
    }
  } else {
    res.status(400).json({ message: 'This is not a POST request.' });
  }
}
