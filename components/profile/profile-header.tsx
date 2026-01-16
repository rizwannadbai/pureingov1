"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Camera, CheckCircle, Crown, Calendar, Edit2, Copy, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileHeaderProps {
    user: {
        name: string
        email: string
        username?: string
        avatarUrl?: string
        isPremium?: boolean
        isVerified?: boolean
        joinedAt?: string
        status?: 'active' | 'inactive'
    } | null
    isLoading?: boolean
    onAvatarChange?: (file: File) => void
    onEditProfile?: () => void
}

export function ProfileHeader({ user, isLoading, onAvatarChange, onEditProfile }: ProfileHeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [copiedId, setCopiedId] = useState(false)

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setAvatarPreview(reader.result as string)
            reader.readAsDataURL(file)
            onAvatarChange?.(file)
        }
    }

    const copyUserId = () => {
        navigator.clipboard.writeText(user?.username || 'USR-000')
        setCopiedId(true)
        setTimeout(() => setCopiedId(false), 2000)
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Recently"
        return new Date(dateString).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    }

    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

    if (isLoading) {
        return (
            <div className="relative">
                <div className="h-32 bg-gradient-to-r from-fresh-400 to-fresh-600 rounded-t-3xl" />
                <div className="bg-white rounded-b-3xl px-6 pb-6 pt-16 border border-t-0 border-fresh-100 shadow-xl">
                    <Skeleton className="w-28 h-28 rounded-2xl absolute top-20 left-6 border-4 border-white" />
                    <div className="ml-36 space-y-2">
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
        >
            <div className="h-36 md:h-44 bg-gradient-to-br from-fresh-400 via-fresh-500 to-emerald-600 rounded-t-3xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                {user?.isPremium && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        <Crown className="w-3.5 h-3.5" />
                        Premium Member
                    </div>
                )}
            </div>

            <div className="bg-white rounded-b-3xl px-4 md:px-8 pb-6 pt-16 md:pt-6 border border-t-0 border-fresh-100 shadow-xl relative">
                <div className="absolute -top-14 left-4 md:left-8 md:relative md:top-0 md:float-left md:mr-6 md:-mt-20">
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative group cursor-pointer"
                        onClick={handleAvatarClick}
                    >
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-fresh-400 to-fresh-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl border-4 border-white overflow-hidden">
                            {avatarPreview || user?.avatarUrl ? (
                                <img src={avatarPreview || user?.avatarUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                                initials
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-fresh-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <Camera className="w-4 h-4 text-white" />
                        </div>
                    </motion.div>
                </div>

                <div className="md:ml-40">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{user?.name || "User"}</h1>
                                {user?.isVerified && (
                                    <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Verified
                                    </div>
                                )}
                                {user?.status === 'active' && (
                                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Active
                                    </div>
                                )}
                            </div>
                            <p className="text-muted-foreground mt-1">{user?.email}</p>
                            <div className="flex items-center gap-4 mt-3 flex-wrap">
                                <button
                                    onClick={copyUserId}
                                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors bg-gray-100 px-3 py-1.5 rounded-lg"
                                >
                                    <span className="font-mono">@{user?.username || 'user'}</span>
                                    {copiedId ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    Joined {formatDate(user?.joinedAt)}
                                </div>
                            </div>
                        </div>
                        <Button onClick={onEditProfile} className="gap-2 shadow-lg">
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
