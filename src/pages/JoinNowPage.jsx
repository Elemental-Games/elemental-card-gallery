import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SignupForm from '../components/auth/SignupForm';
import FlippableCard from '../components/FlippableCard';
import LaunchCountdown from '../components/LaunchCountdown';

const SocialCard = ({ platform, icon, memberCount, link }) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
    >
      <div className="absolute inset-0 bg-purple-500/20 blur-[50px] rounded-full group-hover:bg-purple-500/30 transition-colors duration-300" />
      <div className="relative bg-purple-950/70 p-6 rounded-lg border border-purple-500/30 
        hover:border-purple-500/50 transition-all duration-300 group">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 text-yellow-400 group-hover:text-yellow-300 transition-colors">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{platform}</h3>
          <p className="text-purple-200">{memberCount} members</p>
        </div>
      </div>
    </a>
  );
};

const JoinNowPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="bg-purple-950/70 p-4 mb-8 rounded-lg border border-purple-500/30 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex whitespace-nowrap"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8">
              <p className="text-yellow-400 mx-8">"Amazing game and unique battle mechanics!" - Beta Tester Joey O</p>
              <p className="text-yellow-400 mx-8">"The shield system is revolutionary!" - TCG Veteran J. Iovanisci</p>
              <p className="text-yellow-400 mx-8">"QR Code comes in clutch for deck building" - Community Member Sarah</p>
              <p className="text-yellow-400 mx-8">"Can't wait for launch!" - Community Member Jordan</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-purple-950/70 p-6 rounded-lg border border-purple-500/30">
          <h2 className="text-3xl font-bold mb-4">Launch Countdown</h2>
          <LaunchCountdown />
        </div>

        <div className="bg-purple-950/70 p-6 rounded-lg border border-purple-500/30">
          <h2 className="text-3xl font-bold mb-4">Join Now</h2>
          <SignupForm buttonClassName="bg-primary hover:bg-primary/90 border-2 border-yellow-500" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Master the Elements</h2>
          <p className="text-lg mb-6">
            Dive into a world where elements clash and strategy reigns supreme. 
            Elemental Masters brings you an innovative TCG experience with unique mechanics, 
            beautiful artwork, and deep strategic gameplay.
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 border-2 border-purple-700 text-purple-700 font-bold">
            Pre-order Now
          </Button>
        </div>
        <div className="md:w-1/2">
          <FlippableCard 
            frontImage="/images/cards/ancient-sigil.webp"
            backImage="/Card_Back.png"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Dive into Kinbrold</h2>
          <p className="text-lg mb-6">
            Check out the Kinbrold map and learn about the world of Elemental Games. 
            Each Kingdom has its own backstory and characters that are vital to the story of Kinbrold.
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 border-2 border-purple-700 text-purple-700 font-bold">
            Kinbrold Map
          </Button>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SocialCard 
            platform="Discord"
            icon={
              <svg width="32" height="32" viewBox="0 0 127.14 96.36" className="fill-current text-white">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
              </svg>
            }
            memberCount="1,300+"
            link="https://discord.gg/qXNWh4dMve"
          />
          <SocialCard 
            platform="X"
            icon={
              <img 
                src="/x-twitter-brands-solid.svg" 
                alt="X (Twitter)" 
                className="h-8 w-8"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            }
            memberCount="350+"
            link="https://x.com/elemental_tcg"
          />
          <SocialCard 
            platform="Instagram"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512" className="fill-current text-white">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            }
            memberCount="1,250+"
            link="https://instagram.com/elemental_tcg"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>Can the average person pick up and play Elemental Masters?</AccordionTrigger>
            <AccordionContent>
              Yes! That's what makes our game so unique is that it has a very simplified gameplay and battle mechanic that simply...just makes sense! This allows for newcomers to easily pick-up and play Elemental Masters.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What makes Elemental Masters unique?</AccordionTrigger>
            <AccordionContent>
              Besides our On-Card Technology in the form of a unique QR code, in-game we have a Shield system that protects you from your opponent's attacks. This is a system that's never before seen in the TCG world. Lastly, our battling mechanic of using Strength for damage and health and Agility for attack speed, blocking capabilities, and dodging slower attacks is ideal for a new and refreshing gameplay experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How long does a typical game take?</AccordionTrigger>
            <AccordionContent>
              The average game takes 20-25 minutes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How can I participate in playtests?</AccordionTrigger>
            <AccordionContent>
              Join our community in Discord, attend our live spaces on X, or write our support team an email requesting to participate (Discord, X, and email link).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Will there be opportunities to interact with the creator?</AccordionTrigger>
            <AccordionContent>
              Of course! You can attend our live spaces on X and ask our creators any questions during their weekly Q&A sessions. Also, you can join our discord and shoot some messages out there as they're quite active.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <div className="text-center">
        <Card className="p-6 max-w-md mx-auto border-2 border-yellow-500">
          <h3 className="text-xl font-semibold mb-4">Join Now</h3>
          <SignupForm buttonClassName="bg-primary hover:bg-primary/90 border-2 border-yellow-500" />
        </Card>
      </div>
    </motion.div>
  );
};

export default JoinNowPage;
