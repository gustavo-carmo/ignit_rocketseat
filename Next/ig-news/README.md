This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## My Notes

#Add typescript
the easiest way to convert your next project into a typescript project is add the types in your project (yarn add typescript @types/react @types/node -D), change your files js to tsx and then restart your project.

#Advantages of next:

- it'll force you to isolate the css of your application.

# The functionality of file \_app

If you need that some header or any other html to be included in all pages you need to add it in this file and encapsulate the content there.

# The functionality of file \_document

If you need add a font for exemple in your Next project you need to replace the file \_document in next, in this case you have to create this file into your pages folder and put the code below, this file is quite similar to \_app but it'll be executed only once.

```
import Document, { Html, Main, Head, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

```

You can't add css on \_document because it's not ready to acept it, this code is to close to pure html

Every time that you want to execute a server side rendering function you have to export a function on your page (It only works on pages) with the name getServerSideProps and to access the return of the function you get the props on the page, so if you execute this server side rendering function:

```
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      name: "Gustavo",
    },
  };
};
```

on the props you will have an object like this:

```
{
  name: "Gustavo",
}
```

one project adevice is use the values in the bank as cents then you convert it to decimal, because you wont have to worry about the decimal houses.

### Another way to execute server side functions is the Static Site Generation (SSG)

It's very similar to Server Side Rendering but it'll execute once than it will save the HTML generated and every time it will give to the browser and will only refresh the content when its the time to revalidate. This way is performaticly but it isn't all time that you'll use it, and it's function is like this:

```
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      name: "Gustavo",
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
```

## API Routes

On NextJs you can add routes to use as you could do on a pure node server, on your pages folder you have to add a folder called "api" and inside it every file will be an api and you have to have the sintaxe bellow to use this api.

```
import { NextApiRequest, NextApiResponse } from "next";

const usersApi = (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Lulu Gutierrez" },
    { id: 2, name: "Lina Jackson" },
    { id: 3, name: "Rachel Wilkerson" },
    { id: 4, name: "Fanny Peters" },
  ];

  return response.json(users);
};

export default usersApi;
```

To recieve parameters on the next api you should create an folter inside the folder "api" and create an file into that folder with the name "[<parameter-name>].tsx" where you have to change the <parameter-name> to the name of the parameter that you want then you will recieve it on the request.query for example if I want to recieve the parameter id on users I will create an folder called "users" and into this the file "[id].tsx" and inside it I will recieve the value like this:

```
import { NextApiRequest, NextApiResponse } from "next";

const usersApi = (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query); // { id: '1' }

  <some-return>
};

export default usersApi;

```

To recieve more than one parameter you have to create an file with this sintaxe "[...parameters].ts" and you will have an array with all the parameters on that route.

JWT (Storage)
Next Auth (Login Social "GitHub", "Google")
