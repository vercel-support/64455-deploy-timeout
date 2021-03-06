import ProductRating from '@shop/components/Product/Rating';
import ProductStatus from '@shop/components/Product/Status';

const ProductInfoDetails = () => (
  <div className="uk-margin">
    <div className="uk-grid-small" uk-grid="true">
      {/* Rating */}
      <ProductRating />
      {/* Statuses */}
      <ProductStatus />
    </div>
  </div>
);

export default ProductInfoDetails;
