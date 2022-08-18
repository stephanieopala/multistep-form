Server-side pagination involves making requests to the server to fetch subsets of data that matches the query parameters of the request such as page size and page index. Unlike client-side pagination where we fetch all the data at once and handle the pagination on the frontend.
This article covers reasons why you should use server-side pagination and how to implement it in React JS and Material UI.

### Table of contents
- [Prerequisites](#prerequisites)
- [Use Cases](#usecases)
- [Benefits of server-side pagination](#benefits-of-server-side-pagination)
- [Getting Started](#getting-started)
- [Creating the table component](#creating-the-table-component)
- [Fetching paginated data](#fetching-paginated-data)
- [Displaying data](#displaying-data)
- [Handling pagination](#handling-pagination)
- [Conclusion](#conclusion)

### Prerequisites
To follow along, you will need to have:
- Basic knowledge of React JS.

### Use Cases
Before we start building the application, below are some of the usecases where one would consider server-side pagination instead of client-side pagination.
- The data is large.
- The server supports server-side pagination.

### Benefits of server-side pagination
- It is fast.
- Improved performance in your application especially when a large amount of data is involved.

### Getting started
In the terminal, run the following command to create a React application using Create React App.
```bash
npx create-react-app my-app
```

Once the process is done, run the following command to get into the my-app folder.
```bash
cd charts-app
```

Next, install the Material-UI library using the following command in your terminal. We will use the `TablePagination` component from Material-UI when implementing pagination.
```bash
npm install @mui/material @emotion/react @emotion/styled
```

Start the React application using the following command.
```bash
npm start
```

In this article, we will use a free fake REST API from (Instant Web Tools)[https://www.instantwebtools.net/fake-rest-api]. However, if you have an existing API endpoint that supports server-side pagination, you can use that to follow along.

### Creating the table component
In the `src` folder, create a `components` folder. Inside the `components` folder, create a file `Passengers.jsx`. This will contain the functional component that displays the list of passengers in a table.

```javascript
import {
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';

const Users = () => {
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

        </TableBody>
      </Table>
      <TablePagination
      />
    </Card>
  )
}

export default Users;
```

### Fetching paginated data
In `Passengers.jsx`, we will use the `useEffect` hook to fetch data that will be displayed in the table.

```javascript
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

        </TableBody>
      </Table>
      <TablePagination
      />
    </Card>
  )
}

export default Passengers;

```

In the code snippet above, we fetch data in the `useEffect` hook which we import at the top of our file.
Inside the `Passengers` functional component, we have three states that we are managing using the `useState` hook.

```javascript
const [passengersList, setPassengersList] = useState([]);
  const [passengersCount, setPassengersCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10
  });
```
`passengersList` is an array that will contain the list of passengers that we will fetch from the API. `passengersCount` is the value of the total number of passengers and `controller` is an object with pagination information, that is, the page index and page size.

Inside the `useEffect` hook, we have an asynchronous function, `getData` that fetches the data when the page renders for the first and whenever the `controller` state changes. We then have a `try...catch` statement inside this function.

In the `try` block of code, we make the API call using `fetch` method and `await` the response. We then check whether the request is successful or not. If sucessful, the response is converted to JSON format using the `json()` method and stored in a variable `data`. We then use the `setPassengersList` setter function to update the state of the passengers list. We do the same for `setPassengersCount` which is updated with the total number of passengers from our API. On the other hand, if the request fails, an error is thrown.

In the `catch` block of code, we `console.log()` the error from the reponse to our console.

### Displaying data
```javascript
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
    <TablePagination />
  </Card>
```

The above code snippet is the JSX that will be in the return statement. Since we have the data stored in the `passengersList` state, we will map through each object and display the name and number of trips of the passenger in the table as shown above.

### Handling pagination

```javascript
  <TablePagination
    component="div"
    onPageChange={handlePageChange}
    page={controller.page}
    count={passengersCount}
    rowsPerPage={controller.rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
```
The `TablePagination` component accepts the following props;
`count` - This is the number of records/rows.
`page` - This is the page index.
`rowsPerPage` - This is the number of rows that will be displayed per page.
`onPageChange` - This is a callback function that is fired when the page is changed.
`onRowsPerPageChange` - This is the callback function that is called when the number of rows per page is changed.
`component` - The component used for the root node.

In our case, we will pass these six props in our `TablePagination` component. The first four props are required while the last two props are optional. This component also accepts several other props. More details can be found in the (Material UI documentation)[].

Inside the `Passengers` component just before we return the JSX, we will define two functions, `handlePageChange` and `handleChangeRowsPerPage`.

```javascript
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

```

`handlePageChange` will be called when the page is changed. Inside this function, we set the `controller.page` state to the new page that we have navigated to. The `useEffect` will run again and will cause a re-render.

`handleChangeRowsPerPage` will be called when the number of rows per page is changed.

Below is the full code snippet in `Passengers.jsx`.
```javascript
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
```

Finally, import `Passengers.jsx` file in `App.js`.
On `localhost`, below is the image of the final project.

![charts](/engineering-education/data-visualization-in-react-using-apexcharts/charts.png)


### Conclusion
In this article, we have installed the ApexCharts.js library in our React application. We created a fake REST API using a JSON server, fetched data from the API endpoint, and displayed it in a bar chart and line graph.

If you would like to explore more charts in this library and other features such as animating charts, check out the link in this [documentation](https://apexcharts.com/).

Happy coding.
