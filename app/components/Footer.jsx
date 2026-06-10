export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-0 bg-black text-white flex flex-col justify-end px-6 md:px-12 py-8">
      <div className="flex flex-col">
        <span className="text-[10px] text-white/30 tracking-widest uppercase mb-2 ml-1">
          &copy; 2026 StillSoul Production
        </span>
        <h2 className="text-[18vw] leading-[0.8] font-bold tracking-tighter whitespace-nowrap select-none text-[#2a2a2a]">
          STILLSOUL
        </h2>
      </div>
    </footer>
  );
}
