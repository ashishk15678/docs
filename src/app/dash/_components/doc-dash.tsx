"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
    FileText,
    BarChart3,
    FileSpreadsheet,
    Clock,
    Users,
    Search,
    Plus,
    Settings,
    Bell,
    ChevronDown,
    Star,
    MoreHorizontal,
    Filter,
    Home,
    Trash,
    LogOut,
    User,
    CreditCard,
    Share2,
    Copy,
    Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar"

export function DocumentDashboard() {
    const [searchQuery, setSearchQuery] = useState("")
    const [mounted, setMounted] = useState(false)

    // This ensures glassmorphism effects only render on client
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
                <Sidebar variant="floating" className="border-0 shadow-none">
                    <SidebarHeader className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center text-white font-bold shadow-lg">
                                D
                            </div>
                            <span className="font-semibold text-lg tracking-tight">DocFlow</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-medium text-zinc-500">Main</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton isActive>
                                            <Home className="h-4 w-4" />
                                            <span>Home</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <FileText className="h-4 w-4" />
                                            <span>Documents</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <Clock className="h-4 w-4" />
                                            <span>Recent</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <Star className="h-4 w-4" />
                                            <span>Starred</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <Users className="h-4 w-4" />
                                            <span>Shared</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <Trash className="h-4 w-4" />
                                            <span>Trash</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-medium text-zinc-500">Workspaces</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <div className="h-4 w-4 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-900" />
                                            <span>Personal</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <div className="h-4 w-4 rounded-md bg-gradient-to-br from-zinc-500 to-zinc-700" />
                                            <span>Work</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <div className="h-4 w-4 rounded-md bg-gradient-to-br from-zinc-400 to-zinc-600" />
                                            <span>Project Alpha</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8 ring-2 ring-white">
                                    <AvatarImage src="/placeholder.svg" alt="User" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">John Doe</p>
                                    <p className="text-xs text-zinc-500">john@example.com</p>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-zinc-200">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl bg-white/80 border border-zinc-200">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Billing</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="bg-transparent">
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <header className="backdrop-blur-xl bg-white/70 border-b border-zinc-200/80 sticky top-0 z-10">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center">
                                    <SidebarTrigger className="mr-2" />
                                    <h1 className="text-xl font-semibold tracking-tight">Documents</h1>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="relative hidden sm:block">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                        <Input
                                            type="search"
                                            placeholder="Search documents..."
                                            className="w-[250px] pl-9 rounded-full bg-zinc-100/80 border-zinc-200 focus-visible:ring-zinc-400"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Button variant="ghost" size="icon" className="rounded-full relative">
                                        <Bell className="h-5 w-5" />
                                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-zinc-900"></span>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="rounded-full flex items-center gap-2">
                                                <Avatar className="h-8 w-8 ring-2 ring-white">
                                                    <AvatarImage src="/placeholder.svg" alt="User" />
                                                    <AvatarFallback>JD</AvatarFallback>
                                                </Avatar>
                                                <ChevronDown className="h-4 w-4 hidden sm:block" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="w-56 backdrop-blur-xl bg-white/80 border border-zinc-200"
                                        >
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                <span>Billing</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="sm:hidden px-4 pb-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input
                                        type="search"
                                        placeholder="Search documents..."
                                        className="w-full pl-9 rounded-full bg-zinc-100/80 border-zinc-200 focus-visible:ring-zinc-400"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
                            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">Your Documents</h2>
                                    <p className="text-zinc-500">Create, edit and collaborate on documents</p>
                                </div>
                                <Button className="bg-gradient-to-r from-zinc-800 to-zinc-950 hover:from-zinc-900 hover:to-black shadow-lg transition-all duration-300 hover:shadow-xl self-start sm:self-auto">
                                    <Plus className="mr-2 h-4 w-4" /> New Document
                                </Button>
                            </div>

                            <div className="grid gap-6">
                                <Tabs defaultValue="all" className="w-full">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <TabsList className="backdrop-blur-md bg-white/50 border border-zinc-200/50 p-1 rounded-xl">
                                            <TabsTrigger
                                                value="all"
                                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                                            >
                                                All
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="word"
                                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                                            >
                                                Word
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="excel"
                                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                                            >
                                                Excel
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="ppt"
                                                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                                            >
                                                PowerPoint
                                            </TabsTrigger>
                                        </TabsList>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-9 gap-1 rounded-lg backdrop-blur-md bg-white/50 border-zinc-200/50"
                                            >
                                                <Filter className="h-3.5 w-3.5" />
                                                <span>Filter</span>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-9 rounded-lg backdrop-blur-md bg-white/50 border-zinc-200/50"
                                                    >
                                                        <span>Sort by</span>
                                                        <ChevronDown className="ml-1 h-3.5 w-3.5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="backdrop-blur-xl bg-white/80 border border-zinc-200"
                                                >
                                                    <DropdownMenuItem>Name</DropdownMenuItem>
                                                    <DropdownMenuItem>Date modified</DropdownMenuItem>
                                                    <DropdownMenuItem>Size</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>

                                    <TabsContent value="all" className="mt-0">
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {documents.map((doc) => (
                                                <DocumentCard key={doc.id} document={doc} />
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="word" className="mt-0">
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {documents
                                                .filter((doc) => doc.type === "word")
                                                .map((doc) => (
                                                    <DocumentCard key={doc.id} document={doc} />
                                                ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="excel" className="mt-0">
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {documents
                                                .filter((doc) => doc.type === "excel")
                                                .map((doc) => (
                                                    <DocumentCard key={doc.id} document={doc} />
                                                ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="ppt" className="mt-0">
                                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {documents
                                                .filter((doc) => doc.type === "ppt")
                                                .map((doc) => (
                                                    <DocumentCard key={doc.id} document={doc} />
                                                ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4 tracking-tight">Recent Activity</h3>
                                    <Card className="backdrop-blur-xl bg-white/70 border border-zinc-200/80 shadow-sm overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="divide-y divide-zinc-200/80">
                                                {activities.map((activity, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-4 p-4 hover:bg-zinc-50/50 transition-colors"
                                                    >
                                                        <Avatar className="h-8 w-8 ring-2 ring-white">
                                                            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                                                            <AvatarFallback>{activity.user.initials}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm truncate">
                                                                <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                                                                <span className="font-medium">{activity.document}</span>
                                                            </p>
                                                            <p className="text-xs text-zinc-500">{activity.time}</p>
                                                        </div>
                                                        <Button variant="ghost" size="sm" className="rounded-lg">
                                                            View
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </main>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}

interface Document {
    id: string
    title: string
    type: "word" | "excel" | "ppt"
    icon: React.ReactNode
    modified: string
    collaborators: { name: string; avatar: string; initials: string }[]
}

function DocumentCard({ document }: { document: Document }) {
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group backdrop-blur-xl bg-white/70 border border-zinc-200/80">
            <CardHeader className="p-4 pb-0">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                        {document.icon}
                        <div>
                            <CardTitle className="text-base font-medium">{document.title}</CardTitle>
                            <CardDescription className="text-xs">Modified {document.modified}</CardDescription>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="backdrop-blur-xl bg-white/80 border border-zinc-200">
                            <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Open</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Share</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Duplicate</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bookmark className="mr-2 h-4 w-4" />
                                <span>Add to starred</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="h-32 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform">
                    <span className="text-zinc-400 text-xs">Preview</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex -space-x-2">
                    {document.collaborators.map((collaborator, index) => (
                        <Avatar key={index} className="h-6 w-6 ring-2 ring-white">
                            <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                            <AvatarFallback className="text-[10px]">{collaborator.initials}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
                <Badge variant="outline" className="text-xs bg-white/80 backdrop-blur-sm border-zinc-200/80 font-medium">
                    {document.type === "word" ? "DOCX" : document.type === "excel" ? "XLSX" : "PPTX"}
                </Badge>
            </CardFooter>
        </Card>
    )
}

const documents: Document[] = [
    {
        id: "1",
        title: "Q1 Report",
        type: "word",
        icon: <FileText className="h-5 w-5 text-blue-600" />,
        modified: "2 hours ago",
        collaborators: [
            { name: "John Doe", avatar: "/placeholder.svg", initials: "JD" },
            { name: "Sarah Smith", avatar: "/placeholder.svg", initials: "SS" },
        ],
    },
    {
        id: "2",
        title: "Budget 2023",
        type: "excel",
        icon: <FileSpreadsheet className="h-5 w-5 text-green-600" />,
        modified: "Yesterday",
        collaborators: [
            { name: "John Doe", avatar: "/placeholder.svg", initials: "JD" },
            { name: "Sarah Smith", avatar: "/placeholder.svg", initials: "SS" },
            { name: "Mike Johnson", avatar: "/placeholder.svg", initials: "MJ" },
        ],
    },
    {
        id: "3",
        title: "Project Presentation",
        type: "ppt",
        icon: <BarChart3 className="h-5 w-5 text-orange-600" />,
        modified: "3 days ago",
        collaborators: [{ name: "John Doe", avatar: "/placeholder.svg", initials: "JD" }],
    },
    {
        id: "4",
        title: "Meeting Notes",
        type: "word",
        icon: <FileText className="h-5 w-5 text-blue-600" />,
        modified: "1 week ago",
        collaborators: [
            { name: "Sarah Smith", avatar: "/placeholder.svg", initials: "SS" },
            { name: "Mike Johnson", avatar: "/placeholder.svg", initials: "MJ" },
        ],
    },
    {
        id: "5",
        title: "Sales Analysis",
        type: "excel",
        icon: <FileSpreadsheet className="h-5 w-5 text-green-600" />,
        modified: "2 weeks ago",
        collaborators: [
            { name: "John Doe", avatar: "/placeholder.svg", initials: "JD" },
            { name: "Mike Johnson", avatar: "/placeholder.svg", initials: "MJ" },
        ],
    },
    {
        id: "6",
        title: "Product Launch",
        type: "ppt",
        icon: <BarChart3 className="h-5 w-5 text-orange-600" />,
        modified: "1 month ago",
        collaborators: [
            { name: "John Doe", avatar: "/placeholder.svg", initials: "JD" },
            { name: "Sarah Smith", avatar: "/placeholder.svg", initials: "SS" },
            { name: "Mike Johnson", avatar: "/placeholder.svg", initials: "MJ" },
        ],
    },
]

const activities = [
    {
        user: { name: "John Doe", avatar: "/placeholder.svg", initials: "JD" },
        action: "edited",
        document: "Q1 Report",
        time: "2 hours ago",
    },
    {
        user: { name: "Sarah Smith", avatar: "/placeholder.svg", initials: "SS" },
        action: "commented on",
        document: "Budget 2023",
        time: "Yesterday",
    },
    {
        user: { name: "Mike Johnson", avatar: "/placeholder.svg", initials: "MJ" },
        action: "shared",
        document: "Project Presentation",
        time: "3 days ago",
    },
    {
        user: { name: "John Doe", avatar: "/placeholder.svg", initials: "JD" },
        action: "created",
        document: "Meeting Notes",
        time: "1 week ago",
    },
]
