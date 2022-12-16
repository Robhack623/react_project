import React, { useState, useEffect } from "react";
import '../styles/styles_1.css'
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
const randomColor = require("randomcolor");


function Lessons() {

    const [item, setItem] = useState("");
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("items")) || []
    );

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    const keyPress = (event) => {
        const code = event.keyCode || event.which;
        if (code === 13) {
            newitem();
        }
    };

    const newitem = () => {
        if (item.trim() !== "") {
            //if input is not blank, create a new item object
            const newitem = {
                id: uuidv4(),
                item: item,
                color: randomColor({ luminosity: "light", }),
                defaultPos: { x: 100, y: 0 },
            };
            //add this new item object to the items array
            setItems((items) => [...items, newitem]);
            //reset item value to empty string
            setItem("");
        } else {
            alert("Enter a item");
            setItem("");
        }
    };

    const updatePos = (data, index) => {
        const newArr = [...items];
        newArr[index].defaultPos = { x: data.x, y: data.y };
        setItems(newArr);
     };
    
     const deleteNote = (id) => {
        setItems(items.filter((item) => item.id !== id));
     };
    


    return (
        <>
            <input value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Enter something..."
                onKeyDown={(e) => keyPress(e)}></input>
            <button onClick={newitem}>ENTER</button>
            {items.map((item, index) => {
                return (
                    <Draggable
                        key={item.id}
                        defaultPosition={item.defaultPos}
                        onStop={(e, data) => {
                            updatePos(data, index);
                        }}
                    >
                        <div style={{ backgroundColor: item.color }} className="box">
                            {`${item.item}`}
                            <button id="delete" onClick={(e) => deleteNote(item.id)}>
                                X
                            </button>
                        </div>
                    </Draggable>
                );
            })}

        </>
    )

}

export default Lessons