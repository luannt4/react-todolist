// components/Compare/CompareList.tsx
import React, { useState } from 'react';
import { clearCompare, removeFromCompare } from '../../features/compare/compareSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Container from '../ui/container';
import {  Link } from "react-router-dom";
import CompareCardPanel from './compare-cardPanel';
import { BsChevronDown } from 'react-icons/bs';
import cn from 'classnames';

const CompareBotomPanel: React.FC = () => {
    const compareList  = useAppSelector(state => state.compare.compareList);
    const dispatch = useAppDispatch();
    const [compareToggle, setCompareToogle] = useState(true);
    const compareOtherItem = 4 - compareList.length;
    
    const handleRemoveCompare = (id: number) => {
        dispatch(removeFromCompare(id));
    };

    const handleClearCompare = () => {
        dispatch(clearCompare());
    };

    const heandleToggleCompare = () => {
        setCompareToogle(!compareToggle);
    }
  
    return (
        <>
        {compareList.length && (
            <div className='fixed bottom-0 w-full backdrop-blur-sm z-40 bg-black/75'>
                <Container>
                    <button onClick={heandleToggleCompare} className="c-compare-toggle flex justify-center items-center p-2 text-center absolute start-1/2 -translate-x-1/2" data-comp-data-layer="" type="button" aria-expanded="true">
                        <BsChevronDown className={cn('text-white w-6 h-6',compareToggle && 'rotate-180')} />
                        <span className="sr-only">Compare</span>
                    </button>
                    <div className='text-sm flex justify-between text-white py-3'>
                        <div className="c-text-contents flex items-center">
                            Compare({compareList.length})
                        </div>
                        <div className="c-compare-action--button flex items-center space-x-4">
                            <div className=" button">
                                <button onClick={handleClearCompare} className="cmp-button c-button default white m-small w-small  c-button--text-underline "  type="button">
                                    <span className="cmp-button__text c-button__text ">Clear All</span>
                                </button>
                            </div>
                            <div className="c-cta button">
                                <Link  to="/compare"
                                    className="block leading-6 px-4 py-1 bg-blue-500 rounded-full  text-white text-sm font-medium items-center justify-center focus:outline-none focus-visible:outline-none"
                                >
                                    <span className="cmp-button__text c-button__text ">Compare</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {compareToggle && (
                        <div className="grid grid-cols-4 gap-5 mb-4">
                            {compareList.map((product) => (
                                <CompareCardPanel  
                                    key={product.id} 
                                    product={product}
                                    removeCompare={handleRemoveCompare} 
                                />
                            ))}

                            {/* Compare Item Empty*/}
                            {Array.from({ length: compareOtherItem }).map((_, id) => (
                                <div key={id} className="p-2  rounded-lg bg-orange-50 group"></div>
                            ))}


                        </div>
                    )}
                    
                </Container>
            </div>
        )}
        </>
    )
        
  };
  
  export default CompareBotomPanel;