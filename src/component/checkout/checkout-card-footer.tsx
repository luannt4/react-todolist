type FooterItemProps = {
  id: string;
  name: string;
  price: string;
};
export const CheckoutCardFooter: React.FC<{ item: FooterItemProps }> = ({
  item,
}) => {
  return (
    <div className="flex items-center w-full py-4 text-sm font-medium lg:py-3 border-border-base text-base text-brand-dark last:border-b-0 last:text-base last:pb-0">
      {item.name}
      <span className="font-medium ml-auto rtl:mr-auto shrink-0 text-base text-brand-dark">
        {item.price}
      </span>
    </div>
  );
};
