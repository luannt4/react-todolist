import Scrollbar from '../ui/scrollbar';
import Heading from "../ui/heading";
import {useQuery} from "@tanstack/react-query";
import {fetchAllCategories} from "../../api/fetchCategories";
import {Category} from "../../types/Product";
import {useLocation, useSearchParams} from 'react-router-dom';
import {CheckBox} from "../ui/form/checkbox";
import React, {useEffect, useState} from "react";
import useQueryParam from "../../utils/use-query-params";

export const CategoryFilter = () => {
  
  return (
    <div className="block mb-10">
      <Heading className="mb-3 block-title">Categories</Heading>
      
    </div>
  );
};
