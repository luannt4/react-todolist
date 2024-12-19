import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import ProductReviewRating from "./product-review-rating";
import {Review} from "../../../types/Product";


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
interface Props {
  description : string | undefined;
  reviews: Review[]| undefined;
}

const ProductDetailsTab: React.FC<Props> = ({ description, reviews }) => {
  let [tabHeading] = useState({
    Product_Details: '',
    Review_Rating: '',
  });

  return (
    <div className="w-full  bg-white rounded mb-8 lg:mb-12">
      <TabGroup>
        <TabList className="block border-b border-border-base">
          {Object.keys(tabHeading).map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                classNames(
                  'relative inline-block transition-all text-14px font-bold uppercase leading-5  focus:outline-none pb-4 hover:text-blue-500 mr-8 ',
                  selected
                    ? 'text-brand-dark  after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:left-0  after:bg-blue-500'
                    : 'text-gray-400'
                )
              }
            >
              {item.split('_').join(' ')}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-6 lg:mt-9">
          <TabPanel className="lg:flex">
            <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
              <p>{description}</p>
              <p>
                Go sporty this summer with this vintage navy and white striped
                v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing
                with denim and white kicks for a stylish sporty vibe. Will fit a
                UK 8-10, model shown is a UK 8 and 5’5. !!
              </p>
              <p>
                Typography is the work of typesetters, compositors,
                typographers, graphic designers, art directors, manga artists,
                comic book artists, graffiti artists, and now—anyone who
                arranges words, letters, numbers, and symbols for publication,
                display, or distribution—from clerical workers and newsletter
                writers to anyone self-publishing materials.
              </p>
              <p>
                Hit your next boxing workout with a combination it’s never seen
                before in the Combat Drop Arm Tank, including a
                freedom-instilling regular fit and dropped armhole to allow you
                to throw jabs and hooks at the punching bag with ease. A
                lightweight material keeps you fighting fit, and fresh.
              </p>
              <p>
                Go sporty this summer with this vintage navy and white striped
                v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing
                with denim and white kicks for a stylish sporty vibe. Will fit a
                UK 8-10, model shown is a UK 8 and 5’5. !!
              </p>
            </div>
          
          </TabPanel>
          <TabPanel>
            <ProductReviewRating reviews={reviews}/>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
export default ProductDetailsTab;