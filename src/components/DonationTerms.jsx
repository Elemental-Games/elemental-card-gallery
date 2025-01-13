import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const DonationTerms = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-yellow-400 hover:text-yellow-300">
          View Donation Terms
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] bg-purple-900/90">
        <DialogHeader>
          <DialogTitle className="text-yellow-400">Donation Terms & Conditions</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-yellow-200">
            <p>Last Updated: [Current Date]</p>
            
            <section>
              <h3 className="font-semibold mb-2">1. Donation Agreement</h3>
              <p>By making a donation, you agree that:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>All donations are final and non-refundable</li>
                <li>Donations are voluntary contributions</li>
                <li>No goods or services are provided in exchange for donations</li>
                <li>Donations are not tax-deductible</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Use of Funds</h3>
              <p>Donations will be used for:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Game development and production costs</li>
                <li>Marketing and community events</li>
                <li>Platform maintenance and improvements</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. Privacy & Data Protection</h3>
              <p>We collect and process donation data in accordance with our Privacy Policy, including:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Payment information (processed securely via Stripe)</li>
                <li>Display name (if provided)</li>
                <li>Donation amount</li>
                <li>Optional message</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Contact Information</h3>
              <p>For questions about donations, please contact us at [your contact email]</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DonationTerms; 