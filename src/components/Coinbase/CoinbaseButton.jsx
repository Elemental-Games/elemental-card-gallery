import { useToast } from "@/components/ui/use-toast";

export function CoinbaseButton({ metadata }) {
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      console.log('Creating Coinbase charge...');
      
      const response = await fetch('/api/create-coinbase-charge', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          metadata: {
            displayName: metadata.displayName,
            isAnonymous: metadata.isAnonymous,
            subscribeToUpdates: metadata.subscribeToUpdates
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Coinbase API error:', errorData);
        throw new Error(errorData.details || 'Failed to create charge');
      }
      
      const data = await response.json();
      console.log('Charge created:', data);
      
      if (!data.hosted_url) {
        throw new Error('No hosted_url in response');
      }

      window.location.href = data.hosted_url;
      
    } catch (error) {
      console.error('Coinbase error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was a problem connecting to Coinbase.",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-[#0052FF] text-white py-3 px-4 rounded-md hover:bg-[#0039B5] flex items-center justify-center gap-2"
    >
      <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zm0 938.7C276.7 938.7 85.3 747.3 85.3 512S276.7 85.3 512 85.3 938.7 276.7 938.7 512 747.3 938.7 512 938.7z"/>
        <path d="M512 234.7c-153.6 0-277.3 123.7-277.3 277.3S358.4 789.3 512 789.3 789.3 665.6 789.3 512 665.6 234.7 512 234.7zm0 469.3c-106.1 0-192-85.9-192-192s85.9-192 192-192 192 85.9 192 192-85.9 192-192 192z"/>
      </svg>
      Pay with Crypto
    </button>
  );
} 