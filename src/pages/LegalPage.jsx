import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LegalPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Privacy - Elemental Games</title>
        <meta name="description" content="Terms of Service and Privacy Policy for Elemental Games and Elemental Masters Trading Card Game." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://elementalgames.gg/legal" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#1A103C]"
      >
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Legal Information</h1>

          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="terms" className="bg-purple-950/70 p-6 rounded-lg border border-purple-500/30">
              <h2 className="text-2xl font-semibold mb-6">Terms of Service</h2>
              
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h3>
                <p className="mb-4">
                  By accessing and using Elemental Games&apos; services, including our website and Elemental Masters Trading Card Game, you agree to be bound by these Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">2. Use License</h3>
                <p className="mb-4">
                  Elemental Games grants you a personal, non-exclusive, non-transferable license to use our products and services for personal entertainment purposes only.
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>You may not modify or copy the materials without explicit permission</li>
                  <li>You may not use the materials for commercial purposes</li>
                  <li>You may not attempt to reverse engineer any software contained on our website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">3. Intellectual Property</h3>
                <p className="mb-4">
                  All content, including but not limited to card designs, artwork, game mechanics, and the world of Kinbrold, is the exclusive property of Elemental Games LLC.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">4. User Accounts</h3>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">5. Disclaimer</h3>
                <p className="mb-4">
                  Our services are provided &quot;as is&quot; without any warranties, expressed or implied. Elemental Games does not warrant that our services will be uninterrupted or error-free.
                </p>
              </section>
            </TabsContent>

            <TabsContent value="privacy" className="bg-purple-950/70 p-6 rounded-lg border border-purple-500/30">
              <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">1. Information We Collect</h3>
                <p className="mb-4">We collect the following types of information:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Email addresses for our mailing list</li>
                  <li>Account information for online play</li>
                  <li>Usage data to improve our services</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">2. How We Use Your Information</h3>
                <p className="mb-4">We use your information to:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Send you updates about Elemental Masters</li>
                  <li>Improve our products and services</li>
                  <li>Respond to your inquiries</li>
                  <li>Maintain and improve our website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">3. Information Sharing</h3>
                <p className="mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share anonymous, aggregated data for analytical purposes.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">4. Data Security</h3>
                <p className="mb-4">
                  We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">5. Your Rights</h3>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">6. Contact Us</h3>
                <p>
                  For any privacy-related questions or concerns, please contact us at{' '}
                  <a href="mailto:privacy@elementalgames.gg" className="text-yellow-400 hover:text-yellow-300">
                    privacy@elementalgames.gg
                  </a>
                </p>
              </section>
            </TabsContent>
          </Tabs>

          <p className="text-sm text-purple-300 mt-8 text-center">
            Last updated: March 2024
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default LegalPage; 