import { AnimeAnimParams, AnimeInstance, AnimeParams } from 'animejs';
import { Component } from 'react';
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
 * @see https://animejs.com/documentation/#direction
 */
export declare const enum EnumDirectionOptions {
	/**
	 * Animation progress goes from 0 to 100%
	 */
	normal = "normal",
	/**
	 * Animation progress goes from 100% to 0%
	 */
	reverse = "reverse",
	/**
	 * Animation progress goes from 0% to 100% then goes back to 0%
	 */
	alternate = "alternate"
}
/**
 * @see https://animejs.com/documentation/
 * @see https://github.com/juliangarnier/anime/
 */
export interface IAnimatedNumberProps extends Pick<AnimeParams, Exclude<keyof AnimeParams, "targets" | "animatedValue" | "update" | "innerHTML">> {
	/**
	 * number that will be animated
	 */
	value: number;
	startValue?: number;
	startFromPreviousValue?: boolean;
	className?: string;
	fractionDigits?: number;
	locale?: boolean;
	/**
	 * @see https://animejs.com/documentation/#linearEasing
	 */
	easing?: ITSTypeAndStringLiteral<EnumEasingOptions> | AnimeAnimParams["easing"];
	direction?: ITSTypeAndStringLiteral<EnumDirectionOptions> | AnimeAnimParams["direction"];
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
export declare function createFixedNumberFn(props: Pick<IAnimatedNumberProps, "fractionDigits" | "value">): (current: number) => number;
export declare function createFormatValueFn(props: Pick<IAnimatedNumberProps, "fractionDigits" | "value" | "formatValue">): (current: number, initialValue: number, props: IAnimatedNumberProps) => string | number;
export declare class AnimatedNumber extends Component<IAnimatedNumberProps, IAnimatedNumberState> {
	static propTypes: {
		value: import("prop-types").Validator<NonNullable<NonNullable<string | number>>>;
		duration: import("prop-types").Requireable<number>;
		delay: import("prop-types").Requireable<number>;
		formatValue: import("prop-types").Requireable<(...args: any[]) => any>;
		startFromPreviousValue: import("prop-types").Requireable<boolean>;
		begin: import("prop-types").Requireable<(...args: any[]) => any>;
		complete: import("prop-types").Requireable<(...args: any[]) => any>;
		run: import("prop-types").Requireable<(...args: any[]) => any>;
		update: import("prop-types").Requireable<(...args: any[]) => any>;
		easing: import("prop-types").Requireable<string>;
		className: import("prop-types").Requireable<string>;
	};
	state: {
		animatedValue: number;
	};
	protected target: {
		animatedValue: number;
	};
	protected instance: AnimeInstance;
	componentDidMount: () => void;
	componentDidUpdate: (prevProps: IAnimatedNumberProps) => void;
	componentWillUnmount: () => void;
	updateValue: (anima: AnimeInstance) => void;
	stopAnimation: () => void;
	pauseAnimation: () => void;
	animateValue: (oldValue?: number) => void;
	render(): import("react").DetailedReactHTMLElement<{
		className: string;
	}, HTMLElement>;
}

export {
	AnimatedNumber as default,
};

export {};
