import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Address } from '@/types'

interface AddressState {
    addresses: Address[]
    addAddress: (address: Omit<Address, 'id' | 'created_at'>) => void
    updateAddress: (id: string, address: Partial<Address>) => void
    removeAddress: (id: string) => void
    setDefaultAddress: (id: string) => void
    getDefaultAddress: () => Address | undefined
}

export const useAddressStore = create<AddressState>()(
    persist(
        (set, get) => ({
            addresses: [
                // Sample addresses for demo
                {
                    id: 'addr-1',
                    user_id: 'user-1',
                    city: 'Mumbai',
                    pincode: '400001',
                    full_address: '123 Green Park, Andheri West',
                    landmark: 'Near Metro Station',
                    is_default: true,
                    created_at: new Date().toISOString(),
                },
                {
                    id: 'addr-2',
                    user_id: 'user-1',
                    city: 'Mumbai',
                    pincode: '400053',
                    full_address: '456 Palm Heights, Bandra East',
                    landmark: 'Opposite City Mall',
                    is_default: false,
                    created_at: new Date().toISOString(),
                },
            ],

            addAddress: (addressData) => {
                const newAddress: Address = {
                    ...addressData,
                    id: `addr-${Date.now()}`,
                    created_at: new Date().toISOString(),
                }

                set((state) => {
                    // If this is the first address or marked as default, update others
                    if (addressData.is_default || state.addresses.length === 0) {
                        return {
                            addresses: [
                                ...state.addresses.map((a) => ({ ...a, is_default: false })),
                                { ...newAddress, is_default: true },
                            ],
                        }
                    }
                    return { addresses: [...state.addresses, newAddress] }
                })
            },

            updateAddress: (id, updates) => {
                set((state) => ({
                    addresses: state.addresses.map((a) =>
                        a.id === id ? { ...a, ...updates } : a
                    ),
                }))
            },

            removeAddress: (id) => {
                set((state) => {
                    const filtered = state.addresses.filter((a) => a.id !== id)
                    // If we removed the default address, set the first one as default
                    if (filtered.length > 0 && !filtered.some((a) => a.is_default)) {
                        filtered[0].is_default = true
                    }
                    return { addresses: filtered }
                })
            },

            setDefaultAddress: (id) => {
                set((state) => ({
                    addresses: state.addresses.map((a) => ({
                        ...a,
                        is_default: a.id === id,
                    })),
                }))
            },

            getDefaultAddress: () => {
                return get().addresses.find((a) => a.is_default)
            },
        }),
        {
            name: 'pureingo-addresses',
        }
    )
)
