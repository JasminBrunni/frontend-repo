
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/index.php';



function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  

  function save(e){
    e.preventDefault();
    const json = JSON.stringify({description:item})
    axios.post(URL + 'add.php', json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItems(items => [...items,response.data]);
      setItem('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  }

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      setItems(response.data)
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  
  },[])

  return (
    <div id="container">
    <h3>Shopping list</h3>
    <form onSubmit={save}>
      <label>New Item</label>
      <input value={item} onChange={e => setItem(e.target.value)}/>
      <button>Add</button>

    </form>
    <ol>
      {items?.map(item => (
        <li key={item.id}>{item.description}</li>
      ))}
    </ol>
    </div>

    
  );
}


export default App;
