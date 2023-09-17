import React from 'react';
import styles from '../../styles/productDisplay.module.css';
import { useState } from 'react';

function ProductDisplay() {
  const [selectedKey, setSelectedKey] = useState(null);

  const changeTab = (key) => {
    setSelectedKey(key);
  };
  return (
    <div>
    
        <div className={styles.gridProductContainer}>
          <div className={styles.productImage}></div>
          <div className={styles.productDetails}></div>
           <div className={styles.productSpec}>
          <ul>
            <li onClick={() => changeTab('features')} className={selectedKey === 'features' ? 'selected' : ''}>
              Features
            </li>
            <li onClick={() => changeTab('specification')} className={selectedKey === 'specification' ? 'selected' : ''}>
              Specification
            </li>
            <li onClick={() => changeTab('requirement')} className={selectedKey === 'requirement' ? 'selected' : ''}>
              Requirement
            </li>
          </ul>
          <div className={styles.productOption} style={{ height:'100px',width: '100%', position: 'absolute', backgroundColor: selectedKey === 'features' ? 'red' : 'transparent' }}>
          Content for the Features tab
        </div>
        <div className={styles.productOption} style={{height:'100px', width: '100%',position: 'absolute', backgroundColor: selectedKey === 'specification' ? 'yellow' : 'transparent' }}>
          Content for the Specification tab
        </div>
        <div className={styles.productOption} style={{height:'100px',width: '100%',position: 'absolute', backgroundColor: selectedKey === 'requirement' ? 'green' : 'transparent' }}>
          Content for the Requirement tab
        </div>
        </div>
        
          <div className={styles.productOption}></div>
        </div>
    </div>
  )
}

export default ProductDisplay
