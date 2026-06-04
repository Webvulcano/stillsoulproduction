export default function About() {
  return (
    <section id="rolunk" className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
        <div className="max-w-xl space-y-8">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white">
            Rólunk
          </h2>
          <div className="border-l-2 border-white/30 pl-6 space-y-4">
            <p className="text-sm leading-7 text-gray-300">
              A vizuális történetmesélés számunkra több mint munka, szenvedély.
              Célunk, hogy olyan képeket és filmeket készítsünk, amelyek nemcsak
              megőrzik a pillanatokat, hanem újra átélhetővé is teszik őket.
              Digitális és analóg technikával is dolgozunk, így minden projekt
              egyedi hangulatot és időtálló karaktert kap.
            </p>
            <p className="text-sm leading-7 text-gray-300">
              Minden munkánk alapja az alkotás szeretete, az őszinte kapcsolódás
              és a maradandó vizuális élmények létrehozása.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
