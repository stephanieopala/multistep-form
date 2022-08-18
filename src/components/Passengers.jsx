import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';

const Passengers = () => {
  const [passengersList, setPassengersList] = useState([]);
  const [passengersCount, setPassengersCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10
  });

  useEffect(() => {
    const getData = async () => {
      const url = `https://api.instantwebtools.net/v1/passenger?page=${controller.page}&size=${controller.rowsPerPage}`
      try {
        const response = await fetch(url);
        if (response.statusText === 'OK') {
          const data = await response.json();
          console.log(data);
          setPassengersList(data.data);
          setPassengersCount(data.totalPassengers);
        } else {
          throw new Error('Request failed')
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [controller]);

  const handlePageChange = (event, newPage) => {
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Trips
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengersList.map((passenger) => (
            <TableRow key={passenger._id}>
              <TableCell>
                {passenger.name}
              </TableCell>
              <TableCell>
                {passenger.trips}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={handlePageChange}
        page={controller.page}
        count={passengersCount}
        rowsPerPage={controller.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}

export default Passengers;