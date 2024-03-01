import { useState } from "react";
import { BaseDifficulty } from "../App";
import css from "../css/Options.module.css";
import OptionsModel from "../models/OptionsModel";

interface OptionsProps {
	onOptionsSubmit: (options: OptionsModel) => void
}

const Options = ({ onOptionsSubmit }: OptionsProps) => {
	const MinDifficulty = 4;
	const MaxDifficulty = 256;

  const [difficulty, setDifficulty] = useState(BaseDifficulty);
  const [theme, setTheme] = useState("Pokémon");
  const [numErrorText, setNumErrorText] = useState(false);

	function onDifficultyClick(selected: number) {
		setDifficulty(selected);
		setNumErrorText(false);
	}

	function onSubmit() {
		if (difficulty < MinDifficulty || difficulty > MaxDifficulty) {
			setNumErrorText(true);
		} else {
			onOptionsSubmit({...{difficulty}, ...{theme}});
		}
	}

  return (
		<div className={css.optionsContainer}>
			Memoriam
			<div className={css.option}>
				<label>
					Choose your difficulty:
					<input type="number"
					min={MinDifficulty}
					max={MaxDifficulty}
					value={difficulty}
					className={`${css.optionBox} ${css.numberBox}`}
					onChange={(e) => setDifficulty(Number(e.target.value))} />
					<button onClick={() => onDifficultyClick(10)}>Easy</button>
					<button onClick={() => onDifficultyClick(16)}>Normal</button>
					<button onClick={() => onDifficultyClick(32)}>Hard</button>
					<button onClick={() => onDifficultyClick(64)}>Very Hard</button>
					<button onClick={() => onDifficultyClick(128)}>Insanity</button>
					{numErrorText &&
						<div className={css.errorText}>
							(Number must be between {MinDifficulty} and {MaxDifficulty}!)
						</div>}
				</label>
			</div>
			<div className={css.option}>
				<label>
					Choose your theme<br/>(What will appear on the cards?):
					<select
					className={css.optionBox}
					value={theme}
					onChange={(e) => setTheme(e.target.value)}>
						<option>Pokémon</option>
					</select>
				</label>
			</div>
			<div className={css.instructions}>
				Instructions:<br/>
				Select all of the cards, but do not select the same one
				more than once!
			</div>
			<button
			onClick={onSubmit}>
				Go!
			</button>
		</div>
  )
}

export default Options;
