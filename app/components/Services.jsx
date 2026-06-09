import Image from "next/image";

const services = [
  {
    num: "01",
    title: "Digitális és analóg fotózás",
    img: "/services/analog.jpeg",
    imgAlt: "Digitális és analóg fotózás",
  },
  {
    num: "02",
    title: "Brand építés & reklámanyagok készítése",
    img: "/services/eskuvo.jpg",
    imgAlt: "Brand építés & reklámanyagok készítése",
  },
  {
    num: "03",
    title: "Kreatív tartalomgyártás, socialmedia tartamak és short videók",
    img: "/services/kreativ.JPG",
    imgAlt: "Kreatív tartalom",
  },
  {
    num: "04",
    title: "Események és rendezvények",
    img: "/services/reklam.JPG",
    imgAlt: "Események és rendezvények",
  },
  {
    num: "05",
    title: "Eseti megkeresések, besegítés filmes munkákban",
    details: "(vágó, rendezőasszisztens, gyártásvezető, világosító, látványtervező, art director, berendező)",
    img: "/services/reklam.JPG",
    imgAlt: "Eseti megkeresések, besegítés filmes munkákban",
  },
  {
    num: "06",
    title: "Dokumentumfilm és fikciós játékfilmek készítése",
    img: "/services/reklam.JPG",
    imgAlt: "Dokumentumfilm és fikciós játékfilmek készítése",
  },
];


{/** Szolgáltatások
1 Digitális és analóg fotózás
2 Brand építés & reklámanyagok készítése
3 Kreatív tartalomgyártás, socialmedia tartamak és short videók
4 Események és rendezvények
5 Eseti megkeresések, besegítés filmes munkákban (vágó, rendezőasszisztens, gyártásvezető, világosító, látványtervező, art director, berendező) (A ZÁRÓJELBEN LÉVŐ SZAVAKAT KISEBB BETŰVEL ÍRNI A CÍM MELLÉ ZÁRÓJELBEN)
6 Dokumentumfilm és fikciós játékfilmek készítése
  
  
  */}

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
              {service.details && (
                <span className="block text-xs font-normal normal-case tracking-normal text-white/60 mt-1">
                  {service.details}
                </span>
              )}
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
