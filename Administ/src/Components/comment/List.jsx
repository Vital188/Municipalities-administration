import { useState, useEffect, useContext } from 'react';
import Comment from "../../Contexts/Comment";
import Line from './Line';


function List() {

    const { regions } = useContext(Comment);
    const [stats, setStats] = useState({ regionCount: null });

    
    useEffect(() => {
        if (null === regions) {
            return;
        }
        setStats(s => ({ ...s, regionCount: regions[0][1].length }));
    }, [regions]);
    console.log(regions)
    return (
        <div className="card m-4">
            <h5 className="card-header">Comments list ({stats.regionCount})</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        regions?.map(region => <Line key={region.id} region={region} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;