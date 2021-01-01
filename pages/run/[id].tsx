import { useRouter } from "next/router";
import { useState } from "react";

function Run() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return <div>Run</div>;
}

export async function getStaticPaths() {
  const paths = [{ params: { id: "ardavark" } }];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  return { props: {} };
}

export default Run;
