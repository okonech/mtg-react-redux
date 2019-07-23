import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

const TextFieldWrapper: React.SFC<FieldRenderProps<any, any>> = ({ input: { name, onChange, value, ...restInput }, meta, ...rest }) => {
	const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

	return (
		<TextField
			{...rest}
			name={name}
			helperText={showError ? meta.error || meta.submitError : undefined}
			error={showError}
			InputProps={restInput}
			onChange={onChange}
			value={value}
		/>
	);
};

export default TextFieldWrapper;
