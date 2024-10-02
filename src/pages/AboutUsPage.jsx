import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutUsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/3 mb-4 md:mb-0 md:mr-8">
          <img 
            src="/me.jpeg" 
            alt="Mark Diorio" 
            className="rounded-full border-4 border-primary mx-auto object-cover w-48 h-48"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Elemental Games was founded in 2022 by Mark Diorio, a visionary game developer with a passion for elemental themes and strategic gameplay. With a background in Electrical and Computer Engineering, Mark brings a unique blend of technical expertise and creative game design to the world of Kinbrold.
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p>
          At Elemental Games, we're on a quest to revolutionize the gaming industry by creating immersive experiences centered around the four primordial elements: Air, Water, Earth, and Fire. Our journey begins with Elemental Masters, a Trading Card Game that serves as the cornerstone of our expanding universe.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">The World of Kinbrold</h2>
        <p>
          Kinbrold is more than just a setting—it's a living, breathing world with endless stories to tell. While our creative vision draws inspiration from beloved elemental themes in popular culture, we're crafting a unique and captivating universe that stands on its own. Elemental Masters is just the beginning of our epic saga.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p>
          We're not just creating games; we're building worlds. Our long-term vision extends beyond Elemental Masters, encompassing a diverse range of gaming experiences—from MMOs to RPGs and beyond. Each game will be a new chapter in the ever-expanding lore of Kinbrold, offering players fresh ways to engage with our elemental universe.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">The Future of Elemental Games</h2>
        <ul className="list-disc list-inside">
          <li>Expanding our team with passionate developers and creatives</li>
          <li>Launching new generations of Elemental Masters</li>
          <li>Developing online play and hosting exciting tournaments</li>
          <li>Exploring new genres while maintaining our core elemental theme</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Join Our Quest</h2>
        <p>
          Whether you're a seasoned TCG veteran or new to the world of elemental mastery, we invite you to join us on this exciting journey. Elemental Games is more than a company—it's a community of players, creators, and dreamers united by our love for strategic gameplay and rich, immersive worlds.
        </p>
        <div className="mt-6 mb-4">
          <Link to="/join">
            <Button size="lg" variant="primary">
              Join Now
            </Button>
          </Link>
        </div>
        <p className="text-2xl font-bold mt-4">
          Together, let's forge the future of gaming, one element at a time.
        </p>
      </section>
    </motion.div>
  );
};

export default AboutUsPage;