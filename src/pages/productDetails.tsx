import { Link, useParams } from "react-router-dom";
import {useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";

import Container from "../component/ui/container";

interface Props {
    product : Product;
}
const ProductDetailsPage = () => {
    return (
      <>
          <Container>
              <h1 className="text-2xl font-medium mb-6 capitalize">Product page</h1>
          </Container>
      </>
    );
  };
  
export default ProductDetailsPage;
  