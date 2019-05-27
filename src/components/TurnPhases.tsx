import {
    createStyles, StepButton, StepConnector, StepIcon, StepLabel,
    SvgIcon, withStyles, WithStyles
} from '@material-ui/core';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import { Theme } from '@material-ui/core/styles';
import React from 'react';
import AttackSvg from './svg/AttackSvg';
import BlockSvg from './svg/BlockSvg';
import DamageSvg from './svg/DamageSvg';
import DrawSvg from './svg/DrawSvg';
import EndCombatSvg from './svg/EndCombatSvg';
import EndSvg from './svg/EndSvg';
import MainSvg from './svg/MainSvg';
import StartCombatSvg from './svg/StartCombatSvg';
import UntapSvg from './svg/UntapSvg';
import UpkeepSvg from './svg/UpkeepSvg';

const styles = (theme: Theme) => {
    return createStyles({
        main: {
            height: '100%',
            paddingLeft: '12px'
        },
        button: {
            '& svg': {
                paddingRight: '12px'
            }
        },
        active: {
            '& $connectorLine': {
                borderColor: theme.palette.secondary.main
            },
            'color': theme.palette.secondary.main
        },
        completed: {
            '& $connectorLine': {
                borderColor: theme.palette.primary.main
            },
            'color': theme.palette.primary.main
        },
        disabled: {
            '& $connectorLine': {
                borderColor: theme.palette.grey[100]
            },
            'color': theme.palette.grey[100]
        },
        connectorLine: {
            transition: theme.transitions.create('border-color'),
            height: '100%',
            minHeight: '0px'
        }
    });
};

function getSteps() {
    return ['Untap', 'Upkeep', 'Draw', 'Main 1', 'Start Combat', 'Attackers',
            'Blockers', 'Damage', 'End Combat', 'Main 2', 'End'];
}

function getStepComponent(idx: number) {
    switch (idx) {
        case 1:
            return <UntapSvg />;
        case 2:
            return <UpkeepSvg />;
        case 3:
            return <DrawSvg />;
        case 4:
            return <MainSvg />;
        case 5:
            return <StartCombatSvg />;
        case 6:
            return <AttackSvg />;
        case 7:
            return <BlockSvg />;
        case 8:
            return <DamageSvg />;
        case 9:
            return <EndCombatSvg />;
        case 10:
            return <MainSvg />;
        case 11:
            return <EndSvg />;
        default:
            throw new Error('unknown case');
    }
}

function StepIconComponent(props) {
    if (props.error) {
        return <StepIcon {...props} />;
    }
    console.log(props);

    return (
        <SvgIcon {...props}>
            {getStepComponent(props.icon)}
        </SvgIcon>
    );
}

export interface TurnPhasesProps extends WithStyles<typeof styles> {
    style?: React.CSSProperties;
}

const TurnPhases = (props: TurnPhasesProps) => {
    const { style, classes } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const connector = (
        <StepConnector
            classes={{
                active: classes.active,
                completed: classes.completed,
                disabled: classes.disabled,
                line: classes.connectorLine
            }}
        />
    );

    const rootStyle = (index: number) => {
        if (index === activeStep) {
            return classes.active;
        } else if (activeStep > index) {
            return classes.completed;
        } else {
            return classes.disabled;
        }
    };

    const turnSteps = steps.map((label, index) => {

        return (
            <Step key={label}>
                <StepButton
                    onClick={handleStep(index)}
                    className={classes.button}
                    completed={activeStep > index}
                    orientation='vertical'
                >
                    <StepLabel
                        StepIconComponent={StepIconComponent}
                        classes={{
                            root: rootStyle(index)
                        }}
                    >
                        {label}
                    </StepLabel>
                </StepButton>
            </Step>
        );
    });

    return (
        <Stepper
            style={style}
            orientation='vertical'
            nonLinear={true}
            activeStep={activeStep}
            className={classes.main}
            connector={connector}
        >
            {turnSteps}
        </Stepper>
    );
};

export default withStyles(styles)(TurnPhases);
