
import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function createQueryString(queryObj: any) {
  let path = [];
  for (const [key, value] of Object.entries(queryObj)) {
    path.push(`${key}=${value}`);
  }
  return path.join('&').toString();
}

const queryAtom = atom('');

export default function useQueryParam(pathname: string = '/') {
  const [query, setQuery] = useAtom(queryAtom);
  const navigate = useNavigate(); // React Router's navigate function
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const l = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(l);
  }, [query]);
  
  const clearQueryParam = (key: string[]) => {
    let url = new URL(window.location.href);
    key.forEach((item) => url.searchParams.delete(item));
    setQuery(url.search);
    navigate(`${pathname}${url.search}`); // Navigate to the new URL
  };
  
  const setQueryparams = (data: any) => {
    let queryString = '';
    if (typeof data !== 'string') {
      queryString = createQueryString(data);// Convert object to query string
    }
    setQuery(queryString); // Update the query atom
  };
  
  function getParams(url = window.location) {
    const params: any = {};
    // @ts-ignore
    new URL(url).searchParams.forEach(function (val: string, key: string) {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        params[key].push(val);
      } else {
        params[key] = val;
      }
    });
    return params;
  }
  
  const updateQueryparams = (key: string, value: string | number | boolean) => {
    if (!value) {
      clearQueryParam([key]);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set(key, value.toString());// Set the query parameter
    setQuery(url.search);// Update the query atom
    navigate(`${pathname}${url.search}`); // Navigate to the new URL
  };
  
  return {
    query,
    loading,
    getParams,
    setQueryparams,
    updateQueryparams,
    clearQueryParam,
  };
}
