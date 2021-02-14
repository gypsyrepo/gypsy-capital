import React from 'react';
import styles from './NavTabs.module.scss';


const NavTabs = ({ navs, setActive, currentTab }) => {
  return (
    <nav>
      <ul>
        { navs.map((nav, index) => (
          <li 
            className={currentTab === nav.shortlink && styles.active}
            onClick={() => setActive(nav.shortlink)} 
            key={index}
          >
            {nav.title}
          </li>
        ))}
      </ul>
    </nav>
  )
}


export default NavTabs;