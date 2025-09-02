import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle, Upload, Zap, Package, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const API = import.meta.env.VITE_API_URL as string;

const productSchema = z.object({
    id: z.string().min(1, 'Product ID is required').min(3, 'Product ID must be at least 3 characters'),
    name: z.string().min(1, 'Product name is required').min(2, 'Product name must be at least 2 characters'),
    price: z.number().min(0.01, 'Price must be greater than 0'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    imageUrl: z.string().optional().or(z.literal('')),
});

type ProductFormValues = z.infer<typeof productSchema>;

const techCategories = [
    "Laptops", "Smartphones", "Tablets", "Headphones", "Speakers",
    "Gaming", "Components", "Accessories", "Smart Home", "Wearables"
];

export default function AddPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            id: '',
            name: '',
            price: 0,
            category: '',
            description: '',
            imageUrl: '',
        },
    });

    const { watch } = form;
    const watchedValues = watch();

    // Calculate form completion percentage
    const getCompletionPercentage = () => {
        const fields = ['id', 'name', 'price', 'category', 'description'];
        const completed = fields.filter(field => {
            const value = watchedValues[field as keyof ProductFormValues];
            return value !== undefined && value !== '' && value !== 0;
        }).length;
        return Math.round((completed / fields.length) * 100);
    };

    const onSubmit = async (values: ProductFormValues) => {
        setLoading(true);
        try {
            const response = await fetch(`${API}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to create product');
            }

            toast.success('Product created successfully! 🎉', {
                description: 'Redirecting to product list...',
            });

            setTimeout(() => {
                navigate('/list');
            }, 1000);
        } catch (error) {
            toast.error('Failed to create product', {
                description: 'Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    const completionPercentage = getCompletionPercentage();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header with back button */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/list"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <div className="p-2 rounded-lg bg-card border group-hover:bg-accent transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Back to Products</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="glass-effect border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
                                        <Package className="w-6 h-6" />
                                        Add New Product
                                    </CardTitle>
                                    <p className="text-muted-foreground">
                                        Fill in the details below to create a new product in your store.
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            {/* Product ID and Name */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium">Product ID</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="e.g., LAPTOP001"
                                                                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Unique identifier for the product
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium">Product Name</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="e.g., MacBook Pro 16-inch"
                                                                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Display name for the product
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Price and Category */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="price"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium">Price ($)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    step="0.01"
                                                                    placeholder="0.00"
                                                                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Product price in USD
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="category"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium">Category</FormLabel>
                                                            <FormControl>
                                                                <select
                                                                    className="flex h-10 w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                                                                    {...field}
                                                                >
                                                                    <option value="">Select a category</option>
                                                                    {techCategories.map((category) => (
                                                                        <option key={category} value={category}>
                                                                            {category}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </FormControl>
                                                            <FormDescription>
                                                                Product category
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Description */}
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Enter a detailed description of the product..."
                                                                className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors min-h-[120px] resize-none"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Detailed product description (minimum 10 characters)
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Image URL */}
                                            <FormField
                                                control={form.control}
                                                name="imageUrl"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                                                            <Upload className="w-4 h-4" />
                                                            Image URL (Optional)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="https://example.com/image.jpg"
                                                                className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            URL to the product image
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Submit Button */}
                                            <motion.div
                                                className="pt-4"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 h-auto flex items-center gap-2 transition-all duration-200"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            >
                                                                <Zap className="w-4 h-4" />
                                                            </motion.div>
                                                            Creating Product...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Plus className="w-4 h-4" />
                                                            Create Product
                                                        </>
                                                    )}
                                                </Button>
                                            </motion.div>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Progress sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-8"
                        >
                            <Card className="glass-effect border-border/50">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        Form Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Completion</span>
                                            <span className="font-medium">{completionPercentage}%</span>
                                        </div>
                                        <Progress
                                            value={completionPercentage}
                                            className="h-2"
                                        />
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-border/50">
                                        <p className="text-sm font-medium">Required Fields:</p>
                                        {[
                                            { key: 'id', label: 'Product ID', icon: Package },
                                            { key: 'name', label: 'Product Name', icon: Star },
                                            { key: 'price', label: 'Price', icon: Zap },
                                            { key: 'category', label: 'Category', icon: Package },
                                            { key: 'description', label: 'Description', icon: Star },
                                        ].map(({ key, label, icon: Icon }) => {
                                            const value = watchedValues[key as keyof ProductFormValues];
                                            const isCompleted = value !== undefined && value !== '' && value !== 0;

                                            return (
                                                <motion.div
                                                    key={key}
                                                    className="flex items-center gap-2 text-sm"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <motion.div
                                                        animate={{
                                                            scale: isCompleted ? 1.1 : 1,
                                                            rotate: isCompleted ? 360 : 0
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {isCompleted ? (
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                        ) : (
                                                            <Icon className="w-4 h-4 text-muted-foreground" />
                                                        )}
                                                    </motion.div>
                                                    <span className={isCompleted ? 'text-foreground' : 'text-muted-foreground'}>
                                                        {label}
                                                    </span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {completionPercentage === 100 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-center"
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                Ready to create!
                                            </p>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}