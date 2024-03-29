import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

const InputWrapper: React.SFC<FieldRenderProps<any, any>> =
	({ input: { name, onChange, value, ...restInput }, meta, ...rest }) => {
		const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

		return (
			<React.Fragment>
				<Input
					{...rest}
					name={name}
					error={showError}
					inputProps={restInput}
					onChange={onChange}
					value={value}
				/>
				{showError &&
					<FormHelperText>
						{meta.error || meta.submitError}
					</FormHelperText>
				}
			</React.Fragment>
		);
	};

export default InputWrapper;
