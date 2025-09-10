import {useParams} from "react-router-dom";
import { useState, useEffect, use } from "react";

export default function wineryDetails() {
    const { id } = useParams();
    const [winery, setWinery] = useState(null);

    useEffect(() => {
        async function fetchWinery() {
            try {
                const response = await fetch(`/api/wineries/${id}`);
                const data = await response.json();
                setWinery(data);
            } catch(err) {
                console.log('Error fetching winery details:', err);
            }
        }
        fetchWinery();
    }, [id]);

    if (!winery) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src={winery.photo} alt={winery.name} />
            <h2>{winery.name}</h2>
            <p>{winery.address}</p>
            
            <p>{winery.description}</p>
        </div>
    );
}