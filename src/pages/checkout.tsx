import CheckoutDetails from "../component/checkout/checkout-detail";
import CheckoutSideBar from "../component/checkout/checkout-sidebar";
import Container from "../component/ui/container";
import  "../component/checkout/checkout.css"
const CheckoutPage = () => {
    return (
        <Container>
            <h1 className="text-2xl font-medium mb-6 capitalize">Checkout page</h1>
            <div className="flex flex-col mx-auto">
				<div className="flex flex-col lg:grid lg:grid-cols-12 grid-cols-1 flex-wrap gap-8">
					<div className="w-full col-start-1 col-end-10">
                        <CheckoutDetails/>
					</div>
					<div className="w-full mt-7 lg:mt-0 col-start-10 col-end-13">
						<CheckoutSideBar  />
					</div>
				</div>
            </div>
        </Container>
   )
};
  
export default CheckoutPage;
  