import React from 'react';
import style from "./footerStyles.css"

function Footer() {
  return (
   <footer>
    <div className='mainFooter'>
     <div className="topFooter">
    Footer
     <h1>Subscribe to our Newletter</h1>
     <input type="text"  placeholder='Enter your email'/>
     <button type="button">Submit</button>
     </div>
     <div className="botFooter">
        <div className='gird-footer-item'>Shop</div>
        <div className='gird-footer-item'>About</div>
        <div className='gird-footer-item'>Stores</div>
        <div className='gird-footer-item'>Help</div>
        <div className='brands-social gird-footer-item'>
            <div className="brands">Brands</div>
            <div className="socialMedia">Socials</div>
        </div>
        <div className='gird-footer-item'>Payments</div>

     </div>
     </div>

   </footer>
  )
}

export default Footer