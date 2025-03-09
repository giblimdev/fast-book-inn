
import React from 'react';
import Image from 'next/image';
import mapImage from '../../../../public/map.png'; 

function SideMap() {
  return (
    <div>
      <Image
        src={mapImage} 
        alt="Carte"
        layout="responsive"
        width={600} // Définissez la largeur de l'image
        height={600} // Définissez la hauteur de l'image
      />
    </div>


  );
}

export default SideMap;