import React from "react";
import styles from "../../styles/mainStyles.module.css";
const MainBody =()=>{





return(
   
    <main>
        <div className={styles.mainBanner}>
        mainbody
        </div>
        
    <section>
        <h1 className={styles.header1}>New Arrivals</h1>
        <hr style={{margin:"3rem"}}/>

        <div className={styles.newArrivals}></div>
    </section>
    

    <section>
        <h1 className={styles.header1}>Shop By Category</h1>
        <hr style={{margin:"3rem"}}/>
        <div className={styles.carousel}>
            <div className={styles.cardCategory}></div>
            <div className={styles.cardCategory}></div>
            <div className={styles.cardCategory}></div>
            <div className={styles.cardCategory}></div>


        </div>
        
    </section>
    
    <section>
        <h1 className={styles.header1}>Shop By Brand</h1>
        <hr style={{margin:"3rem"}}/>
        <div className={styles.carousel}>
            <div className={styles.cardCategory}></div>
            <div className={styles.cardCategory}></div>
            <div className={styles.cardCategory}></div>
            <div className={styles.cardCategory}></div>


        </div>
        <h1 className={styles.header1}>Happy Shopping.</h1>
        
    </section>
    
</main>

)
};
export default MainBody;