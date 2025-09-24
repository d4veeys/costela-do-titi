// src/components/ProductCard.tsx
'use client'

import { Product } from '@/lib/data'
import { formatPrice } from '@/lib/data'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onCustomize?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart, onCustomize }: ProductCardProps) {
  const getBadgeColor = (badge: string) => {
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

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🍖
          </div>
        )}
        
        {/* Badges */}
        {product.badges && (
          <div className="absolute top-3 left-3 flex gap-2">
            {product.badges.map(badge => (
              <span 
                key={badge}
                className={`${getBadgeColor(badge)} text-white text-xs font-bold px-2 py-1 rounded-full`}
              >
                {badge === 'discount' ? '-20%' : badge}
              </span>
            ))}
          </div>
        )}

        {/* Status */}
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold">
              Indisponível
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        {product.features && (
          <div className="flex gap-2 mb-3">
            {product.features.map(feature => (
              <span 
                key={feature}
                className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">
              {'★'.repeat(5)}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Actions */}
        {product.available ? (
          <div className="flex gap-2">
            {product.customizable && onCustomize && (
              <button
                onClick={() => onCustomize(product)}
                className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Personalizar
              </button>
            )}
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Adicionar
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
          >
            Indisponível
          </button>
        )}
      </div>
    </div>
  )
}
