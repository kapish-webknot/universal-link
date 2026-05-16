export default function NavigatePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-col items-center gap-6 px-8 text-center">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Opening LaunchVerse…
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          If the app does not open automatically, make sure LaunchVerse is installed.
        </p>
      </main>
    </div>
  );
}
