import clsx from 'clsx';
import { useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { fontFamilyOptions, OptionType } from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';

export const ArticleParamsForm = () => {
	const [stateSidebar, setStateSidebar] = useState<boolean>(false);
	const [stateCurrentFont, setStateCurrentFont] = useState<OptionType>(
		fontFamilyOptions[0]
	);

	const classesForSidebar = clsx(styles.container, {
		[styles.container_open]: stateSidebar,
	});

	const handleToggleSidebar = () => {
		setStateSidebar(stateSidebar ? false : true);
	};

	const handleSetFont = (stateCurrentFont: OptionType) => {
		const currentValue = setStateCurrentFont(stateCurrentFont);
		return currentValue;
	};

	return (
		<>
			<ArrowButton isOpen={stateSidebar} onClick={handleToggleSidebar} />
			<aside className={classesForSidebar}>
				<form className={styles.form}>
					<Select selected={fontFamilyOptions[0]} options={fontFamilyOptions} />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
