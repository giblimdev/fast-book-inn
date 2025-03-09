"use client"
import React from 'react';

const Labels: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const labels = [
    {
      name: 'Work Place Suite',
      description:
        'Où la productivité rencontre le confort. Nos suites sont conçues pour le voyageur d\'affaires moderne, offrant un espace de travail ergonomique, une connectivité sans faille et des services qui facilitent votre succès.',
      icon: '💼',
    },
    {
      name: 'Family Nest',
      description:
        'Créez des souvenirs inoubliables dans nos nids familiaux. Des espaces conçus pour le bonheur des petits et des grands, avec des activités et des équipements qui font de chaque séjour une aventure familiale.',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      name: 'Romantic Choice',
      description:
        'Laissez l\'amour s\'épanouir dans nos retraites romantiques. Des chambres élégantes, des dîners intimes et des vues à couper le souffle pour une escapade où chaque moment est une célébration de l\'amour.',
      icon: '❤️',
    },
    {
      name: 'Leisure Landing',
      description:
        'Plongez dans un monde de détente et de bien-être. Nos havres de paix sont conçus pour apaiser l\'esprit et revitaliser le corps, avec des spas luxueux, des piscines scintillantes et des jardins sereins.',
      icon: '🌴',
    },
    {
      name: 'Gilded Gateway',
      description:
        'Entrez dans un monde d\'opulence et de raffinement. Nos portails dorés ouvrent sur des suites somptueuses, des services de conciergerie personnalisés et des expériences gastronomiques qui ravivent les sens.',
      icon: '🏰',
    },
    {
      name: 'Historical & Culture Hosting',
      description:
        'Voyagez à travers le temps dans nos demeures historiques. Chaque pierre raconte une histoire, chaque détail révèle un héritage. Offrez à vos invités une immersion dans le passé et la culture locale.',
      icon: '🏛️',
    },
    {
      name: 'ecoHosting',
      description:
        'Rejoignez notre mouvement pour un tourisme durable. Nos refuges écologiques sont conçus pour minimiser l\'impact environnemental et maximiser le respect de la nature. Offrez à vos clients une expérience authentique et responsable.',
      icon: '🌿',
    },
    {
      name: 'Inclusive Place',
      description:
        'Ouvrez vos portes à tous les voyageurs. Nos espaces inclusifs sont conçus pour accueillir la diversité et célébrer l\'unicité. Offrez à chacun un sentiment d\'appartenance et de confort.',
      icon: '🌈',
    },
    {
      name: 'Adventure Base',
      description:
        'Lancez-vous dans l\'aventure depuis nos bases d\'exploration. Nos hébergements sont le point de départ idéal pour les passionnés de plein air, avec des équipements de sport, des conseils d\'experts et un accès privilégié aux merveilles naturelles.',
      icon: '⛰️',
    },
    {
      name: 'Urban Oasis',
      description:
        'Trouvez la sérénité au cœur de la ville. Nos oasis urbaines offrent un refuge paisible, des jardins luxuriants et des espaces de détente où le temps s\'arrête. Offrez à vos clients une pause bienvenue dans l\'effervescence citadine.',
      icon: '🏙️',
    },
    {
      name: 'Pet Haven',
      description:
        'Accueillez les compagnons à quatre pattes avec chaleur et attention. Nos refuges pour animaux offrent des espaces sécurisés, des équipements adaptés et des services qui facilitent la vie des propriétaires. Faites de chaque séjour une expérience inoubliable pour les animaux et leurs maîtres.',
      icon: '🐾',
    },
    {
      name: 'Wellness Retreat',
      description:
        'Revitalisez le corps et l\'esprit dans nos retraites de bien-être. Nos programmes holistiques combinent des soins de spa, des cours de yoga, une cuisine saine et des activités qui nourrissent l\'âme. Offrez à vos clients une transformation profonde.',
      icon: '🧘',
    },
    {
      name: 'Digital Detox Cabin',
      description:
        'Échappez à la frénésie numérique dans nos cabanes de déconnexion. Sans Wi-Fi ni distractions, nos refuges isolés vous invitent à renouer avec la nature et à retrouver la paix intérieure. Offrez à vos clients une expérience de déconnexion authentique.',
      icon: '📵',
    },
    {
      name: 'Bord de Mer',
      description:
        'Plages de sable fin, vagues apaisantes et couchers de soleil inoubliables. Nos hébergements en bord de mer offrent une évasion totale pour les amoureux de l\'océan.',
      icon: '🌊',
    },
    {
      name: 'Montagne',
      description:
        'Panoramas à couper le souffle, air pur et activités en pleine nature. Nos hébergements en montagne sont parfaits pour les amateurs de randonnée, de ski ou de tranquillité.',
      icon: '🏔️',
    },
    {
      name: 'Campagne',
      description:
        'Authenticité, calme et immersion dans la nature. Nos hébergements en campagne vous invitent à découvrir la vie rurale et à vous ressourcer loin de l\'agitation urbaine.',
      icon: '🌾',
    },
    {
      name: 'Désert',
      description:
        'Dépaysement total, vastes étendues et nuits étoilées. Nos hébergements dans le désert offrent une expérience unique, entre sérénité et aventure.',
      icon: '🏜️',
    },
    {
      name: 'Urbain',
      description:
        'Dynamisme des villes, culture et proximité des attractions. Nos hébergements urbains sont idéalement situés pour explorer les trésors de la ville.',
      icon: '🏢',
    },
  ];

  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Nos Labels</h1>
      <input
        type="text"
        placeholder="Rechercher un label..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabels.map((label) => (
          <div
            key={label.name}
            className="border p-6 rounded-lg shadow-sm hover:shadow-md bg-white transform hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{label.icon}</span>
              <h2 className="text-xl font-semibold">{label.name}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">{label.description}</p>
          </div>
        ))}
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Pourquoi labelliser son hébergement ?</h1>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">1. Se différencier de la concurrence</h2>
          <p className="text-gray-600">
            Le marché des hébergements est très concurrentiel. Un label permet de mettre en avant des caractéristiques uniques (luxe, écologie, famille, etc.) et d'attirer une clientèle ciblée.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">2. Répondre aux attentes des clients</h2>
          <p className="text-gray-600">
            Les voyageurs recherchent des expériences adaptées à leurs besoins. Un label communique clairement sur ce que l'hébergement propose, facilitant ainsi le choix du client.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">3. Améliorer la crédibilité et la confiance</h2>
          <p className="text-gray-600">
            Un label officiel ou reconnu apporte une garantie de qualité et de sérieux, rassurant les clients méfiants face à des offres non vérifiées.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">4. Valoriser des engagements spécifiques</h2>
          <p className="text-gray-600">
            Les labels permettent de communiquer des engagements (écologie, inclusion, etc.) et d'attirer une clientèle partageant les mêmes valeurs.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">5. Augmenter la visibilité et l'attractivité</h2>
          <p className="text-gray-600">
            Les plateformes de réservation et les moteurs de recherche favorisent souvent les hébergements labellisés, augmentant ainsi leur visibilité.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">6. Justifier un prix plus élevé</h2>
          <p className="text-gray-600">
            Un label permet de justifier un tarif plus élevé en mettant en avant des avantages spécifiques (luxe, services haut de gamme, etc.).
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">7. Fidéliser une clientèle niche</h2>
          <p className="text-gray-600">
            Les labels permettent de fidéliser une clientèle niche en répondant précisément à ses attentes (aventure, déconnexion, etc.).
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">8. Améliorer l'image de marque</h2>
          <p className="text-gray-600">
            Un label contribue à renforcer l'image de marque en associant l'hébergement à des valeurs positives (durabilité, luxe, etc.).
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">9. Faciliter le marketing et la communication</h2>
          <p className="text-gray-600">
            Les labels sont des outils de communication puissants et facilement compréhensibles, permettant de communiquer rapidement les points forts de l'hébergement.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">10. Répondre aux tendances du marché</h2>
          <p className="text-gray-600">
            Les labels permettent de s'adapter aux nouvelles demandes (écotourisme, tourisme d'expérience, etc.) et de rester compétitif.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">11. Obtenir des certifications officielles</h2>
          <p className="text-gray-600">
            Certains labels sont délivrés par des organismes officiels, renforçant la crédibilité et ouvrant des opportunités de partenariats ou de subventions.
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">12. Créer une expérience client mémorable</h2>
          <p className="text-gray-600">
            Un label permet de promettre et de délivrer une expérience spécifique qui marquera les clients (romantique, aventure, etc.).
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Labels;