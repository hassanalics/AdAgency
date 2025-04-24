import api from '../api/axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

interface Brand {
  id: number;
  name: string;
  daily_budget: string;
  monthly_budget: string;
  daily_spend: string;
  monthly_spend: string;
}

function Brands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [amounts, setAmounts] = useState<Record<string, number>>({});

  const handleAmountChange = (event: any, brandId: number) => {
    setAmounts(prevInputs => ({ ...prevInputs, [`${brandId}`]: event.target.value }));
  };

  const handleAmountSubmit = (event: any, brandId: number) => {
    event.preventDefault();

    api.put(`brands/${brandId}/record_spend/`, {
      amount: amounts[`${brandId}`]
    }).then(() => {
        alert(`Amount Spent`);
        setAmounts(prevInputs => ({ ...prevInputs, [`${brandId}`]: 0 }));
      })
      .catch(() => {
        alert('Error handling Amount Submit');
      });
  };

  const handleResetDaily = (event: any, brandId: number) => {
    event.preventDefault();
    api.put(`brands/${brandId}/reset_daily/`)
      .then(() => {
        alert(`Daily Reset Successfull`);
      })
      .catch(() => {
        alert('Error resetting daily');
      });
  };

  const handleResetMonthly = (event: any, brandId: number) => {
    event.preventDefault();
    api.put(`brands/${brandId}/reset_monthly/`)
      .then(() => {
        alert(`Monthly Reset Successfull`);
      })
      .catch(() => {
        alert('Error resetting monthly');
      });
  };

  useEffect(() => {
    api.get('brands/')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });
  }, [])
  return (
    <>
      <h1>Brands</h1>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300">Brand Name</th>
            <th className="border border-gray-300">Spend Money</th>
            <th className="border border-gray-300">Reset Daily</th>
            <th className="border border-gray-300">Reset Monthly</th>
            <th className="border border-gray-300">Campaigns</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={index}>
              <td className="border border-gray-300">{brand.name}</td>
              <td className="border border-gray-300">
                <input type="number" id={`${brand.id}`} name={brand.name} value={amounts[`${brand.id}`] || ''} onChange={(e) => handleAmountChange(e, brand.id)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="50" />
                <button type="button" onClick={(e) => handleAmountSubmit(e, brand.id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Spend</button>
              </td>
              <td className="border border-gray-300">
                <button type="button" onClick={(e) => handleResetDaily(e, brand.id)} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset Daily</button>
              </td>
              <td className="border border-gray-300">
                <button type="button" onClick={(e) => handleResetMonthly(e, brand.id)} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Reset Monthly</button>
              </td>
              <td className="border border-gray-300"><Link to={`/brands/${brand.id}/campaigns`} className="text-blue-500">View Campaigns</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Brands;
