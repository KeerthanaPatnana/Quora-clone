import { Avatar } from '@mui/material'
import React from 'react'
import './css/QuoraBox.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../feature/userSlice';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Close } from '@mui/icons-material';
import { Input } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function QuoraBox() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const closeIcon = <Close />
  const [question, setQuestion] = React.useState('');
  const user = useSelector(selectUser);
  const handleSubmit = async () => {
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

  return (
    <div className='quoraBox'>
      <div className='quoraBox-info'>
        <Avatar src={user?.photo} />
        <h5 onClick={() => setIsModalOpen(true)}>What do you want to ask or share?</h5>
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
  )
}

export default QuoraBox