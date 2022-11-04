import Comment from "../../Contexts/Comment";
import List from "./List";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import DataContext from "../../Contexts/DataContext";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [regions, setRegions] = useState(null);
    const [comments, setComments] = useState(null)
    const [comment, setComment] = useState(null);
    const { makeMsg } = useContext(DataContext);
    const [stats, setStats] = useState({ commentsCount: null });
    
    const reList = data => {
        const d = new Map();
        data.forEach(line => {
            if (d.has(line.rid)) {
                d.set(line.rid, [...d.get(line.rid), line]);
            } else {
                d.set(line.rid, [line]);
            }
        });
        return [...d];
    }
    

    
   

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/home/comments/wc', authConfig())
            .then(res => {
                setRegions((res.data));
                setComments(res.data);
            })
    }, [lastUpdate]);

   
    useEffect(() => {
        if (null === comment) {
            return;
        }
        axios.delete('http://localhost:3003/server/comments/' + comment.id, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            })
    }, [comment, makeMsg]);

    useEffect(() => {
        if (null === comments) {
            return;
        }
        setStats(s => ({ ...s, commentsCount: comments.length }));
    }, [comments]);
 
    return (
        <Comment.Provider value={{
            setComment,
            regions,
            comments
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List stats={stats.commentsCount}/>
                    </div>
                </div>
            </div>
        </Comment.Provider>
    );
}

export default Main;