import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Helmet } from 'react-helmet-async';
import confetti from 'canvas-confetti';
import { CheckCircle, ExternalLink, Users } from 'lucide-react';
import { subscribeEmail } from '../utils/api';



const AboutUsPage = () => {
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeEmail(email);
      
      if (result.success) {
        setConfirmationEmail(email);
        setAlreadySubscribed(false);
        setShowConfirmation(true);
        shootConfetti();
        setEmail('');
      } else {
        if (result.message && result.message.includes('already subscribed')) {
          setConfirmationEmail(email);
          setAlreadySubscribed(true);
          setShowConfirmation(true);
          shootConfetti();
          setEmail('');
        } else {
          alert(result.message || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const coreTeam = [
    {
      name: "Atanas Lozanski",
      role: "Lead Card Artist",
      specialty: "Concept design and card illustration",
      notableWork: ["Lavrok", "Revival Rain", "Draconic Shield", "Tuskhammer"],
      imagePlaceholder: "/artists/atanas-lozanski.jpg",
      link: "https://www.artstation.com/lozanski"
    },
    {
      name: "Scarlett Roberts",
      role: "Editor & Graphic Designer",
      specialty: "Content editing and visual design",
      notableWork: ["Kickstarter Visuals", "Product Design", "Website Graphics", "Marketing Materials"],
      imagePlaceholder: "/artists/scarlett-roberts.jpg",
      link: "https://www.scarlettedits.com/"
    },
    {
      name: "Julianna Draga",
      role: "Environment Concept Artist",
      specialty: "Kingdom landscapes and design",
      notableWork: ["Grivoss, The Earth Kingdom", "Zalos, The Air Kingdom", "Tsunareth, The Water Kingdom", "Scarto, The Fire Kingdom"],
      imagePlaceholder: "/artists/julianna-draga.png",
      link: "https://www.artstation.com/juliannadraga"
    }
  ];



  return (
    <>
      <Helmet>
        <title>Meet the Elekin Team</title>
        <meta name="description" content="Meet the Elekin team - founder Mark Diorio and our talented artists building the future of TCGs." />
        <meta name="keywords" content="Elekin team, Mark Diorio, Elemental Games, card game artists, TCG development" />
        <meta property="og:title" content="About Us - Meet the Team Behind Elekin TCG" />
        <meta property="og:description" content="Discover the passionate team creating Elekin: Masters of Kinbrold, from game design to stunning artwork." />
        <link rel="canonical" href="https://elementalgames.gg/about" />
      </Helmet>

      <div className="min-h-screen bg-[#1A103C]">
        {/* Page Title */}
        <section className="container mx-auto px-4 pt-16 pb-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Meet the Elekin Team
            </h1>
            <p className="text-xl lg:text-2xl text-purple-200 max-w-3xl mx-auto">
              One developer and three talented artists and editors working together to bring Elekin TCG and the world of Kinbrold to life
            </p>
          </div>
        </section>

        {/* Founder Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative flex flex-col items-center">
                <img 
                  src="/me.jpeg" 
                  alt="Mark Diorio - Founder of Elemental Games" 
                  className="w-80 h-96 -mt-20 object-cover rounded-xl border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:shadow-[0_0_50px_rgba(250,204,21,0.8)] transition-all duration-300"
                />
                
                {/* Free Sign-up CTA */}
                <div className="mt-4 text-center max-w-sm mx-auto">
                  <p className="text-yellow-400 text-sm font-medium mt-10 mb-3">
                    Free sign-up to keep up-to-date with everything Elekin
                  </p>
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 bg-purple-900/50 border-yellow-500/50 text-white placeholder-purple-300 text-sm py-2"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-medium text-sm px-4 py-2"
                    >
                      {isLoading ? 'Joining...' : 'Join'}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl font-bold text-yellow-400 mb-2">Mark Diorio</h2>
                <p className="text-xl text-purple-200 mb-6">Founder & Lead Developer</p>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <h3 className="text-2xl font-semibold text-white mb-4">Building Elekin From the Ground Up</h3>
                
                <p>
                  Hey there! I&apos;m Mark, and I&apos;ve been building Elekin and the foundations of Elemental Games since the beginning of 2020. Like many founders, I&apos;ve learned to wear numerous hats throughout my journey. I graduated college with a Bachelor&apos;s degree in Electrical & Computer Engineering, then found a job as a Software Engineer while developing the basis of Elemental Games. I&apos;ve now transitioned into a full-time game designer, developer, marketer, and community manager here at Elemental Games. What started out as a passion project with my buddies back in college has become my full-time position, and I&apos;m going to ensure it&apos;s success no matter what.
                </p>
                
                <p>
                  My obsession with TCGs such as Pokemon, Yugioh, and Magic coupled with the elemental storyline of Avatar: The Last Airbender has been a driving force behind my passion for creating Elekin and the world of Kinbrold. The game of Elekin is more than just a TCG with unique mechanics, it&apos;s a story about the elemental world of Kinbrold and the constant grind to become a Master within it.
                </p>
                
                <p>
                  Every single card, rune, counter, shield, character, ability, and rule has been CAREFULLY designed and purposefully planted. We&apos;ve tested countless strategies throughout our beta-testing, but I&apos;m most excited to see what you, the community, can come up with when we launch Elekin! I&apos;m collaborating with two incredible artists who believe in the vision as much as I do. We&apos;re small, we&apos;re focused, and we&apos;re creating something amazing.
                </p>
                
                <p>
                  We&apos;re currently prepping for our Kickstarter launch and ramping up marketing every single day. It&apos;s been a wild ride, and we&apos;re just getting started. Thanks for being part of this journey with us!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

                {/* Core Creative Team Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4" style={{textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6)'}}>Core Creative Team</h2>
            <p className="text-xl text-purple-200">Professional artists and editors bringing the world of Kinbrold to life</p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {coreTeam.map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                viewport={{ once: true }}
                className={index === 2 ? "md:col-span-2 xl:col-span-1 md:justify-self-center xl:justify-self-auto" : ""}
              >
                <Card className="p-4 bg-purple-800/20 border-2 border-purple-400/30 hover:border-purple-300/50 transition-all duration-300 h-full shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                  <div className="space-y-3 text-center">
                    {artist.imagePlaceholder?.includes('placeholder') ? (
                      <div className="w-40 h-40 mx-auto bg-purple-700/20 rounded-full flex items-center justify-center border-4 border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        <div className="text-center text-purple-300">
                          <Users className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">[Photo coming soon]</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-white/20 z-10 pointer-events-none"></div>
                        <img 
                          src={artist.imagePlaceholder} 
                          alt={`${artist.name} - ${artist.role}`}
                          className="w-40 h-40 object-cover rounded-full border-4 border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all duration-300"
                          style={{ objectPosition: '50% 50%' }}
                        />
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-2xl font-bold text-purple-300" style={{textShadow: '0 0 10px rgba(168,85,247,0.4)'}}>{artist.name}</h3>
                      <p className="text-purple-200 text-base font-medium mb-3">{artist.role}</p>
                      {artist.link && (
                        <a 
                          href={artist.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-base text-blue-400 hover:text-blue-300 transition-colors -mb-5"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {artist.name === 'Scarlett Roberts' ? 'Professional Portfolio' : 'ArtStation Portfolio'}
                        </a>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-left">
                      <p className="text-gray-300 text-base"><span className="font-semibold text-yellow-400">Specialty:</span> <span className="font-semibold text-purple-200"> {artist.specialty} </span></p>
                      <div>
                        <p className="font-semibold text-white text-base mb-2">Notable Work:</p>
                        <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                          {artist.notableWork.map((work, i) => (
                            <li key={i}>{work}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Acknowledgments Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6" style={{textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.6)'}}>Special Thanks</h2>
            <div className="bg-purple-800/20 border border-purple-400/30 rounded-xl p-8">
              <p className="text-lg text-purple-200 mb-6">
                Special recognition to our dedicated collaborators who have helped shape Elekin into what it is today.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Joseph Owens</h4>
                  <p className="text-sm text-gray-300">Partnership & Beta Testing</p>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Kaitlyn Burns</h4>
                  <p className="text-sm text-gray-300">Quality Assurance & Testing</p>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Tyler Diorio</h4>
                  <p className="text-sm text-gray-300">Business Development</p>
                </div>
              </div>
              <p className="text-purple-200 mt-6 text-sm">
                Their countless hours of playtesting, feedback, development, and dedication helped us refine the game mechanics and ensure Elekin delivers a simple and amazing player experience.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Join Our Journey Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-8">Be a   Part of the Story</h2>
{/*             
            <div className="mb-8">
              <div className="w-full rounded-lg overflow-hidden border-2 border-purple-500/30 hover:border-yellow-500/50 transition-all duration-300">
                <img 
                  src="/discord-invite-banner.png" 
                  alt="Join Elekin Discord Community" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div> */}
            
            <div className="space-y-6 text-gray-300 mb-8">
              <p className="text-lg">
                Elekin is more than our creation—it&apos;s a community effort. Join our Discord, sign up for Early Access, and become part of the story we&apos;re telling together.
              </p>
              
              <p className="text-lg">
                With only <span className="text-yellow-400 font-semibold">500 Early Spots</span> available, now is the perfect time to join our growing community and be a part of the Elekin story.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                asChild
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] border-2 border-purple-500/50 hover:border-purple-400/80 transition-all duration-300 hover:scale-105"
              >
                <a href="https://discord.gg/PVrgZBmcMq" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Discord Community
                </a>
              </Button>
              
              <Button 
                asChild
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:shadow-[0_0_40px_rgba(234,179,8,0.8)] border-2 border-yellow-500/50 hover:border-yellow-400/80 transition-all duration-300 hover:scale-105"
              >
                <Link to="/join-now">
                  Sign Up for Early Access
                </Link>
              </Button>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-20 bg-purple-900/30 p-6 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-purple-800/50 border-purple-500/50 text-white placeholder-purple-300"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:shadow-[0_0_35px_rgba(234,179,8,0.7)] border border-yellow-500/50 hover:border-yellow-400/80 transition-all duration-300"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* Success Modal */}
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-purple-900 p-8 rounded-lg max-w-md w-full text-center border border-purple-500/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4">
                {alreadySubscribed ? (
                  <CheckCircle className="w-16 h-16 text-yellow-400 mx-auto" />
                ) : (
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {alreadySubscribed ? "Already an Elemental!" : "Welcome, Elemental!"}
              </h3>
              
              <p className="text-purple-200 mb-6">
                {alreadySubscribed 
                  ? `${confirmationEmail} is already part of our community! Thanks for your continued enthusiasm.`
                  : `${confirmationEmail} has been added to our Early Access list. You're now part of the Elekin community!`
                }
              </p>
              
              <Button 
                onClick={() => setShowConfirmation(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default AboutUsPage;
