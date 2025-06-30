

const ElementalIcon = ({ element, className }) => {
  const getIconPath = (element) => {
    switch (element.toLowerCase()) {
      case 'air':
      case 'zalos':
        return '/images/cards/new-marketing/air silver.webp';
      case 'water':
      case 'tsunareth':
        return '/images/cards/new-marketing/water silver.webp';
      case 'fire':
      case 'scarto':
        return '/images/cards/new-marketing/fire silver.webp';
      case 'earth':
      case 'grivoss':
        return '/images/cards/new-marketing/earth silver.webp';
      case 'frost':
      case 'frozen_ridge':
        return '/icons/Frost.png';
      case 'lightning':
      case 'shroud_peak':
        return '/icons/Lightning.png';
      case 'lava':
      case 'mount_surya':
        return '/icons/Lava.png';
      case 'crystal':
      case 'gleaming_grotto':
        return '/icons/Crystal.png';
      case 'poison':
      case 'noxwood':
        return '/icons/Poison.png';
      case 'sand':
      case 'arid_sands':
        return '/icons/Sand.png';
      default:
        return '';
    }
  };

  const iconPath = getIconPath(element);
  
  if (!iconPath) return null;

  return (
    <img 
      src={iconPath} 
      alt={`${element} icon`} 
      className={`${className} object-contain`}
    />
  );
};

export default ElementalIcon;