import { useContext } from 'react';
import Home from '../../Contexts/Home';

import { useState } from "react";

function Lines({ fil }) {

    const {  setComment } = useContext(Home);

    const [post, setPost] = useState('');

  
    // const add = () => {
    //     setComment({
    //         post,
    //         field_id: field.id
    //     });
    //     setPost('');
    
// console.log(fil)
return (
        <>
        {/* <li className="list-group-item"> */}
            {/* <div className="home">
                <div className="home__content"> */}
                    <div className="home__content__info">
                        {fil.image2 ? <div className='img-bin'>
                            <img src={fil.image2} alt={fil}>
                            </img>
                        </div> : null}
                        <h2>{fil.title}</h2>
                    </div>

                    {/* <div className="home__content__price">
                        {fil.title} 
                    </div> */}
                {/* </div>
            </div>          */}
        {/* </li> */}
        </>
    )
}

export default Lines;