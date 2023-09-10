import React from "react";
import style from "./mainStyles.css";
const MainBody =()=>{





return(
   
    <main>
        <div className="mainBanner">
        mainbody
        </div>
        
    <section>
        <h1>New Arrivals</h1>
        <div className="newArrivals"></div>
    </section>
    

    <section>
        <h1>Shop By Category</h1>
        <hr style={{padding:"3rem"}}/>
        <div className="carousel">
            <div className="cardCategory"></div>
            <div className="cardCategory"></div>
            <div className="cardCategory"></div>
            <div className="cardCategory"></div>


        </div>
        
    </section>
    <hr />
    
    <section>
        <h1>Shop By Brand</h1>
        <hr style={{padding:"3rem"}}/>
        <div className="carousel">
            <div className="cardCategory"></div>
            <div className="cardCategory"></div>
            <div className="cardCategory"></div>
            <div className="cardCategory"></div>


        </div>
        <h1>Happy Shopping.</h1>
        
    </section>
    
</main>

)
};
export default MainBody;