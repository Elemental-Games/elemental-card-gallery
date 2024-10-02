import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Twitter, MessageCircle } from 'lucide-react';

const JoinNowPage = () => {
  const calculateDaysUntil = () => {
    const today = new Date();
    const targetDate = new Date('2024-11-01');
    const timeDiff = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-2 text-center">Become an Elemental Master</h1>
      <p className="text-xl mb-8 text-center">Join now to help unleash the power of the elements</p>

      <div className="bg-primary text-primary-foreground p-4 rounded-lg mb-8 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Countdown to Launch</h2>
        <p className="text-3xl font-bold font-heading">{calculateDaysUntil()} days</p>
        <p>Mark your calendars for November 1st, 2024!</p>
      </div>

      <Card className="p-6 mb-8 bg-accent text-accent-foreground">
        <h2 className="text-2xl font-semibold mb-4">Early Bird Special</h2>
        <p className="mb-4">The first 169 backers of $50 or more will receive an autographed card of their choice (in addition to the usual $50 Kickstarter reward). This will be first come, first serve, and there will only be 1 autographed version of each card. A live list of cards left to be autographed will be on the website at time of purchase.</p>
        <p className="mb-4">So, be ready to grab your 1/1 Autographed card on November 1st!</p>
        <Button size="lg" className="w-full">Check Back Soon to Sign-Up</Button>
      </Card>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Discover Elemental Masters</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Interactive card technology (QR codes)</li>
          <li>Rich world and lore</li>
          <li>Diverse creatures (4 main elements, 6 combinational)</li>
          <li>Unique battle mechanics (strength and agility stats)</li>
          <li>Quick 20-minute games, easy to learn, challenging to master</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Artwork Showcase</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="text-center">
            <img src="/cards/deepseer.png" alt="Deepseer" className="w-64 h-auto object-contain mx-auto" />
            <p className="mt-2 italic">Front of an ability card</p>
          </div>
          <div className="text-center">
            <img src="/Card_Back.png" alt="Card Back" className="w-64 h-auto object-contain mx-auto" />
            <p className="mt-2 italic">Card back of our game</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Journey Together</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full mr-2">$50,000</span>
            <span>Initial Goal: Base game production</span>
          </li>
          <li className="flex items-center">
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full mr-2">$75,000</span>
            <span>Stretch Goal 1: Exclusive game mats</span>
          </li>
          <li className="flex items-center">
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full mr-2">$100,000</span>
            <span>Stretch Goal 2: Increased print run (5,000 to 10,000 sets)</span>
          </li>
          <li className="flex items-center">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full mr-2">$150,000</span>
            <span>Stretch Goal 3: Enhanced marketing and in-person event (Location TBA: Philadelphia, New York City, or LA)</span>
          </li>
          <li className="flex items-center">
            <span className="bg-red-700 text-white px-2 py-1 rounded-full mr-2">$250,000</span>
            <span>Dream Goal: Surprise expansion</span>
          </li>
        </ul>
      </section>

      <section className="mb-8 flex justify-center space-x-4">
        <a href="https://x.com/elemental_tcg" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="flex items-center">
            <Twitter className="mr-2 h-4 w-4" /> Follow us on X
          </Button>
        </a>
        <a href="https://discord.gg/qXNWh4dMve" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="lg" className="flex items-center">
            <MessageCircle className="mr-2 h-4 w-4" /> Join our Discord
          </Button>
        </a>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Experience Elemental Masters</h2>
        <p className="mb-4">Stay tuned for upcoming local playtests! Dates and locations to be announced.</p>
        <p className="mb-4">Join our weekly X spaces for live events and Q&A sessions during the Kickstarter campaign.</p>
        <p>Schedule of upcoming X events coming soon!</p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mb-8">
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

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Updates to Come</h2>
        <p className="mb-4">Sign up for our email list and create a website profile to stay up-to-date on all things Elemental, get full website access (including deck saving capabilities), and much more!</p>
        <h3 className="text-2xl font-semibold mb-2">Official Elemental Masters Marketplace</h3>
        <p className="mb-2">Coming after launch:</p>
        <ul className="list-disc list-inside">
          <li>Direct card purchases available</li>
          <li>Special discounts on the cards of the week</li>
        </ul>
      </section>

      <div className="text-center">
        <Button size="lg" className="text-lg px-8 py-4">Check Back Soon to Sign-Up</Button>
      </div>
    </motion.div>
  );
};

export default JoinNowPage;
