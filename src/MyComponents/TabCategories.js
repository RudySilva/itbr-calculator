import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ResponsiveTypography from '../MyComponents/ResponsiveTypography';
import Criteria from './Criteria';
import CategoryIcon from './CategoryIcon';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={1}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TabCategories(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    {
                        props.questionnaire.map((criteria, index) =>
                            <Tab
                                key={index}
                                label={<ResponsiveTypography text={criteria.category} variant="subtitle2" {...props}/>}
                                {...a11yProps(index)} 
                                icon={<CategoryIcon category={criteria.category} />}
                            />
                        )
                    }
                </Tabs>
            </AppBar>
            {
                props.questionnaire.map((criteria, index) => {
                    return (
                        <TabPanel key={index} value={value} index={index} className={classes.tabPanel}>
                            <Criteria
                                criteria={criteria}
                                handleCheckBoxChange={props.handleCheckBoxChange}
                                selectedCriterias={props.selectedCriterias} />
                        </TabPanel>)
                })
            }
        </div>
    );
}
