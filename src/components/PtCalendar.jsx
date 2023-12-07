import React from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { Box, Button } from '@mui/material';
import CalendarHeader from './CalendarHeader';
import { useState, useEffect } from 'react';

const localizer = dayjsLocalizer(dayjs);

export default function PtCalendar() {
  //Set of data with customer names
  const [trainingsWithIdsAndNames, setTrainingsWithIdsAndNames] = useState([]);
  //Load the list of trainings
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://traineeapp.azurewebsites.net/api/trainings'
      );
      if (response.ok) {
        const data = await response.json();
        const content = await data.content;

        const modifiedList = await content.map((custObj, index) => ({
          ...custObj,
          id: index,
          link: custObj.links[2].href,
        }));

        //Fetching customers name (needed to display in the calendar)
        //Another set of promises
        const fetchCustomerNamesAndModifyObj = modifiedList.map(
          async object => {
            const custUrlHttp = object.links[2].href;
            const custUrlHttps =
              custUrlHttp.slice(0, 4) + 's' + custUrlHttp.slice(4); // this is for deploying on github
            const customerDataResponse = await fetch(custUrlHttps);
            const customerData = await customerDataResponse.json();
            const modifyObject = {
              ...object,
              names: `${customerData.firstname} ${customerData.lastname}`,
            };
            return modifyObject;
          }
        );

        //Wait for all promises for fetchCustomerNames
        const resolvedFetchCustomerNamesAndModifyObj = Promise.all(
          fetchCustomerNamesAndModifyObj
        );
        //Return array of values
        const resolvedToMap = await resolvedFetchCustomerNamesAndModifyObj;
        //Filter unnecessary data
        const eventList = resolvedToMap.map(eventItem => {
          const eventObj = {
            id: eventItem.id,
            customer: eventItem.names,
            duration: eventItem.duration,
            title: `${eventItem.activity} / ${eventItem.names}`,
            start: dayjs(eventItem.date).toDate(),
            end: dayjs(eventItem.date)
              .add(eventItem.duration, 'minutes')
              .toDate(),
          };
          return eventObj;
        });
        //Set final version of the event objects
        setTrainingsWithIdsAndNames(eventList);
      }
    };
    fetchData();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        width="90%"
        height="80vh"
        display="flex"
        flexDirection="column"
        maxWidth="90%"
        gap={5}
      >
        <CalendarHeader />
        <Calendar localizer={localizer} events={trainingsWithIdsAndNames} />
      </Box>
    </Box>
  );
}
