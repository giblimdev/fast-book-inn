import React from 'react';
import Image from 'next/image';

function SideMap() {
  return (
    <div>
      <Image
        src="/map.png" 
        alt="Carte"
        width={600}  // Largeur de l'image
        height={600} // Hauteur de l'image
        quality={75} // Optionnel : définit la qualité de l'image
        priority // Optionnel : permet de charger l'image en priorité
      />
    </div>
  );
}

export default SideMap;
