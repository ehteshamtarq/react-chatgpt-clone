
import {useState, useEffect} from 'react';
function App() {
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState(null)
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat =() =>{
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  }

  const handleClick=(uniqueTitle)=>{
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  }

  const getMessages = async()=>{

    const options ={
      method:"POST",
      body:JSON.stringify({message: value}),
      headers:{
        "Content-Type":"application/json"
      }
    }
    try{

      const response = await fetch('https://react-chatgpt-clone-1.onrender.com/completions', options);
      const data = await response.json();
      // console.log(data);
      setMessage(data.choices[0].message);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!currentTitle && value && message){
      setCurrentTitle(value);
    }
    if (currentTitle && value && message){
      setPreviousChats(prevChats=>([...prevChats, {title:currentTitle, role:"user", content:value}, {title:currentTitle, role:message.role, content:message.content}]))

    }

  },[message, currentTitle])


  const currentChat = previousChats.filter(previousChat=>previousChat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles);


  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index)=>
            <li key={index} onClick={()=>handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          )}
        </ul>
        <nav><p>Made By</p>
        <p>Ehtesham Tarique</p></nav>
      </section>
      <section className="main">
        <h1>
        React ChatGPT
        </h1>
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => <li key ={index}>
            <p className= "role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e)=>setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➢
</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
