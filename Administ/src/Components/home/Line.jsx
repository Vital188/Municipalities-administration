import { useContext } from 'react';
import Home from '../../Contexts/Home';

import { useState } from "react";

function Line({ regions }) {

    const {  setComment } = useContext(Home);

    const [post, setPost] = useState('');

  
    const add = () => {
        setComment({
            post,
            regionai_id: regions[1][0].id
        });
        setPost('');
    }
console.log(regions)
    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">

                    <div className="home__content__info">
                        
                        {regions[1][0].image ? <div className='img-bin'>
                            <img src={regions[1][0].image} alt={regions[0]}>
                            </img>
                        </div> : null}
                        <h2>{regions[0]}</h2>
                    </div>

                    <div className="home__content__price">
                        {regions[1][0].field} 
                    </div>

                    
                </div>
            </div>
            <div className="comments">

                <ul className="list-group">
                    {
                        regions[1]?.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item"><p>{c.post}</p></li> : null)
                    }
                </ul>

                <div className="mb-3">
                    <label className="form-label">Add comment</label>
                    <textarea className="form-control" value={post} onChange={e => setPost(e.target.value)}></textarea>
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </li>
    )
}

export default Line;