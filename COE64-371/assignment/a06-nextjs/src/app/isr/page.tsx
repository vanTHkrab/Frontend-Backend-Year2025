export const revalidate = 10;

export default async function ISRPage() {
  const timestamp = new Date().toISOString();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">ISR Page</h1>
      <p>Timestamp: {timestamp}</p>
    </main>
  );
}
