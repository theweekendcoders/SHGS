import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar"

export default function Home() {

  const items = [
    {
      name: "Spl.Mixture",
      cost: 100,
    },
    {
      name: "Murukku",
      cost: 50,
    },
    {
      name: "Kaju Katli",
      cost: 300,
    },
  ];
  
  const categories = [
    {
      name: "Sweets",
      link: "/menu/sweets",
    },
    {
      name: "Savouries",
      link: "/menu/savouries",
    },
    {
      name: "Snacks",
      link: "/menu/snacks",
    },
    {
      name: "Vathal",
      link: "/menu/vathal",
    },
    {
      name: "Milk Items",
      link: "/menu/milk_items",
    },
    {
      name: "Poli",
      link: "/menu/poli",
    },
  ]

  return (
    <div>
      
    <Navbar />


      <div className="">
        <section className="my-14 grid grid-cols-1 lg:grid-cols-2 lg:gap-10 lg:items-center">
          <div className="md:text-center lg:text-left">
            <h1 className=" text-[32px] xl:text-[48px]">Unleash a flavor symphony with every bite</h1>
            <h2 className="text-[#8C8C8C] text-[18px] xl:text-[22px] my-4">Fuel your day with flavor you'll love, guilt-free.</h2>
            <button className="px-14 py-5 bg-[#F74541] text-white font-medium hover:scale-105 duration-150">Taste Now</button>
          </div>

          <Image
            src='/assets/murukku.jpeg'
            width={1000}
            height={1000}
            alt="hero image"
            className="w-full hidden lg:flex rounded-xl"
          />

        </section>

        <section className="mb-14">
          <h1 className="text-center font-normal text-3xl">Explore Our Store</h1>

          <div className="flex flex-wrap justify-center gap-8 p-4">
            {
                categories.map((category, index) => (
                  <Link href={category.link} key={index}>
                    <div key={index} className="relative overflow-hidden">
              <div className="bg-[#F74541] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
                <div className="h-40 md:h-48 overflow-hidden">
                  <img
                    src='/assets/murukku.jpeg'
                    alt={category.name}
                    className="object-cover object-center w-full h-full transition-opacity duration-300"
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
                ))
            }
          </div>

        </section>

        <section className="mb-14">
          <h1 className="text-center font-normal text-3xl">About Us</h1>
          <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-10 mt-14 lg:items-center">

            <Image
              src='/assets/murukku.jpeg'
              width={1000}
              height={1000}
              alt="hero image"
              className="w-full hidden lg:flex rounded-xl"
            />


            <p className="text-justify text-[18px] font-[300] lg:max-w-[600px] xl:text-[22px]">Hari Ganesh Sweets & Hot Chips - Bringing a taste of India to your doorstep. Our shop offers a wide range of traditional sweets and hot chips made fresh daily. From our famous Gulab Jamun to crispy Masala Chips, we've got something for everyone. Come visit us for a delicious snack or treat yourself to a sweet indulgence. Our commitment to quality and customer satisfaction is unmatched. Treat your taste buds today!</p>

          </div>

        </section>

        <section className="mb-14">
          <h1 className="text-center font-normal text-3xl">Our Specials</h1>
          <div className="my-14 w-full">
            <div className=" grid grid-flow-col gap-10 overflow-x-scroll lg:grid-cols-3 lg:overflow-hidden lg:justify-items-center">
              {
                items.map((item, index) => (
                  <div className="w-[250px] h-[300px] border-2 border-black rounded-tl-none rounded-3xl flex flex-col" key={index}>

                    <Image
                      src='/assets/murukku.jpeg'
                      width={1000}
                      height={700}
                      alt="item"
                      className="object-cover rounded-tl-none rounded-br-none rounded-3xl"
                    />
                    <div className="p-4">

                      <h1 className=" font-[400] text-xl">{item.name}</h1>
                      <h2 className="  text-lg">Rs.{item.cost}</h2>
                      <p>/ 100g</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </div>

      <hr className="mb-4 border-black" />

      <footer className="">
        <div className="flex flex-col gap-10">
          <div className="flex flex-row gap-1 items-center">
            <Image
              src='/assets/logo.svg'
              width={60}
              height={60}
              alt="menu"
            />
            <h1 className="text-[20px]">Shree Hariganesh Sweets</h1>
          </div>

          <div>
            <h1 className="text-lg font-[300]">Home</h1>
            <h1 className="text-lg font-[300]">Menu</h1>
            <h1 className="text-lg font-[300]">Contact Us</h1>
          </div>

          <div>
            <p>Copyright @  2024 SHGS All rights reserved</p>
            <span className="text-[#8C8C8C]">Powered By theweekendcoders.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
