import React, { useEffect, useState } from "react";
import Game from "./Game";
import Typography from "@mui/material/Typography"
import "./App.css";

function App() {
    const [words, setWords] = useState([]);
    async function getWords() {
	let res = await fetch("https://random-word-api.herokuapp.com/word?number=30");
	let resWords = await res.json();
	setWords(resWords)
    }

    useEffect(() => {
	getWords();
    },[])

    return (
	<>
	    <Game words={words}/>
	</>
    );
}

export default App;
