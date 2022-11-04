import { useState, useContext, useRef } from 'react';
import DataContext from '../../Contexts/DataContext';
import Field from '../../Contexts/Field'
import getBase64 from '../../Functions/getBase64';

function Create() {

    const [title, setTitle] = useState('');
    const fileInput = useRef();

    const { setCreateData } = useContext(Field);
    const {makeMsg} = useContext(DataContext);

    const [photoPrint2, setPhotoPrint2] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint2(photo))
            .catch(_ => {
            })
    }




    const add = () => {
        if (title.length === 0 || title.length > 50) {
            makeMsg('Invalid region', 'error');
            return;
        }
       



        setCreateData({
            title,
            image2: photoPrint2
        });
        setTitle('')
        setPhotoPrint2(null);
        fileInput.current.value = null;
        
    }

    return (
        <>
        <div className="card m-4">
            <h5 className="card-header">New services </h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Services</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Service image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint2 ? <div className='img-bin'><img src={photoPrint2} alt="upload"></img></div> : null}
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>

    </>
    );
}

export default Create;