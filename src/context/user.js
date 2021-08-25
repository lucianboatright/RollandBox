import { createContext, useState } from 'react';

const UserContext = createContext({
  // const [data, setData] = useState(null);
  // const [user, setUser] = useState(null);
  // setData(data);
  // setUser(user);

  data: null,
  user: null,
  setUser: (user) => {
    this.user = user;
  },
  setData: (data) => {
    this.data = data;
  }
});

export default UserContext;
