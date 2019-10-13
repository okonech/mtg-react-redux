import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import Radio from '@material-ui/core/Radio';

const RadioWrapper: React.SFC<FieldRenderProps<any, any>> = ({
	input: { checked, value, name, onChange, ...restInput },
	meta,
	...rest
}) => (
		<Radio
			{...rest}
			name={name}
			inputProps={restInput}
			onChange={onChange}
			checked={checked}
			value={value}
		/>
	);

export default RadioWrapper;
