import { Box, Text } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Instead of importing the whole HStack and VStack, you can import only what you need
import { HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const getCat = async (setCatDetails) => {
  const res = await fetch("http://localhost:3006/add-category");
  const data = await res.json();
  const catData = await data.CategoryDetails;

  setCatDetails(catData);
};

const Slider = dynamic(() => import("react-slick").then((m) => m.default), {
  ssr: false,
});

// You can destructure the "title" directly from props
const Slide = ({ title, categoryImageId }) => {
  const router = useRouter();
  const slideStyle = {
    position: "relative",
  };
  const overlayStyle = {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(http://localhost:3006/add-category-image/${categoryImageId})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(3px)", // Adjust the blur intensity as needed
  };
  function handleRoute(title) {
    router.push(`/productCategory/${title}`);
  }
  return (
    <HStack
      w="45%"
      h="300px"
      bg="cyan.400"
      style={slideStyle}
      borderWidth="1px"
      borderColor="cyan.700"
      align="center"
      justify="center"
      borderRadius="md"
      backgroundColor="purple"
      ml="20%"
      mb="5%"
      className="drop-shadow-xl cursor-pointer"
      onClick={() => {
        handleRoute(title);
      }}
      // Added border radius for a more visually appealing look
    >
      <div>
        <div style={overlayStyle}></div>
        <Text
          color="white"
          fontWeight="bold"
          zIndex={1}
          position="relative"
          fontSize={30}
        >
          {title}
        </Text>
      </div>
    </HStack>
  );
};

export default function CatSlider() {
  const [catDetails, setCatDetails] = useState([]);

  useEffect(() => {
    getCat(setCatDetails);
  }, []);
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 4,
  };

  return (
    <Box my="20" mx="20">
      <Box
        sx={{
          ".slick-dots": {
            transform: "translateY(1em)",
          },
          ".slick-dots li button": {
            _before: {
              transition: "0.2s",
              content: "''",
              borderRadius: "100%",
              background: "purple.500",
            },
          },
          ".slick-arrow": {
            backgroundColor: "purple.500",
            color: "white",
            width: "30px", // Changed "w" to "width" for consistency
            height: "50px", // Changed "h" to "height" for consistency
            transition: "0.2s",
            _hover: {
              backgroundColor: "purple.500", // Slightly different color on hover
              color: "white",
            },
            _focus: {
              backgroundColor: "purple.600", // Slightly different color on focus
              color: "white",
            },
            _before: {
              transition: "0.2s",
            },
          },
          ".slick-prev": {
            left: "-40px",
            _before: {
              content: '"◀"',
            },
          },
          ".slick-next": {
            right: "-40px",
            _before: {
              content: '"▶"',
            },
          },
        }}
      >
        <Slider {...slickSettings}>
          {/* <Slide title={"スライド１"} />
          <Slide title={"スライド２"} />
          <Slide title={"スライド３"} />
          <Slide title={"スライド４"} />
          <Slide title={"スライド５"} /> */}
          {catDetails &&
            catDetails.length > 0 &&
            catDetails.map((category) => {
              return (
                <Slide
                  title={category.CatName}
                  categoryImageId={category._id}
                />
              );
            })}
        </Slider>
      </Box>
    </Box>
  );
}
