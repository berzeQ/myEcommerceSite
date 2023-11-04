import React from "react";
import styles from "../../styles/mainStyles.module.css";
import Image from "next/image";
import { Box, Divider, AbsoluteCenter } from "@chakra-ui/react";
import BrandSlider from "@/components/brandSlider";
import CatSlider from "@/components/categorySlider";
const MainBody = () => {
  return (
    <main className={styles.bodyCss}>
      <div className={`mb-10 ${styles.mainBanner}`}>
        <Image
          className="  object-center object-cover shadow-lg"
          src={`http://localhost:3006/admin?imageName=MainBanner&key=${Math.random()}`}
          alt="Main Banner"
          fill={true}

          //   width={1000} // Set the actual width of your image in pixels
          //   height={1000}
        />
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
