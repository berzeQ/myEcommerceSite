import React from "react";
import styles from "../../styles/mainStyles.module.css";
import Image from "next/image";
import { Box, Divider, AbsoluteCenter } from "@chakra-ui/react";
import BrandSlider from "@/components/brandSlider";
import CatSlider from "@/components/categorySlider";
import { useRouter } from "next/router";
const MainBody = () => {
  const router = useRouter();
  return (
    <main className={styles.bodyCss}>
      <div className={`mb-10 ${styles.mainBanner}`}>
        <Image
          className="  object-center object-cover shadow-lg"
          src={`http://res.cloudinary.com/ddaaysabq/image/upload/v1701277551/imagePath-1701277547108-44798898.jpg?${Date.now()}`}
          alt="Main Banner"
          fill={true}
          priority

          //   width={1000} // Set the actual width of your image in pixels
          //   height={1000}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold mb-4">
            Wear your personalty!{" "}
          </h1>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300
          "
            onClick={() => router.push("/All-Products")}
          >
            Browse All Products
          </button>
        </div>
      </div>

      <section>
        <Box position="relative" padding="10" marginY={5}>
          <Divider />
          <AbsoluteCenter bg="white" px="4" fontSize={40}>
            New Arrivals
          </AbsoluteCenter>
        </Box>

        <div className={`mb-10 ${styles.newArrivals}`}>
          <Image
            className=" absolute h-auto object-center object-cover "
            src={`http://localhost:3006/admin?imageName=HeroBanner&key=${Math.random()}`}
            alt="Hero Banner"
            fill
            // sizes="(max-width: 100% ) 100vw, (max-width: 100%) 50vw, 33vw"
          />
        </div>
      </section>

      <section>
        <Box position="relative" padding="10" marginY={5}>
          <Divider />
          <AbsoluteCenter bg="white" px="4" fontSize={40}>
            Shop By Category
          </AbsoluteCenter>
        </Box>
        <div>
          <CatSlider />
        </div>
      </section>

      <section>
        <Box position="relative" padding="10" marginY={5}>
          <Divider />
          <AbsoluteCenter bg="white" px="4" fontSize={40}>
            Shop By Brand
          </AbsoluteCenter>
        </Box>
        <div>
          {/* <div className={styles.cardCategory}></div>
          <div className={styles.cardCategory}></div>
          <div className={styles.cardCategory}></div>
          <div className={styles.cardCategory}></div> */}
          <BrandSlider />
        </div>
        <h1 className={styles.header1}>Happy Shopping.</h1>
      </section>
    </main>
  );
};
export default MainBody;
