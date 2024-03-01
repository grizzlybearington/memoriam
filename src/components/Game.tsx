import { useEffect, useRef, useState } from "react";
import { fetchPokeApi } from "../api/api";
import css from "../css/Game.module.css";
import OptionsModel from "../models/OptionsModel";
import { PokeApiModel } from "../models/PokeApiModel";
import Card from "./Card";
import GameOver from "./GameOver";
import Victory from "./Victory";

interface GameProps {
	opts: OptionsModel
}

const Game = ( {opts} : GameProps) => {

	const [cards, setCards] = useState<PokeApiModel["results"][number][]>([]);
	const [reload, setReload] = useState(true);
	const [loadError, setLoadError] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [victory, setVictory] = useState(false);

	const setRef = useRef<Set<number>>(new Set());
	const scoreRef = useRef<number>(0);

	useEffect(() => {
		async function getRandomCards() {
			try {
				setLoadError(false);
				setRef.current.clear();
				const data = await fetchPokeApi();
				const count = data.count;
				const set: Set<PokeApiModel["results"][number]> = new Set();
				while (set.size < opts.difficulty) {
					const randIdx = Math.floor(Math.random() * count);
					const pokemon = data.results[randIdx];
					pokemon.index = randIdx + 1;
					set.add(pokemon);
				}
				const slides: PokeApiModel["results"] = Array.from(set);
				setCards(slides);
			} catch (err) {
				console.error(err);
				setLoadError(true);
			} finally {
				setReload(false);
			}
		}
		if (reload) {
			getRandomCards();
		}
	}, [opts.difficulty, reload, gameOver]);

	function handleCardClick(index: number) {
		if (setRef.current.has(index)) {
			setGameOver(true);
			return;
		}
		scoreRef.current++;
		if (scoreRef.current === opts.difficulty) {
			setVictory(true)
			return;
		}
		setRef.current.add(index);

		const newCards = [...cards];
		let currIdx = newCards.length;
		while (0 !== currIdx) {
			const randIdx = Math.floor(Math.random() * currIdx);
			currIdx -= 1;

			const tmp = newCards[currIdx];
			newCards[currIdx] = newCards[randIdx];
			newCards[randIdx] = tmp;
		}
		setCards(newCards);
	}

	return (
		<>
			{reload && <>Loading...</>}
			{loadError && <>There was an error. Please refresh.</>}
			{gameOver &&
					<GameOver
					onReplayClick = {() => {
						setGameOver(false);
						scoreRef.current = 0;
						setReload(true);
					}}
					score={scoreRef.current}
					maxScore={opts.difficulty} />
			}
			{victory &&
					<Victory
					onReplayClick = {() => {
						setVictory(false);
						scoreRef.current = 0;
						opts.difficulty *= 2;
						setReload(true);
					}}
					/>
			}
			{!reload && !loadError && !gameOver && !victory &&
				<div className={css.gameContainer}>
					{cards.map(card => (
						<Card
						key={card.index}
						index={card.index}
						cardName={card.name}
						imgUrl={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + card.index + ".png"}
						onCardClick={() => {handleCardClick(card.index)}}
						/>
					))}
				</div>
			}
		</>
	);
}

export default Game;
