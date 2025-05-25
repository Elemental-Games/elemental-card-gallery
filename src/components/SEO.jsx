import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image = '/social-preview.jpg',
  path = '',
  type = 'website'
}) => {
  const baseUrl = 'https://elementalgames.gg';
  const fullUrl = `${baseUrl}${path}`;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{`${title} | Elekin TCG`}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      
      {/* Social Media: TikTok @elekin_tcg - doesn't use standard meta tags */}
      
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO; 