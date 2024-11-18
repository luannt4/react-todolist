import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchUserAddress } from "../../api/fetchUserAddress";
import { UserAddress } from "../../types/Product";
import LoginForm from "../auth/LoginForm";
import { useAuth } from "../../contexts";

const AddressPage: React.FC = () => {
	const { logout, user } = useAuth();
	const userId = user?.id;
	const { data, isLoading, isError} = useQuery<UserAddress>({
        queryKey: ['userAddress', userId],
        queryFn: () => fetchUserAddress(userId!),
        enabled: !!userId, // Chỉ gọi API khi có từ khóa
    });
    return (
        <>
			{user &&  (
				<div className="border-border-base border-2 relative p-5  rounded-md w-96">
					<h2 className="text-sm  font-semibold mb-4">Home</h2>
					<div className="space-y-2 text-sm">
						<p className="text-gray-700">
						<strong>Name:</strong> {data?.firstName} {data?.lastName}
						</p>
						<p className="text-gray-700">
						<strong>Address:</strong> {data?.address.address}
						</p>
						<p className="text-gray-700">
						<strong>City:</strong> {data?.address.city}
						</p>
						<p className="text-gray-700">
						<strong>State:</strong> {data?.address.state}
						</p>
						<p className="text-gray-700">
						<strong>Postal Code:</strong> {data?.address.postalCode}
						</p>
					</div>
				</div>
			)}
            
        </>
      );
}
export default AddressPage;