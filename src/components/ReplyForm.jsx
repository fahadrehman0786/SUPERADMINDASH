import React, { useState } from 'react';
import axios from 'axios';


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  dialogContainer: {
    backgroundColor: '#fff',
    borderRadius: '2px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    width: '400px',
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  title: {
    fontSize: '22px',
    fontWeight: '500',
    marginBottom: '20px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  input: {
    height: '40px',
    padding: '10px',
    borderRadius: '2px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontSize: '16px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px'
  },
  submitButton: {

    backgroundColor: '#3f51b5',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '2px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  },
  closeButton: {
    backgroundColor: '#ddd',
    color: '#000',
    padding: '10px 20px',
    borderRadius: '2px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '10px'
  }
};


const ReplyForm = ({email, open, setOpen}) => {

    const [subject, setSubject] = useState('');
    const [messages, setMessages] = useState('');

    const handleSubject = (event)=>{
        setSubject(event.target.value)

    }
    const handleMessage = (event)=>{
        setMessages(event.target.value)
    }
 
 
  const handleSubmit =async(event)  => {
    event.preventDefault();
    console.log("in submit1")
    console.log("this is email: "+email)
    console.log("this is sub+ "+ subject)
    console.log("this is message+ "+ messages)
    axios.post("http://localhost:8800/api/superadmin/mailer",{email, subject, messages } )
    .then((response) => {
 
      console.log(response.data + "this is mailer response");
    })
    .catch((error) => {
      console.error(error);
    })

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.dialogContainer}>
        <form onSubmit={handleSubmit} style={styles.formContainer}>

          <input

            name="subject"
            placeholder="Subject"
            onChange={handleSubject}


            style={styles.input}
          />
          <textarea
            name="reply"
            placeholder="Reply"
            onChange={handleMessage}


            style={{ ...styles.input, height: '100px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" style={{ ...styles.button, marginRight: '10px' }} onClick={handleClose}>
              Close
            </button>
            <button type="submit" style={styles.button}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReplyForm;
