'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Product, ADDITIONALS, formatPrice } from '@/lib/data'
import Image from 'next/image'

interface CustomizeModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (
    product: Product, 
    customizations?: { additionals: string[], notes?: string }, 
    flavor?: string
  ) => void
}

export function CustomizeModal({ product, isOpen, onClose, onAddToCart }: CustomizeModalProps) {
  const [selectedAdditionals, setSelectedAdditionals] = useState<string[]>([])
  const [selectedFlavor, setSelectedFlavor] = useState('')
  const [notes, setNotes] = useState('')

  if (!isOpen || !product) return null

  const handleAdditionalToggle = (additionalId: string) => {
    setSelectedAdditionals(prev => 
      prev.includes(additionalId)
        ? prev.filter(id => id !== additionalId)
        : [...prev, additionalId]
    )
  }

  const calculateTotalPrice = () => {
    let total = product.price
    selectedAdditionals.forEach(id => {
      const additional = ADDITIONALS.find(a => a.id === id)
      if (additional) total += additional.price
    })
    return total
  }

  const handleAddToCart = () => {
    const customizations = {
      additionals: selectedAdditionals,
      notes: notes.trim() || undefined
    }

    onAddToCart(
      product, 
      selectedAdditionals.length > 0 || notes.trim() ? customizations : undefined,
      selectedFlavor || undefined
    )

    // Reset form
    setSelectedAdditionals([])
    setSelectedFlavor('')
    setNotes('')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Personalizar Pedido
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  '🍖'
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <span className="text-lg font-semibold text-primary-600">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Flavors */}
            {product.flavors && product.flavors.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Escolha o sabor <span className="text-red-500">*</span>
                </h4>
                <div className="space-y-2">
                  {product.flavors.map(flavor => (
                    <label key={flavor} className="flex items-center">
                      <input
                        type="radio"
                        name="flavor"
                        value={flavor}
                        checked={selectedFlavor === flavor}
                        onChange={(e) => setSelectedFlavor(e.target.value)}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-3 text-gray-700">{flavor}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Additionals */}
            {product.customizable && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Adicionais</h4>
                <div className="space-y-3">
                  {ADDITIONALS.map(additional => (
                    <label key={additional.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAdditionals.includes(additional.id)}
                          onChange={() => handleAdditionalToggle(additional.id)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <div className="ml-3">
                          <div className="text-gray-700 font-medium">
                            {additional.name}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {additional.description}
                          </div>
                        </div>
                      </div>
                      <span className="text-primary-600 font-medium">
                        + {formatPrice(additional.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Observações (opcional)
              </h4>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Alguma observação especial para seu pedido?"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.flavors && product.flavors.length > 0 && !selectedFlavor}
              className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Adicionar • {formatPrice(calculateTotalPrice())}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}