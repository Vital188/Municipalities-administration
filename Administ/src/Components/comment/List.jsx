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
        setStats(s => ({ ...s, regionCount: regions.length }));
    }, [regions]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Comments list ({stats.regionCount})</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        regions?.map(r => <Line key={r.id} region={r} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;