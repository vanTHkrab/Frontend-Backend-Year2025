// src/components/ProductCard.js
import { memo } from 'react';
import Button from './Button';

interface Props {
    imageUrl: string;
    name: string;
    price: string;
    description: string;
    onAddToCart: () => void;
}

const ProductCard = ({ imageUrl, name, price, description, onAddToCart }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
          <Button onClick={onAddToCart}>
            เพิ่มลงตะกร้า
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);