import clsx from 'clsx';
import { useState, useRef } from 'react';

import { ArrowButton  } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { 
	ArticleStateType, 
	defaultArticleState, 
	fontFamilyOptions, 
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions, 
	OptionType } from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { useMisclick } from '../hooks/useMisclick';

type ArticleState = {
	articleState: ArticleStateType;
	setArticleState: (option: ArticleStateType) => void;
};



export const ArticleParamsForm = ({articleState, setArticleState}: ArticleState) => {

	//Логика открытия/закрытия меню
	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

	const classesForSidebar = clsx(styles.container, {
		[styles.container_open]: isOpenSidebar,
	});

	const handleToggleSidebar = () => {
		setIsOpenSidebar(isOpenSidebar ? false : true);
	};

	const rootRef = useRef<HTMLDivElement>(null);

	useMisclick({
		isOpen: isOpenSidebar,
		setClose: () => setIsOpenSidebar(false),
		root: rootRef,
	});

	// Логика состояния селектов

	const [stateSelectCurrent, setStateSelectCurrent] = useState<ArticleStateType>(articleState);

	const handleSetStateSelect = (key: keyof ArticleStateType, value: OptionType) => {
		setStateSelectCurrent({ ...stateSelectCurrent, [key]: value })
	};
	
	const resetForm = () => {
		setStateSelectCurrent(defaultArticleState);
		setArticleState(defaultArticleState);
	};


	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpenSidebar} onClick={handleToggleSidebar} />
			
			<aside className={classesForSidebar}>
				<form className={styles.form}
				onSubmit={(e) => {
					e.preventDefault();
					setArticleState(stateSelectCurrent);		
				}}>

					<Text size={31} weight={800} uppercase>Задайте параметры</Text>
					<Separator height={'50px'} width={'100%'} color={'transparent'}/>
					
					<Select
						selected={stateSelectCurrent.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(option) =>
							handleSetStateSelect('fontFamilyOption', option)
						}>
						
					</Select>
					<Separator height={'50px'} width={'100%'} color={'transparent'}/>


					<RadioGroup name={"font-size-setting"} options={fontSizeOptions} selected={stateSelectCurrent.fontSizeOption}
					onChange={(option) =>
						handleSetStateSelect('fontSizeOption', option)
					} title='размер шрифта'/>
					<Separator height={'50px'} width={'100%'} color={'transparent'}/>


					<Select
						selected={stateSelectCurrent.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option) =>
							handleSetStateSelect('fontColor', option)
						}>
					
					</Select>
					<Separator height={'50px'} width={'100%'} color={'transparent'}/>
					<Separator height={'1px'} width={'100%'} color={'#D7D7D7'}/>
					<Separator height={'50px'} width={'100%'} color={'transparent'}/>


					<Select
						selected={stateSelectCurrent.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option) =>
							handleSetStateSelect('backgroundColor', option)
						}>
					
					</Select>
					<Separator height={'50px'} width={'100%'} color={'transparent'}/>


					<Select
						selected={stateSelectCurrent.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option) =>
							handleSetStateSelect('contentWidth', option)
						}>
					
					</Select>
					<Separator height={'207px'} width={'100%'} color={'transparent'}/>


					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={resetForm} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
