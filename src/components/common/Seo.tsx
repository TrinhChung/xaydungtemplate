import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
};

export default function Seo({ title, description, image, canonical }: Props) {
  const siteName = 'Xây Dựng Nam Phong';
  const t = title ? `${title} | ${siteName}` : siteName;
  return (
    <Helmet>
      <title>{t}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:title" content={t} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:site_name" content={siteName} />
    </Helmet>
  );
}
