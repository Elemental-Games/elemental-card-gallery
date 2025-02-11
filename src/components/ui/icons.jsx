import googleIcon from '/google.svg';
import discordIcon from '/discord.svg';

export const Icons = {
  google: (props) => (
    <img 
      src={googleIcon} 
      alt="Google" 
      onError={(e) => {
        console.error('Failed to load Google icon');
        e.target.style.display = 'none';
      }}
      {...props} 
    />
  ),
  discord: (props) => (
    <img 
      src={discordIcon} 
      alt="Discord"
      onError={(e) => {
        console.error('Failed to load Discord icon');
        e.target.style.display = 'none';
      }}
      {...props} 
    />
  )
}; 