import { gql, useQuery } from "@apollo/client";
import Arweave from "arweave";
import "../App.css";
import React from "react";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const GET_IMAGES = gql`
  query ($walletAddress: String!) {
    transactions(
      owners: [$walletAddress]
      tags: { name: "Content-Type", values: ["image/png"] }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const Gallery = (props) => {
  const { loading, error, data } = useQuery(GET_IMAGES, {
    variables: { walletAddress: props.walletAddress },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="image-container">
      {data.transactions.edges.map(({ node }) => (
        <img
          key={node.id}
          src={`https://arweave.net/${node.id}`}
          alt={node.id}
        />
      ))}
    </div>
  );
};

export default Gallery;
