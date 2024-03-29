import Checkbox from '@material-ui/core/Checkbox';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

const CheckboxWrapper: React.SFC<FieldRenderProps<any, any>> = ({
	input: { checked, name, onChange, ...restInput },
	meta,
	...rest
}) => (
		<Checkbox
			{...rest}
			name={name}
			inputProps={restInput}
			onChange={onChange}
			checked={checked}
		/>
	);

export default CheckboxWrapper;
