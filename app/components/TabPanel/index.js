/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Tables from 'components/Tables';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledButton } from 'components/GlobalComponents/StyledButton';
import { StyledLabel } from 'components/GlobalComponents/StyledLabel';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectDisableNext,
  makeSelectSelectedMonth,
  makeSelectSelectedYear,
} from 'pages/Archives/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementMonthSelectedAction,
  downloadToolChangesByMonthAndYearAction,
  incrementMonthSelectedAction,
  loadToolChangesByMonthAndYearAction,
} from 'pages/Archives/actions';

const mapStateToProps = createStructuredSelector({
  selectedMonth: makeSelectSelectedMonth(),
  selectedYear: makeSelectSelectedYear(),
  disableNext: makeSelectDisableNext(),
});
function TabInstance(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, height: '500px' }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabInstance.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const StyledTab = styled(Tab)({
  '&.Mui-selected': {
    color: 'black',
    fontWeight: 'bold',
  },
});
export default function TabPanel(itemsArray) {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const { selectedMonth, selectedYear, disableNext } =
    useSelector(mapStateToProps);
  const displayedDate = `${selectedMonth} / ${selectedYear}`;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const incrementMonth = () => {
    dispatch(incrementMonthSelectedAction());
  };
  const decrementMonth = () => {
    dispatch(decrementMonthSelectedAction());
  };
  const handleDateChangeLoad = () => {
    dispatch(loadToolChangesByMonthAndYearAction(selectedMonth, selectedYear));
  };
  const handleDateChangeDownload = () => {
    dispatch(
      downloadToolChangesByMonthAndYearAction(selectedMonth, selectedYear),
    );
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& span': {
              '&.MuiTabs-indicator': {
                backgroundColor: 'black',
              },
            },
          }}
        >
          <StyledTab label="Tool Changes" {...a11yProps(0)} />
          <StyledTab label="RM Type Changes" {...a11yProps(1)} disabled />
          <StyledTab label="DC Type Changes" {...a11yProps(2)} disabled />
          <StyledTab label="Unit History" {...a11yProps(3)} disabled />
          <StyledTab label="Drill History" {...a11yProps(4)} disabled />
          <StyledTab label="Insert History" {...a11yProps(5)} disabled />
        </Tabs>
      </Box>
      <TabInstance value={value} index={0} sx={{ overflow: 'none' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <StyledButton onClick={decrementMonth}>Previous Month</StyledButton>
          <StyledLabel label={displayedDate}></StyledLabel>
          <StyledButton onClick={incrementMonth} disabled={disableNext}>
            Next Month
          </StyledButton>
          <StyledButton onClick={handleDateChangeLoad} width="100px">
            Load
          </StyledButton>
          <StyledButton onClick={handleDateChangeDownload} width="100px">
            Download
          </StyledButton>
        </Box>
        {Object.keys(itemsArray.itemsArray[0]).length ? (
          <>
            <Tables
              top={10}
              bottom={10}
              left={0}
              right={0}
              array={itemsArray.itemsArray[0]}
            />
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '500px',
              }}
            >
              <CircularProgress sx={{ color: 'black' }} />
            </Box>
          </>
        )}
      </TabInstance>
      <TabInstance value={value} index={1}>
        Two
      </TabInstance>
      <TabInstance value={value} index={2}>
        Three
      </TabInstance>
      <TabInstance value={value} index={3}>
        Three
      </TabInstance>
      <TabInstance value={value} index={4}>
        Three
      </TabInstance>
      <TabInstance value={value} index={5}>
        Three
      </TabInstance>
    </Box>
  );
}
TabPanel.prototypes = {
  itemsArray: PropTypes.array,
};
