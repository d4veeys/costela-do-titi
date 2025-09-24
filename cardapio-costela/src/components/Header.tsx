'use client'
import { useState } from 'react'
import { ShoppingCart, MapPin, Clock, Menu, X } from 'lucide-react'
import { RESTAURANT_CONFIG } from '@/lib/data'

interface HeaderProps {
  deliveryMode: 'local' | 'delivery'
  onDeliveryModeChange: (mode: 'local' | 'delivery') => void
  cartItemsCount: number
  onCartClick: () => void
}

export function Header({
  deliveryMode,
  onDeliveryModeChange,
  cartItemsCount,
  onCartClick
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white text-center py-3 px-4 sticky top-0 z-50">
        <p className="text-sm font-semibold">
          Os melhores sanduíches de costela defumada de Porto Velho!
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-12 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4 md:hidden">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl">
                🍖
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {RESTAURANT_CONFIG.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {RESTAURANT_CONFIG.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors touch-target"
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors touch-target md:hidden"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-2xl">
                🍖
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {RESTAURANT_CONFIG.name}
                </h1>
                <p className="text-gray-600">
                  {RESTAURANT_CONFIG.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span>4.8 (234)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>25-35 min</span>
                </div>
              </div>

              <button
                onClick={onCartClick}
                className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Delivery Mode Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-full mt-4 max-w-sm mx-auto md:mx-0">
            <button
              onClick={() => onDeliveryModeChange('local')}
              className={`
                flex-1 py-3 px-4 rounded-full font-medium transition-all duration-200 text-sm md:text-base
                ${deliveryMode === 'local'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              Comer no Local
            </button>
            <button
              onClick={() => onDeliveryModeChange('delivery')}
              className={`
                flex-1 py-3 px-4 rounded-full font-medium transition-all duration-200 text-sm md:text-base
                ${deliveryMode === 'delivery'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              Delivery
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">
                    {RESTAURANT_CONFIG.address}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">
                    {RESTAURANT_CONFIG.hours}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-sm">4.8 (234 avaliações)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}