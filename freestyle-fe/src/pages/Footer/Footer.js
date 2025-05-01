import React from 'react';
import styles from '../../styles/footerStyles.module.css';

function Footer() {
  return (
   <footer>
    <div className={styles.mainFooter}>
     <div className= {styles.topFooter}>
    Footer
     <h2>Subscribe to our Newletter</h2>
     <input type="text"  placeholder='Enter your email'/>
     <button type="button">Submit</button>
     </div>
     <div className= {styles.botFooter}>
        <div className= {styles.footerGridItem}>Shop</div>
        <div className= {styles.footerGridItem}>About</div>
        <div className= {styles.footerGridItem}>Stores</div>
        <div className= {styles.footerGridItem}>Help</div>
        <div className= {`${styles.footerGridItem} ${styles.brandsSocial} `}>
            <div className= {styles.footerBrands}>Brands</div>
            <div className= {styles.footerSocialMedias}>Socials</div>
        </div>
        <div className= {styles.footerGridItem}>Payments</div>

     </div>
     </div>

   </footer>
  )
}

export default Footer