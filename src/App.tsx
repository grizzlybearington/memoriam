import { useState } from 'react';
import Options from './components/Options';
import OptionsModel from "./models/OptionsModel";
import Game from './components/Game';

export const BASEDIFFICULTY = 16;

function App() {
	const [showOptions, setShowOptions] = useState(true);
	const [options, setOptions] =
	useState<OptionsModel>({difficulty: BASEDIFFICULTY, theme: "Pokémon"});

	return (
		<>
			{showOptions
			?
				<Options
				onOptionsSubmit={(options) => {
					setOptions(options);
					setShowOptions(false);
				}}/>
			:
				<Game opts={options}/>
			}
		</>
	);
}

export default App;
