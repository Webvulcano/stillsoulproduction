import Image from "next/image";

const services = [
  {
    num: "01",
    title: "Esküvők, rendezvények és különleges alkalmak",
    img: "/services/eskuvo.jpg",
    imgAlt: "Esküvő fotózás",
  },
  {
    num: "02",
    title: "Digitális és analóg fotózás",
    img: "/services/analog.jpeg",
    imgAlt: "Analóg fotózás",
  },
  {
    num: "03",
    title: "Kreatív tartalomgyártás",
    img: "/services/kreativ.JPG",
    imgAlt: "Kreatív tartalom",
  },
  {
    num: "04",
    title: "Videók és reklámanyagok vágása",
    img: "/services/reklam.JPG",
    imgAlt: "Videó vágás",
  },
];

export default function Services() {
  return (
    <section id="szolgaltatasok" className="bg-black text-white">
      <div className="px-8 md:px-16 py-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">
          — Szolgáltatások —
        </span>
      </div>
      {services.map((service, i) => {
        const isEven = i % 2 === 1;
        const textBlock = (
          <div className="flex flex-col justify-center space-y-3 px-8 md:px-16">
            <span className="text-xs font-mono text-white/40">
              {service.num}
            </span>
            <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-wider border-l-2 border-white pl-4">
              {service.title}
            </h3>
          </div>
        );
        const imgBlock = (
          <div className="relative w-full overflow-hidden">
            <Image
              src={service.img}
              alt={service.imgAlt}
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
          </div>
        );
        return (
          <div
            key={service.num}
            className="grid grid-cols-1 md:grid-cols-2  h-[280px]"
          >
            {isEven ? (
              <>
                {imgBlock}
                {textBlock}
              </>
            ) : (
              <>
                {textBlock}
                {imgBlock}
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
