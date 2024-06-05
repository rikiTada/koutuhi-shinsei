export default function Loading({ isLoading }: { isLoading: boolean }) {
  return !isLoading ? null : (
    <div className="abusolute top-0 left-0 flex justify-center items-center fixed bg-primary/40 text-primary-foreground/50 min-h-screen w-full">
      <div className="animate-spin h-20 w-20 border-8 border-zinc-600  rounded-full border-t-transparent"></div>
    </div>
  );
}
