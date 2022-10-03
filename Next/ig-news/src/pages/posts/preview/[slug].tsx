import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getPrismicClient } from "../../../services/prismic";
import { RichText } from "prismic-dom";
import Head from "next/head";

import styles from "../post.module.scss";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import router from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data } = useSession();

  useEffect(() => {
    console.log("O que tem nessa session ? ", data?.activeSubscription);

    if (data?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [data]);
  return (
    <>
      <Head>
        <title>{post.title} | IG News</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Want to continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

interface PrismicContent {
  type: string;
  text: string;
}

interface PrismicPostPreview {
  uid: string;
  data: {
    title: string;
    content: PrismicContent[];
  };
  last_publication_date: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = (await prismic.getByUID(
    "post",
    String(slug),
    {}
  )) as PrismicPostPreview;

  const post = {
    slug,
    title: response.data.title,
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 24 * 7, // 1 week
  };
};
