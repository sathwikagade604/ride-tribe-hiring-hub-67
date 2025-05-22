
import React, { useEffect } from 'react';

interface PageTitleProps {
  title: string;
  description: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    
    // Add meta tags
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = description;
    document.head.appendChild(metaDescription);
    
    // Cleanup function to remove meta tags when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, [title, description]);

  return (
    <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
  );
};

export default PageTitle;
