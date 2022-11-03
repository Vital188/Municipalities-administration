import { useState } from 'react';
import { useContext } from 'react';
import Comment from '../../Contexts/Comment';

function Line({ region }) {

    const { setComment } = useContext(Comment);
    const [color, setColor] = useState('white');
    const [tit, setTit] = useState('Waiting confirmation')
    
   const add = () => {
    setColor('orange');
    setTit('Confirmed')
   }

    const remove = id => {
        setComment({id});
    }
console.log(region)
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
                                <button onClick={add} style={{
                                    backgroundColor: color
                                }} type="button" className="btn btn-outline-danger">{tit}</button>
                            
                            </div>
                        </li> : null)
                    }
                </ul> 
            </div>
        </li>
    )
}

export default Line;
