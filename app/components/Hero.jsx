export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        src="/hero/stillsoul3.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
}
