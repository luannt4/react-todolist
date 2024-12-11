import { FilteredItem } from './filtered-item';
import {useNavigate, useLocation, useSearchParams} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import useQueryParam from "../../utils/use-query-params";
import Heading from "../ui/heading";

export default function SelectedFilters() {
    const navigate = useNavigate();
    // Get category query parameters
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation(); // Access the current location
    const { clearQueryParam, updateQueryparams } = useQueryParam(pathname ?? '/');
    const [state, setState] = useState({});
    
    useEffect(() => {
        setState({});
        searchParams?.forEach((value, key) => {
            if (value.includes(',')) {
                setState((prev) => {
                    return { ...prev, [key]: value.split(',') };
                });
            } else {
                setState((prev) => {
                    return { ...prev, [key]: value };
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);
    
    function handleArrayUpdate(key: string, item: string) {
        let o = searchParams?.get(key)?.split(',');
        if (o?.includes(item)) {
            updateQueryparams(key, o.filter((i) => i !== item).join(','));
        }
    }
    return (
        <>
            
                <div className="block mb-10 pb-5 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4 -mt-1">
                        <Heading>Filters</Heading>
                        {/* @ts-ignore */}
                        <button
                            className="flex-shrink transition duration-150 ease-in text-13px focus:outline-none hover:text-brand-dark"
                            aria-label="clear-all"
                            onClick={() => {
                                navigate(pathname);
                            }}
                        >
                            Clear all
                        </button>
                    </div>
                    {!isEmpty(searchParams?.toString()) && (
                    <div className="flex flex-wrap ">
                        {Object.entries(state).map(([key, value]) => {
                            if (Array.isArray(value)) {
                                return value.map((item) => (
                                    <FilteredItem
                                        itemKey={key ? key : ' '}
                                        key={item}
                                        itemValue={item as any}
                                        onClick={() => handleArrayUpdate(key, item)}
                                    />
                                ));
                            } else {
                                return (
                                    <FilteredItem
                                        itemKey={key ? key : ' '}
                                        key={key}
                                        itemValue={value as any}
                                        onClick={() => {
                                            clearQueryParam([key]);
                                        }}
                                    />
                                );
                            }
                        })}
                    </div>
                    )}
                </div>
          
        </>
    );
}
