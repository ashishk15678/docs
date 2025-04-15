"use client"

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
    Menu,
    X,
    LogOut,
    User,
    Share2,
    Copy,
    Trash,
} from "lucide-react"
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})

export function DashboardWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <Dashboard />
        </QueryClientProvider>
    )
}

function Dashboard() {
    const [mounted, setMounted] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeTab, setActiveTab] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [documentMenuOpen, setDocumentMenuOpen] = useState<string | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newDocumentData, setNewDocumentData] = useState({
        title: '',
        type: 'word' as 'word' | 'excel' | 'ppt',
    });

    const { toast } = useToast();

    // Ensure hydration
    useEffect(() => {
        setMounted(true)
    }, [])

    // Close sidebar on small screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false)
            } else {
                setSidebarOpen(true)
            }
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Fetch dashboard data
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await fetch('/api/dashboard');
            if (!response.ok) throw new Error('Failed to fetch dashboard data');
            return response.json();
        }
    });

    // Use data.documents and data.activities instead of the static data
    const documents = data?.documents || [];
    const activities = data?.activities || [];


    // Filter documents based on active tab and search query
    const filteredDocuments = documents.filter((doc: any) => {
        const matchesTab = activeTab === "all" || doc.type === activeTab
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesTab && matchesSearch
    })


    // Create document mutation
    const createDocument = useMutation({
        mutationFn: async (documentData: typeof newDocumentData) => {
            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(documentData),
            });
            if (!response.ok) throw new Error('Failed to create document');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            setIsCreateModalOpen(false);
            setNewDocumentData({ title: '', type: 'word' });
            toast({
                title: "Success",
                description: "Document created successfully",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to create document",
                variant: "destructive",
            });
        },
    });


    if (!mounted) return null

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
            {/* Sidebar - Desktop */}
            <aside
                className={`fixed inset-y-0 left-0 z-20 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex-shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="h-full flex flex-col bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-800/50">
                    {/* Sidebar Header */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800/50">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-lg">
                                <span className="font-bold text-white">D</span>
                            </div>
                            <span className="font-semibold text-lg tracking-tight">DocFlow</span>
                        </div>
                        <button className="lg:hidden p-1 rounded-full hover:bg-zinc-800/50" onClick={() => setSidebarOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto py-4 px-3">
                        <div className="space-y-6">
                            {/* Main Navigation */}
                            <div>
                                <h3 className="px-3 text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Main</h3>
                                <nav className="space-y-1">
                                    {[
                                        { name: "Home", icon: Home, active: false },
                                        { name: "Documents", icon: FileText, active: true },
                                        { name: "Recent", icon: Clock, active: false },
                                        { name: "Starred", icon: Star, active: false },
                                        { name: "Shared", icon: Users, active: false },
                                    ].map((item) => (
                                        <a
                                            key={item.name}
                                            href="#"
                                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${item.active
                                                ? "bg-zinc-800/70 text-white"
                                                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                                }`}
                                        >
                                            <item.icon
                                                className={`mr-3 h-5 w-5 ${item.active ? "text-white" : "text-zinc-500 group-hover:text-white"
                                                    }`}
                                            />
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            {/* Workspaces */}
                            <div>
                                <h3 className="px-3 text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Workspaces</h3>
                                <nav className="space-y-1">
                                    {[
                                        { name: "Personal", color: "from-zinc-600 to-zinc-800" },
                                        { name: "Work", color: "from-zinc-500 to-zinc-700" },
                                        { name: "Project Alpha", color: "from-zinc-400 to-zinc-600" },
                                    ].map((workspace) => (
                                        <a
                                            key={workspace.name}
                                            href="#"
                                            className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
                                        >
                                            <div className={`mr-3 h-4 w-4 rounded-md bg-gradient-to-br ${workspace.color}`} />
                                            {workspace.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-zinc-800/50">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center ring-2 ring-zinc-700">
                                    <span className="text-sm font-medium">JD</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">John Doe</p>
                                    <p className="text-xs text-zinc-500">john@example.com</p>
                                </div>
                            </div>
                            <ChevronDown size={16} className="text-zinc-500" />
                        </div>

                        {/* User Menu */}
                        {userMenuOpen && (
                            <div className="absolute bottom-16 left-4 right-4 bg-zinc-800/90 backdrop-blur-xl rounded-lg border border-zinc-700/50 shadow-xl p-1 z-10">
                                <div className="py-1">
                                    {[
                                        { name: "Profile", icon: User },
                                        { name: "Settings", icon: Settings },
                                        { name: "Log out", icon: LogOut },
                                    ].map((item) => (
                                        <a
                                            key={item.name}
                                            href="#"
                                            className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-zinc-700/50 transition-colors"
                                        >
                                            <item.icon className="mr-2 h-4 w-4 text-zinc-400" />
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 sticky top-0 z-10">
                    <div className="h-full px-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                className="mr-4 p-1.5 rounded-lg hover:bg-zinc-800/70 lg:hidden"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu size={20} />
                            </button>
                            <h1 className="text-xl font-semibold tracking-tight">Documents</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    className="w-64 h-9 pl-10 pr-4 rounded-full bg-zinc-800/70 border border-zinc-700/50 focus:outline-none focus:ring-1 focus:ring-zinc-600 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <button className="relative p-1.5 rounded-full hover:bg-zinc-800/70">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-zinc-100"></span>
                            </button>

                            <div className="relative">
                                <button
                                    className="flex items-center space-x-1 p-1 rounded-full hover:bg-zinc-800/70"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center ring-2 ring-zinc-700">
                                        <span className="text-sm font-medium">JD</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="px-4 pb-3 md:hidden">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search documents..."
                                className="w-full h-9 pl-10 pr-4 rounded-full bg-zinc-800/70 border border-zinc-700/50 focus:outline-none focus:ring-1 focus:ring-zinc-600 text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gradient-to-br from-zinc-950 to-zinc-900">
                    {/* Page Header */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Your Documents</h2>
                            <p className="text-zinc-400">Create, edit and collaborate on documents</p>
                        </div>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="self-start sm:self-auto px-4 py-2 bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 rounded-lg border border-zinc-700/50 shadow-lg transition-all duration-300 hover:shadow-xl flex items-center"
                        >
                            <Plus className="mr-2 h-4 w-4" /> New Document
                        </button>
                    </div>

                    {/* Tabs and Filters */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                            <nav className="flex space-x-1 p-1 bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-800/50">
                                {[
                                    { id: "all", name: "All" },
                                    { id: "word", name: "Word" },
                                    { id: "excel", name: "Excel" },
                                    { id: "ppt", name: "PowerPoint" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab.id
                                            ? "bg-zinc-800 text-white shadow-sm"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                                            }`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1.5 text-sm bg-zinc-900/50 hover:bg-zinc-800/70 rounded-lg border border-zinc-800/50 backdrop-blur-md flex items-center">
                                <Filter className="mr-2 h-3.5 w-3.5" />
                                Filter
                            </button>
                            <div className="relative">
                                <button className="px-3 py-1.5 text-sm bg-zinc-900/50 hover:bg-zinc-800/70 rounded-lg border border-zinc-800/50 backdrop-blur-md flex items-center">
                                    Sort by
                                    <ChevronDown className="ml-2 h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Document Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredDocuments.map((doc: any) => (
                            <div
                                key={doc.id}
                                className="group bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/50 hover:border-zinc-700/50"
                            >
                                {/* Card Header */}
                                <div className="p-4 flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`p-2 rounded-lg ${doc.type === "word"
                                                ? "bg-blue-500/10"
                                                : doc.type === "excel"
                                                    ? "bg-green-500/10"
                                                    : "bg-orange-500/10"
                                                }`}
                                        >
                                            {doc.type === "word" ? (
                                                <FileText className="h-5 w-5 text-blue-400" />
                                            ) : doc.type === "excel" ? (
                                                <FileSpreadsheet className="h-5 w-5 text-green-400" />
                                            ) : (
                                                <BarChart3 className="h-5 w-5 text-orange-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-zinc-100">{doc.title}</h3>
                                            <p className="text-xs text-zinc-500">Modified {doc.modified}</p>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <button
                                            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-800/70"
                                            onClick={() => setDocumentMenuOpen(documentMenuOpen === doc.id ? null : doc.id)}
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>

                                        {/* Document Menu */}
                                        {documentMenuOpen === doc.id && (
                                            <div className="absolute right-0 top-8 w-48 bg-zinc-800/90 backdrop-blur-xl rounded-lg border border-zinc-700/50 shadow-xl p-1 z-10">
                                                <div className="py-1">
                                                    {[
                                                        { name: "Open", icon: FileText },
                                                        { name: "Share", icon: Share2 },
                                                        { name: "Duplicate", icon: Copy },
                                                        { name: "Delete", icon: Trash, danger: true },
                                                    ].map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href="#"
                                                            className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-zinc-700/50 transition-colors ${item.danger ? "text-red-400 hover:text-red-300" : ""
                                                                }`}
                                                        >
                                                            <item.icon className="mr-2 h-4 w-4" />
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Document Preview */}
                                <div className="px-4">
                                    <div className="h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center group-hover:scale-[1.02] transition-transform">
                                        <span className="text-zinc-500 text-xs">Preview</span>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {doc.collaborators.map((collaborator: any, index: any) => (
                                            <div
                                                key={index}
                                                className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center ring-2 ring-zinc-900 text-[10px] font-medium"
                                            >
                                                {collaborator.initials}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs py-1 px-2 rounded-md bg-zinc-800/70 border border-zinc-700/50">
                                        {doc.type === "word" ? "DOCX" : doc.type === "excel" ? "XLSX" : "PPTX"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4 tracking-tight">Recent Activity</h3>
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-xl overflow-hidden">
                            <div className="divide-y divide-zinc-800/50">
                                {activities.map((activity: any, index: any) => (
                                    <div key={index} className="flex items-center gap-4 p-4 hover:bg-zinc-800/30 transition-colors">
                                        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center ring-2 ring-zinc-700 text-xs font-medium">
                                            {activity.user.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm">
                                                <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                                                <span className="font-medium">{activity.document}</span>
                                            </p>
                                            <p className="text-xs text-zinc-500">{activity.time}</p>
                                        </div>
                                        <button className="px-3 py-1 text-sm bg-zinc-800/70 hover:bg-zinc-700/70 rounded-lg border border-zinc-700/50">
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Create Document Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="bg-zinc-900 border border-zinc-800/50 sm:max-w-md shadow-lg">
                    <DialogHeader>
                        <h2 className="text-xl font-semibold text-zinc-100">Create New Document</h2>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
                            <Input
                                value={newDocumentData.title}
                                onChange={(e) => setNewDocumentData(prev => ({
                                    ...prev,
                                    title: e.target.value
                                }))}
                                placeholder="Enter document title"
                                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-zinc-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Type</label>
                            <select
                                value={newDocumentData.type}
                                onChange={(e) => setNewDocumentData(prev => ({
                                    ...prev,
                                    type: e.target.value as 'word' | 'excel' | 'ppt'
                                }))}
                                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-3 py-2 focus:border-zinc-600 focus:ring-zinc-600"
                            >
                                <option value="word">Word Document</option>
                                <option value="excel">Spreadsheet</option>
                                <option value="ppt">Presentation</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => createDocument.mutate(newDocumentData)}
                                // @ts-ignore
                                disabled={createDocument.isLoading}
                                className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100"
                            >
                                {/* @ts-ignore */}
                                {createDocument.isLoading ? "Creating..." : "Create"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export { DashboardWrapper as Dashboard }
