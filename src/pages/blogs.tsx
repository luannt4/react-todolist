import Container from "../component/ui/container";
import {useFilter} from "../hooks/useFilters";

import {Filters} from "../component/category/filters";
import Pagination from "../component/ui/pagination";

import React, {useEffect, useState} from "react";
import {useProductQuery} from "../hooks/useProductQuery";
import {CustomPagination} from "../component/category/Pagination";
import {ProductList} from "../component/category/ProductList";
import {useLocation, useSearchParams} from "react-router-dom";
import useQueryParam from "../utils/use-query-params";
import {LIMITS} from "../settings/limits";
import {useQuery} from "@tanstack/react-query";
import {SearchResponse} from "../types/Product";
import {fetchProductNewProduct} from "../api/fetchProductNewProduct";

const BlogsPage = () => {
    
    
    return (
        <>
            <Container>
                <h1 className="text-2xl font-medium mb-6 capitalize">Blog Articles</h1>
                <div className="flex pb-10 gap-10">
                    <div className="sticky hidden h-full shrink-0 ltr:pr-7 rtl:pl-7  lg:block w-[250px] top-16 ">
                        <Filters />
                    </div>
                    <div className="w-full">
                    
                    </div>
                </div>
            </Container>
        </>
    );
};

export default BlogsPage;
  