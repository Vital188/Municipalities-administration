import { useContext } from 'react';
import Regions from "../../Contexts/Regions";
import Line from './Line';


function List() {

    const { regionai } = useContext(Regions);

    return (
       
        <div className="card m-4">
            <h5 className="card-header">Municipality list</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        regionai?.map(rid => <Line key={rid.id} regionai={rid} />)
                    }
                </ul>
            </div>
          </div>
    );
}

export default List;