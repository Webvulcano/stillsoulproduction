export default function Hero() {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden md:h-screen">
      <h1 className="sr-only">
        Videókészítés és fotózás Budapesten, Győrben és Esztergomban
      </h1>
      <video
        src="/hero/stillsoul3.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </section>
  );
}
