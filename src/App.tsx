import React, { useMemo } from 'react';
import './App.css';

import { usePrevious, useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import { If } from 'react-if';

import { shuffle } from 'lodash';

const EXPIRE_RUN_CONFETTI_MS = 150000;

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

	const prevIsRunConfetti = usePrevious(isRunConfetti);

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

	useEffect(() => {
		if (isRunConfetti && !prevIsRunConfetti) {
			setTimeout(() => {
				setIsRunConfetti(false);
			}, EXPIRE_RUN_CONFETTI_MS);
		}
	}, [isRunConfetti, prevIsRunConfetti]);

	return (
		<div className="App">
			<header>
				<h1>🗄 Woowahan Locker 🗄</h1>
			</header>

			<button onClick={onShuffle} disabled={isRunConfetti}>
				<h2>{computedButtonText}</h2>
			</button>

			<If condition={isRunConfetti}>
				<ol>
					{crewNameList.map((name, i) => (
						<li key={'li-' + i}>
							{i + 1}. {name}
						</li>
					))}
				</ol>
			</If>

			<If condition={isRunConfetti}>
				<Confetti run={isRunConfetti} width={width} height={height} />
			</If>
		</div>
	);
}

export default App;
