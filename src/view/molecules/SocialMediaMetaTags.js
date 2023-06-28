import React from "react";
import { Helmet } from "react-helmet";
export default function SocialMediaMetaTags({ title, description, imageURL }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lanka_data" />
      <meta name="twitter:creator" content="@nuuuwan" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageURL} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageURL} />
    </Helmet>
  );
}
