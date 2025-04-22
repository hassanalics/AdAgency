import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

interface Campaigns {
    brandId: number;
    name: string;
  }

function Campaigns() {
    const { id } = useParams();

    const [campaigns, setCampaigns] = useState<Campaigns[]>([])

    useEffect(() => {
        const filteredCampaigns = [
            { brandId: 1, name: 'Campaign 1' },
            { brandId: 1, name: 'Campaign 2' },
            { brandId: 2, name: 'Campaign 1' },
            { brandId: 2, name: 'Campaign 2' },
            { brandId: 2, name: 'Campaign 3' },
        ].filter((campaign) => campaign.brandId == parseInt(id || '0'));

        setCampaigns(filteredCampaigns);
    }, [])

    return (
        <>
            <h1>Brand Id: {id}</h1>
            <ul>
                {campaigns.map((campaign, index) => (
                    <li key={index}>
                        {campaign.name}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Campaigns;
