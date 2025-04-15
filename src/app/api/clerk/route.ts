import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
// import { Webhook } from "@clerk/clerk-sdk-node";
import { Buffer } from "buffer";

const prisma = new PrismaClient();
const webhookSecret = process.env.SIGNING_KEY_CLERK || '';
const isDevelopment = process.env.NODE_ENV !== 'production';

const debugLog = (message: string, data?: any) => {
    if (isDevelopment) {
        console.log('🔵 [Clerk Webhook]:', message);
        if (data) {
            console.log('📄 Debug Data:', JSON.stringify(data, null, 2));
        }
    }
};

// async function validateWebhook(req: NextRequest) {
//     const headerPayload = await headers();
//     const svix_id = headerPayload.get("svix-id");
//     const svix_timestamp = headerPayload.get("svix-timestamp");
//     const svix_signature = headerPayload.get("svix-signature");

//     if (!svix_id || !svix_timestamp || !svix_signature) {
//         throw new Error("Missing svix headers");
//     }

//     const payload = await req.text();
//     const body = payload;
//     const signatureHeader = svix_signature;

//     const wh = new Webhook(webhookSecret);
//     try {
//         return wh.verify(body, {
//             "svix-id": svix_id,
//             "svix-timestamp": svix_timestamp,
//             "svix-signature": svix_signature,
//         }) as WebhookEvent;
//     } catch (err) {
//         console.error("Webhook verification failed:", err);
//         throw new Error("Webhook verification failed");
//     }
// }

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const { type, data } = payload;

        debugLog(`Received webhook event: ${type}`);

        switch (type) {
            case "user.created":
                debugLog('Creating new user', {
                    clerkId: data.id,
                    email: data.email_addresses[0]?.email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim()
                });

                await prisma.$transaction(async (tx) => {
                    // First create the main User
                    const user = await tx.user.create({
                        data: {
                            clerkId: data.id,
                            email: data.email_addresses[0].email_address,
                            name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || null,
                            avatar: data.image_url,
                            settings: {
                                theme: "light",
                                notifications: true,
                                language: "en"
                            },
                            role: "USER",
                            status: "ACTIVE"
                        }
                    });

                    debugLog('Created main user record', { userId: user.id });

                    // Then create the ClerkUser with detailed Clerk data
                    const clerkUser = await tx.clerkUser.create({
                        data: {
                            id: data.id,
                            firstName: data.first_name,
                            lastName: data.last_name,
                            emailAddress: data.email_addresses[0].email_address,
                            imageUrl: data.image_url,
                            primaryEmail: data.primary_email_address_id ? data.email_addresses.find((e: any) => e.id === data.primary_email_address_id)?.email_address : null,
                            primaryPhoneNumber: data.primary_phone_number_id ? data.phone_numbers.find((p: any) => p.id === data.primary_phone_number_id)?.phone_number : null,
                            passwordEnabled: data.password_enabled,
                            totpEnabled: data.totp_enabled,
                            backupCodeEnabled: data.backup_code_enabled,
                            twoFactorEnabled: data.two_factor_enabled,
                            banned: data.banned,
                            lastSignInAt: data.last_sign_in_at ? new Date(data.last_sign_in_at) : null,
                            userId: user.id
                        }
                    });

                    debugLog('Created clerk user record', { clerkUserId: clerkUser.id });
                });
                break;

            case "user.updated":
                debugLog('Updating user', {
                    clerkId: data.id,
                    email: data.email_addresses[0]?.email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim()
                });

                await prisma.$transaction(async (tx) => {
                    // Update the main User
                    const updatedUser = await tx.user.update({
                        where: { clerkId: data.id },
                        data: {
                            email: data.email_addresses[0].email_address,
                            name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || null,
                            avatar: data.image_url,
                            updatedAt: new Date()
                        }
                    });

                    debugLog('Updated main user record', { userId: updatedUser.id });

                    // Update the ClerkUser
                    const updatedClerkUser = await tx.clerkUser.update({
                        where: { id: data.id },
                        data: {
                            firstName: data.first_name,
                            lastName: data.last_name,
                            emailAddress: data.email_addresses[0].email_address,
                            imageUrl: data.image_url,
                            primaryEmail: data.primary_email_address_id ? data.email_addresses.find((e: any) => e.id === data.primary_email_address_id)?.email_address : null,
                            primaryPhoneNumber: data.primary_phone_number_id ? data.phone_numbers.find((p: any) => p.id === data.primary_phone_number_id)?.phone_number : null,
                            passwordEnabled: data.password_enabled,
                            totpEnabled: data.totp_enabled,
                            backupCodeEnabled: data.backup_code_enabled,
                            twoFactorEnabled: data.two_factor_enabled,
                            banned: data.banned,
                            lastSignInAt: data.last_sign_in_at ? new Date(data.last_sign_in_at) : null,
                            updatedAt: new Date()
                        }
                    });

                    debugLog('Updated clerk user record', { clerkUserId: updatedClerkUser.id });
                });
                break;

            case "user.deleted":
                debugLog('Deleting user', { clerkId: data.id });

                await prisma.$transaction(async (tx) => {
                    const deletedUser = await tx.user.delete({
                        where: { clerkId: data.id }
                    });
                    debugLog('Deleted user and associated records', { userId: deletedUser.id });
                });
                break;

            default:
                debugLog(`Unhandled webhook event type: ${type}`);
        }

        debugLog(`Successfully processed webhook: ${type}`);

        return NextResponse.json(
            {
                success: true,
                message: `Webhook processed: ${type}`,
                userId: data.id
            },
            { status: 200 }
        );

    } catch (error) {
        debugLog('Error processing webhook', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Internal server error"
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
        debugLog('Disconnected from database');
    }
}