import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Elemental Games - Creators of Elemental Masters TCG</title>
        <meta name="description" content="Learn about Elemental Games, the visionary team behind Elemental Masters Trading Card Game. Discover our story, mission, and the magical world of Kinbrold." />
        <meta name="keywords" content="Elemental Games, Elemental Masters, trading card game, TCG, game developer, Kinbrold, Mark Diorio" />
        <meta property="og:title" content="About Elemental Games - Creators of Elemental Masters TCG" />
        <meta property="og:description" content="Discover the story behind Elemental Games and our mission to revolutionize the gaming industry through immersive elemental experiences." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg/about" />
      </Helmet>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      
      <div className="flex flex-col md:flex-row items-start mb-2">
        <div className="md:w-2/3 md:pr-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Elemental Games was founded in 2024 by Mark Diorio, a visionary game developer with a passion for elemental themes and strategic gameplay. Mark has been developing and creating the world of Kinbrold and Elemental Games since the beginning of 2022. With a background in Electrical and Computer Engineering, Mark brings a unique blend of technical expertise and creative game design to the world of Kinbrold.
            <br />
            <br />
            "<span className="text-accent">This journey with Elemental Games began years ago as a passion project</span>, and I was thrilled to see it evolve into an official LLC in 2024. As we approach our Kickstarter launch on <span className="text-accent">June 26th, 2025</span>, I'm incredibly grateful for the support from our engineers, beta-testers, and artists who have helped shape this vision along the way. What started as a solo project is growing into something bigger, and <span className="text-accent">I'm excited to expand our team and bring the world of Kinbrold to life in the coming year.</span>" - Mark Diorio
          </p>
        </div>
        <div className="md:w-1/3 mt-4 md:mt-0">
          <div className="relative group w-48 h-48 mx-auto md:ml-auto">
            <img 
              src="/me.jpeg" 
              alt="Mark Diorio" 
              className="rounded-full border-4 border-primary object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      <section className="mb-6">
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
          Whether you're a seasoned TCG veteran or new to the world of elemental mastery, we invite you to join us on this exciting journey. Elemental Games is more than a company—it's a community of players, creators, and dreamers united by our passion for strategic gameplay and rich, immersive worlds.
        </p>
        <div className="mt-6 mb-4">
          <Link to="/join-now">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-6 py-3 border-2 border-accent hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
            >
              Join Now
            </Button>
          </Link>
        </div>
        <p className="text-xl font-bold mt-4">
          Together, let's forge the future of gaming, one element at a time.
        </p>
      </section>
    </motion.div>
    </>
  );
};

export default AboutUsPage;
