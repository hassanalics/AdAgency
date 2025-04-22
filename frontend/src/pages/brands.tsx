import { useState } from "react";
import { Link } from 'react-router-dom';

function Brands() {
  const [brands, setBrands] = useState([
    { id: 1, name: 'Ben & Jerry' },
    { id: 2, name: 'Lush Cosmetics' }
  ])
  return (
    <>
      <h1>Brands</h1>
      <ul>
        {brands.map((brand, index) => (
          <li key={index}>
            <Link to={`/brands/${brand.id}/campaigns`} className="text-blue-500">{brand.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Brands;
