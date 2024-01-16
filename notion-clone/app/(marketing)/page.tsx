import { Button } from "@/components/ui/button";
import Heading from "./_components/heading";
import { Heroes } from "./_components/heroes";
import Footer from "./_components/footer";

// where you want your user to do something like a form
export default function MarketingPage() {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        {/* flex-1 : take up as much available vertical space as possible*/}
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}
