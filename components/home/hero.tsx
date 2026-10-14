import { Button } from "../button";
import { FigmaAsset } from "../figma-asset";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-[26px] px-5 py-16 md:px-20 md:py-[100px]">
      <div className="flex h-[61px] items-center gap-2.5 rounded-[106px] bg-white p-2.5 shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)]">
        <Button
          href="#post-project"
          icon={<FigmaAsset src="/images/icon-send.svg" alt="" />}
        >
          Start a Project
        </Button>
        <Button href="#designers" variant="ghost">
          Browse Jobs
        </Button>
      </div>
      <p className="text-center font-display text-xs font-bold tracking-wide text-[#7b61ff] uppercase">
        Premium design marketplace
      </p>
      <h1 className="max-w-[1280px] text-center font-display text-[40px] leading-[1.05] font-extrabold text-[#0f172a] md:text-[56px] md:leading-[73px] lg:text-[72px]">
        Get the perfect design.
        <span className="block bg-gradient-to-r from-[#7b61ff] to-[#5ce1e6] bg-clip-text text-transparent">
          Every single time.
        </span>
      </h1>
      <p className="max-w-[720px] text-center font-display text-base font-medium text-[#0f172a] md:text-[20px] md:leading-7">
        Launch a contest, receive dozens of premium concepts from top-tier
        designers globally, and choose your favorite.
      </p>
      <form
        className="flex w-full max-w-[738px] flex-col items-stretch gap-3 rounded-[91px] bg-white px-4 py-2.5 shadow-[0px_2px_3.5px_rgba(0,0,0,0.1)] sm:flex-row sm:items-center sm:gap-6 sm:px-6"
        action="#post-project"
      >
        <label className="flex min-w-0 flex-1 items-center gap-3 border-[#e5e7eb] sm:border-r sm:pr-4">
          <span className="sr-only">Category</span>
          <FigmaAsset src="/images/icon-layers.svg" alt="" />
          <select
            defaultValue="Logo Design"
            className="w-full min-w-0 appearance-none bg-transparent font-display text-sm font-medium text-[#0f172a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          >
            <option>Logo Design</option>
            <option>UI/UX Design</option>
            <option>Branding &amp; Logos</option>
            <option>Web Design</option>
          </select>
          <FigmaAsset src="/images/icon-chevron-down.svg" alt="" />
        </label>
        <label className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="sr-only">What do you need designed?</span>
          <FigmaAsset src="/images/icon-search.svg" alt="" />
          <input
            type="search"
            placeholder="What do you need designed?"
            className="w-full min-w-0 bg-transparent font-display text-sm font-medium text-[#0f172a] placeholder:text-[#64748b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b61ff]"
          />
        </label>
        <Button href="#post-project" variant="solid" size="sm" className="w-full sm:w-[124px]">
          Get Started
        </Button>
      </form>
    </section>
  );
}
