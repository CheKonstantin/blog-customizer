import styles from './index.module.scss';
import clsx from 'clsx';
import {CSSProperties} from "react"

type TypeSeparator = {
	height?: string;
	width?: string;
	color?: string;
}

export const Separator = (props: TypeSeparator) => {
	return <div className={clsx(styles.separator)} style={
		{
			'--width-separator': props.width,
			'--height-separator': props.height,
			'--color-separator': props.color,
		} as CSSProperties
	}></div>;
};
