import { useContext } from 'react';
import Regions from "../../Contexts/Regions";
import Line from './Line';

function List() {

    const { regionai } = useContext(Regions);

    return (
        <div className="card m-4">
            <h5 className="card-header">Regions and field List</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        regionai?.map(r => <Line key={r.id} regionai={r} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;