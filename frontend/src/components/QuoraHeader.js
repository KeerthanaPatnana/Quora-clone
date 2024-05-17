import React from 'react'
import { Close } from '@mui/icons-material';
import { Avatar, Button, Input } from '@mui/material';
import './css/QuoraHeader.css'
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout, selectUser } from '../feature/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function QuoraHeader() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const closeIcon = <Close />
  const [question, setQuestion] = React.useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  const handleSubmit = async() => {
    if (question !== '') {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const body = {
        questionName: question,
        questionUrl: inputUrl,
        user: user
      }
      await axios.post('/api/questions', body, config)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        window.location.href = '/';
      }).catch((err) => {
        console.log(err);
        alert('Error while adding question');
      })
    }
  }

  const handleLogout = async() => {
    if (window.confirm('Are you sure you want to logout ?')) {
      signOut(auth).then(() => {
        dispatch(logout())
        console.log('User signed out');
      }).catch(() => {
        console.log('error in logout');
      })
    }
  }

  return (
    <div className='qHeader'>
      <div className='qHeader-content'>
        <div className='qHeader-logo'>
          <img src='qa.jpeg' alt='logo' />
        </div>
        <div className='qHeader-Rem'>
          <span onClick={handleLogout}>
            <Avatar src = {user?.photo} />
          </span>
          <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          <Modal
            open={isModalOpen}
            close={closeIcon}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: 'auto'
              }
            }}
          >
            <div className='modal-field'>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type='text' placeholder="Start your question with 'What', 'How', 'Why', etc." />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: inclue a link that gives context"
                />
                {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="displayimage"
                  />
                )}
              </div>
            </div>
            <div className='modal-buttons'>
              <button className='cancel' onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleSubmit} type='submit' className='add'>Add Question</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default QuoraHeader