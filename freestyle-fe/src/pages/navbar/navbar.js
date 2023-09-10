import React from "react";
import styles from '../../styles/navStyles.module.css';
// import Marquee from "react-fast-marquee";
const Navbar =()=>{

const catList = [ 'men', 'women','kids','upperwear', 'bottomwear','3XL','accessories']



  return(
    <nav className={styles.mainNav}>
      <div className={styles.gridContainer}>
        <div className={styles.topNav}>
          <div className={styles.logoMain}>LOGO</div>
          <div className={styles.searchBar}>Search</div>
         <div className={styles.mainUserNav}>
            <div className= {styles.userNav}>userNav</div>
              <div className={styles.navCart}>CART</div>
         </div>
        </div>

        <div className={styles.midNav}>
          {catList.map((category) => (
            <div className={styles.gridItem} key={category}>
              {category.toUpperCase()}
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


