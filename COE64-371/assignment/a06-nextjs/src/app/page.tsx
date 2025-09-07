"use server";

async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/data`, {
        next: { revalidate: 10 },
    });
    return res.json();
}



export default async function Home() {
    const data = await getData();

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">Next.js App Router API & Caching Demo</h1>
            <div className="mt-4 p-4 border rounded">
                <p><strong>Message:</strong> {data.message}</p>
                <p><strong>Timestamp:</strong> {data.timestamp}</p>
            </div>
        </main>
    );
}
