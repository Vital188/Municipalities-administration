import { useContext, useEffect, useState, useRef } from 'react';
import Field from '../../Contexts/Field';
import getBase64 from '../../Functions/getBase64';

function Edit() {


    const [title, setTitle] = useState('');
    const fileInput = useRef();
    const [photoPrint2, setPhotoPrint2] = useState(null);
    const [deletePhoto2, setDeletePhoto2] = useState(false);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint2(photo))
            .catch(_ => {
                // tylim
            })
    }

    const { setEditData, modalData, setModalData } = useContext(Field);

    const edit = () => {
        setEditData({
            title,
            id: modalData.id,
            deletePhoto2: deletePhoto2 ? 1 : 0,
            image2: photoPrint2
        });
        setModalData(null);
        setDeletePhoto2(false);
    }

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        setTitle(modalData.title);
        setPhotoPrint2(modalData.image);
        setDeletePhoto2(false);
    }, [modalData])

    if (null === modalData) {
        return null;
    }

    return (

        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-region">Edit service</h5>
                        <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="card m-4">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Service</label>
                                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Service image</label>
                                <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                            </div>
                            {photoPrint2 ? <div className='img-bin'>
                                <label htmlFor="image-delete">X</label>
                                <input id="image-delete" type="checkbox" checked={deletePhoto2} onChange={() => setDeletePhoto2(d => !d)}></input>
                                <img src={photoPrint2} alt="upload"></img>
                            </div> : null}
                            <button onClick={edit} type="button" className="btn btn-outline-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;