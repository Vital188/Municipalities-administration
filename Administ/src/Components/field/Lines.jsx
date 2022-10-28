import { useContext } from 'react';
import Field from '../../Contexts/Field';

function Lines({ field }) {

    const { setDeleteData, setModalData } = useContext(Field);
    return (
        <>
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__info">
                        {field.image2 ? <div className='img-bin'>
                            <img src={field.image2} alt={field.title}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__info">
                        {field.title}
                    </div>
                   </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(field)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(field)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
         
      </>
    )
}

export default Lines;