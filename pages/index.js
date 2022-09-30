import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/Layout";
import utilStyle from "../styles/utils.module.css";

import Link from "next/link";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
  const allPostData = getPostsData(); //id,title,date,thumbnail
  console.log(allPostData);

  return {
    props: {
      allPostData,
    },
  };
}

export default function Home({ allPostData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はフルスタックエンジニアです/Udemy講師として活動しています。/好きな言語はJavascriptです。
        </p>
      </section>

      <section className={utilStyle.headingMd}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>

              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
