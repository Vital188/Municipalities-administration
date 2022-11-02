import Comment from "../../Contexts/Comment";
import List from "./List";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import DataContext from "../../Contexts/DataContext";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [regions, setRegions] = useState(null);
    const [field, setField] = useState(null);
    const [comment, setComment] = useState(null);
    const { makeMsg } = useContext(DataContext);

    const reList = data => {
        const d = new Map();
        data.forEach(line => {
            if (d.has(line.region)) {
                d.set(line.region, [...d.get(line.region), line]);
            } else {
                d.set(line.region, [line]);
            }
        });
        return [...d];
    }

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/home/regionai/wc', authConfig())
            .then(res => {
                setRegions(reList(res.data));
            })
    }, [lastUpdate]);

    useEffect(() => {
        axios.get('http://localhost:3003/home/field/wc', authConfig())
            .then(res => {
                setField((res.data));
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

    return (
        <Comment.Provider value={{
            setComment,
            regions,
            field
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </Comment.Provider>
    );
}

export default Main;