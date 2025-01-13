import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

const DonationDisclaimer = () => {
  return (
    <div className="space-y-4">
      <Alert className="bg-purple-900/50 border-yellow-400/20">
        <Info className="h-4 w-4 text-yellow-400" />
        <AlertTitle className="text-yellow-400">Important Notice About Donations</AlertTitle>
        <AlertDescription className="text-yellow-200 text-sm">
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Donations are entirely voluntary and non-refundable</li>
            <li>Donations are purely to support game development</li>
            <li>No rewards or in-game advantages are guaranteed</li>
            <li>Leaderboard positions and potential rewards are not guaranteed</li>
            <li>These donations are not tax-deductible as charitable contributions</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Alert className="bg-purple-900/50 border-yellow-400/20">
        <AlertTitle className="text-yellow-400">About the Leaderboard</AlertTitle>
        <AlertDescription className="text-yellow-200 text-sm">
          <p className="mb-2">
            While we maintain a leaderboard to recognize our supporters, please understand that:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>The leaderboard is for recognition purposes only</li>
            <li>Any future rewards or recognition are at our sole discretion</li>
            <li>Position on the leaderboard does not entitle you to any benefits</li>
            <li>We reserve the right to modify the leaderboard system at any time</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="text-yellow-200/60 text-xs italic text-center">
        By making a donation, you acknowledge that you have read and agree to these terms.
        Your donation is a voluntary contribution to support our development efforts.
      </div>
    </div>
  )
}

export default DonationDisclaimer 