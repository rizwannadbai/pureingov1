"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Truck, MapPin, Phone, Package, Calendar, User } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface DeliveryOrder {
    id: string
    created_at: string
    delivery_date: string | null
    order_status: string
    delivery_address: any // Simplified for now
    profiles: { full_name: string; phone: string } | null
    driver: { full_name: string; phone: string }[] | null
}

export default function AdminDeliveryPage() {
    const [deliveries, setDeliveries] = useState<DeliveryOrder[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchDeliveries()
    }, [])

    const fetchDeliveries = async () => {
        try {
            // Fetch orders that are ready for delivery or out for delivery
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    id,
                    created_at,
                    delivery_date,
                    order_status,
                    profiles!user_id (full_name, phone),
                    driver:driver_id (full_name, phone)
                `)
                .in('order_status', ['processing', 'out_for_delivery', 'confirmed'])
                .order('delivery_date', { ascending: true })

            if (!error && data) {
                // @ts-ignore - Supabase types are dynamic
                setDeliveries(data as any)
            }
        } catch (error) {
            console.error('Error fetching deliveries:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Delivery Management</h1></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Delivery Management</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Track pending deliveries and assign drivers</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deliveries.map((order, index) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300`}>
                                    {order.order_status.replace(/_/g, ' ').toUpperCase()}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">Order #{order.id.slice(0, 6)}</h3>
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <Package className="w-5 h-5 text-gray-500" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <User className="w-4 h-4 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.profiles?.full_name || 'Guest'}</p>
                                    <p className="text-xs text-gray-500">{order.profiles?.phone || 'No phone'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Truck className="w-4 h-4 text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {order.driver && order.driver[0] ? order.driver[0].full_name : 'Unassigned'}
                                    </p>
                                    {order.driver && order.driver[0] ? (
                                        <p className="text-xs text-green-600">Driver Assigned</p>
                                    ) : (
                                        <p className="text-xs text-orange-500">No driver assigned</p>
                                    )}
                                </div>
                            </div>

                            {order.delivery_date && (
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {new Date(order.delivery_date).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                            <Button className="flex-1" variant={order.driver && order.driver[0] ? "outline" : "default"} size="sm">
                                {order.driver && order.driver[0] ? 'Change Driver' : 'Assign Driver'}
                            </Button>
                            <Button variant="outline" size="sm">
                                View
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {deliveries.length === 0 && (
                <div className="text-center py-12">
                    <Truck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No pending deliveries found</p>
                </div>
            )}
        </div>
    )
}
