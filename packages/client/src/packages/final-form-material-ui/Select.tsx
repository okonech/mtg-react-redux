import FormControl from '@material-ui/core/FormControl';
import { FormControlProps } from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

interface FormHelperTextWrapperProps extends FieldRenderProps<any, any> {
	label?: string;
	formControlProps?: FormControlProps;
}

const FormHelperTextWrapper: React.SFC<FormHelperTextWrapperProps> = ({
	input: { name, value, onChange, ...restInput },
	meta,
	label,
	formControlProps,
	...rest
}) => {
	const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

	return (
		<FormControl {...formControlProps} error={showError}>
			<InputLabel htmlFor={name}>{label}</InputLabel>

			<Select
				{...rest}
				name={name}
				onChange={onChange}
				inputProps={restInput}
				value={value}
			/>

			{showError &&
				<FormHelperText>{meta.error || meta.submitError}</FormHelperText>
			}
		</FormControl>
	);
};

export default FormHelperTextWrapper;
