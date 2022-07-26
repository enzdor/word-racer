import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

function Game(props) {
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

	useEffect(() => {
		if (props.words.length > 1){
			for (let i = 0; i < props.words.length - 1; i++) {
				props.words[i] = props.words[i] + " ";
			}
			setCurrentWord(props.words[0]);
		}
	}, [props]);

	useEffect(() => {
		if (currentWord !== "") {
			setCurrentChar(currentWord[0]);
		} 	
	}, [currentWord]);

	useEffect(() => {
		if (
			currentWord !== "" 
			&& formValue[currentCharPosition] === currentWord[currentCharPosition] 
		) {
			if (strokes === 0) {
				setStart(true);
				setStartTime(new Date);
			}
			setStrokes(strokes + 1);
			setMistake(false);
			if (currentCharPosition !== currentWord.length - 1) {
				setCurrentChar(currentWord[currentCharPosition + 1]);
				setCurrentCharPosition(currentCharPosition + 1);
			} else {
				if (currentWordPosition === props.words.length - 1) {
					setCurrentWord("done");
					setCurrentWordPosition(-1);
					setCurrentChar("");
					setCurrentCharPosition(-1);
					document.getElementById("input").value = "";
					setFinishedTime(new Date);
					setFinished(true);
				} else {
					setCurrentWord(props.words[currentWordPosition + 1]);
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
		} else if (mistake) {
			setStrokes(strokes + 1)
		}
	}, [formValue])

	function handleChange(event) {
		setFormValue(event.target.value)
	}

	return (
		<Container maxWidth="lg">
			<Typography variant="h4" color="primary" sx={{mt: 3}}>word racer</Typography>
			<Card variant="outlined" sx={{my: 3}}>
			    <Container sx={{display: "flex", flexWrap: "wrap"}}>
				{props.words.length > 1 
					? 
					props.words.map(word => {
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
		</Container>
	)
}

export default Game;
