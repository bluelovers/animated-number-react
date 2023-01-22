import { Component, createElement } from 'react';
import { bool, func, number, oneOfType, string } from 'prop-types';
import anime, { AnimeAnimParams, AnimeInstance, AnimeParams, DirectionOptions } from 'animejs';
import { ITSOmitIndexSignatures } from 'ts-type/lib/helper/record/omit-index';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';
import { isInt } from '@lazy-assert/check-basic';
import toFixedNumber from '@lazy-num/to-fixed-number';

export const enum EnumEasingOptions
{
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
	easeInOutBounce = "easeInOutBounce",
}

/**
 * @see https://animejs.com/documentation/#direction
 */
export const enum EnumDirectionOptions
{
	/**
	 * Animation progress goes from 0 to 100%
	 */
	normal = 'normal',
	/**
	 * Animation progress goes from 100% to 0%
	 */
	reverse = 'reverse',
	/**
	 * Animation progress goes from 0% to 100% then goes back to 0%
	 */
	alternate = 'alternate',
}

/**
 * @see https://animejs.com/documentation/
 * @see https://github.com/juliangarnier/anime/
 */
export interface IAnimatedNumberProps extends Pick<AnimeParams, Exclude<keyof AnimeParams, 'targets' | 'animatedValue' | 'update' | 'innerHTML'>>
{
	/**
	 * number that will be animated
	 */
	value: number,
	startValue?: number,
	startFromPreviousValue?: boolean,

	className?: string,

	fractionDigits?: number,
	locale?: boolean,

	/**
	 * @see https://animejs.com/documentation/#linearEasing
	 */
	easing?: ITSTypeAndStringLiteral<EnumEasingOptions> | AnimeParams["easing"],
	/**
	 * Defines the direction of the animation.
	 */
	direction?: ITSTypeAndStringLiteral<EnumDirectionOptions> | AnimeParams["direction"],

	fast?: boolean,
	slow?: boolean,

	/**
	 * A function that will manipulate the animated value
	 */
	formatValue?(current: number, initialValue: number, props: IAnimatedNumberProps): string | number,

	/**
	 * Called at time = 0
	 * @param {anime.AnimeInstance} anima
	 */
	update?(anima: AnimeInstance): void,

	/**
	 * Called after delay is finished
	 * @param {anime.AnimeInstance} anima
	 */
	run?(anima: AnimeInstance): void,

	/**
	 * Called after animation delay is over
	 * @param {anime.AnimeInstance} anima
	 */
	begin?(anima: AnimeInstance): void,

	/**
	 * Called only after all the loops are completed
	 * @param {anime.AnimeInstance} anima
	 */
	complete?(anima: AnimeInstance): void,
}

export interface IAnimatedNumberState
{
	animatedValue: number,
}

export function createFixedNumberFn(props: Pick<IAnimatedNumberProps, 'fractionDigits' | 'value'>)
{
	let { fractionDigits } = props;
	fractionDigits ??= isInt(props.value) ? 0 : 3;
	return (current: number) => toFixedNumber(current, fractionDigits)
}

export function createFormatValueFn(props: Pick<IAnimatedNumberProps, 'fractionDigits' | 'value' | 'formatValue'>)
{
	const toFixedNumber = createFixedNumberFn(props);
	let formatValue: IAnimatedNumberProps["formatValue"];

	if (props.formatValue)
	{
		formatValue = (current: number,
			initialValue: number,
			props: IAnimatedNumberProps,
		) => props.formatValue(toFixedNumber(current), initialValue, props)
	}
	else
	{
		formatValue = (current: number, initialValue, props) =>
		{
			let result = toFixedNumber(current);
			if (result && props.locale)
			{
				result = result.toLocaleString() as any
			}
			return result
		}
	}

	return formatValue
}

export class AnimatedNumber extends Component<IAnimatedNumberProps, IAnimatedNumberState>
{
	static propTypes = {
		value: oneOfType([number, string]).isRequired,
		duration: number,
		delay: number,
		formatValue: func,
		startFromPreviousValue: bool,
		begin: func,
		complete: func,
		run: func,
		update: func,
		easing: string,
		className: string,
	};

	override state = {
		animatedValue: 0,
	};

	protected target = {
		animatedValue: 0,
	};

	protected instance: AnimeInstance;

	override componentDidMount = () =>
	{
		this.animateValue();
	}

	override componentDidUpdate = (prevProps: IAnimatedNumberProps) =>
	{
		if (prevProps.value !== this.props.value || !this.instance) this.animateValue(prevProps.value);
	}

	override componentWillUnmount = () =>
	{
		this.stopAnimation();
	}

	updateValue = (anima: AnimeInstance) =>
	{
		this.props.update?.(anima);
		const { animatedValue } = this.target;
		this.setState({ animatedValue });
	}

	stopAnimation = () =>
	{
		if (!this.instance) return;

		this.instance.pause();
		// @ts-ignore
		this.instance.reset();
		delete this.instance;
	};

	pauseAnimation = () =>
	{
		this.instance?.pause();
	}

	animateValue = (oldValue?: number) =>
	{
		this.stopAnimation();

		if (typeof window === 'undefined')
		{
			this.setState({ animatedValue: this.props.value });
			return;
		}

		let {
			duration,
			//begin,
			easing,
			//complete,
			//run,
			//delay,
			value,
			startValue,
			slow,
			fast,
			fractionDigits,
			startFromPreviousValue,
			...props
		} = this.props;

		duration ??= slow ? 2500 : fast ? 1000 : 1750;
		easing ??= EnumEasingOptions.easeInOutQuint;

		startValue = (startFromPreviousValue === true) ? (this.state.animatedValue ?? oldValue ?? startValue) : startValue;
		let animatedValue = [startValue ?? 0, value];

		this.instance = anime({
			...props,
			targets: this.target,
			animatedValue,
			duration,
			update: this.updateValue,
			easing,
			//begin,
			//complete,
			//run,
			//delay,
		});
	};

	override render()
	{
		const formatValue = createFormatValueFn(this.props);

		return createElement('span', {
			className: this.props.className,
		}, formatValue((typeof window === 'undefined') ? this.props.value : this.state.animatedValue, this.props.value, this.props))
	}
}

export default AnimatedNumber;

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(AnimatedNumber, "__esModule", { value: true });

	Object.defineProperty(AnimatedNumber, 'AnimatedNumber', { value: AnimatedNumber });
	Object.defineProperty(AnimatedNumber, 'default', { value: AnimatedNumber });

	// @ts-ignore
	Object.defineProperty(AnimatedNumber, 'EnumEasingOptions', { value: EnumEasingOptions });
	// @ts-ignore
	Object.defineProperty(AnimatedNumber, 'EnumDirectionOptions', { value: EnumDirectionOptions });

	Object.defineProperty(AnimatedNumber, 'createFixedNumberFn', { value: createFixedNumberFn });
	Object.defineProperty(AnimatedNumber, 'createFormatValueFn', { value: createFormatValueFn });
}
