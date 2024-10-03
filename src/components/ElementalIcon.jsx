import React from 'react';

const ElementalIcon = ({ element, className }) => {
  const getIconPath = (element) => {
    switch (element.toLowerCase()) {
      case 'air':
      case 'zalos':
        return '/icons/Air.png';
      case 'water':
      case 'tsunareth':
        return '/icons/Water.png';
      case 'fire':
      case 'scarto':
        return '/icons/Fire.png';
      case 'earth':
      case 'grivoss':
        return '/icons/Earth.png';
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