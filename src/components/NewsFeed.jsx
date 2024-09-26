import React from 'react';
import { Link } from 'react-router-dom';
import { ElementIcon } from './ElementIcon';

const NewsFeed = () => {
  const newsItems = [
    {
      id: 1,
      title: 'New Expansion: Elemental Fusion',
      excerpt: 'Discover 100 new cards that combine the power of multiple elements!',
      date: '2023-03-15',
      type: 'blog',
    },
    {
      id: 2,
      title: 'Tournament Highlights: World Championship 2023',
      excerpt: 'Watch the best moments from this year\'s Elemental Masters World Championship.',
      date: '2023-02-28',
      type: 'video',
    },
    {
      id: 3,
      title: 'Strategy Guide: Mastering Water Decks',
      excerpt: 'Learn the secrets of building and playing powerful Water element decks.',
      date: '2023-02-10',
      type: 'blog',
    },
  ];

  return (
    <section>
      <h2 className="text-4xl font-bold mb-8 flex items-center">
        <ElementIcon element="air" className="mr-2" />
        Latest News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300 mb-4">{item.date}</p>
            <p className="mb-4">{item.excerpt}</p>
            <Link to={`/news/${item.id}`} className="text-accent hover:underline">
              {item.type === 'blog' ? 'Read More' : 'Watch Video'}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsFeed;