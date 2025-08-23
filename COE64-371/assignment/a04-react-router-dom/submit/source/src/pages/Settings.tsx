export default function Settings() {
    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p>Manage your application settings here.</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Profile Settings</li>
                <li>Account Settings</li>
                <li>Notification Settings</li>
                <li>Privacy Settings</li>
            </ul>
        </section>
    );
}