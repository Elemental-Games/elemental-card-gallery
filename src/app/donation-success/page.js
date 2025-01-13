import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DonationSuccess() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto p-8 bg-purple-900/90 text-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">
          Thank You for Your Support!
        </h1>
        <p className="text-yellow-200 mb-8">
          Your donation has been processed successfully. You should receive a confirmation email shortly.
        </p>
        <div className="space-y-4">
          <p className="text-yellow-200/80">
            Want to share your support? Follow us and spread the word!
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link href="https://twitter.com/intent/tweet?text=I%20just%20supported%20Elemental%20Masters!%20Join%20me%20in%20helping%20build%20the%20future%20of%20TCGs!%20%23ElementalMasters">
                Share on X
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/discord">
                Join Discord
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 