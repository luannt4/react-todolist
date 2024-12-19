import React, { FC } from 'react';


import ReviewCard from "../../cards/review-card";
import {Review} from "../../../types/Product";

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

interface Props {
  reviews: Review[]| undefined;
}
const ProductReviewRating: React.FC<Props> = ({reviews}) => {
  return (
      <div className="block">
        {reviews?.map((item: any, id: number) => (
            <ReviewCard item={item} key={`review-key-${id}`}/>
        ))}
      </div>
  );
};

export default ProductReviewRating;
