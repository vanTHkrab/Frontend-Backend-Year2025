"use client";

export default function DashboardPage() {
  const pages = [
    { name: 'SSR (Server-Side Rendering)', path: '/ssr', desc: 'โหลดข้อมูลสดทุกครั้ง (ไม่มี cache)' },
    { name: 'ISR (Incremental Static Regeneration)', path: '/isr', desc: 'แคช 10 วินาทีแล้ว regenerate' },
    { name: 'No-Cache', path: '/no-cache', desc: 'ปิด cache ทุกอย่าง โหลดใหม่ทุกครั้ง' },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Next.js Caching Demo Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => (
          <a
            key={page.path}
            href={page.path}
            className="p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-lg font-semibold">{page.name}</h2>
            <p className="text-sm text-gray-600">{page.desc}</p>
            <p className="mt-2 text-blue-500">Go to {page.path}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
