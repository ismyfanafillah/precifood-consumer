import Carousel from "react-material-ui-carousel";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@mui/material";

export default function LandingPage() {
  const slides = [
    {
      image: "/images/image1.png",
      title: "Selamat Datang di PreciFood",
      description:
        "Temukan rekomendasi menu terbaik untuk restoran favorit Anda!",
    },
    {
      image: "/images/opt-makan.png",
      title: "Manfaat PreciFood",
      description:
        "Dapatkan rekomendasi menu yang sesuai dengan selera Anda berdasarkan preferensi dan ulasan pengguna lain.",
    },
    {
      image: "/images/mobile2.png",
      title: "Cara Menggunakan",
      description:
        "Cukup daftar atau login, pilih restoran, dan dapatkan rekomendasi terbaik!",
    },
  ];

  return (
    (<div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
      <div className="max-w-md w-full">
        {/* Carousel / Slider */}
        <Carousel indicators={false} navButtonsAlwaysInvisible>
          {slides.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={img.image}
                alt={`Foto ${index + 1}`}
                className="rounded-l"
                fill
                unoptimized
                sizes="100vw"
                style={{
                  objectFit: "cover"
                }} />

              <h2 className="text-2xl font-bold mt-4">{img.title}</h2>
              <p className="text-gray-700 text-sm mt-2">{img.description}</p>
            </div>
          ))}
        </Carousel>
        {/* <Carousel indicators={false} navButtonsAlwaysVisible>
          {slides.map((slide, index) => (
            <div key={index} className="flex flex-col items-center p-6">
              <div className="relative w-64 h-64">
                <Image
                  src={slide.image}
                  alt={`Onboarding ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  // unoptimized
                  className="rounded-lg"
                />
              </div>

              <h2 className="text-2xl font-bold mt-4">{slide.title}</h2>
              <p className="text-gray-700 text-sm mt-2">{slide.description}</p>
            </div>
          ))}
        </Carousel> */}

        {/* Tombol Register & Login */}
        <div className="mt-6 flex justify-center space-x-4">
          <Link href="/register">
            <Button
              variant="contained"
              style={{ backgroundColor: "#4F6F52", color: "white" }}
            >
              Register
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outlined"
              style={{ borderColor: "#4F6F52", color: "#4F6F52" }}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>)
  );
}

// "use client";

// import { useState } from "react";
// import Carousel from "react-material-ui-carousel";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@mui/material";

// export default function LandingPage() {
//   const slides = [
//     {
//       image: "/images/image1.png",
//       title: "Selamat Datang di PreciFood",
//       description: "Temukan rekomendasi menu terbaik untuk restoran favorit Anda!",
//     },
//     {
//       image: "/images/makan.svg",
//       title: "Manfaat PreciFood",
//       description: "Dapatkan rekomendasi menu yang sesuai dengan selera Anda berdasarkan preferensi dan ulasan pengguna lain.",
//     },
//     {
//       image: "/images/mobile2.svg",
//       title: "Cara Menggunakan",
//       description: "Cukup daftar atau login, pilih restoran, dan dapatkan rekomendasi terbaik!",
//     },
//   ];

//   const [activeStep, setActiveStep] = useState(0);
//   const maxSteps = slides.length;

//   const handleNext = () => {
//     if (activeStep < maxSteps - 1) {
//       setActiveStep(activeStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       setActiveStep(activeStep - 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
//       <div className="max-w-md w-full relative">
//         {/* Carousel / Slider */}
//         <Carousel
//           indicators={false}
//           navButtonsAlwaysInvisible
//           autoPlay={false} // Tidak berpindah otomatis
//           index={activeStep}
//           animation="slide"
//         >
//           {slides.map((slide, index) => (
//             <div key={index} className="flex flex-col items-center p-6">
//               <div className="relative w-64 h-64 flex justify-center items-center">
//                 <Image
//                   src={slide.image}
//                   alt={`Onboarding ${index + 1}`}
//                   layout="intrinsic"
//                   width={250}
//                   height={250}
//                   unoptimized
//                   className="rounded-lg"
//                 />
//               </div>
//               <h2 className="text-2xl font-bold mt-4">{slide.title}</h2>
//               <p className="text-gray-700 text-sm mt-2">{slide.description}</p>
//             </div>
//           ))}
//         </Carousel>

//         {/* Tombol Navigasi Kiri & Kanan */}
//         <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
//           {activeStep > 0 && (
//             <button onClick={handleBack}>
//               <Image src="/images/arrow-left.svg" alt="Previous" width={40} height={40} />
//             </button>
//           )}
//         </div>

//         <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
//           {activeStep < maxSteps - 1 && (
//             <button onClick={handleNext}>
//               <Image src="/images/arrow-right.svg" alt="Next" width={40} height={40} />
//             </button>
//           )}
//         </div>

//         {/* Tombol Register & Login Muncul di Slide Terakhir */}
//         {activeStep === maxSteps - 1 && (
//           <div className="mt-6 flex justify-center space-x-4">
//             <Link href="/register">
//               <Button variant="contained" className="bg-green-600 text-white p-3 rounded-lg">
//                 Register
//               </Button>
//             </Link>
//             <Link href="/login">
//               <Button variant="outlined" className="border-green-600 text-green-600 p-3 rounded-lg">
//                 Login
//               </Button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
