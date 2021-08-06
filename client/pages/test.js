import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Test = () => {
  const user = useSelector(state => state.auth.user);
  const file =
    'https://lagoon.fra1.digitaloceanspaces.com/Abtreibung%20%20Bachelorarbeit.pdf';
  useEffect(() => {
    try {
      console.log(user)
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
    <h1>Test page</h1>
    </div>
  );
};

export default Test;
