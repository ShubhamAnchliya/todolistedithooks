
// //p5 old 
// import React, {useState} from 'react'
// import todo1 from "../images/todo2.jpg";

// const Todo = () => {

//     const [inputData , setInputData] = useState('');
//     const [items, setItems] = useState([]);

//     const addItem = () => {
//         if (!inputData) {

//         } else {
//             setItems([... items, inputData]);  //now input will be stored in array in state
//             setInputData('')   //to empty state 
//         }
          
//     }

//     const deleteItem = (id) => {
//         console.log(id);
//         const updateditems = items.filter((elem, ind) => {
//             return (ind !== id);
//         });

//         setItems(updateditems);

//     } 


//     const removeAll = () => {
//         setItems([]);
//     }


//     return (
//         <> 
//             {/* <div>

//             </div>
//               <figure className="figureimg" >
//                         <img src={todo1}  alt="todoimg" style={{width:"40%", margin:"20px"}} />
//                         <figcaption>Add Your List Here 👇</figcaption>
//                     </figure> */}
//             <h1 className="heading text-center ">TODO List</h1>

//             <div className="main-div" >

//                 {/* <div>TODO List</div>    */}

//                 <div className="img" >
//                     <img src={todo1}  alt="todoimg" />
//                     {/* <figcaption>Add Your List Here 👇</figcaption> */}
//                 </div>

            
//                 <div className="child-div">
//                     <div>List</div>
                
//                     {/* <figure className="figureimg" >
//                         <img src={todo1}  alt="todoimg" style={{width:"40%", margin:"20px"}} />
//                         <figcaption>Add Your List Here 👇</figcaption>
//                     </figure> */}

//                     <div className="addItems">
//                         <input type="text" placeholder=" ✍️ Add Items " 
//                             value={inputData}
//                             onChange={(e) => setInputData(e.target.value) }
//                         />
                    
//                         <i className="fas fa-plus add-btn" title="Add Item" onClick={addItem}  ></i>
//                     </div>

//                     <div className="showItems">
//                         {
//                             items.map((elem, ind) =>  {
//                                     return (
//                                          <div className="eachItem" key={ind} >
//                                             <h3>{elem}</h3>
//                                             <i className="fas fa-trash add-btn" title="Delete item" onClick={() => deleteItem(ind)}></i>
//                                         </div>

//                                     )
//                             })
//                         }

                       
//                     </div>

//                         {/* use it to for effects on remove btn */}
//                     {/* <div className="showItems">
//                         <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> Check List </span></button>
//                     </div> */}

//                     <div className="showItems">
//                         <button className="btn" onClick={removeAll}><span> Remove All </span></button>
//                     </div>

//                 </div> 

                
//             </div>
            
//         </>
//     );
// };


// export default Todo;




//p1 TODO Edit
import React, {useState, useEffect} from 'react'
import todo1 from "../images/todo2.jpg";
import "../App.css";


// localStorage is used to store data so we can refresh page
const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'))
    }
    else {
        return [];
    }
}


const Todo = () => {

    const [inputData , setInputData] = useState('');
    // const [items, setItems] = useState([]);
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plz fill data');

        } 
        // else {

        //     setItems([... items, inputData]);  //now input will be stored in array in state
        //     setInputData('')   //to empty state 
        // }

        else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if(elem.id === isEditItem)
                    {
                        return{ ...elem, name: inputData }
                    }
                    return elem;
                }) 
            )
            setToggleSubmit(true);

            setInputData('');
    
            setIsEditItem(null);

        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name:inputData }
            setItems([... items, allInputData]);
            setInputData('') 
        }
          
    }

    const deleteItem = (index) => {
        // console.log(id);
        const updateditems = items.filter((elem) => {
            return (index !== elem.id);
        });

        setItems(updateditems);

    }
    
    const editItem = (id) => {
        let newEditItem  = items.find((elem) => {
            return elem.id === id

        });
        console.log(newEditItem);

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);
    }



    const removeAll = () => {
        setItems([]);
    }


    // add data to local Storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
       
    }, [items]);
   


    return (
        <> 
            {/* <div>

            </div>
              <figure className="figureimg" >
                        <img src={todo1}  alt="todoimg" style={{width:"40%", margin:"20px"}} />
                        <figcaption>Add Your List Here 👇</figcaption>
                    </figure> */}
            <h1 className="heading text-center ">TODO List</h1>

            <div className="main-div" >

                {/* <div>TODO List</div>    */}

                <div className="img" >
                    <img src={todo1}  alt="todoimg" />
                    {/* <figcaption>Add Your List Here 👇</figcaption> */}
                </div>

            
                <div className="child-div">
                    <div>List</div>
                
                    {/* <figure className="figureimg" >
                        <img src={todo1}  alt="todoimg" style={{width:"40%", margin:"20px"}} />
                        <figcaption>Add Your List Here 👇</figcaption>
                    </figure> */}

                    <div className="addItems">
                        <input type="text" placeholder=" ✍️ Add Items " 
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value) }
                        />

                        {
                            toggleSubmit ?  <i className="fas fa-plus add-btn" title="Add Item" onClick={addItem}></i> : <i className="fas fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }
                    
                       
                    </div>

                    <div className="showItems"> 
                        {
                            items.map((elem ) =>  {
                                    return (
                                         <div className="eachItem" key={elem.id} >
                                            <h3>{ elem.name }</h3>
                                            <div className="todo-btn">
                                                <i className="fas fa-edit add-btn" title="Edit item" onClick={() => editItem(elem.id)}></i>
                                                <i className="fas fa-trash add-btn " title="Delete item" onClick={() => deleteItem(elem.id)}></i>                        
                                            </div>
                                        </div>

                                    )
                            }) 
                        }

                       
                    </div>

                        {/* use it to for effects on remove btn */}
                    {/* <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span> Check List </span></button>
                    </div> */}

                    <div className="showItems">
                        <button className="btn" onClick={removeAll}><span> Remove All </span></button>
                    </div>

                </div> 

                
            </div>
            
        </>
    );
};


export default Todo;

