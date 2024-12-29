import React, { useEffect, useState } from 'react';
import SectionTitle from './../components/SectionTitle';
import MenuItem from '../components/MenuItem';

const PopularMenu = () => {
  const [menu, setMenu] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetch('menu.json')
      .then((res) => res.json())
      .then((data) => {
        const popularItems = data.filter((item) => item.category === 'popular');
        setMenu(popularItems);
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
      });
  }, []);

  return (
    <section>
      <SectionTitle
        heading={"From Our Menu"}
        subHeading={"Popular Menu"}
      ></SectionTitle>

      <div className='grid md:grid-cols-2 gap-10 mb-10'>
        {menu.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
