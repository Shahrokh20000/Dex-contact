import About from "@/components/About";
import MobileNav from "@/components/MobileNav";

const about = () => {
  return (
    <>
      <MobileNav />
      <div className="bg-main bg-fixed py-24 px-10 min-h-screen h-full text-white">
        <About />
      </div>
    </>
  );
};

export default about;
