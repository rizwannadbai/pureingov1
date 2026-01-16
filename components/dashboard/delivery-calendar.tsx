"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Truck, CheckCircle2, Clock, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Delivery {
    id: string
    date: Date
    productName: string
    status: 'delivered' | 'scheduled' | 'skipped'
}

// Sample delivery data - in production from API
const generateSampleDeliveries = (): Delivery[] => {
    const today = new Date()
    const deliveries: Delivery[] = []

    // Past deliveries (delivered)
    for (let i = -7; i < 0; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        deliveries.push({
            id: `delivery-${i}`,
            date: date,
            productName: "Fresh Fruit Box",
            status: 'delivered',
        })
    }

    // Today
    deliveries.push({
        id: `delivery-today`,
        date: new Date(today),
        productName: "Fresh Fruit Box",
        status: 'scheduled',
    })

    // Future deliveries (scheduled)
    for (let i = 1; i <= 7; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        deliveries.push({
            id: `delivery-${i}`,
            date: date,
            productName: "Fresh Fruit Box",
            status: 'scheduled',
        })
    }

    return deliveries
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

export function DeliveryCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const deliveries = useMemo(() => generateSampleDeliveries(), [])

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const today = new Date()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay()

    const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1))
    const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

    const getDeliveryStatus = (date: Date): 'delivered' | 'scheduled' | 'skipped' | null => {
        const delivery = deliveries.find(d =>
            d.date.getDate() === date.getDate() &&
            d.date.getMonth() === date.getMonth() &&
            d.date.getFullYear() === date.getFullYear()
        )
        return delivery?.status || null
    }

    const isToday = (date: Date) => {
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }

    const calendarDays = useMemo(() => {
        const days: (Date | null)[] = []
        for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day))
        }
        return days
    }, [year, month, daysInMonth, startingDayOfWeek])

    // Stats
    const delivered = deliveries.filter(d => d.status === 'delivered').length
    const scheduled = deliveries.filter(d => d.status === 'scheduled').length

    return (
        <div className="max-w-md">
            {/* Card Container */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-fresh-500 to-emerald-500 px-5 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <CalendarDays className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-white">Delivery Schedule</h2>
                                <p className="text-xs text-white/70">Track your subscriptions</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50/50">
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900">{delivered}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Delivered</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900">{scheduled}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Scheduled</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                    <button
                        onClick={goToPreviousMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 text-gray-500" />
                    </button>
                    <h3 className="text-sm font-semibold text-gray-800">
                        {MONTHS[month]} {year}
                    </h3>
                    <button
                        onClick={goToNextMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                </div>

                {/* Calendar */}
                <div className="p-4">
                    {/* Weekdays */}
                    <div className="grid grid-cols-7 mb-2">
                        {WEEKDAYS.map((day, i) => (
                            <div key={i} className="text-center text-[10px] font-semibold text-gray-400 uppercase tracking-wider py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((date, index) => {
                            if (!date) return <div key={`empty-${index}`} className="aspect-square" />

                            const status = getDeliveryStatus(date)
                            const isTodayDate = isToday(date)
                            const isPast = date < today && !isTodayDate

                            return (
                                <div
                                    key={date.toISOString()}
                                    className={`
                                        aspect-square flex flex-col items-center justify-center rounded-xl text-sm relative
                                        transition-all duration-200 cursor-default
                                        ${isTodayDate
                                            ? 'bg-fresh-500 text-white shadow-md shadow-fresh-500/30'
                                            : isPast
                                                ? 'text-gray-400'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <span className={`font-medium ${isTodayDate ? 'text-white' : ''}`}>
                                        {date.getDate()}
                                    </span>

                                    {/* Status dot */}
                                    {status && !isTodayDate && (
                                        <div className={`
                                            absolute bottom-1 w-1.5 h-1.5 rounded-full
                                            ${status === 'delivered' ? 'bg-green-500' :
                                                status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-300'}
                                        `} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Today's Delivery */}
                <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-fresh-50 to-emerald-50 rounded-xl border border-fresh-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-fresh-500 rounded-xl flex items-center justify-center shadow-md">
                                <Truck className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-fresh-600 font-medium">Today&apos;s Delivery</p>
                                <p className="font-semibold text-gray-900">Fresh Fruit Box</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                Scheduled
                            </span>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="px-4 pb-4">
                    <div className="flex justify-center gap-6 py-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <span className="text-xs text-gray-500">Delivered</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <span className="text-xs text-gray-500">Scheduled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
