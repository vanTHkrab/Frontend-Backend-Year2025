export default function Footer() {
    return (
        <footer className="border-t mt-10 py-6 text-center text-sm text-gray-500 dark:text-gray-400
dark:border-gray-800">
            <div className="container-page">
                © {new Date().getFullYear()} ReactLayouts. All rights reserved.
            </div>
        </footer>
    );
}