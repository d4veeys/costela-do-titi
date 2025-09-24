// src/lib/data.ts
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: 'sandwiches' | 'drinks' | 'sides'
  image?: string
  available: boolean
  customizable?: boolean
  badges?: string[]
  features?: string[]
  rating?: number
  reviews?: number
  flavors?: string[]
}

export interface Additional {
  id: string
  name: string
  description: string
  price: number
}

// Migração dos seus produtos atuais
export const PRODUCTS: Product[] = [
  // Sanduíches
  {
    id: 'casa',
    name: 'Pão da Casa',
    description: 'Pão artesanal, costela desfiada 100g, queijo derretido, alface e banana frita, cebola roxa.',
    price: 20.00,
    originalPrice: 25.00,
    category: 'sandwiches',
    available: true,
    customizable: true,
    badges: ['popular', 'discount'],
    features: ['25 min', 'Defumado', '100g'],
    rating: 4.8,
    reviews: 89,
    image: '/images/pao-da-casa.jpg'
  },
  {
    id: 'titi',
    name: 'Pão do Titi',
    description: 'Pão especial, costela premium 150g, queijo mussarela, bacon crocante, alface, cebola roxa e banana frita.',
    price: 27.00,
    category: 'sandwiches',
    available: true,
    customizable: true,
    badges: ['bestseller', 'recommended'],
    features: ['Premium', 'Defumado 12h', 'Premiado'],
    rating: 4.9,
    reviews: 156,
    image: '/images/pao-do-titi.jpg'
  },
  {
    id: 'premium',
    name: 'Cupim Premium',
    description: 'Pão baguete artesanal, Cupim premium 150g, queijo cheddar, cebola caramelizada e molho barbecue.',
    price: 29.90,
    category: 'sandwiches',
    available: false,
    customizable: true,
    badges: ['premium', 'exclusive'],
    features: ['Gourmet', '180g', 'Chef'],
    rating: 4.9,
    reviews: 67,
    image: '/images/cupim-premium.jpg'
  },

  // Bebidas
  {
    id: 'agua_mineral',
    name: 'Água Mineral',
    description: 'Água mineral natural gelada 500ml',
    price: 3.00,
    category: 'drinks',
    available: true,
    image: '/images/agua-mineral.jpg'
  },
  {
    id: 'agua_gas',
    name: 'Água Mineral c/ Gás',
    description: 'Água mineral com gás gelada 500ml',
    price: 4.00,
    category: 'drinks',
    available: true,
    image: '/images/agua-gas.jpg'
  },
  {
    id: 'refri_lata',
    name: 'Refrigerante Lata',
    description: 'Refrigerante gelado 350ml - Escolha o sabor',
    price: 6.00,
    category: 'drinks',
    available: true,
    flavors: ['Coca-Cola', 'Coca Zero', 'Guaraná', 'Guaraná Zero', 'Fanta'],
    image: '/images/refri-lata.jpg'
  },
  {
    id: 'refri_1l',
    name: 'Refrigerante 1L',
    description: 'Refrigerante 1L para compartilhar - Escolha o sabor',
    price: 11.00,
    category: 'drinks',
    available: true,
    flavors: ['Coca Litro', 'Guaraná Litro', 'Fanta Litro'],
    image: '/images/refri-1l.jpg'
  },

  // Acompanhamentos
  {
    id: 'batata_150',
    name: 'Batata Frita 150g',
    description: 'Batata rústica crocante individual',
    price: 10.00,
    category: 'sides',
    available: true,
    image: '/images/batata-150g.jpg'
  },
  {
    id: 'batata_300',
    name: 'Batata Frita 250g',
    description: 'Batata rústica crocante para compartilhar',
    price: 15.00,
    category: 'sides',
    available: true,
    image: '/images/batata-300g.jpg'
  }
]

// Adicionais migrados do seu projeto
export const ADDITIONALS: Additional[] = [
  {
    id: 'requeijao',
    name: 'Requeijão',
    description: 'Requeijão cremoso',
    price: 3.00
  },
  {
    id: 'bacon',
    name: 'Bacon',
    description: 'Bacon crocante defumado',
    price: 3.00
  },
  {
    id: 'banana',
    name: 'Banana Frita',
    description: 'Banana doce dourada',
    price: 2.00
  },
  {
    id: 'queijo_extra',
    name: 'Queijo Extra',
    description: 'Porção extra de queijo derretido',
    price: 4.00
  },
  {
    id: 'molho_barbecue',
    name: 'Molho Barbecue',
    description: 'Molho barbecue artesanal',
    price: 2.50
  },
  {
    id: 'molho_picante',
    name: 'Molho Picante',
    description: 'Pimenta especial da casa',
    price: 2.00
  }
]

// Configurações do restaurante
export const RESTAURANT_CONFIG = {
  name: 'Costela do Titi',
  subtitle: 'Sanduíches Gourmet',
  phone: '5569992588282',
  address: 'Av. Tiradentes, 2958 - Embratel',
  fullAddress: 'Porto Velho - RO, 76820-882',
  hours: 'Seg-Dom: 11h às 23h',
  deliveryText: 'A combinar',
  whatsappNumber: '5569992588282',
  coordinates: {
    lat: -8.7619,
    lng: -63.9039
  },
  deliveryRanges: [
    { maxDistance: 3, price: 5.00 },
    { maxDistance: 6, price: 8.00 },
    { maxDistance: 10, price: 12.00 },
    { maxDistance: 15, price: 18.00 }
  ]
}

// Utilitários
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(product => product.category === category)
}

export function formatPrice(price: number): string {
  return `R$ ${price.toFixed(2).replace('.', ',')}`
}

export function getBadgeText(badge: string): string {
  const badges = {
    popular: 'Mais Pedido',
    discount: '-20%',
    bestseller: 'Best Seller', 
    recommended: 'Recomendado',
    premium: 'Premium',
    exclusive: 'Exclusivo'
  }
  return badges[badge as keyof typeof badges] || badge
}

export function getBadgeColor(badge: string): string {
  const colors = {
    popular: 'bg-orange-500',
    discount: 'bg-red-500',
    bestseller: 'bg-yellow-500',
    recommended: 'bg-green-500',
    premium: 'bg-purple-500',
    exclusive: 'bg-gray-800'
  }
  return colors[badge as keyof typeof colors] || 'bg-gray-500'
}