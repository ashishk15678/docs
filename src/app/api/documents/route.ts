import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

const createDocumentSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    type: z.enum(['word', 'excel', 'ppt']),
});

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [documents, presentations, spreadsheets] = await Promise.all([
            prisma.document.findMany({
                where: {
                    userId,
                    isArchived: false,
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    format: true,
                    isPublic: true,
                    version: true,
                    createdAt: true,
                    updatedAt: true,
                    folder: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }),
            prisma.presentation.findMany({
                where: {
                    userId,
                    isArchived: false,
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    theme: true,
                    isPublic: true,
                    version: true,
                    createdAt: true,
                    updatedAt: true,
                    folder: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }),
            prisma.spreadsheet.findMany({
                where: {
                    userId,
                    isArchived: false,
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    isPublic: true,
                    version: true,
                    createdAt: true,
                    updatedAt: true,
                    folder: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            })
        ]);

        return NextResponse.json({
            documents,
            presentations,
            spreadsheets
        });
    } catch (error) {
        console.error("Error fetching documents:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = createDocumentSchema.parse(body);

        let document;

        document = await prisma.$transaction(async (tx: any) => {
            switch (validatedData.type) {
                case 'word':
                    document = await tx.document.create({
                        data: {
                            title: validatedData.title,
                            content: '',
                            userId,
                            format: 'MARKDOWN',
                            version: 1,
                            isPublic: false,
                            isArchived: false,
                            aiGenerated: false,
                        },
                        select: {
                            id: true,
                            title: true,
                            // type: 'word',
                            modified: true,
                            collaborators: {
                                select: {
                                    user: {
                                        select: {
                                            name: true,
                                        }
                                    }
                                }
                            }
                        }
                    });
                    break;

                case 'excel':
                    document = await tx.spreadsheet.create({
                        data: {
                            title: validatedData.title,
                            data: {},
                            userId,
                            version: 1,
                            isPublic: false,
                            isArchived: false,
                            aiGenerated: false,
                        },
                        select: {
                            id: true,
                            title: true,
                            type: 'excel',
                            modified: true,
                            collaborators: {
                                select: {
                                    user: {
                                        select: {
                                            name: true,
                                        }
                                    }
                                }
                            }
                        }
                    });
                    break;

                case 'ppt':
                    document = await tx.presentation.create({
                        data: {
                            title: validatedData.title,
                            slides: [],
                            userId,
                            version: 1,
                            isPublic: false,
                            isArchived: false,
                            aiGenerated: false,
                        },
                        select: {
                            id: true,
                            title: true,
                            type: 'ppt',
                            modified: true,
                            collaborators: {
                                select: {
                                    user: {
                                        select: {
                                            name: true,
                                        }
                                    }
                                }
                            }
                        }
                    });
                    break;
            }

            // Create activity record
            await tx.activity.create({
                data: {
                    type: 'CREATE',
                    userId,
                    documentId: document.id,
                }
            });
        });

        // Format the response to match the expected structure in the frontend
        const formattedDocument = {
            ...document,
            collaborators: document?.collaborators.map((collab: any) => ({
                name: collab.user.name,
                initials: collab.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
            }))
        };

        return NextResponse.json(formattedDocument);
    } catch (error) {
        console.error("Document creation error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid input", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create document" },
            { status: 500 }
        );
    }
} 