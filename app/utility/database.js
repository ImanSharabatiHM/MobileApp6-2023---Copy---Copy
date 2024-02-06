import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('apiRequests.db');
const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS api_requests_locations (id INTEGER PRIMARY KEY AUTOINCREMENT, endpoint TEXT, method TEXT, headers TEXT, body TEXT);'
      );
    });
  };

  const storeApiRequest = (endpoint, method, headers, body) => {
    console.log("Will store Locationnnn");
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO api_requests_locations (endpoint, method, headers, body) VALUES (?, ?, ?, ?);',
        [endpoint, method, JSON.stringify(headers), JSON.stringify(body)]
      );
    });
  };



  const retrieveApiRequests = (callback) => {
    console.log("Willll Retrieve APIIII");
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM api_requests_locations;', [], (_, { rows }) => {
        const apiRequests = rows._array.map((row) => ({
          id: row.id,
          endpoint: row.endpoint,
          method: row.method,
          headers: JSON.parse(row.headers),
          body: JSON.parse(row.body),
        }));
        callback(apiRequests);
      });
    });
  };
  
  const removeApiRequest = (id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM api_requests_locations WHERE id = ?;', [id]);
    });
    console.log(id+" removeddd");
  };


  export default {
    createTable,
    storeApiRequest,
    removeApiRequest,
    retrieveApiRequests,
  };
  
  // Usage example
  /*createTable();
  storeApiRequest('https://api.example.com/endpoint', 'POST', { 'Content-Type': 'application/json' }, { key: 'value' });
  retrieveApiRequests((apiRequests) => {
    apiRequests.forEach((request) => {
      // Retry the API call for each stored request
      makeApiCall(request.endpoint, request.method, request.headers, request.body)
        .then((response) => {
          // Handle successful API call
          removeApiRequest(request.id);
        })
        .catch((error) => {
          // Handle API call failure
          console.error('API call error:', error);
        });
    });
  });
   */
  
  
  
  
  
  