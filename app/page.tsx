import { Categories } from "../components/home/categories";
import { Compare } from "../components/home/compare";
import { Cta } from "../components/home/cta";
import { Designers } from "../components/home/designers";
import { Hero } from "../components/home/hero";
import { HowItWorks } from "../components/home/how-it-works";
import { Testimonials } from "../components/home/testimonials";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center bg-white">
      <Hero />
      <HowItWorks />
      <Categories />
      <Designers />
      <Compare />
      <Testimonials />
      <Cta />
    </main>
  );
}
