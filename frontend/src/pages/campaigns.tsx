import api from '../api/axios';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

interface Campaign {
    name: string;
    start_hour?: number;
    end_hour?: number;
    is_active: boolean;
}

function Campaigns() {
    const { id } = useParams();

    const [campaigns, setCampaigns] = useState<Campaign[]>([])

    useEffect(() => {
        api.get(`brands/${id}/campaigns`)
            .then(response => {
                setCampaigns(response.data);
            })
            .catch(error => {
                console.error('Error fetching campaigns:', error);
            });
    }, [])

    return (
        <>
            <h1>Campaigns</h1>
            <br />
            <table className="border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-300">Campaign Name</th>
                        <th className="border border-gray-300">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300">
                                {campaign.name}
                                { campaign.start_hour && <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">dayparting</span>}
                            </td>
                            <td className="border border-gray-300">
                                {(campaign.is_active ? <span>&#9989;</span> : <span>&#10060;</span>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Campaigns;
