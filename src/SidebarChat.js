import { Avatar } from '@material-ui/core';
import React ,{useEffect , useState} from 'react';
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';


function SidebarChat({id ,Name,addNewChat }) {

    const [seed, setSeed]= useState('');
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id){
            db.collection('Rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);
    
    useEffect(() => {
       setSeed(Math.floor(Math.random()*5000))
    }, []);
    const createChat=()=>{
        const roomName= prompt("Please enter name for chat room");
        if (roomName){
            //do some stuff in db
            db.collection('Rooms').add({
                Name: roomName,
            })
        }
    };

    return !addNewChat? (

      <Link to={`/Rooms/${id}`} > 
            <div className="sidebarChat">
            <Avatar src ={`https://avatars.dicebear.com/api/human/${seed}.svg`}  alt="user pic"/>
            <div className="sidebarChat__info">
                <div className="chat__contain">
                    <h2>{Name}
                    </h2>
                    
                    <p className="sidebar__msg">{messages[0]?.message}</p>
                </div>
                    
                    <div className="he"> {''}
                    { new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                                ).toLocaleString()}
                    </div>            

                   
                    
                    
                    
            </div>
            </div>
        </Link>
    ): (
        <div onClick={createChat}
        className="sidebarChat">
            <h2 >Add new chat</h2>

        </div>
    );
}

export default SidebarChat;
