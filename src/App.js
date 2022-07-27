import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import "./App.css";

function App() {
    const newWords = ["about","above","add","after","again","air","all","almost","along","also","always","America","an","and","animal","another","answer","any","are","around","as","ask","at","away","back","be","because","been","before","began","begin","being","below","between","big","book","both","boy","but","by","call","came","can","car","carry","change","children","city","close","come","could","country","cut","day","did","different","do","does","don","t","down","each","earth","eat","end","enough","even","every","example","eye","face","family","far","father","feet","few","find","first","follow","food","for","form","found","four","from","get","girl","give","go","good","got","great","group","grow","had","hand","hard","has","have","he","head","hear","help","her","here","high","him","his","home","house","how","idea","if","important","in","Indian","into","is","it","its","it","s","just","keep","kind","know","land","large","last","later","learn","leave","left","let","letter","life","light","like","line","list","little","live","long","look","made","make","man","many","may","me","mean","men","might","mile","miss","more","most","mother","mountain","move","much","must","my","name","near","need","never","new","next","night","no","not","now","number","of","off","often","oil","old","on","once","one","only","open","or","other","our","out","over","own","page","paper","part","people","picture","place","plant","play","point","put","question","quick","quickly","quite","read","really","right","river","run","said","same","saw","say","school","sea","second","see","seem","sentence","set","she","should","show","side","small","so","some","something","sometimes","song","soon","sound","spell","start","state","still","stop","story","study","such","take","talk","tell","than","that","the","their","them","then","there","these","they","thing","think","this","those","thought","three","through","time","to","together","too","took","tree","try","turn","two","under","until","up","us","use","very","walk","want","was","watch","water","way","we","well","went","were","what","when","where","which","while","white","who","why","will","with","without","word","work","world","would","write","year","you","young","your"]
    const [words, setWords] = useState([]);
    const [formValue, setFormValue] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [currentWordPosition, setCurrentWordPosition] = useState(0);
    const [currentChar, setCurrentChar] = useState("");
    const [currentCharPosition, setCurrentCharPosition] = useState(0);
    const [mistake, setMistake] = useState(false);
    const [finished, setFinished] = useState(false);
    const [start, setStart] = useState(false);
    const [strokes, setStrokes] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [finishedTime, setFinishedTime] = useState(0);

    function reset() {
	setCurrentWord("");
	setCurrentWordPosition(0);
	setCurrentChar("");
	setCurrentCharPosition(0);
	setMistake(false);
	setFinished(false);
	setStart(false);
	setStrokes(0);
	setStartTime(0);
	setFinishedTime(0);
	shuffleArray(newWords);
    }

    function shuffleArray(array) {
	let curId = array.length;
	while (0 !== curId) {
	    let randId = Math.floor(Math.random() * curId);
	    curId -= 1;
	    let tmp = array[curId];
	    array[curId] = array[randId];
	    array[randId] = tmp;
	    }
	array.splice(30);
	setWords(array);
    }

    useEffect(() => {
	shuffleArray(newWords);
    },[])

    useEffect(() => {
	    if (words.length > 1){
		    for (let i = 0; i < words.length - 1; i++) {
			    words[i] = words[i] + " ";
		    }
		    setCurrentWord(words[0]);
	    }
    }, [words]);

    useEffect(() => {
	    if (currentWord !== "") {
		    setCurrentChar(currentWord[0]);
	    } 	
    }, [currentWord]);

    useEffect(() => {
	console.log(strokes)
	    if (
		    currentWord !== "" 
		    && formValue[currentCharPosition] === currentWord[currentCharPosition] 
	    ) {
		    if (strokes === 0) {
			    setStart(true);
			    setStartTime(new Date())
		    }
		    setStrokes(strokes + 1);
		    setMistake(false);
		    if (currentCharPosition !== currentWord.length - 1) {
			    setCurrentChar(currentWord[currentCharPosition + 1]);
			    setCurrentCharPosition(currentCharPosition + 1);
		    } else {
			    if (currentWordPosition === words.length - 1) {
				    setCurrentWord("done");
				    setCurrentWordPosition(-1);
				    setCurrentChar("");
				    setCurrentCharPosition(-1);
				    document.getElementById("input").value = "";
				    setFinishedTime(new Date());
				    setFinished(true);
			    } else {
				    setCurrentWord(words[currentWordPosition + 1]);
				    setCurrentWordPosition(currentWordPosition + 1);
				    setCurrentCharPosition(0);
				    setFormValue("");
				    document.getElementById("input").value = "";
			    }
		    }
	    } else if (
		    currentWord !== ""
		    && formValue[currentCharPosition] !== currentWord[currentCharPosition]
		    && formValue[currentCharPosition] !== undefined
	    ) {
		    setMistake(true);
		    setStrokes(strokes + 1);
	    } else if (
		mistake
		&& formValue[currentCharPosition] !== currentWord[currentCharPosition]
		&& currentCharPosition === formValue.length
	    ) {
		setMistake(false);
		setStrokes(strokes + 1);
	    } else if (currentCharPosition > formValue.length) {
		setCurrentCharPosition(currentCharPosition -1);
		setStrokes(strokes + 1);
	    }
    }, [formValue])

    function handleChange(event) {
	    setFormValue(event.target.value)
    }

    return (
	<Container maxWidth="lg">
	    <Typography variant="h3" color="primary" sx={{mt: 3}}>word racer</Typography>
	    <Card variant="outlined" sx={{my: 3}}>
		<Container sx={{display: "flex", flexWrap: "wrap"}}>
		    {words.length > 1 
			? 
			words.map(word => {
			    if (currentWord === word) {
				if (!mistake) {
				    return (
					<Typography 
					    variant="h4" 
					    key={word} 
					    style={{color: "green", marginRight: "1rem"}}
					>
					    {word}
					</Typography>
				    )
				} else {
				    return (
					<Typography variant="h4" key={word} style={{color: "red", marginRight: "1rem"}}>{word}</Typography>
				    )
				}
			    } else {
				return (
				    <Typography 
					variant="h4" 
					key={word} 
					style={{marginRight: "1rem"}}
				    >
					{word}
				    </Typography>
				)
			    }
			})
			: <Typography variant="h4">loading</Typography>
		    }
		</Container>
	    </Card>
	    <TextField label="Type here..." error={mistake} fullWidth onChange={handleChange} disabled={finished} id="input"/>
	    <Typography variant="h4" color="primary" sx={{my: 3}}>{finished ? "wpm " + (strokes / 5) / (((finishedTime - startTime) / 1000) / 60) : <></>}</Typography>
	    <Button variant="contained" onClick={() => reset()}>Restart</Button>
	</Container>
    )
}

export default App;
