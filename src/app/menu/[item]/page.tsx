import React from 'react'
import Products from "@/app/components/Products"
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const getProductData = async (product:string) => {
    const res = await fetch(`http://localhost:3000/api/menu/${product}`, { cache: "no-store" });
    if(!res.ok){
        throw new Error("Something Went Wrong")
    }
    return res.json();
  };

const page = async({params}:any) => {
    var product = params.item;
    const mostFB = await getProductData(product);
    let productname = product
    if (productname.includes("milk_items")) {
        product = productname.replace(/_/g, " ");
      }
  return (
    <div>
    <Navbar />
    <Products products={mostFB} item_name={product} />
    <Footer />
    </div>
  )
}

export default page
