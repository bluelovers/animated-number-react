import { Component, createElement } from 'react';
import { func, number, oneOfType, string } from 'prop-types';
import anime, { AnimeAnimParams, AnimeInstance } from 'animejs';
import { ITSOmitIndexSignatures } from 'ts-type/lib/helper/record/omit-index';
import { ITSTypeAndStringLiteral } from 'ts-type/lib/helper/string';

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
 * @see https://animejs.com/documentation/
 * @see https://github.com/juliangarnier/anime/
 */
export interface IAnimatedNumberProps extends Omit<ITSOmitIndexSignatures<AnimeAnimParams>, 'targets' | 'animatedValue' | 'update'>, Record<'targets' | 'animatedValue' | 'innerHTML', never>
{
	value: number,
	startValue?: number,

	className?: string,

	fractionDigits?: number,
	locale?: boolean,

	/**
	 * @see https://animejs.com/documentation/#linearEasing
	 */
	easing?: ITSTypeAndStringLiteral<EnumEasingOptions> | AnimeAnimParams["easing"],

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

export class AnimatedNumber extends Component<IAnimatedNumberProps, IAnimatedNumberState>
{
	static propTypes = {
		value: oneOfType([number, string]).isRequired,
		duration: number,
		delay: number,
		formatValue: func,
		begin: func,
		complete: func,
		run: func,
		update: func,
		easing: string,
		className: string,
	};

	static defaultProps = {
		//duration: 1000,
		formatValue: (value: number) => value,
		//easing: EnumEasingOptions.easeInOutQuint,
		//run: defaultFunction,
		//complete: defaultFunction,
		//update: defaultFunction,
		//begin: defaultFunction,
		//delay: 0,
		//className: null,
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
		if (prevProps.value !== this.props.value) this.animateValue();
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

	animateValue = () =>
	{
		this.stopAnimation();

		if (typeof window === 'undefined')
		{
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
			...props
		} = this.props;

		duration ??= slow ? 2500 : fast ? 1000 : 1750;
		easing ??= EnumEasingOptions.easeInOutQuint;

		this.instance = anime({
			...props,
			targets: this.target,
			animatedValue: [startValue || 0, value],
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
		return createElement('span', {
			className: this.props.className,
		}, this.props.formatValue(this.state.animatedValue, this.props.value, this.props))
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
}
