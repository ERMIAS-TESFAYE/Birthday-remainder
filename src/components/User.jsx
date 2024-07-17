import { useEffect, useState } from 'react';
import Loading from './Loading';

const User = () => {
  // state to mange the data came from the api
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // api key
  const apiKey = 'CH52-X7U4-UTQD-3SP0';
  // randomuser api url
  const URL = 'https://randomuser.me/api/?results=5';

  // function for resetting the state
  const reset = () => {
    setUsers([]);
  };

  // a useEffect to fetch the data when the component is mounted at the initial
  useEffect(() => {
    // fetch api to fetch the data
    fetch(URL, {
      // params
      headers: {
        Authorization: `${apiKey}`,
      },
    })
      // getting the promise response and checking if it is ok(200)
      .then((response) => {
        // if it is not ok it throws an error
        if (!response.ok) {
          throw new Error('Error happened');
        }
        // setting the loading to false to remove it if the data is arrived
        setLoading(false);
        // if not we return the data
        return response.json();
      })
      // setting thr data to the users
      .then((data) => setUsers(data.results))
      .catch((error) => console.log(error));
  }, []);

  // a loading until the data is fetched
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-left text-3xl mb-4">
        {users.length} Birthdays Today
      </h1>
      <div className="space-y-4 divide-y divide-dashed">
        {users.map((user, index) => (
          <div key={index} className="flex gap-5 items-center pt-4 ">
            <img src={user.picture.medium} alt="" className="rounded-full " />
            <div>
              <h1 className="font-bold text-xl">
                {user.name.first + ' ' + user.name.last}
              </h1>
              <p className="text-left text-lg">
                <span className="font-semibold">{user.registered.age}</span>{' '}
                Years
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="bg-slate-800 text-white p-4 w-full mt-8 rounded-md font-bold"
        onClick={reset}
      >
        Clear All
      </button>
    </div>
  );
};
export default User;
