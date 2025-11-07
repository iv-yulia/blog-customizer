import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

import styles from './App.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		contentWidth,
		backgroundColor,
	} = articleState;
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': fontFamilyOption.value,
					'--font-size': fontSizeOption.value,
					'--font-color': fontColor.value,
					'--container-width': contentWidth.value,
					'--bg-color': backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};
