import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [documents, activities] = await Promise.all([
            prisma.$transaction([
                // Get documents
                prisma.document.findMany({
                    where: { userId, isArchived: false },
                    select: {
                        id: true,
                        title: true,
                        updatedAt: true,
                        collaborations: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        id: true,
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { updatedAt: 'desc' }
                }),
                // Get presentations
                prisma.presentation.findMany({
                    where: { userId, isArchived: false },
                    select: {
                        id: true,
                        title: true,
                        updatedAt: true,
                        collaborations: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        id: true,
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { updatedAt: 'desc' }
                }),
                // Get spreadsheets
                prisma.spreadsheet.findMany({
                    where: { userId, isArchived: false },
                    select: {
                        id: true,
                        title: true,
                        updatedAt: true,
                        collaborations: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        id: true,
                                    }
                                }
                            }
                        }
                    },
                    orderBy: { updatedAt: 'desc' }
                })
            ]),
            // Get recent activities
            prisma.activity.findMany({
                where: {
                    OR: [
                        { userId },
                        {
                            document: {
                                collaborations: {
                                    some: { userId }
                                }
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    document: {
                        select: {
                            id: true,
                            title: true,
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 10
            })
        ]);

        const [docs, presentations, spreadsheets] = documents;

        const formattedDocuments = [
            ...docs.map((d: any) => ({
                id: d.id,
                title: d.title,
                type: 'word',
                modified: d.updatedAt,
                collaborators: d.collaborations.map((c: any) => ({
                    name: c.user.name,
                    initials: getInitials(c.user.name)
                }))
            })),
            ...presentations.map((p: any) => ({
                id: p.id,
                title: p.title,
                type: 'ppt',
                modified: p.updatedAt,
                collaborators: p.collaborations.map((c: any) => ({
                    name: c.user.name,
                    initials: getInitials(c.user.name)
                }))
            })),
            ...spreadsheets.map((s: any) => ({
                id: s.id,
                title: s.title,
                type: 'excel',
                modified: s.updatedAt,
                collaborators: s.collaborations.map((c: any) => ({
                    name: c.user.name,
                    initials: getInitials(c.user.name)
                }))
            }))
        ];

        const formattedActivities = activities.map((activity: any) => ({
            user: {
                name: activity.user.name,
                initials: getInitials(activity.user.name)
            },
            action: activity.type.toLowerCase(),
            document: activity.document.title,
            time: formatTimeAgo(activity.createdAt)
        }));

        return NextResponse.json({
            documents: formattedDocuments,
            activities: formattedActivities
        });
    } catch (error) {
        console.error("Dashboard data fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return `${weeks} weeks ago`;
} 