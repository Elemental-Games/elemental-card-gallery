import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import EmailSubscriptionModal from './EmailSubscriptionModal';

const SubscribeButton = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  iconClassName = "mr-2 h-4 w-4",
  showIcon = true,
  children = "Join Our Email List" 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        variant={variant}
        size={size}
        className={className}
      >
        {showIcon && <Mail className={iconClassName} />}
        {children}
      </Button>

      <EmailSubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SubscribeButton; 