import { useQuery } from "@tanstack/react-query";
import { fetchUserAddress } from "../../api/fetchUserAddress";
import { UserAddress } from "../../types/Product";
import { useAppSelector } from "../../hooks";

const AddressPage: React.FC = () => {
	const { isLoggedIn, user } = useAppSelector((state) => state.auth);
	const userId = user?.id;
	const { data} = useQuery<UserAddress>({
        queryKey: ['userAddress', userId],
        queryFn: () => fetchUserAddress(userId!),
        enabled: !!userId, // Chỉ gọi API khi có từ khóa
    });
    return (
        <>
			{isLoggedIn &&  (
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