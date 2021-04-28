import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon,  Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React , {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import {useStateValue} from "./StateProvider";
import db from './firebase';
import firebase from 'firebase';

function Chat() {
    const [input,setInput]=useState('');
    const [seed, setSeed]= useState('');
    const {RoomId} = useParams();
    const [roomName,setRoomName]=useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(RoomId){
            db.collection('Rooms').doc(RoomId).onSnapshot(snapshot =>setRoomName
                (snapshot.data().Name));

            db.collection ('Rooms').doc(RoomId)
            .collection('messages').orderBy('timestamp','asc')
            .onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>
                    doc.data()))
            ))
        }
       
    }, [RoomId])
    
    useEffect(() => {
       setSeed(Math.floor(Math.random()*5000))
    }, [RoomId]);

    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection('Rooms').doc(RoomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      
        setInput('');

    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}  alt="img" />
                 <div className="header__info">
                    <h3 className="chatroom__name">{roomName}</h3>                     
                    <p className="lastseen">Last seen at {''}
                        { new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                                ).toLocaleString()}

                        
                    
                    
                    </p>
                    </div>
                    <div className='chat__headerRight'>
                       <IconButton>
                        <SearchOutlined/>                                                      
                        </IconButton> 
                        <IconButton>
                        <MoreVert/>
                        </IconButton>
                    </div>
                   
            </div>
            <div className="chat__body">
            
                {messages.map(message=>(
                    <p className={`chat__message
                        ${ message.name === user.displayName && 'chat__reciever'}`}>
                        <span className="chat__name">{message.name}</span>
                        <div className="txt">
                        {message.message}
                        <span className="chat__timeStamp">
                        {new Date(message.timestamp?.toDate()).toLocaleString()} 
                        </span>
                        </div>             
                    
                            
                     </p>


                ))}
                
            </div>
            <div className="chat__footer">
                <div className="footer__left">
                    <IconButton>
                    <InsertEmoticon/>
                    </IconButton>
                    <IconButton>                   
                    <AttachFile/>
                    </IconButton>
                 </div>   
                
            
               
                
                <form action="">
                    <input  value = {input} onChange={e=>{
                        setInput(e.target.value)}}
                 
                     type="text" 
                     placeholder ="Type a message"
                     />
                    <button onClick={sendMessage}
                      type="submit">Send message
                    </button>
                             

                    
                </form>
                <IconButton>
                <Mic/>
                </IconButton>
               

            </div>

            
        </div>
    );
}

export default Chat;
