import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import {
	fontSizeOptions,
	fontFamilyOptions,
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleStateProps = {
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: ArticleStateProps) => {
	const asideRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		backgroundColor,
		contentWidth,
	} = formState;

	const toggleMenuOpen = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	const handleOnChange = (field: keyof ArticleStateType, value: OptionType) => {
		setFormState((prevState) => ({ ...prevState, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleMenuOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' weight={800} size={31} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={fontFamilyOption}
						onChange={(option) => handleOnChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={(option) => handleOnChange('fontSizeOption', option)}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={(option) => handleOnChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={(option) => handleOnChange('backgroundColor', option)}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={(option) => handleOnChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
