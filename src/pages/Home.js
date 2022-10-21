
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import fireDb from "../firebase"

const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const [data, setData] = useState({});
    const [activeTab, setActiveTab] = useState("Quest");
    
    useEffect(() => {
        fireDb.child("Goal").on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setData({ ...snapshot.val() });
          } else {
            setData({});
          }
        });
    
        return () => {
          setData({});
        };
      }, []);


    return (
        <>
        <Header />
            <h1>Welcome {user?.email}</h1>


            <div style={{ marginTop: "50px"}}>
                <table className='styled-table'>
                    <thead>
                        <tr>
                        <th style={{ textAlign: "center" }}>Goal</th>
                        <th style={{ textAlign: "center" }}>Goal Title</th>
                        <th style={{ textAlign: "center" }}>Rough Description</th>
                        <th style={{ textAlign: "center" }}>More info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data).map((id, index) => {
                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data[id].goalstitle}</td>
                                    <td>{data[id].subdescription}</td>
                                    <td><a href={`${data[id].url}`} target="_blank">URL</a></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
           
        </>
    );
};

export default Home
