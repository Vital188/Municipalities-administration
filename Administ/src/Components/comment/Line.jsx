import { useState } from 'react';
import { useContext } from 'react';
import Comment from '../../Contexts/Comment';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Line({ region }) {

    const { setComment } = useContext(Comment);
    const [color, setColor] = useState('white');
    const [tit, setTit] = useState('Confirmation')
    
       const remove = id => {
        setComment({id});
    }

    const handleChangeOrder = () =>{
        axios.put('http://localhost:3003/server/comments/' + region[1][0].id, {confirmed: 1}, authConfig())
          .then(res => {
          console.log('CONFIRMED');
          setColor('orange');
           setTit('Confirmed')
          });
 }
console.log(region[1][0])
    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content" style={{
                    // gap: '450px'
                }}>
                    <h1>Municipality:</h1>
                    <div className="home__content__info">
                        <h2>{region[1][0].region} </h2>
                        {region[1][0].image ? <div className='img-bin'>
                            <img src={region[1][0].image} alt={region}>
                            </img>
                        </div> : null}
                    </div>
                    
                    
                </div>
            </div>
            <div className="comments">
                <h2>Services and comments:</h2>
                <ul className="list-group">
                    {
                        region[1]?.map(c => c.id !== null ? <li key={c.id} className="home__content__info" style={{
                            justifyContent: 'space-between',
                            border: '2px solid black',
                            marginBottom: '20px',
                            padding: '20px'
                        }}>
                            <h2>{c.title}</h2>
                            <img src={c.image2} alt={c.region} style={{
                                width: '100px'
                            }}>
                            </img>
                            
                            <p>{c.post}</p>
                           
                            <div className="home__buttons">
                                { region[1][0].orderis === 0 ?
                                 <button onClick={handleChangeOrder} type="button" style={{
                                    backgroundColor: color,      
                                    color: 'black'
                                }} className="btn btn-outline-success">{tit}</button> : <button onClick={handleChangeOrder} type="button" style={{ 
                                    backgroundColor: 'orange',
                                    color: 'black',
                                    border: '1px solid black'
                                }} className="btn btn-outline-success">CONFIRMED</button> }
                            
                            <div className="home__buttons">
                                <button onClick={() => remove(c.id)} type="button" className="btn btn-outline-danger">Delete</button>
                            </div></div>
                        </li> : null)
                    }
                </ul> 
            </div>
        </li>
    )
}

export default Line;
