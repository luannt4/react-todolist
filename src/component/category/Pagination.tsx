import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { PaginationState } from '../../types/Product';

interface PaginationProps {
    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export const CustomPagination: React.FC<PaginationProps> = ({
                                                                pagination,
                                                                setPagination
                                                            }) => {
    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    return (
        <Pagination
            current={pagination.currentPage}
            total={pagination.totalItems}
            pageSize={pagination.pageSize}
            onChange={handlePageChange}
            className="flex justify-center my-4"
        />
    );
};