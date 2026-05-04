export const fields = [
   
  //Array Object 1
  {
    id: "la-mano-de-dios",
    name: "La Mano de Dios",
    location: "Caballito",
    type: "abierta",
    rating: 4.8,
    priceFrom: 8500,
    priceTo: 12000,
    lat: -34.6158,
    lng: -58.4333,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",
    description: "Cancha ideal para partidos entre amigos.",
    address: "Caballito, Buenos Aires",

    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },

    features: [
      "Iluminación",
      "Vestuarios",
      "Duchas",
      "Baños"
    ],

    buffet: [
      "Empanadas",
      "Bebidas"
    ],

    extraInfo: [
      "Estacionamiento: 10 espacios",
      "Cajero automático cercano"
    ],

    booking: {
     players: "5 vs 5",
     surface: "Césped sintético",

     // For calls
     phone: "+54 11 1234-5678",

     // For WhatsApp
     whatsapp: "5491112345678"
    }
  },

  //Array Object 2
  {
    id: "el-templo-del-gol",
    name: "El Templo del Gol",
    location: "Belgrano",
    type: "techada",
    rating: 4.9,
    priceFrom: 11000,
    priceTo: 15000,
    lat: -34.555,
    lng: -58.450,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
    description: "Cancha premium techada.",
    address: "Belgrano, Buenos Aires",

    schedule: {
      week: "10:00 - 00:00",
      weekend: "09:00 - 02:00"
    },

    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas",
      "Estacionamiento"
    ],

    buffet: [
      "Pizzas",
      "Hamburguesas",
      "Bebidas"
    ],

    extraInfo: [
      "Estacionamiento: 20 espacios",
      "Zona gastronómica cercana"
    ],

    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      // For calls
      phone: "+54 11 1234-5678",
      // For WhatsApp
      whatsapp: "5491112345678"
    
    }
  },

  //Array Object 3
  {
    id: "potrero-del-10",
    name: "Potrero del 10",
    location: "Villa Crespo",
    type: "abierta",
    rating: 4.3,
    priceFrom: 7000,
    priceTo: 10000,
    lat: -34.600,
    lng: -58.430,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-sin-techo_jizma0.jpg",
    description: "Potrero abierto ideal para partidos entre amigos.",
    address: "Villa Crespo, Buenos Aires",

    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },

    features: [
      "Iluminación",
      "Baños"
    ],

    buffet: [
      "Bebidas"
    ],

    extraInfo: [
      "Sin estacionamiento",
      "Zona tranquila"
    ],

    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 4
  {
    id: "la-joya-de-nuñez",
    name: "La Joya de Núñez",
    location: "Núñez",
    type: "techada",
    rating: 4.6,
    priceFrom: 9000,
    priceTo: 13000,
    lat: -34.540,
    lng: -58.470,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
    description: "Cancha techada moderna en Núñez.",
    address: "Núñez, Buenos Aires",
    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas"
    ],
    buffet: [
      "Bebidas",
      "Sándwiches"
    ],
    extraInfo: [
      "Estacionamiento cercano",
      "Zona comercial"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 5
  {
    id: "real-atletico-palermo",
    name: "Real Atlético Palermo",
    location: "Palermo",
    type: "abierta",
    rating: 4.5,
    priceFrom: 10000,
    priceTo: 14000,
    lat: -34.580,
    lng: -58.420,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
    description: "Campo abierto con buena superficie.",
    address: "Palermo, Buenos Aires",
    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Iluminación",
      "Baños",
      "Estacionamiento"
    ],
    buffet: [
      "Hamburguesas",
      "Bebidas"
    ],
    extraInfo: [
      "Zona gastronómica cercana",
      "Fácil acceso"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+54 11 1234-5678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 6
  {
    id: "la-gambeta-eterna",
    name: "La Gambeta Eterna",
    location: "Boedo",
    type: "abierta",
    rating: 4.2,
    priceFrom: 6500,
    priceTo: 9500,
    lat: -34.610,
    lng: -58.410,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-6-sin-techo_mrgvjc.jpg",
    description: "Potrero clásico de Boedo.",
    address: "Boedo, Buenos Aires",
    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    buffet: [
      "Bebidas"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Sin estacionamiento"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 7
  {
    id: "el-caño-perfecto",
    name: "El Caño Perfecto",
    location: "Palermo",
    type: "techada",
    rating: 4.7,
    priceFrom: 10500,
    priceTo: 13000,
    lat: -34.575,
    lng: -58.425,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
    description: "Cancha techada top en Palermo.",
    address: "Palermo, Buenos Aires",
    schedule: {
      week: "10:00 - 00:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Estacionamiento",
      "Vestuarios"
    ],
    buffet: [
      "Pizzas",
      "Bebidas"
    ],
    extraInfo: [
      "Cajero cercano",
      "Zona segura"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 8
  {
    id: "potrero-central",
    name: "Potrero Central",
    location: "Caballito",
    type: "abierta",
    rating: 4.4,
    priceFrom: 8000,
    priceTo: 11000,
    lat: -34.565,
    lng: -58.455,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",
    description: "Potrero abierto céntrico en Caballito.",
    address: "Caballito, Buenos Aires",
    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    buffet: [
      "Empanadas",
      "Bebidas"
    ],
    extraInfo: [
      "Estacionamiento limitado",
      "Buen ambiente"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 9
  {
    id: "la-10-eterna",
    name: "La 10 Eterna",
    location: "Belgrano",
    type: "abierta",
    rating: 4.6,
    priceFrom: 9000,
    priceTo: 12500,
    lat: -34.550,
    lng: -58.460,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-5-sin-techo_jizma0.jpg",
    description: "Cancha abierta con estilo en Belgrano.",
    address: "Belgrano, Buenos Aires",
    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Duchas",
      "Baños"
    ],
    buffet: [
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Cercano a transporte",
      "Zona tranquila"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 10
  {
    id: "estadio-del-barrio",
    name: "Estadio del Barrio",
    location: "Villa Crespo",
    type: "abierta",
    rating: 4.1,
    priceFrom: 7500,
    priceTo: 10000,
    lat: -34.595,
    lng: -58.435,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
    description: "Cancha abierta ideal para partidos de barrio.",
    address: "Villa Crespo, Buenos Aires",
    schedule: {
      week: "09:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    buffet: [
      "Bebidas"
    ],
    extraInfo: [
      "Espacio reducido",
      "Fácil acceso"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 11
  {
    id: "gol-de-media-cancha",
    name: "Gol de Media Cancha",
    location: "Núñez",
    type: "techada",
    rating: 4.8,
    priceFrom: 10000,
    priceTo: 13500,
    lat: -34.540,
    lng: -58.470,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
    description: "Cancha techada premium en Núñez.",
    address: "Núñez, Buenos Aires",
    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas"
    ],
    buffet: [
      "Pizzas",
      "Bebidas"
    ],
    extraInfo: [
      "Cajero cercano",
      "Zona deportiva"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 12
  {
    id: "la-cancha-del-pueblo",
    name: "La Cancha del Pueblo",
    location: "Boedo",
    type: "abierta",
    rating: 4.3,
    priceFrom: 6500,
    priceTo: 9000,
    lat: -34.610,
    lng: -58.410,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-6-sin-techo_mrgvjc.jpg",
    description: "Cancha popular de Boedo.",
    address: "Boedo, Buenos Aires",
    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    buffet: [
      "Bebidas"
    ],
    extraInfo: [
      "Sin estacionamiento",
      "Buenas tarifas"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 13
  {
    id: "el-clasico-5",
    name: "El Clásico 5",
    location: "Palermo",
    type: "abierta",
    rating: 4.5,
    priceFrom: 10000,
    priceTo: 13000,
    lat: -34.580,
    lng: -58.420,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453686/cancha-4-sin-techo_o6y5xe.jpg",
    description: "Cancha abierta estilo clásico en Palermo.",
    address: "Palermo, Buenos Aires",
    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Iluminación",
      "Vestuarios",
      "Baños"
    ],
    buffet: [
      "Empanadas",
      "Bebidas"
    ],
    extraInfo: [
      "Zona gastronómica cercana",
      "Cercano a transporte"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 14
  {
    id: "potrero-elite",
    name: "Potrero Elite",
    location: "Belgrano",
    type: "techada",
    rating: 4.7,
    priceFrom: 11000,
    priceTo: 14500,
    lat: -34.555,
    lng: -58.450,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-2-techo_xbxmi4.webp",
    description: "Potrero techado premium en Belgrano.",
    address: "Belgrano, Buenos Aires",
    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Estacionamiento"
    ],
    buffet: [
      "Pizzas",
      "Bebidas"
    ],
    extraInfo: [
      "Estacionamiento amplio",
      "Acceso rápido"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 15
  {
    id: "la-zurda-magica",
    name: "La Zurda Mágica",
    location: "Caballito",
    type: "abierta",
    rating: 4.4,
    priceFrom: 8000,
    priceTo: 11500,
    lat: -34.565,
    lng: -58.455,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453685/cancha-3-sin-techo_ltwtj0.jpg",
    description: "Cancha abierta con buena energía.",
    address: "Caballito, Buenos Aires",
    schedule: {
      week: "09:00 - 23:00",
      weekend: "08:00 - 00:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    buffet: [
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Espacio limitado",
      "Ambiente animado"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 16
  {
    id: "cancha-leyenda",
    name: "Cancha Leyenda",
    location: "Núñez",
    type: "techada",
    rating: 4.9,
    priceFrom: 11500,
    priceTo: 15000,
    lat: -34.540,
    lng: -58.470,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1774453684/cancha-3-techo_qfvkud.jpg",
    description: "Cancha techada legendaria en Núñez.",
    address: "Núñez, Buenos Aires",
    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas",
      "Estacionamiento"
    ],
    buffet: [
      "Pizzas",
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Servicios premium",
      "Cercana a estación"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 17
  {
    id: "de-cabeza-futbol",
    name: "De Cabeza Fútbol",
    location: "Villa Mercedes",
    type: "abierta",
    rating: 4.5,
    priceFrom: 8000,
    priceTo: 12000,
    lat: -33.6875393,
    lng: -65.4375539,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68",
    description: "Cancha abierta en Villa Mercedes.",
    address: "Villa Mercedes, San Luis",
    schedule: {
      week: "09:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    buffet: [
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Ubicación provincial",
      "Cercano a acceso"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 18
  {
    id: "el-bernabeu-mercedes",
    name: "El Bernabéu Mercedes",
    location: "Villa Mercedes",
    type: "techada",
    rating: 5.0,
    priceFrom: 10000,
    priceTo: 15000,
    lat: -33.7087688,
    lng: -65.4662115,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    description: "Infraestructura techada en Mercedes.",
    address: "Villa Mercedes, San Luis",
    schedule: {
      week: "10:00 - 01:00",
      weekend: "09:00 - 02:00"
    },
    features: [
      "Iluminación",
      "Techada",
      "Vestuarios",
      "Duchas"
    ],
    buffet: [
      "Hamburguesas",
      "Bebidas"
    ],
    extraInfo: [
      "Cancha de calidad",
      "Apto para torneos"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped sintético",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

    //Array Object 19
  {
    id: "potrero-lainez",
    name: "Potrero Lainez",
    location: "Villa Mercedes",
    type: "abierta",
    rating: 4.6,
    priceFrom: 7000,
    priceTo: 11000,
    lat: -33.6722699,
    lng: -65.4697574,
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
    description: "Potrero abierto con buena cancha.",
    address: "Villa Mercedes, San Luis",
    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    buffet: [
      "Bebidas"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Estacionamiento cercano"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

  //Array Object 20
  {
    id: "el-bosque-futbol",
    name: "El Bosque Fútbol",
    location: "Villa Mercedes",
    type: "abierta",
    rating: 4.2,
    priceFrom: 6500,
    priceTo: 10500,
    lat: -33.7148971,
    lng: -65.4696884,
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
    description: "Potrero abierto rodeado de verde.",
    address: "Villa Mercedes, San Luis",
    schedule: {
      week: "08:00 - 22:00",
      weekend: "08:00 - 23:00"
    },
    features: [
      "Iluminación",
      "Baños"
    ],
    buffet: [
      "Bebidas",
      "Snacks"
    ],
    extraInfo: [
      "Entorno tranquilo",
      "Fácil acceso"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped natural",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  },

    //Array Object 21
  {
    id: "la-bombonera-5",
    name: "La Bombonera 5",
    location: "La Boca",
    type: "abierta",
    rating: 4.2,
    priceFrom: 6500,
    priceTo: 9500,
    lat: -34.6234,
    lng: -58.4418,
    image: "https://res.cloudinary.com/dolmulmgp/image/upload/v1777570021/la-bombonera-cancha-de-futbol-villavicencio-6628-768x432_bpg8xb.jpg",
    description: "Cancha La Bombonera 5",
    address: "La Boca, Buenos Aires",
    schedule: {
      week: "09:00 - 22:00",
      weekend: "09:00 - 22:00"
    },
    features: [
      "Cajero cerca"
    ],
    buffet: [
      "Bebidas",
      "Snacks",
      "Empanadas",
      "Pizzas",
      "Hamburguesas"
    ],
    extraInfo: [
      "Ambiente familiar",
      "Sin estacionamiento",
      "Zona segura",
      "Cercano a transporte"
    ],
    booking: {
      players: "5 vs 5",
      surface: "Césped",
      phone: "+541112345678",
      whatsapp: "5491112345678"
    }
  }
];