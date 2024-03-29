import Radio from '@material-ui/core/Radio';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

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
