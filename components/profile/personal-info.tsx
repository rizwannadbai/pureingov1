"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, Phone, Calendar, MapPin, Globe, CheckCircle, AlertCircle, Edit2, Save, X, Loader2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

interface PersonalInfoProps {
    data: {
        fullName: string
        email: string
        phone: string
        dateOfBirth?: string
        gender?: string
        address?: string
        language?: string
    }
    isLoading?: boolean
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    onSave?: (data: PersonalInfoProps['data']) => Promise<void>
    onVerifyPhone?: () => void
}

export function PersonalInfo({ data, isLoading, isEmailVerified, isPhoneVerified, onSave, onVerifyPhone }: PersonalInfoProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState(data)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.fullName?.trim()) newErrors.fullName = "Name is required"
        if (formData.phone && !/^[+]?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = "Invalid phone number"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSave = async () => {
        if (!validate()) return
        setIsSaving(true)
        try {
            await onSave?.(formData)
            toast.success("Profile updated successfully!")
            setIsEditing(false)
        } catch {
            toast.error("Failed to update profile")
        }
        setIsSaving(false)
    }

    const handleCancel = () => {
        setFormData(data)
        setErrors({})
        setIsEditing(false)
    }

    if (isLoading) {
        return (
            <div className="bg-white rounded-3xl border border-fresh-100 p-6 shadow-lg">
                <Skeleton className="h-7 w-48 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                            <Skeleton className="w-12 h-12 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const fields = [
        { key: 'fullName', label: 'Full Name', icon: User, type: 'text' },
        { key: 'email', label: 'Email Address', icon: Mail, verified: isEmailVerified, editable: false },
        { key: 'phone', label: 'Mobile Number', icon: Phone, verified: isPhoneVerified, showVerify: !isPhoneVerified && formData.phone },
        { key: 'dateOfBirth', label: 'Date of Birth', icon: Calendar, type: 'date' },
        { key: 'gender', label: 'Gender', icon: User, type: 'select', options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
        { key: 'address', label: 'Delivery Address', icon: MapPin },
        { key: 'language', label: 'Preferred Language', icon: Globe, type: 'select', options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada'] },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-fresh-100 p-6 md:p-8 shadow-lg"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
                    <p className="text-sm text-muted-foreground mt-1">Manage your personal details</p>
                </div>
                <AnimatePresence mode="wait">
                    {!isEditing ? (
                        <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Button variant="outline" className="gap-2" onClick={() => setIsEditing(true)}>
                                <Edit2 className="w-4 h-4" /> Edit
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={handleCancel}><X className="w-4 h-4" /></Button>
                            <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => {
                    const Icon = field.icon
                    const value = formData[field.key as keyof typeof formData]
                    const error = errors[field.key]
                    const isFieldEditable = isEditing && field.editable !== false

                    return (
                        <motion.div
                            key={field.key}
                            layout
                            className={`group relative p-4 rounded-2xl transition-all ${isFieldEditable ? 'bg-fresh-50 ring-2 ring-fresh-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isFieldEditable ? 'bg-fresh-500 text-white' : 'bg-white text-fresh-600 shadow-sm'}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-medium text-muted-foreground">{field.label}</p>
                                        {field.verified && (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
                                                <CheckCircle className="w-3 h-3" /> Verified
                                            </span>
                                        )}
                                        {field.showVerify && (
                                            <button onClick={onVerifyPhone} className="text-xs text-fresh-600 hover:underline font-medium">
                                                Verify now
                                            </button>
                                        )}
                                    </div>
                                    {isFieldEditable ? (
                                        <div>
                                            {field.type === 'select' ? (
                                                <select
                                                    value={value || ''}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                    className="w-full h-10 px-3 rounded-lg border border-fresh-300 bg-white text-foreground text-sm focus:ring-2 focus:ring-fresh-500 outline-none"
                                                >
                                                    <option value="">Select...</option>
                                                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            ) : (
                                                <Input
                                                    type={field.type || 'text'}
                                                    value={value || ''}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                    className={`h-10 ${error ? 'border-red-500' : 'border-fresh-300'}`}
                                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                                />
                                            )}
                                            {error && (
                                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" /> {error}
                                                </p>
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-foreground font-semibold truncate">
                                            {value || <span className="text-muted-foreground font-normal italic">Not set</span>}
                                        </p>
                                    )}
                                </div>
                                {!isEditing && field.editable !== false && (
                                    <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
