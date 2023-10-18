import React from "react";
import styles from "../../styles/productDisplay.module.css";
import { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function ProductDisplay() {
  function DataTabs({ data }) {
    return (
      <Tabs>
        <TabList>
          {data.map((tab, index) => (
            <Tab key={index} p={6} mr={5}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel p={8} key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
  }

  // 2. Create an array of data
  const tabData = [
    {
      label: "Features",
      content: "Perhaps the greatest dish ever invented.",
    },
    {
      label: "Specification",
      content:
        "Perhaps the surest dish ever invented but fills the stomach more than rice.",
    },
    {
      label: "Details",
      content:
        "Perhaps the surest dish ever invented but fills the stomach more than rice.Perhaps the greatest dish ever invented ",
    },
  ];

  // 3. Pass the props and chill!

  return (
    <div>
      <div className={styles.path}>
        <p>Home</p> <span> &gt; </span> <p>Men</p>
        <span> &gt; </span>
        <p>ProductName</p>
      </div>
      <div className={styles.gridProductContainer}>
        <div className={styles.productImage}></div>
        <div className={styles.productDetails}></div>

        <div className={styles.productSpec}>
          <DataTabs data={tabData} />
        </div>

        <div className={styles.productOption}></div>
      </div>
    </div>
  );
}

export default ProductDisplay;
