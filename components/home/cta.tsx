import { Button } from "../button";

export function Cta() {
  return (
    <section
      id="post-project"
      className="w-full bg-[#f9fafb] px-5 py-16 md:px-20 md:py-24"
    >
      <div className="mx-auto flex max-w-[896px] flex-col items-center gap-9 text-center">
        <h2 className="font-display text-[40px] leading-tight font-extrabold text-[#0f172a] md:text-[72px] md:leading-[73px]">
          Ready to get{" "}
          <em className="font-serif font-normal text-[#7b61ff] italic">started?</em>
        </h2>
        <p className="max-w-[672px] font-poppins text-base text-[#0f172a] md:text-[20px] md:leading-7">
          Launch your design contest today and receive dozens of unique concepts
          from talented designers worldwide.
        </p>
        <Button href="#post-project" className="w-[146px]">
          Post a Project
        </Button>
      </div>
    </section>
  );
}
