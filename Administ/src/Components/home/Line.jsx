import { useContext } from "react";
import Home from "../../Contexts/Home";

import { useState } from "react";

function Line({  regions,  serFiltered, stop }) {
  const { setComment } = useContext(Home);

  const [post, setPost] = useState("");
  const [pat, setPat] = useState(0)

  const add = () => {
    setComment({
      post,
      regionai_id: regions.id,
      field_id: typ,
      image: regions.image,
      region: regions.region,
      image2: img,
      title: tit,
    });
    setPost("");
    setPat(1)
  };

  const typ = Number(serFiltered?.map((el) => el.id));
  const img = String(serFiltered?.map((el) => el.image2));
  const tit = String(serFiltered?.map((el) => el.title));

 
  return (
    <div className="home__content">
      <div className="home__content__info">
        {regions.image ? (
          <div className="img-bin">
            <img src={regions.image} alt={regions.region}></img>
          </div>
        ) : null}
        <h2>{regions.region}</h2>
      </div>

      <div className="comments">
        <ul className="list-group">
          {regions[0]?.map((c) =>
            c.cid !== null ? (
              <li key={c.cid} className="list-group-item">
                <p>{c.post}</p>
              </li>
            ) : null
          )}
        </ul>


{ pat === 0
        ? 
        (<div
          className="mb-3"
          style={{
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          <label className="form-label">Add comment</label>
          <textarea
            style={{
              width: "400px",
            }}
            className="form-control"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></textarea>
        
        <button style={{
          marginTop: '10px'
        }} onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button></div>): 
        (<button onClick={stop}>Thank you for comment. Yours comment will be verified. Please, push this button and choose another municipality and services!</button>)
        }
        
      </div>  
      
    </div>
  );
}

export default Line;
