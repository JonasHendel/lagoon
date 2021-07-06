//Npm
import { createContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie'

//Project files
import reducers from './Reducers';
import { getData, postData } from '../utils/fetchData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {}, detail: {}, edit: true, event: {} };

  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(()=>{
    const firstLogin = localStorage.getItem("firstLogin")
    if(firstLogin){
      console.log(Cookies.get('refreshtoken'))
      postData('user/accessToken', {rf_token: Cookies.get('refreshtoken')}).then(res => {
        // if(res.err) return localStorage.removeItem("firstLogin")

        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user
          }
        })
      })
    }
 },[])

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
