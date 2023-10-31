import React, { useEffect, useState } from 'react';
import Editor  from './Editor';
import './styles1.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import Dialog from './Dialog';
import { useCookies } from 'react-cookie';
import { io } from 'socket.io-client';

function App(){
    // const [cookies, setCookie] = useCookies(['user']);
    // const [login, setLogin] = useState(false);
    // const [userId, setUserId] = useState('');

    // function setCookies(){
    //     setCookie('email', 'hi@gmail.com');
    //     setCookie('password', 'hello');
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch('http://localhost:3001/login', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({ email: 'hi@gmail.com', password: 'mupassword' }),
    //         });     
    //         // console.log(response);
    //         if (response.ok) {
    //             const responseData = await response.json(); // Parse the response JSON data
    //             if(responseData.status == 'success'){
    //                 setLogin(true);
    //                 setCookies();
    //                 setUserId(responseData.message);
    //             } 
    //             console.log('Response Data:', responseData);
    //         } else {
    //             console.error('Response Error:', response.statusText);
    //         }
    //       } catch (error) {
    //         console.error('Fetch Error:', error);
    //       }
    //     };
      
    //     fetchData();
    //   }, []);

      // useEffect(() => {
      //   let socket = io.connect('http://localhost:3001');
      //   socket.on('connect', () => {
      //     console.log(socket.id);
      //   })
      // })
      

    return(
        <Router>
            <Routes>
                <Route path="/" exact element={<Navigate to={"/documents/"+uuid()} replace={true}/>}>
                </Route>
                <Route path="/documents/:id" element={<Editor/>}></Route>
            </Routes>
        </Router>
        // <div>hello</div>
    )
}

export default App;