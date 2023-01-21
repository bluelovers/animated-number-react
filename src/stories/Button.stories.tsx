import { useState } from 'react';
import { enumToStorybookArgTypesInputType } from '@lazy-storybook/arg-types-util';
import { AnimatedNumber, EnumEasingOptions } from '../index';
import { ComponentStory } from '@storybook/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Example/AnimatedNumber',
	component: AnimatedNumber,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		easing: {
			// @ts-ignore
			...enumToStorybookArgTypesInputType(EnumEasingOptions),
			defaultValue: AnimatedNumber.defaultProps?.easing,
		},
		startValue: {
			control: 'number',
			defaultValue: 0,
		},
		duration: {
			control: 'number',
			defaultValue: 5000,
		},
		delay: {
			control: 'number',
		},
	},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AnimatedNumber> = (args) =>
{
	const [value, setValue] = useState(args.value);

	const i = 12345;

	return <>
		<AnimatedNumber {...args} value={value} />
		<hr />
		<button
			onClick={() =>
			{
				setValue(value + i);
			}}
		>
			Increase 500
		</button>
		<button
			onClick={() =>
			{
				setValue(() => value - i);
			}}
		>
			Decrease 500
		</button>
		<br />
	</>
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	value: 500,
};
