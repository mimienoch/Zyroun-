import { FigmaAsset } from "../figma-asset";

const steps = [
  {
    title: "1. Post a Brief",
    body: "Describe your vision, set your budget, and launch your design contest to our global community.",
    icon: "/images/icon-pen.svg",
  },
  {
    title: "2. Receive Concepts",
    body: "Dozens of talented designers submit their unique interpretations of your brief within hours.",
    icon: "/images/icon-concepts.svg",
  },
  {
    title: "3. Choose the Winner",
    body: "Select your favorite design, request final tweaks, and receive full copyright and source files.",
    icon: "/images/icon-winner.svg",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full border-y border-white bg-white px-5 py-16 md:px-20 md:py-[97px]"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16 md:gap-20">
        <div className="max-w-[896px] px-0 md:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
            <FigmaAsset src="/images/icon-process.svg" alt="" />
            <p className="text-sm font-semibold tracking-[0.7px] text-[#0f172a] uppercase">
              The Zyroun process
            </p>
          </div>
          <h2 className="font-display text-[40px] leading-[1.1] font-extrabold text-[#0f172a] md:text-[72px] md:leading-[73px]">
            From idea to{" "}
            <em className="font-serif text-[40px] font-normal not-italic md:text-[60px] md:leading-[60px]" style={{ fontStyle: "italic", color: "#7b61ff" }}>
              perfection
            </em>{" "}
            in 3 simple steps
          </h2>
          <p className="mt-6 max-w-[672px] font-display text-base font-bold text-[#4b5563]">
            Our streamlined platform ensures you get world-class design work,
            safely and securely, with no hidden surprises.
          </p>
        </div>
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-12 right-[16%] left-[16%] hidden h-0.5 bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] md:block"
          />
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="relative mb-6 flex size-24 items-center justify-center rounded-2xl bg-white shadow-[-2px_4px_12px_4px_rgba(51,51,51,0.04)]">
                <FigmaAsset src={step.icon} alt="" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-[#0f172a]">
                {step.title}
              </h3>
              <p className="max-w-[343px] font-display text-sm font-medium text-[#0f172a]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
