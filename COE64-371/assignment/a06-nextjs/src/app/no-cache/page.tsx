export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function NoCachePage() {
  const timestamp = new Date().toISOString();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">No-Cache Page</h1>
      <p>Timestamp: {timestamp}</p>
    </main>
  );
}
