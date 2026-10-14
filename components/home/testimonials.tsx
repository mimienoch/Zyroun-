import Image from "next/image";
import { FigmaAsset } from "../figma-asset";

const testimonials = [
  {
    quote:
      "Finding a reliable UI designer used to take weeks. On Zyroun, we had three incredible proposals within 24 hours. The quality of work is outstanding.",
    name: "Sarah Jenkins",
    role: "CEO, TechStart",
    avatar: "/images/avatar-sarah.png",
    stars: [
      "/images/star-t1-1.svg",
      "/images/star-t1-2.svg",
      "/images/star-t1-3.svg",
      "/images/star-t1-4.svg",
      "/images/star-t1-5.svg",
    ],
    featured: false,
  },
  {
    quote:
      "The platform is incredibly intuitive. I love being able to browse portfolios before inviting designers to my project. Highly recommended.",
    name: "Michael Chen",
    role: "Founder, Bloom",
    avatar: "/images/avatar-michael.png",
    stars: Array(5).fill("/images/star-t2.svg"),
    featured: true,
  },
  {
    quote:
      "As a designer, Zyroun has completely changed how I find clients. The quality of projects is high, and the payment process is seamless.",
    name: "Emma Watson",
    role: "Freelance UI Designer",
    avatar: "/images/avatar-emma.png",
    stars: [
      "/images/star-t3-1.svg",
      "/images/star-t3-2.svg",
      "/images/star-t3-3.svg",
      "/images/star-t3-4.svg",
      "/images/star-t3-5.svg",
    ],
    featured: false,
  },
];

export function Testimonials() {
  return (
    <section className="w-full bg-white px-5 py-16 md:px-20 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="max-w-[588px] font-display text-[40px] leading-[1.05] font-extrabold text-[#0f172a] md:text-[72px] md:leading-[73px]">
          Loved by{" "}
          <em className="font-serif font-normal text-[#0f172a] italic">founders</em>
        </h2>
        <p className="mt-3 max-w-[672px] font-display text-base font-bold text-[#64748b]">
          See what others are saying about their experience.
        </p>
        <div className="mt-10 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:gap-8">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className={`flex flex-col rounded-2xl border border-[#f3f4f6] bg-[#f9fafb] p-7 ${
                item.featured ? "lg:min-h-[288px] lg:flex-[1.1]" : "lg:flex-1"
              }`}
            >
              <div className="mb-5 flex gap-1" aria-label="5 out of 5 stars">
                {item.stars.map((star, index) => (
                  <FigmaAsset key={`${item.name}-${index}`} src={star} alt="" />
                ))}
              </div>
              <blockquote className="font-quote text-sm leading-relaxed text-[#4b5563] italic md:text-base">
                “{item.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={item.avatar}
                  alt=""
                  width={item.featured ? 48 : 39}
                  height={item.featured ? 48 : 39}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">{item.name}</p>
                  <p className="text-xs text-[#6b7280]">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
