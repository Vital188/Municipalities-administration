import {useContext } from 'react';
import Comment from "../../Contexts/Comment";
import Line from './Line';


function List({stats}) {

    const { regions } = useContext(Comment);

    return (
        <div className="card m-4">
            <h5 className="card-header">Comments list ({stats})</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        regions?.map(regi => <Line key={regi.id} region={regi} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;