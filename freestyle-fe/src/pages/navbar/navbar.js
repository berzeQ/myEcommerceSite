import React, { useState } from "react";
import styles from '../../styles/navStyles.module.css';
import { Router, useRouter } from "next/router";
import SearchBar from "@/components/searchBar";

import Image from "next/image";
// import Marquee from "react-fast-marquee";
const Navbar =()=>{
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState(null);


const catList = [ 'men', 'women','kids','upperwear', 'bottomwear','3XL','accessories']
const handleMouseEnter = (category) => {
  // Set the hovered item to the current category
  setHoveredItem(category);
};
const handleMouseLeave = () => {
  // Reset the hovered item when leaving
  setHoveredItem(null);
};


const productPage= ()=>{
  router.push('/ProductCat/Men');
}
const goToHome = () =>{
  router.push('/')
}


  return(
    <nav className={styles.mainNav}>
      <div className={styles.gridContainer}>
        <div className={styles.topNav}>
          <div className={styles.logoMain} onClick={()=>{goToHome()}}>
          {/* <Image src= "" width= {50} height = {50} alt = "logo pic"/> */}
          LOGO
          </div>
          <div className={styles.searchBar}><SearchBar/></div>
         <div className={styles.mainUserNav}>
            <div className= {styles.userNav}>userNav</div>
              <div className={styles.navCart}>CART</div>
         </div>
        </div>

        <div className={styles.midNav}>

          {catList.map((category) => (
                <div 
                className={styles.gridItem}
                  key={category}
                  onClick={()=>productPage()} 
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}>
                {category.toUpperCase()}

                {hoveredItem === category && (
              <div className={styles.navCatList}>
                <ul>
                  <li>hello</li>
                  <li>no</li>
                  <li>yamete</li>
                  <li>uWu</li>
                  <li>heil</li>
                </ul>

              </div>)}
              
            </div>
            
            
         ))}
      
         
        </div>
        

        <div className={styles.botNav}>
          <div className={styles.notify1}>hello</div>
          <div className={styles.notify2}>bye</div>
        </div>  

      </div>
    </nav>
    

  )
};

export default Navbar;


