
import Banner from "@/components/homepage/Banner";
import LearningProcess from "@/components/homepage/LearningProcess";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      
      <Banner/>
      
      <LearningProcess/>
      <WhyChooseUs/>
    </div>
  );
}
