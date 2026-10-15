import { FigmaAsset } from "../figma-asset";

const agency = [
  "$5,000 - $50,000+",
  "4-12 weeks timeline",
  "Limited to 1-2 concepts",
  "Expensive revisions",
];

const zyroun = [
  "$299 - $5,000",
  "3-7 days delivery",
  "20-100+ unique concepts",
  "Unlimited revisions",
];

const freelance = [
  "$50 - $2,000",
  "Variable timeline",
  "1 concept only",
  "Hit or miss quality",
];

function FeatureList({
  items,
  icon,
  negative,
}: {
  items: string[];
  icon: string;
  negative?: boolean;
}) {
  return (
    <ul className="flex flex-col gap-3 p-[30px] font-poppins text-sm text-[#0f172a]">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <FigmaAsset src={icon} alt="" />
          <span className={negative ? "text-[#0f172a]" : undefined}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Compare() {
  return (
    <section id="pricing" className="w-full border-y border-[#f9fafb] bg-[#f9fafb] px-5 py-16 md:px-20 md:py-[97px] lg:px-[144px]">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-16">
        <div className="text-center">
          <h2 className="font-display text-[32px] font-bold leading-none text-[#0f172a] md:text-[40px] md:leading-[40px]">
            Why Choose Zyroun?
          </h2>
          <p className="mx-auto mt-4 max-w-[672px] font-display text-base font-medium text-[#0f172a]">
            Compare our platform to traditional design agencies and freelance marketplaces.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-center lg:gap-[25px]">
          <article className="w-full max-w-[299px] overflow-hidden rounded-[32px] border border-[#f9fafb] bg-[#f9fafb] shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col items-center gap-2 bg-white px-[3px] py-[27px]">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-[#f9fafb]">
                <FigmaAsset src="/images/icon-agency.svg" alt="" />
              </div>
              <h3 className="pt-2 font-poppins text-xl font-bold text-[#0f172a]">Traditional Agency</h3>
              <p className="font-poppins text-sm text-[#0f172a]">High cost, slow process</p>
            </div>
            <FeatureList items={agency} icon="/images/icon-x.svg" negative />
          </article>
          <article className="relative w-full max-w-[311px] overflow-hidden rounded-[32px] bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] pt-10 shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)] lg:min-h-[413px]">
            <p className="absolute top-3 left-0 w-full text-center font-display text-sm font-bold text-white">
              Best Value
            </p>
            <div className="mx-1.5 mb-0 overflow-hidden rounded-[32px] border border-[#f9fafb] bg-[#f9fafb]">
              <div className="flex flex-col items-center gap-2 bg-white px-[3px] py-[27px]">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-[#f9fafb]">
                  <FigmaAsset src="/images/icon-crown.svg" alt="" />
                </div>
                <h3 className="pt-2 font-poppins text-xl font-bold text-[#0f172a]">Zyroun</h3>
                <p className="font-poppins text-sm text-[#0f172a]">Premium quality, fair price</p>
              </div>
              <FeatureList items={zyroun} icon="/images/icon-check-teal.svg" />
            </div>
          </article>
          <article className="w-full max-w-[299px] overflow-hidden rounded-[32px] border border-[#f9fafb] bg-[#f9fafb] shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col items-center gap-2 bg-white px-[3px] py-[27px]">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-[#f9fafb]">
                <FigmaAsset src="/images/icon-freelance.svg" alt="" />
              </div>
              <h3 className="pt-2 font-poppins text-xl font-bold text-[#0f172a]">Freelance Sites</h3>
              <p className="font-poppins text-sm text-[#0f172a]">Inconsistent quality</p>
            </div>
            <ul className="flex flex-col gap-3 p-[30px] font-poppins text-sm text-[#0f172a]">
              {freelance.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  <FigmaAsset
                    src={index < 2 ? "/images/icon-x-muted.svg" : "/images/icon-x.svg"}
                    alt=""
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
