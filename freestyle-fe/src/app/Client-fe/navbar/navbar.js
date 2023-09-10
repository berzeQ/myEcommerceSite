
import styles from "./navStyles.css";
import Marquee from "react-fast-marquee";
const Navbar =()=>{

const catList = [ 'men', 'women','kids','upperwear', 'bottomwear','3XL','accessories']



  return(
    <nav>
      <div className="gridContainer">
        <div className="topNav">
          <div className="logoMain">LOGO</div>
          <div className="searchBar">Search</div>
         <div className="mainUserNav">
            <div className="userNav">userNav</div>
              <div className="navCart">CART</div>
         </div>
        </div>

        <div className="midNav">
          {catList.map((category) => (
            <div className="grid-item" key={category}>
              {category.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="botNav">
          <div className="notify1">hello</div>
          <div className="notify2">bye</div>
        </div>  

      </div>
    </nav>

  )
};

export default Navbar;


