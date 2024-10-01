import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCardsFromS3 } from '../utils/awsUtils';
import CardGallery from '../components/CardGallery';
import { Skeleton } from '@/components/ui/skeleton';

const CardListPage = () => {
  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsFromS3,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Card Gallery</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(20)].map((_, index) => (
            <Skeleton key={index} className="w-full h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading cards: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Card Gallery</h1>
      <CardGallery cards={cards} />
    </div>
  );
};

export default CardListPage;