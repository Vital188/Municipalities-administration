import { useEffect, useState } from "react";

function Line({ region }) {

    const [stats, setStats] = useState({ regionCount: null });

    
 useEffect(() => {
     if (null === region) {
         return;
     }
     setStats(s => ({ ...s, regionCount: region[1].length }));
 }, [region]);
 
    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content" style={{
                   
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
                <h2>Services and comments({stats.regionCount}):</h2>
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
                            {c.orderis === 0 ?
                                <button  style={{
                                    backgroundColor: 'skyblue'
                                }} type="button" className="btn btn-outline-danger">Waiting confirmation</button> :
                                <button style={{
                                    backgroundColor: 'orange'
                                }} type="button" className="btn btn-outline-danger">Confirmed</button>
                            }
                            </div>
                        </li> : null)
                    }
                </ul> 
            </div>
        </li>
    )
}

export default Line;
