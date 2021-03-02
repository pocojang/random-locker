import './App.css';

import { shuffle } from 'lodash';

import React, { useMemo, useState } from 'react';
import Confetti from 'react-confetti';
import { If } from 'react-if';
import { useWindowSize } from 'react-use';

const CREW_NAME_LIST = [
	'서니',
	'브랜',
	'파노',
	'디토',
	'미키',
	'동동',
	'티케',
	'하루',
	'인치',
	'도비',
	'카일',
	'신세한탄',
	'다윗',
	'유조',
	'썬',
	'주모',
	'피터',
	'콜린',
	'그루밍',
	'브콜',
	'크리스',
	'심바',
	'체프',
	'엘라',
	'곤이',
	'지그',
];

function App() {
	const { width, height } = useWindowSize();

	const [isRunConfetti, setIsRunConfetti] = useState(false);
	const [crewNameList, setCrewNameList] = useState(CREW_NAME_LIST);

	const onShuffle = () => {
		setCrewNameList((prevState) => shuffle(prevState));

		setIsRunConfetti(true);
	};

	const computedButtonText = useMemo(() => {
		if (isRunConfetti) {
			return '🎊 Congratulation 🎉';
		}

		return '👉 Click Me 👈';
	}, [isRunConfetti]);

	return (
		<div className="App">
			<header>
				<h1>🗄 Woowahan Locker 🗄</h1>
			</header>

			<button onClick={onShuffle} disabled={isRunConfetti}>
				<h2>{computedButtonText}</h2>
			</button>

			<If condition={isRunConfetti}>
				<React.Fragment>
					<ol>
						{crewNameList.map((name, index) => (
							<li key={'li-' + index}>
								{index + 1}. {name}
							</li>
						))}
					</ol>

					<Confetti run={isRunConfetti} width={width} height={height} />
				</React.Fragment>
			</If>
		</div>
	);
}

export default App;
