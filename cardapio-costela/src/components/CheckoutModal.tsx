'use client'
import { useState } from 'react'
import { X, MapPin, User, Phone, MessageCircle } from 'lucide-react'
import { CartItem } from '@/hooks/useCart'
import { formatPrice, RESTAURANT_CONFIG } from '@/lib/data'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  deliveryMode: 'local' | 'delivery'
  items: CartItem[]
  subtotal: number
  onOrderComplete: () => void
  generateWhatsAppMessage: (customerData: any, deliveryMode: string) => string
}

export function CheckoutModal({
  isOpen,
  onClose,
  deliveryMode,
  items,
  subtotal,
  onOrderComplete,
  generateWhatsAppMessage
}: CheckoutModalProps) {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    notes: '',
    address: deliveryMode === 'delivery' ? {
      street: '',
      number: '',
      neighborhood: '',
      city: 'Porto Velho',
      state: 'RO',
      cep: '',
      complement: ''
    } : null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const message = generateWhatsAppMessage(customerData, deliveryMode)
      const whatsappUrl = `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
      
      window.open(whatsappUrl, '_blank')
      
      // Clear cart and close modal
      setTimeout(() => {
        onOrderComplete()
        onClose()
        setIsSubmitting(false)
      }, 1000)
      
    } catch (error) {
      console.error('Erro ao enviar pedido:', error)
      setIsSubmitting(false)
    }
  }

  const updateCustomerData = (field: string, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateAddressData = (field: string, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      address: prev.address ? {
        ...prev.address,
        [field]: value
      } : null
    }))
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Finalizar Pedido
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Customer Info */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="flex items-center space-x-2 text-lg font-medium text-gray-900 mb-4">
                <User size={20} />
                <span>Seus Dados</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerData.name}
                    onChange={(e) => updateCustomerData('name', e.target.value)}
                    className="input-field"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerData.phone}
                    onChange={(e) => updateCustomerData('phone', e.target.value)}
                    className="input-field"
                    placeholder="(69) 99999-9999"
                  />
                </div>
              </div>
            </div>

            {/* Address (if delivery) */}
            {deliveryMode === 'delivery' && customerData.address && (
              <div className="p-6 border-b border-gray-200">
                <h3 className="flex items-center space-x-2 text-lg font-medium text-gray-900 mb-4">
                  <MapPin size={20} />
                  <span>Endereço de Entrega</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rua *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerData.address.street}
                      onChange={(e) => updateAddressData('street', e.target.value)}
                      className="input-field"
                      placeholder="Nome da rua"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerData.address.number}
                      onChange={(e) => updateAddressData('number', e.target.value)}
                      className="input-field"
                      placeholder="123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerData.address.neighborhood}
                      onChange={(e) => updateAddressData('neighborhood', e.target.value)}
                      className="input-field"
                      placeholder="Nome do bairro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={customerData.address.cep}
                      onChange={(e) => updateAddressData('cep', e.target.value)}
                      className="input-field"
                      placeholder="76820-000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complemento
                    </label>
                    <input
                      type="text"
                      value={customerData.address.complement}
                      onChange={(e) => updateAddressData('complement', e.target.value)}
                      className="input-field"
                      placeholder="Apto, casa, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="flex items-center space-x-2 text-lg font-medium text-gray-900 mb-4">
                <MessageCircle size={20} />
                <span>Observações</span>
              </h3>
              <textarea
                value={customerData.notes}
                onChange={(e) => updateCustomerData('notes', e.target.value)}
                rows={3}
                className="input-field"
                placeholder="Alguma observação adicional sobre o pedido?"
              />
            </div>

            {/* Order Summary */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Resumo do Pedido
              </h3>
              
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.quantity}x {item.name}</span>
                      {item.flavor && (
                        <span className="text-gray-600 text-sm ml-2">({item.flavor})</span>
                      )}
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.totalPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Subtotal:</span>
                  <span className="text-primary-600">{formatPrice(subtotal)}</span>
                </div>
                {deliveryMode === 'delivery' && (
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                    <span>Taxa de entrega:</span>
                    <span>A combinar</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>
                  {isSubmitting ? 'Enviando...' : 'Enviar Pedido via WhatsApp'}
                </span>
              </button>

              <p className="text-center text-sm text-gray-600 mt-3">
                Seu pedido será enviado via WhatsApp para confirmarmos os detalhes
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}