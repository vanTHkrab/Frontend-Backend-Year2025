import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle, Upload, Zap, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FadeInUp, ScaleIn } from '@/components/motion/MotionWrappers';

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
    const [step, setStep] = useState(1);
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

    async function onSubmit(values: ProductFormValues) {
        setLoading(true);

        try {
            const res = await fetch(`${API}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            if (res.status === 201) {
                toast.success('Product added successfully!', {
                    description: `${values.name} has been added to your store.`,
                });
                form.reset();
                setStep(1);
                // Navigate back to products page after a short delay
                setTimeout(() => navigate('/'), 1500);
            } else {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to add product');
            }
        } catch (error: any) {
            toast.error('Failed to add product', {
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const getStepProgress = () => (step / 3) * 100;

    const canProceedToStep2 = watchedValues.id && watchedValues.name && watchedValues.price > 0;
    const canProceedToStep3 = canProceedToStep2 && watchedValues.category;
    const canSubmit = canProceedToStep3 && watchedValues.description;

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Back Button */}
            <FadeInUp>
                <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Button asChild variant="ghost" size="sm" className="rounded-full">
                        <Link to="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Store
                        </Link>
                    </Button>
                </motion.div>
            </FadeInUp>

            {/* Header */}
            <FadeInUp delay={0.1}>
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                        className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-2xl flex items-center justify-center"
                    >
                        <Plus className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Add New Tech Product
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Expand your tech collection with cutting-edge products
                    </p>
                </div>
            </FadeInUp>

            {/* Progress Indicator */}
            <FadeInUp delay={0.2}>
                <div className="max-w-md mx-auto space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Step {step} of 3</span>
                        <span>{Math.round(getStepProgress())}% complete</span>
                    </div>
                    <Progress value={getStepProgress()} className="h-2" />
                    <div className="flex items-center justify-center space-x-4">
                        {[1, 2, 3].map((stepNumber) => (
                            <div key={stepNumber} className="flex items-center">
                                <motion.div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                                        step >= stepNumber
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    animate={step === stepNumber ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                >
                                    {stepNumber}
                                </motion.div>
                                {stepNumber < 3 && (
                                    <div className={`w-12 h-1 mx-2 rounded-full transition-all ${
                                        step > stepNumber ? 'bg-primary' : 'bg-muted'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </FadeInUp>

            {/* Form Card */}
            <ScaleIn delay={0.3}>
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden"
                        layout
                    >
                        <div className="p-6 md:p-8">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Step 1: Basic Information */}
                                    {step === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-center mb-6">
                                                <Package className="w-10 h-10 mx-auto mb-3 text-primary" />
                                                <h2 className="text-xl md:text-2xl font-bold mb-2">Basic Information</h2>
                                                <p className="text-muted-foreground text-sm md:text-base">Essential product details</p>
                                            </div>

                                            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                                                <FormField
                                                    control={form.control}
                                                    name="id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Product ID *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="e.g., TECH-001"
                                                                    className="h-11 md:h-12"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Unique identifier for this product
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
                                                            <FormLabel>Product Name *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="e.g., MacBook Pro 16-inch"
                                                                    className="h-11 md:h-12"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Full product name with model
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="price"
                                                    render={({ field }) => (
                                                        <FormItem className="md:col-span-2">
                                                            <FormLabel>Price ($) *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    placeholder="0.00"
                                                                    className="h-11 md:h-12"
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
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Category & Images */}
                                    {step === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-center mb-6">
                                                <Zap className="w-10 h-10 mx-auto mb-3 text-primary" />
                                                <h2 className="text-xl md:text-2xl font-bold mb-2">Category & Visuals</h2>
                                                <p className="text-muted-foreground text-sm md:text-base">Product classification and images</p>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Category *</FormLabel>
                                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
                                                            {techCategories.map((category) => (
                                                                <motion.button
                                                                    key={category}
                                                                    type="button"
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    onClick={() => field.onChange(category)}
                                                                    className={`p-2 md:p-3 rounded-lg border text-xs md:text-sm font-medium transition-all ${
                                                                        field.value === category
                                                                            ? 'bg-primary text-primary-foreground border-primary'
                                                                            : 'bg-background border-border hover:border-primary/50'
                                                                    }`}
                                                                >
                                                                    {category}
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="imageUrl"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Product Image URL</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                                <Input
                                                                    type="url"
                                                                    placeholder="https://example.com/product-image.jpg"
                                                                    className="pl-10 h-11 md:h-12"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormDescription>
                                                            Optional: URL to product image
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </motion.div>
                                    )}

                                    {/* Step 3: Description & Review */}
                                    {step === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-center mb-6">
                                                <CheckCircle className="w-10 h-10 mx-auto mb-3 text-primary" />
                                                <h2 className="text-xl md:text-2xl font-bold mb-2">Final Details</h2>
                                                <p className="text-muted-foreground text-sm md:text-base">Product description and review</p>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Product Description *</FormLabel>
                                                        <FormControl>
                                                            <textarea
                                                                rows={4}
                                                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                                                placeholder="Describe your tech product features, specifications, and benefits..."
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

                                            {/* Product Preview */}
                                            <div className="bg-secondary/20 rounded-lg p-4 md:p-6">
                                                <h3 className="font-semibold mb-4">Product Preview</h3>
                                                <div className="grid gap-3 md:gap-4 md:grid-cols-2 text-sm">
                                                    <div className="space-y-2">
                                                        <p><strong>Name:</strong> {watchedValues.name || 'Product Name'}</p>
                                                        <p><strong>Price:</strong> ${watchedValues.price?.toFixed(2) || '0.00'}</p>
                                                        <p><strong>Category:</strong> {watchedValues.category || 'Not selected'}</p>
                                                        <p><strong>ID:</strong> {watchedValues.id || 'Product ID'}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p><strong>Description:</strong></p>
                                                        <p className="text-muted-foreground">
                                                            {watchedValues.description || 'No description provided'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Navigation Buttons */}
                                    <div className="flex flex-col-reverse md:flex-row justify-between gap-4 pt-6 border-t border-border">
                                        <div>
                                            {step > 1 && (
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={prevStep}
                                                        className="w-full md:w-auto"
                                                    >
                                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                                        Previous
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            {step < 3 ? (
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Button
                                                        type="button"
                                                        onClick={nextStep}
                                                        disabled={
                                                            (step === 1 && !canProceedToStep2) ||
                                                            (step === 2 && !canProceedToStep3)
                                                        }
                                                        className="w-full md:w-auto px-6"
                                                    >
                                                        Next Step
                                                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                                                    </Button>
                                                </motion.div>
                                            ) : (
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Button
                                                        type="submit"
                                                        disabled={loading || !canSubmit}
                                                        className="w-full md:w-auto px-8 bg-gradient-to-r from-primary to-primary/80"
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <motion.div
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                                                                />
                                                                Adding...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Add to Store
                                                            </>
                                                        )}
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </motion.div>
                </div>
            </ScaleIn>
        </div>
    );
}