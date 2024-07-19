"use client";

import React, { useState } from "react";
import { personalDetails } from "../actions/personalDetails";
import { toast } from "react-toastify";
import { UserAuth } from "../context/AuthContext";
import Link from "next/link";

const UserDetailsForm = (data: any) => {
  const { user } = UserAuth();
  const userDetails = data.data;

  // var countries = {
  //   cUrl: "https://api.countrystatecity.in/v1/countries",
  //   cKey: "elhaUzhkMEIyUXJvSjVyZW9QRmp5YXBGWjVKd2lqV0h6VFRLS3B5eQ==",
  // };

  const tamilNaduDistricts = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Kanniyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];
  const tamilNaduCitiesAndTowns = [
    "Alandur",
    "Alangayam",
    "Ambur",
    "Anakaputhur",
    "Arakkonam",
    "Aranthangi",
    "Ariyalur",
    "Aruppukottai",
    "Attur",
    "Avinashi",
    "Bhavani",
    "Chennai",
    "Chidambaram",
    "Coimbatore",
    "Coonoor",
    "Cuddalore",
    "Devakottai",
    "Dharmapuri",
    "Dharapuram",
    "Dindigul",
    "Erode",
    "Gobichettipalayam",
    "Gopichettipalayam",
    "Gudiyatham",
    "Hosur",
    "Ilayangudi",
    "Kancheepuram",
    "Kangayam",
    "Karaikudi",
    "Karaikkudi",
    "Karur",
    "Kattumannarkoil",
    "Kayalpattinam",
    "Kodaikanal",
    "Kollankoil",
    "Kotagiri",
    "Kottaiyur",
    "Kottakuppam",
    "Kottivakkam",
    "Kovilpatti",
    "Krishnagiri",
    "Kuzhithurai",
    "Kulasekaram",
    "Kulithalai",
    "Kumbakonam",
    "Kumarapalayam",
    "Kurinjipadi",
    "Lalgudi",
    "Madathukulam",
    "Madukkarai",
    "Madurai",
    "Mamallapuram",
    "Manachanallur",
    "Manamadurai",
    "Manchampalayam",
    "Manali",
    "Mannargudi",
    "Manapparai",
    "Maduranthakam",
    "Mayiladuthurai",
    "Melur",
    "Mettupalayam",
    "Musiri",
    "Nagapattinam",
    "Nagercoil",
    "Nagarcoil",
    "Namakkal",
    "Nannilam",
    "Nellikuppam",
    "Nelliyalam",
    "Neyveli",
    "Nilakottai",
    "Oddanchatram",
    "Orathanadu",
    "Palani",
    "Palacode",
    "Palladam",
    "Pallavaram",
    "Panruti",
    "Paramakudi",
    "Pennagaram",
    "Perambalur",
    "Peravurani",
    "Periyakulam",
    "Perundurai",
    "Pollachi",
    "Ponneri",
    "Pudukkottai",
    "Puliyankudi",
    "Rajapalayam",
    "Ramanathapuram",
    "Ranipet",
    "Rasipuram",
    "Salem",
    "Sankarankovil",
    "Sattur",
    "Sathyamangalam",
    "Sendurai",
    "Sivaganga",
    "Sivakasi",
    "Sirkali",
    "Somanur",
    "Sriperumbudur",
    "Srivilliputhur",
    "Sulur",
    "Thanjavur",
    "Theni",
    "Thiruvarur",
    "Thiruthani",
    "Thiruvottiyur",
    "Thuvarankurichi",
    "Tindivanam",
    "Tiruchengode",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupattur",
    "Tirupathur",
    "Tiruppur",
    "Tiruttani",
    "Tiruvannamalai",
    "Tiruvallur",
    "Tiruvethipuram",
    "Thoothukudi",
    "Udumalaipettai",
    "Udumalpet",
    "Udhagamandalam",
    "Usilampatti",
    "Vadakkuvalliyur",
    "Vadipatti",
    "Vaniyambadi",
    "Vedaranyam",
    "Vedanthangal",
    "Vellakoil",
    "Vellore",
    "Veerapandi",
    "Virudhachalam",
    "Virudhunagar",
    "Viluppuram",
    "Wallajahbad",
    "Walajapet",
  ];

  const [formValues, setFormValues] = useState({
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    email: userDetails?.email || "",
    mobile: userDetails?.mobile || "",
    street: userDetails?.street || "",
    city: userDetails?.city || "",
    district: userDetails?.district || "",
    state: userDetails?.state || "",
    pincode: userDetails?.pincode || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <>
      {user === null ? (
        <div>
          <Link
            href="/login"
            className="flex items-center justify-center font-medium px-16 py-6 bg-black text-center text-white rounded-full my-32 md:my-6 "
          >
            Please login to Continue!
          </Link>
        </div>
      ) : (
        <>
          <form
            action={async (formData) => {
              const data = await personalDetails(formData, user.uid);
              if (
                (data.status === 200 || data.status === 409) &&
                formValues.pincode.length === 6
              ) {
                toast.success("Updated Successfully", {
                  position: "bottom-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
              if (
                formValues.pincode.length > 6 ||
                formValues.pincode.length < 6
              ) {
                toast.error("Pincode must be 6 digits", {
                  position: "bottom-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            }}
          >
            <div className="m-2 flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label htmlFor="firstName" className="block font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[300px]"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[300px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label htmlFor="mailid" className="block font-medium">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email ID"
                    value={formValues.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[300px]"
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block font-medium">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter your mobile number"
                    value={formValues.mobile}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[300px]"
                  />
                </div>
              </div>
            </div>
            <h1 className="m-2 mt-4 text-2xl font-medium">Address</h1>
            <div className="m-2 flex flex-col gap-4">
              <div>
                <label htmlFor="street" className="block font-medium">
                  Street Name
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="Enter your street name"
                  value={formValues.street}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[765px]"
                />
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label htmlFor="city" className="block font-medium">
                    City / Town
                  </label>
                  <select
                    name="city"
                    id="city"
                    value={formValues.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[300px]"
                  >
                    <option value="">Select a city/town</option>
                    {tamilNaduCitiesAndTowns.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="district" className="block font-medium">
                    District
                  </label>
                  <select
                    name="district"
                    id="district"
                    value={formValues.district}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[300px]"
                  >
                    <option value="">Select a district</option>
                    {tamilNaduDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-40">
                <div>
                  <label htmlFor="state" className="block font-medium">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter your state name"
                    value="Tamil Nadu"
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[300px]"
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block font-medium">
                    Pincode
                  </label>
                  <input
                    type="number"
                    name="pincode"
                    id="pincode"
                    placeholder="Enter your pincode"
                    value={formValues.pincode}
                    onChange={handleInputChange}
                    required
                    pattern="\d{6}"
                    maxLength={6}
                    className="w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[300px]"
                  />
                </div>
              </div>
              <input
                type="submit"
                onClick={() => window.location.reload()}
                className="w-full p-4 bg-black text-white rounded-sm my-10 lg:w-[200px] hover:scale-105 hover:cursor-pointer duration-300"
                value="Save"
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default React.memo(UserDetailsForm);
