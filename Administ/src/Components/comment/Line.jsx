import { useState } from 'react';
import { useContext } from 'react';
import Comment from '../../Contexts/Comment';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import { useEffect } from 'react';

function Line({ region }) {

    const { setComment, comments } = useContext(Comment);
    const [color, setColor] = useState('white');
    const [tit, setTit] = useState('Confirmation')
    
       const remove = id => {
        setComment({id});
    }

    const handleChangeOrder = () =>{
        axios.put('http://localhost:3003/server/comments/' + region.id, {confirmed: 1}, authConfig())
          .then(res => {
          console.log('CONFIRMED');
          setColor('orange');
           setTit('Confirmed')
          });
 }

 const [stats, setStats] = useState({ regionCount: null });

    
 useEffect(() => {
     if (null === region) {
         return;
     }
     setStats(s => ({ ...s, regionCount: region.length }));
 }, [region]);
    console.log(region)
    return (
        
        <li className="list-group-item" style={{
            border: '2px solid black',
            borderRadius: '15px',
            marginTop: '10px'
        }}>
            <div className="home" style={{
                justifyContent: 'center'
            }}>
                <div className="home__content">
                                 
                    <div className="home__content__info" style={{
                        flexDirection: 'column'
                    }}>
                        <h2>{region.region} </h2>
                        {region.image ? <div className='img-bin'>
                            <img src={region.image} alt={region}>
                            </img>
                        </div> : null} 
                   </div>   
                   <div className="home__content__info" style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start'
                    }}>
                                  <h2>{region.title}</h2>
                            <img src={region.image2} alt={region} style={{
                                width: '100px'
                            }}>
                            </img>
                    </div> 
                    
                </div>
            </div>
            <div className="comments" style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '50px',
                flexDirection: 'column'
            }}>
                <h2>Comment:</h2>
                <p style={{
                    border: '1px solid',
                    height: '88px',
                    padding: '10px'
                }}>{region.post}</p>
                <div className="home__content__info">
                </div>  
                            
                        <div className="home__buttons">
                                { region.orderis === 0 ?
                                 <button onClick={handleChangeOrder} type="button" style={{
                                    backgroundColor: color,      
                                    color: 'black'
                                }} className="btn btn-outline-success">{tit}</button> : <button onClick={handleChangeOrder} type="button" style={{ 
                                    backgroundColor: 'orange',
                                    color: 'black',
                                    border: '1px solid black'
                                }} className="btn btn-outline-success">CONFIRMED</button> }
                                <button onClick={() => remove(region.id)} type="button" className="btn btn-outline-danger">Delete</button>
                            </div> 
                 
            </div>
        </li>
    )
}

export default Line;
