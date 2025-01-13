import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

const DonationDisclaimer = () => {
  return (
    <Alert className="bg-purple-900/50 border-yellow-400/20 mb-6">
      <Info className="h-4 w-4 text-yellow-400" />
      <AlertDescription className="text-yellow-200 text-sm">
        By making a donation, you acknowledge that:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Donations are non-refundable and voluntary</li>
          <li>These donations are not tax-deductible as charitable contributions</li>
          <li>Your information will be handled according to our Privacy Policy</li>
          <li>Donations will be used to support game development and production</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}

export default DonationDisclaimer 