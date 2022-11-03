import { useContext } from 'react';
import Regions from '../../Contexts/Regions';

function Line({ regionai }) {

    const { setDeleteData, setModalData } = useContext(Regions);

    return (
        <>
        <li className="list-group-item">
            <div className="line">
                <div className="line__content" style={{
                    alignItems: 'center'
                }}>
                    <div className="line__content__info">
                        {regionai.image ? <div className='img-bin'>
                            <img src={regionai.image} alt={regionai.region}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                        {regionai.region}
                    </div>
                   </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(regionai)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(regionai)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
         
      </>
    )
}

export default Line;