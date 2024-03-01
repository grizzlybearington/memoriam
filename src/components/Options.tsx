import { useState } from "react";
import { BASEDIFFICULTY } from "../App";
import css from "../css/Options.module.css";
import OptionsModel from "../models/OptionsModel";

interface OptionsProps {
	onOptionsSubmit: (options: OptionsModel) => void
}

const Options = ({ onOptionsSubmit }: OptionsProps) => {
  const [difficulty, setDifficulty] = useState(BASEDIFFICULTY);
  const [theme, setTheme] = useState("Pokemon");

  const handleDiffChange = (e: React.ChangeEvent<HTMLSelectElement>) :
  void => {
    setDifficulty(Number(e.target.value));
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) :
  void => {
    setTheme(e.target.value);
  }

	function onSubmit() {
		onOptionsSubmit({...{difficulty}, ...{theme}});
	}

  return (
		<div className={css.optionsContainer}>
			Memoriam
			<div className={css.option}>
				<label>
					Choose your difficulty:
					<select
					className={css.selectBox}
					value={difficulty}
					onChange={(e) => handleDiffChange(e)}>
						<option>{BASEDIFFICULTY}</option>
						<option>32</option>
						<option>64</option>
						<option>128</option>
						<option>256</option>
					</select>
				</label>
			</div>
			<div className={css.option}>
				<label>
					Choose your theme<br/>(What will appear on the cards?):
					<select
					className={css.selectBox}
					value={theme}
					onChange={(e) => handleThemeChange(e)}>
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
