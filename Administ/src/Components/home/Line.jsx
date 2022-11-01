import { useContext } from 'react';
import Home from '../../Contexts/Home';

import { useState } from "react";

function Line({ regions, fil, serFiltered}) {

    const {  comment, setComment, } = useContext(Home);
    const [type, setType] = useState("0");
    const [post, setPost] = useState('');

  
    const add = () => {
        setComment({
            post,
            regionai_id: regions.id,
            field_id: typ
        });
        setPost('');
    }

 const typ = Number(serFiltered?.map((el) => el.id ))
                
//    const data = regions ? regions : fil
console.log(serFiltered, comment, typ)
    return (
       
                <div className="home__content">

                    <div className="home__content__info">
                        
                         {regions.image ? <div className='img-bin'>
                            <img src={regions.image} alt={regions.region}>
                            </img>
                        </div> : null} 
                        <h2>{regions.region}</h2>
                    </div>
                

                     {/* <div className="home__content__info">
                         {data.image2 ? <div className='img-bin'>
                            <img src={data.image2} alt={data}>
                            </img>
                        </div> : null} 
                         <h2>{data.title}</h2> 
                     </div>   */}

                    {/* <div className="home__content__price">
                        {regions[1][0].field} 
                    </div> */}
                    {/* <div className="home__content__info">
                      </div>
   */}
                         {/* {field.image2 ? <div className='img-bin'>
                            <img src={field.image2} alt={field}>
                            </img>
                        </div> : null}  */}
                        {/* <h2>{fil.title}</h2> */}
                    
                    {/* <div className="home__content__price">
                        {fil.title} 
                    </div> */}
                    
               
          
            <div className="comments">

                <ul className="list-group">
                     {
                        regions[0]?.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item"><p>{c.post}</p></li> : null)
                    } 
                </ul>

                <div className="mb-3" style={{
                    marginTop: '40px',
                    marginBottom: '20px'
                }}>
                    <label className="form-label">Add comment</label>
                    <textarea style={{
                        width: '770px'
                    }} className="form-control" value={post} onChange={e => setPost(e.target.value)}></textarea>
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    )
}

export default Line;