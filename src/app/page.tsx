import Image from "next/image";
import Link from "next/link";
import SpecialCombos from "./components/SpecialCombos";


const getData = async () => {
  const res = await fetch("http://localhost:3000/api/special_combos", { cache: "no-store" });
  if(!res.ok){
      throw new Error("Something Went Wrong")
  }
  return res.json();
};

export default async function Home() {
  const items = await getData();

  const categories = [
    {
      name: "Sweets",
      image: "/assets/sweets.jpeg",
      link: "/menu/sweets",
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
      name: "Milk Items",
      image: "/assets/milk_items.jpeg",
      link: "/menu/milk_items",
    },
    {
      name: "Poli",
      image: "/assets/poli.jpeg",
      link: "/menu/poli",
    },
  ];

  return (
    <div>
      <div className="">
        <section className="my-14 xl:my-4 lg:my-4 flex flex-row lg:gap-10 lg:items-center lg:mx-10">
          <div className="text-center lg:text-left">
            <h1 className="text-[32px] xl:text-[48px]">
              Unleash a flavor symphony with every bite
            </h1>
            <h2 className="text-[#8C8C8C] text-[18px] xl:text-[22px] my-4">
              Fuel your day with flavor you'll love, guilt-free.
            </h2>
            <button className="px-14 py-5 bg-[#F74541] text-white font-medium hover:scale-105 duration-150">
              Taste Now
            </button>
          </div>

          <Image
            src="/assets/hero1.jpeg"
            width={800}
            height={800}
            alt="hero image"
            className="w-full hidden lg:block rounded-xl w-[250px] h-[750px]"
          />
        </section>

        <section className="mb-14">
          <h1 className="text-center font-normal text-3xl">
            Explore Our Store
          </h1>

          <div className="flex flex-wrap justify-center gap-8 p-4">
            {categories.map((category, index) => (
              <Link href={category.link} key={index}>
                <div key={index} className="relative overflow-hidden">
                  <div className="bg-[#F74541] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
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
          <h1 className="text-center font-normal text-3xl">About Us</h1>
          <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-10 mt-14 lg:items-center">
            <Image
              src="/assets/murukku.jpeg"
              width={1000}
              height={1000}
              alt="hero image"
              className="w-full hidden lg:flex rounded-xl"
            />

            <p className="text-justify text-[18px] font-[300] lg:max-w-[600px] xl:text-[22px] md:px-20">
              Hari Ganesh Sweets & Hot Chips - Bringing a taste of India to your
              doorstep. Our shop offers a wide range of traditional sweets and
              hot chips made fresh daily. From our famous Gulab Jamun to crispy
              Masala Chips, we've got something for everyone. Come visit us for
              a delicious snack or treat yourself to a sweet indulgence. Our
              commitment to quality and customer satisfaction is unmatched.
              Treat your taste buds today!
            </p>
          </div>
        </section>



        <SpecialCombos combos={items}/>
      </div>
    </div>
  );
}
