"use server";

export default async function SSRPage() {
  const timestamp = new Date().toISOString();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">SSR Page</h1>
      <p>Timestamp: {timestamp}</p>
    </main>
  );
}
