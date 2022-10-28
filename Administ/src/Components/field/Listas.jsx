import { useContext } from 'react';
import Field from '../../Contexts/Field';
import Lines from './Lines';

function Listas() {

    const { field } = useContext(Field);

    return (
        <>
       
         <div className="card m-4">
         <h5 className="card-header">Services list</h5>
         <div className="card-body">
             <ul className="list-group">
                 {
                     field?.map(f => <Lines key={f.id} field={f} />)
                 }
             </ul>
         </div>
     </div>
     </>
    );
}

export default Listas;