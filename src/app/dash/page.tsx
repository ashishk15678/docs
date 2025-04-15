import { Suspense } from 'react';
import { Dashboard } from './_components/dash';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense>
                <Dashboard />
            </Suspense>
        </div>
    );
}