import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "src/styles/Home.module.css";
import { Layout } from "src/components/templates/layout/layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Expenses</title>
        <meta name="description" content="Expense tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>here</Layout>
    </>
  );
}
