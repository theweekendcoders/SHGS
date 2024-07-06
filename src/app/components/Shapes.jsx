import React from "react";
import Image from "next/image";

const Shapes = () => {
  return (
    <section className="">

      <Image
        src="/assets/image.png"
        alt="jamun"
        width={100}
        height={100}
        className="w-[200px] h-[200px]"
      />
    </section>
  );
};

export default Shapes;
