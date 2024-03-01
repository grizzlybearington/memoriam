import { useState } from 'react';
import Options from './components/Options';
import OptionsModel from "./models/OptionsModel";
import Game from './components/Game';

export const BaseDifficulty = 16;

function App() {
	const [showOptions, setShowOptions] = useState(true);
	const [options, setOptions] =
	useState<OptionsModel>({difficulty: BaseDifficulty, theme: "Pokémon"});

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
				<Game opts={options}
					onReturnToOptions={() => {
						setShowOptions(true);
					}}/>
			}
		</>
	);
}

export default App;
