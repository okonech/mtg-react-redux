import { CATEGORIES, VIEWS } from './DeckEditor';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';

interface ViewDropDownProps {
    view: keyof typeof VIEWS;
    setView: React.Dispatch<React.SetStateAction<keyof typeof VIEWS>>;
    category: keyof typeof CATEGORIES;
    setCategory: React.Dispatch<React.SetStateAction<keyof typeof CATEGORIES>>;
}

const useStyles = makeStyles(() => ({
    menu: {
        width: 200
    }
}));

const ViewDropDown: React.FC<ViewDropDownProps> = (props) => {
    const { view, setView, category, setCategory } = props;
    const classes = useStyles({});

    const handleViewChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setView(event.target.value as any);
    };

    const handleCategoryChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value as any);
    };

    return (
        <React.Fragment>
            <TextField
                id='view-select'
                select={true}
                label='Deck View Type'
                value={view}
                onChange={handleViewChange()}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu
                    }
                }}
                margin='dense'
                variant='outlined'
            >
                {Object.keys(VIEWS).map((key) => (
                    <option key={key} value={key}>
                        {VIEWS[key]}
                    </option>
                ))}
            </TextField>
            <TextField
                id='category-select'
                select={true}
                label='Group By Category'
                value={category}
                onChange={handleCategoryChange()}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        className: classes.menu
                    }
                }}
                margin='dense'
                variant='outlined'
            >
                {Object.keys(CATEGORIES).map((key) => (
                    <option key={key} value={key}>
                        {CATEGORIES[key]}
                    </option>
                ))}
            </TextField>
        </React.Fragment>
    );
};

export default ViewDropDown;
