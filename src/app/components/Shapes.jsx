"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Shapes = () => {
  return (
    <section className="relative">
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* <Image
          src="/assets/image copy.png"
          alt="jamun"
          width={500}
          height={500}
          className="absolute flex items-center justify-center rounded-full border-2 border-[#E2725B]/20 md:w-[200px] md:h-[200px] transform md:scale-x-[-1] shadow-xl "
        /> */}
        <Image
          src="/assets/image.png"
          alt="ganesha"
          width={500}
          height={500}
          className="w-[200px] h-[250px] md:w-[360px] md:h-[480px] lg:w-[480px] lg:h-[520px]"
        />
      </motion.div>
    </section>
  );
};

export default Shapes;
