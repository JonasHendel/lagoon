//Npm
import { createContext, useReducer, useEffect } from 'react';

//Project files
import reducers from './Reducers';
import { getData } from '../utils/fetchData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, lessons: {}, detail: {} };

  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(()=>{
    getData('calendar').then((res)=>{
      dispatch({type: 'ADD_LESSONS', payload: res.lessons})
      dispatch({type: 'ADD_EVENTS', payload: res.events})
    })
  },[])

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
