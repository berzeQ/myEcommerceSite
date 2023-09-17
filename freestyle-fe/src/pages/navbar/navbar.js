import React, { useState } from "react";
import styles from '../../styles/navStyles.module.css';
import { Router, useRouter } from "next/router";
import SearchBar from "@/components/searchBar";
// import Marquee from "react-fast-marquee";
const Navbar =()=>{
  const router = useRouter();
  const [showlist, setShowList] = useState(false);

const catList = [ 'men', 'women','kids','upperwear', 'bottomwear','3XL','accessories']

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
          <div className={styles.logoMain} onClick={()=>{goToHome()}}>LOGO</div>
          <div className={styles.searchBar}><SearchBar/></div>
         <div className={styles.mainUserNav}>
            <div className= {styles.userNav}>userNav</div>
              <div className={styles.navCart}>CART</div>
         </div>
        </div>

        <div className={styles.midNav}>
          {catList.map((category) => (
            <div className={styles.gridItem} key={category} onClick={()=>productPage()} onMouseEnter={()=>{
             setShowList(true)
            }} onMouseLeave={()=>{
              setShowList(false)
            }}>
              {category.toUpperCase()}
              
            </div>
            
         ))}
         
        </div>
        {showlist && <div>
                <li>hello</li>
              </div>}

        <div className={styles.botNav}>
          <div className={styles.notify1}>hello</div>
          <div className={styles.notify2}>bye</div>
        </div>  

      </div>
    </nav>
    

  )
};

export default Navbar;


