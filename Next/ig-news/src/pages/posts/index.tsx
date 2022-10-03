import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface Props {
  posts: Post[];
}

export default function Posts({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Posts | IG News</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

interface PrismicContent {
  type: string;
  text: string;
}

interface PrismicPost {
  uid: string;
  data: {
    title: string;
    content: PrismicContent[];
  };
  last_publication_date: string;
}

interface PrismicResponse {
  results: PrismicPost[];
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = (await prismic.query(
    Prismic.predicates.at("document.type", "post"),
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  )) as PrismicResponse;

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24 * 7, // 7 days
  };
};
