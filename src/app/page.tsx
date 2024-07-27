import Image from "next/image";
import Link from "next/link";
import SpecialCombos from "./components/SpecialCombos";
import Shapes from "./components/Shapes";
import { FlipWords } from "./animations/FlipWords";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/special_combos", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong");
  }
  return res.json();
};

export default async function Home() {
  const items = await getData();
  const words = ["YourFavoriteStore", "TasteAnywhere", "TasteAnytime."];

  const categories = [
    {
      name: "Sweets",
      image: "/assets/sweets.jpeg",
      link: "/menu/sweets",
    },
    {
      name: "Milk Items",
      image: "/assets/milk_items.jpeg",
      link: "/menu/milk_items",
    },
    {
      name: "Savouries",
      image: "/assets/savouries.jpeg",
      link: "/menu/savouries",
    },
    {
      name: "Snacks",
      image: "/assets/snacks.jpeg",
      link: "/menu/snacks",
    },
    {
      name: "Vathal",
      image: "/assets/vathal.jpeg",
      link: "/menu/vathal",
    },
    {
      name: "Poli",
      image: "/assets/poli.jpeg",
      link: "/menu/poli",
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="">
        {/* Hero */}
        <section className="flex flex-col md:flex-row my-14 xl:my-10 lg:my-4 md:grid min-h-[48vh] md:grid-row-1 items-center md:justify-between md:grid-cols-2 md:gap-10 lg:items-center lg:mx-10">
          <div className="flex items-center jusitfy-center">
            <Shapes />
          </div>
          {/* Carousel */}
          <div className="flex flex-col gap-6 justify-center items-center md:items-start md:justify-start md:gap-10">
            <div className="hidden md:block">
              <Carousel />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-[32px] xl:text-[48px] text-black font-bold">
                <span className="text-[#dc3b35]">#</span>
                <FlipWords words={words} />
              </h1>
              <h2 className="text-[#8C8C8C] text-[18px] xl:text-[22px] my-4">
                Enjoy your fill of love and happiness with our delicious menu.
                Hoping to put a smile on you and your family's face.
              </h2>
            </div>

            <div className="md:hidden">
              <Carousel />
            </div>
          </div>
        </section>

        {/* Explore store */}
        <section className="my-32">
          <h1
            className="font-bold text-3xl md:text-4xl my-14 text-[#E2725B]
            capitalize text-center
            drop-shadow-lg py-2 px-4
            rounded-lg
            relative"
          >
            Explore Our Store
          </h1>

          <div className="flex flex-wrap justify-center gap-8 p-4">
            {categories.map((category, index) => (
              <Link href={category.link} key={index}>
                <div key={index} className="relative overflow-hidden">
                  <div className="max-w-100 bg-[#8A9A5B] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
                    <div className="h-40 md:h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-full h-full transition-opacity duration-300"
                      />
                    </div>
                    <div className="px-6 py-4">
                      <h3 className="text-xl font-semibold text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h1
            className="font-bold text-3xl md:text-4xl my-14 text-[#E2725B] 
            capitalize text-center
            drop-shadow-lg py-2 px-4
            rounded-lg
            relative"
          >
            About Us
          </h1>
          <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-12 md:gap-24 mt-14 lg:items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4219.139955557599!2d79.67817426657427!3d13.076266072715526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1720263315123!5m2!1sen!2sin"
              width={1000}
              height={450}
              className="w-full lg:flex rounded-xl lg:ml-12"
              title="Location Map"
            ></iframe>

            <div className="p-6 md:px-14 backdrop-blur-md bg-white/20 rounded-xl border-2 border-[#f7f4d4]">
              <p className="text-justify text-[18px] font-[300] lg:max-w-[550px] xl:text-[22px] my-6">
                Hari Ganesh Sweets & Hot Chips - Bringing a taste of India to
                your doorstep. Our shop offers a wide range of traditional
                sweets and hot chips made fresh daily. From our famous Gulab
                Jamun to crispy Masala Chips, we've got something for everyone.
                Come visit us for a delicious snack or treat yourself to a sweet
                indulgence. Our commitment to quality and customer satisfaction
                is unmatched. Treat your taste buds today!
              </p>
            </div>
          </div>
        </section>

        <SpecialCombos combos={items} />
      </div>
      <Footer />
    </div>
  );
}
