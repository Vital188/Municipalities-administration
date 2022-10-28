import { useState, useContext, useRef } from 'react';
import DataContext from '../../Contexts/DataContext';
import Regions from '../../Contexts/Regions';
import getBase64 from '../../Functions/getBase64';

function Create() {

    const [region, setRegion] = useState('');
    const [field, setField] = useState('');
    const fileInput = useRef();

    const { setCreateData } = useContext(Regions);
    const {makeMsg} = useContext(DataContext);

    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            })
    }

    const add = () => {
        if (region.length === 0 || region.length > 50) {
            makeMsg('Invalid region', 'error');
            return;
        }
       



        setCreateData({
            region,
            field,
            image: photoPrint
        });
        setRegion('');
        setField('');
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    return (
        <div className="card m-4">
            <h5 className="card-header">New region and field</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Region</label>
                    <input type="text" className="form-control" value={region} onChange={e => setRegion(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Field</label>
                    <input type="text" className="form-control" value={field} onChange={e => setField(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Region Image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload"></img></div> : null}
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;