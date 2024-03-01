import css from "../css/Victory.module.css";

interface VictoryProps {
	onReplayClick: () => void
}

const victoryMessages = [
	"Well done!",
	"Well, aren't you smart!",
	"Good job!",
	"Some memory you've got there!",
	"The wiz-kid is here!",
];

const Victory = ( { onReplayClick }: VictoryProps ) => {

	const victoryMessage =
	victoryMessages[Math.floor(Math.random() * victoryMessages.length)];

	return (
			<div className={css.victory}>
				{victoryMessage}
				<div className={css.replayButton} onClick={onReplayClick}>
					A little harder?
				</div>
			</div>
	)
}

export default Victory;
