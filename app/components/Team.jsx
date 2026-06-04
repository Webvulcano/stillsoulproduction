import Image from "next/image";

const members = [
  {
    name: "Fördős Bence",
    role: "rendező & operaőr & fotós / director & DOP & photographer",
    img: "/team/cusi.jpg",
  },
  {
    name: "Dudás Hédi",
    role: "vágó & forgatókönyvíró /editor & screenwriter",
    img: "/team/hedi.jpg",
  },
];

export default function Team() {
  return (
    <section id="csapat" className="bg-black text-white h-[100vh] flex flex-col items-center justify-center px-8 md:px-16">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-white/40">
          — Csapatunk —
        </span>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {members.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative aspect-[3/4] w-[300px] overflow-hidden mx-auto">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover object-center"
                  sizes="300px"
                />
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-sm text-white/50">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
