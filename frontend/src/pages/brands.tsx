import { useState } from "react";
import { Link } from 'react-router-dom';

function Brands() {
  const [brands, setBrands] = useState([
    { id: 1, name: 'Ben & Jerry', dailyBudget: 200, monthlyBudget: 800 },
    { id: 2, name: 'Lush Cosmetics', dailyBudget: 300, monthlyBudget: 1500 }
  ])
  return (
    <>
      <h1>Brands</h1>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300">Brand Name</th>
            <th className="border border-gray-300">Daily Budget</th>
            <th className="border border-gray-300">Monthly Budget</th>
            <th className="border border-gray-300">Campaigns</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={index}>
              <td className="border border-gray-300">{brand.name}</td>
              <td className="border border-gray-300">{brand.dailyBudget}</td>
              <td className="border border-gray-300">{brand.monthlyBudget}</td>
              <td className="border border-gray-300"><Link to={`/brands/${brand.id}/campaigns`} className="text-blue-500">View Campaigns</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Brands;
