import type { FC } from 'react';


import ReviewCard from "../../cards/review-card";

const data = [
  {
    id: 1,
    rating: 4,
    title: 'Amazing Service & Packaging',
    description:
      'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
    author: 'Kavin Dustin',
  },
  {
    id: 2,
    rating: 5,
    title: 'Promising Quality & Fast Delivery',
    description:
      'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
    author: 'Milly Jacsion',
  },
  {
    id: 3,
    rating: 3,
    title: 'Late Delivery service',
    description:
      'Go sporty this summer with this vintage navy and white striped v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing with denim and white kicks for a stylish sporty vibe. Will fit a UK 8-10, model shown Go sporty this summer with this vintage navy and white striped v-neck t-shirt.',
    author: 'Kavin Dustin',
  },
];

const ProductReviewRating: FC = () => {
  return (
    <div className="lg:flex">
      <div className="pt-2">
        {data?.map((item) => (
          <ReviewCard item={item} key={`review-key-${item.id}`} />
        ))}
      </div>
      
    </div>
  );
};

export default ProductReviewRating;
