import { AnimeAnimParams, AnimeInstance } from 'animejs';
import { Requireable, Validator } from 'prop-types';
import { Component } from 'react';
import { ITSOmitIndexSignatures } from 'ts-type/lib/helper/record/omit-index';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

export declare const enum EnumEasingOptions {
	linear = "linear",
	easeInQuad = "easeInQuad",
	easeInCubic = "easeInCubic",
	easeInQuart = "easeInQuart",
	easeInQuint = "easeInQuint",
	easeInSine = "easeInSine",
	easeInExpo = "easeInExpo",
	easeInCirc = "easeInCirc",
	easeInBack = "easeInBack",
	easeInElastic = "easeInElastic",
	easeInBounce = "easeInBounce",
	easeOutQuad = "easeOutQuad",
	easeOutCubic = "easeOutCubic",
	easeOutQuart = "easeOutQuart",
	easeOutQuint = "easeOutQuint",
	easeOutSine = "easeOutSine",
	easeOutExpo = "easeOutExpo",
	easeOutCirc = "easeOutCirc",
	easeOutBack = "easeOutBack",
	easeOutElastic = "easeOutElastic",
	easeOutBounce = "easeOutBounce",
	easeInOutQuad = "easeInOutQuad",
	easeInOutCubic = "easeInOutCubic",
	easeInOutQuart = "easeInOutQuart",
	easeInOutQuint = "easeInOutQuint",
	easeInOutSine = "easeInOutSine",
	easeInOutExpo = "easeInOutExpo",
	easeInOutCirc = "easeInOutCirc",
	easeInOutBack = "easeInOutBack",
	easeInOutElastic = "easeInOutElastic",
	easeInOutBounce = "easeInOutBounce"
}
/**
 * @see https://animejs.com/documentation/
 * @see https://github.com/juliangarnier/anime/
 */
export interface IAnimatedNumberProps extends Omit<ITSOmitIndexSignatures<AnimeAnimParams>, "targets" | "animatedValue" | "update">, Record<"targets" | "animatedValue" | "innerHTML", never> {
	value: number;
	startValue?: number;
	className?: string;
	fractionDigits?: number;
	locale?: boolean;
	/**
	 * @see https://animejs.com/documentation/#linearEasing
	 */
	easing?: ITSTypeAndStringLiteral<EnumEasingOptions> | AnimeAnimParams["easing"];
	fast?: boolean;
	slow?: boolean;
	/**
	 * A function that will manipulate the animated value
	 */
	formatValue?(current: number, initialValue: number, props: IAnimatedNumberProps): string | number;
	/**
	 * Called at time = 0
	 * @param {anime.AnimeInstance} anima
	 */
	update?(anima: AnimeInstance): void;
	/**
	 * Called after delay is finished
	 * @param {anime.AnimeInstance} anima
	 */
	run?(anima: AnimeInstance): void;
	/**
	 * Called after animation delay is over
	 * @param {anime.AnimeInstance} anima
	 */
	begin?(anima: AnimeInstance): void;
	/**
	 * Called only after all the loops are completed
	 * @param {anime.AnimeInstance} anima
	 */
	complete?(anima: AnimeInstance): void;
}
export interface IAnimatedNumberState {
	animatedValue: number;
}
export declare class AnimatedNumber extends Component<IAnimatedNumberProps, IAnimatedNumberState> {
	static propTypes: {
		value: Validator<NonNullable<NonNullable<string | number>>>;
		duration: Requireable<number>;
		delay: Requireable<number>;
		formatValue: Requireable<(...args: any[]) => any>;
		begin: Requireable<(...args: any[]) => any>;
		complete: Requireable<(...args: any[]) => any>;
		run: Requireable<(...args: any[]) => any>;
		update: Requireable<(...args: any[]) => any>;
		easing: Requireable<string>;
		className: Requireable<string>;
	};
	static defaultProps: {
		formatValue: (value: number) => number;
	};
	state: {
		animatedValue: number;
	};
	protected target: {
		animatedValue: number;
	};
	protected instance: AnimeInstance;
	componentDidMount(): void;
	componentDidUpdate(prevProps: IAnimatedNumberProps): void;
	componentWillUnmount(): void;
	updateValue(anima: AnimeInstance): void;
	stopAnimation(): void;
	animateValue(): void;
	render(): import("react").DetailedReactHTMLElement<{
		className: string;
	}, HTMLElement>;
}

export {
	AnimatedNumber as default,
};

export {};
