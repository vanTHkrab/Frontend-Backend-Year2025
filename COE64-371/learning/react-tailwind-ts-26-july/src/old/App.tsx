import { useState, useEffect, useCallback, useMemo } from 'react';
import ProductCard from './components/ProductCard';
import Alert from './components/Alert';
import './App.css'; // Assuming you have a CSS file for global styles

type Product = {
    id: number;
    name: string;
    price: string;
    description: string;
    imageUrl: string;
}

type AlertInfo = {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

const products: Product[] = [
    { id: 1, name: 'หูฟังไร้สาย Pro', price: '฿3,590', description: 'หูฟังตัดเสียงรบกวนคุณภาพสูงเพื่อประสบการณ์การฟังที่ดีที่สุด', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, name: 'กล้องดิจิทัล V-Series', price: '฿21,500', description: 'บันทึกทุกความทรงจำด้วยความละเอียดคมชัด 4K และดีไซน์สุดคลาสสิก', imageUrl: 'https://images.unsplash.com/photo-1510127034890-ba27e982b4e5?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, name: 'รองเท้าวิ่ง UltraBoost', price: '฿4,200', description: 'นุ่มสบายและตอบสนองได้ดีในทุกย่างก้าว เหมาะสำหรับนักวิ่งทุกระดับ', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2070&auto=format&fit=crop' },
];

function App() {
    const [alertInfo, setAlertInfo] = useState<AlertInfo>({ message: '', type: 'success' });
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        let timer: number | undefined;
        if (alertInfo.message) {
            timer = setTimeout(() => {
                setAlertInfo({ message: '', type: 'success' });
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [alertInfo.message]);

    const handleAddToCart = useCallback((productName: string) => {
        setAlertInfo({
            message: `เพิ่ม "${productName}" ลงในตะกร้าแล้ว!`,
            type: 'success',
        });
        setCartItemCount(prevCount => prevCount + 1);
    }, []);

    const handleCloseAlert = useCallback(() => {
        setAlertInfo({ message: '', type: 'success' });
    }, []);

    const totalValue = useMemo(() => {
        return products.reduce((total, product) => {
            const priceNumber = parseFloat(product.price.replace('฿', '').replace(',', ''));
            return total + priceNumber;
        }, 0);
    }, []); // Dependency เป็น products แต่เนื่องจากเป็นค่าคงที่นอก Component จึงใส่ [] ได้

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <nav className="bg-white shadow-md sticky top-0 z-40">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">SimpleShop</div>
                    <div className="text-lg">ตะกร้าสินค้า: <span className="font-bold text-blue-600">{cartItemCount}</span> ชิ้น</div>
                </div>
            </nav>

            <Alert
                message={alertInfo.message}
                type={alertInfo.type}
                onClose={handleCloseAlert}
            />

            <main className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    สินค้าแนะนำ
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            imageUrl={product.imageUrl}
                            onAddToCart={() => handleAddToCart(product.name)}
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-white mt-12 py-6">
                <div className="container mx-auto text-center text-gray-600">
                    <p className="font-bold text-lg">
                        มูลค่าสินค้ารวม (สำหรับแสดงผล): {totalValue.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                    </p>
                    <p className="mt-2">&copy; 2025 SimpleShop. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;