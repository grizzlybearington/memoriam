import css from "../css/GameOver.module.css";

interface GameOverProps {
	score: number,
	maxScore: number,
	onReplayClick: () => void
}

const gameOverMessages = [
	"Better luck next time!",
	"Oof, so close!",
	"Yikes!",
	"Nope! You clicked that one already.",
	"Memory's not so great today eh?",
];

const GameOver = ( { score, maxScore, onReplayClick }: GameOverProps ) => {

	const gameOverMessage =
	gameOverMessages[Math.floor(Math.random() * gameOverMessages.length)];

	return (
			<div className={css.gameOver}>
				{gameOverMessage}
				<div>
					Score: <br/>
					{score} / {maxScore}
				</div>
				<div className={css.replayButton} onClick={onReplayClick}>
					One more once?
				</div>
			</div>
	)
}

export default GameOver;
