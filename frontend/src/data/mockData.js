// Mock data for the MarketMind AI platform
// This simulates backend API responses for all modules

export const kpiData = {
  totalSales: { value: 1245320, change: 12.5, period: 'vs last week' },
  totalProfit: { value: 235450, change: 8.4, period: 'vs last week' },
  inventoryValue: { value: 875230, change: 6.7, period: 'vs last week' },
  lowStockItems: { value: 23, change: 12.5, period: 'vs last week', isNegativeGood: true },
};

export const salesOverviewData = [
  { month: 'Jan', sales: 420000, profit: 85000 },
  { month: 'Feb', sales: 380000, profit: 72000 },
  { month: 'Mar', sales: 510000, profit: 98000 },
  { month: 'Apr', sales: 470000, profit: 91000 },
  { month: 'May', sales: 560000, profit: 110000 },
  { month: 'Jun', sales: 620000, profit: 125000 },
  { month: 'Jul', sales: 590000, profit: 115000 },
  { month: 'Aug', sales: 680000, profit: 138000 },
  { month: 'Sep', sales: 720000, profit: 148000 },
  { month: 'Oct', sales: 690000, profit: 140000 },
  { month: 'Nov', sales: 780000, profit: 162000 },
  { month: 'Dec', sales: 850000, profit: 178000 },
];

export const salesByCategoryData = [
  { name: 'Electronics', value: 39, color: '#6366f1' },
  { name: 'Home Appliances', value: 25, color: '#10b981' },
  { name: 'Fashion', value: 20, color: '#f59e0b' },
  { name: 'Groceries', value: 12, color: '#0ea5e9' },
  { name: 'Others', value: 4, color: '#94a3b8' },
];

export const topSellingProducts = [
  { id: 1, name: 'Smartphone Pro X', category: 'Electronics', sales: 135450, growth: 15.2 },
  { id: 2, name: 'Laptop UltraBook', category: 'Electronics', sales: 175320, growth: 10.3 },
  { id: 3, name: 'Washing Machine Z1', category: 'Home Appliances', sales: 125000, growth: 8.7 },
  { id: 4, name: 'Air Conditioner Plus', category: 'Home Appliances', sales: 115450, growth: 7.1 },
  { id: 5, name: 'Designer T-Shirt', category: 'Fashion', sales: 85600, growth: 5.4 },
];

export const aiRecommendation = {
  title: 'Demand Forecast',
  text: 'Demand for Air Conditioners is likely to increase by 18% next month based on seasonal patterns and current sales trends. Consider increasing inventory levels.',
  confidence: 92,
};

// Sales Page Data
export const salesTransactions = [
  { id: 'TXN001', date: '2026-07-28', customer: 'Rajesh Kumar', product: 'Smartphone Pro X', quantity: 2, amount: 89990, status: 'completed', paymentMode: 'UPI' },
  { id: 'TXN002', date: '2026-07-28', customer: 'Priya Sharma', product: 'Laptop UltraBook', quantity: 1, amount: 75499, status: 'completed', paymentMode: 'Card' },
  { id: 'TXN003', date: '2026-07-27', customer: 'Amit Patel', product: 'Washing Machine Z1', quantity: 1, amount: 32000, status: 'completed', paymentMode: 'Cash' },
  { id: 'TXN004', date: '2026-07-27', customer: 'Sneha Reddy', product: 'Air Conditioner Plus', quantity: 1, amount: 45000, status: 'pending', paymentMode: 'EMI' },
  { id: 'TXN005', date: '2026-07-26', customer: 'Vikram Singh', product: 'Designer T-Shirt', quantity: 5, amount: 7495, status: 'completed', paymentMode: 'Card' },
  { id: 'TXN006', date: '2026-07-26', customer: 'Anita Verma', product: 'Bluetooth Speaker', quantity: 3, amount: 8997, status: 'completed', paymentMode: 'UPI' },
  { id: 'TXN007', date: '2026-07-25', customer: 'Suresh Nair', product: 'Smart Watch Elite', quantity: 2, amount: 15998, status: 'refunded', paymentMode: 'Card' },
  { id: 'TXN008', date: '2026-07-25', customer: 'Meera Joshi', product: 'Kitchen Mixer Pro', quantity: 1, amount: 4500, status: 'completed', paymentMode: 'Cash' },
  { id: 'TXN009', date: '2026-07-24', customer: 'Deepak Gupta', product: 'LED TV 55"', quantity: 1, amount: 54999, status: 'completed', paymentMode: 'EMI' },
  { id: 'TXN010', date: '2026-07-24', customer: 'Kavitha Rao', product: 'Running Shoes', quantity: 2, amount: 6998, status: 'completed', paymentMode: 'UPI' },
];

export const monthlySalesData = [
  { month: 'Jan', revenue: 980000, transactions: 245 },
  { month: 'Feb', revenue: 870000, transactions: 212 },
  { month: 'Mar', revenue: 1120000, transactions: 287 },
  { month: 'Apr', revenue: 1050000, transactions: 268 },
  { month: 'May', revenue: 1200000, transactions: 310 },
  { month: 'Jun', revenue: 1350000, transactions: 342 },
  { month: 'Jul', revenue: 1245320, transactions: 328 },
];

// Inventory Page Data
export const inventoryItems = [
  { id: 1, name: 'Smartphone Pro X', category: 'Electronics', sku: 'EL-SPX-001', price: 44995, stock: 45, minStock: 20, status: 'in-stock', lastUpdated: '2026-07-28' },
  { id: 2, name: 'Laptop UltraBook', category: 'Electronics', sku: 'EL-LUB-002', price: 75499, stock: 18, minStock: 15, status: 'in-stock', lastUpdated: '2026-07-28' },
  { id: 3, name: 'Washing Machine Z1', category: 'Home Appliances', sku: 'HA-WMZ-003', price: 32000, stock: 12, minStock: 10, status: 'in-stock', lastUpdated: '2026-07-27' },
  { id: 4, name: 'Air Conditioner Plus', category: 'Home Appliances', sku: 'HA-ACP-004', price: 45000, stock: 5, minStock: 10, status: 'low-stock', lastUpdated: '2026-07-27' },
  { id: 5, name: 'Designer T-Shirt', category: 'Fashion', sku: 'FA-DTS-005', price: 1499, stock: 120, minStock: 50, status: 'in-stock', lastUpdated: '2026-07-28' },
  { id: 6, name: 'Bluetooth Speaker', category: 'Electronics', sku: 'EL-BTS-006', price: 2999, stock: 3, minStock: 15, status: 'low-stock', lastUpdated: '2026-07-26' },
  { id: 7, name: 'Smart Watch Elite', category: 'Electronics', sku: 'EL-SWE-007', price: 7999, stock: 28, minStock: 20, status: 'in-stock', lastUpdated: '2026-07-28' },
  { id: 8, name: 'Kitchen Mixer Pro', category: 'Home Appliances', sku: 'HA-KMP-008', price: 4500, stock: 0, minStock: 8, status: 'out-of-stock', lastUpdated: '2026-07-25' },
  { id: 9, name: 'LED TV 55"', category: 'Electronics', sku: 'EL-TV5-009', price: 54999, stock: 8, minStock: 5, status: 'in-stock', lastUpdated: '2026-07-27' },
  { id: 10, name: 'Running Shoes', category: 'Fashion', sku: 'FA-RSH-010', price: 3499, stock: 2, minStock: 20, status: 'low-stock', lastUpdated: '2026-07-26' },
  { id: 11, name: 'Wireless Earbuds', category: 'Electronics', sku: 'EL-WEB-011', price: 1999, stock: 0, minStock: 25, status: 'out-of-stock', lastUpdated: '2026-07-24' },
  { id: 12, name: 'Rice Cooker Auto', category: 'Home Appliances', sku: 'HA-RCA-012', price: 3200, stock: 35, minStock: 15, status: 'in-stock', lastUpdated: '2026-07-28' },
];

// Customers Page Data
export const customers = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91 98765 43210', address: 'Mumbai, Maharashtra', totalPurchases: 12, totalSpent: 245000, lastPurchase: '2026-07-28', joinDate: '2025-03-15', status: 'active' },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 87654 32109', address: 'Delhi, NCR', totalPurchases: 8, totalSpent: 189500, lastPurchase: '2026-07-28', joinDate: '2025-05-22', status: 'active' },
  { id: 3, name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+91 76543 21098', address: 'Ahmedabad, Gujarat', totalPurchases: 15, totalSpent: 312000, lastPurchase: '2026-07-27', joinDate: '2025-01-10', status: 'active' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 65432 10987', address: 'Hyderabad, Telangana', totalPurchases: 6, totalSpent: 125000, lastPurchase: '2026-07-27', joinDate: '2025-08-05', status: 'active' },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 54321 09876', address: 'Jaipur, Rajasthan', totalPurchases: 3, totalSpent: 45000, lastPurchase: '2026-07-26', joinDate: '2026-02-14', status: 'active' },
  { id: 6, name: 'Anita Verma', email: 'anita.verma@email.com', phone: '+91 43210 98765', address: 'Pune, Maharashtra', totalPurchases: 9, totalSpent: 178000, lastPurchase: '2026-07-26', joinDate: '2025-06-30', status: 'active' },
  { id: 7, name: 'Suresh Nair', email: 'suresh.nair@email.com', phone: '+91 32109 87654', address: 'Kochi, Kerala', totalPurchases: 2, totalSpent: 32000, lastPurchase: '2026-07-25', joinDate: '2026-04-18', status: 'inactive' },
  { id: 8, name: 'Meera Joshi', email: 'meera.joshi@email.com', phone: '+91 21098 76543', address: 'Bangalore, Karnataka', totalPurchases: 11, totalSpent: 267000, lastPurchase: '2026-07-25', joinDate: '2025-02-28', status: 'active' },
  { id: 9, name: 'Deepak Gupta', email: 'deepak.gupta@email.com', phone: '+91 10987 65432', address: 'Lucknow, Uttar Pradesh', totalPurchases: 7, totalSpent: 156000, lastPurchase: '2026-07-24', joinDate: '2025-09-12', status: 'active' },
  { id: 10, name: 'Kavitha Rao', email: 'kavitha.rao@email.com', phone: '+91 09876 54321', address: 'Chennai, Tamil Nadu', totalPurchases: 4, totalSpent: 67000, lastPurchase: '2026-07-24', joinDate: '2026-01-05', status: 'inactive' },
];

export const customerPurchaseHistory = [
  { id: 'PH001', date: '2026-07-28', product: 'Smartphone Pro X', quantity: 2, amount: 89990 },
  { id: 'PH002', date: '2026-07-15', product: 'Smart Watch Elite', quantity: 1, amount: 7999 },
  { id: 'PH003', date: '2026-06-28', product: 'Bluetooth Speaker', quantity: 1, amount: 2999 },
  { id: 'PH004', date: '2026-06-10', product: 'Wireless Earbuds', quantity: 2, amount: 3998 },
  { id: 'PH005', date: '2026-05-22', product: 'LED TV 55"', quantity: 1, amount: 54999 },
];

// AI Insights Page Data
export const demandForecasts = [
  { id: 1, product: 'Air Conditioner Plus', category: 'Home Appliances', currentDemand: 45, forecastedDemand: 53, changePercent: 18, confidence: 92, period: 'Next Month', trend: 'up' },
  { id: 2, product: 'Smartphone Pro X', category: 'Electronics', currentDemand: 120, forecastedDemand: 138, changePercent: 15, confidence: 88, period: 'Next Month', trend: 'up' },
  { id: 3, product: 'Designer T-Shirt', category: 'Fashion', currentDemand: 200, forecastedDemand: 240, changePercent: 20, confidence: 85, period: 'Next Month', trend: 'up' },
  { id: 4, product: 'Washing Machine Z1', category: 'Home Appliances', currentDemand: 30, forecastedDemand: 25, changePercent: -17, confidence: 79, period: 'Next Month', trend: 'down' },
  { id: 5, product: 'Laptop UltraBook', category: 'Electronics', currentDemand: 55, forecastedDemand: 62, changePercent: 13, confidence: 91, period: 'Next Month', trend: 'up' },
  { id: 6, product: 'Running Shoes', category: 'Fashion', currentDemand: 80, forecastedDemand: 95, changePercent: 19, confidence: 82, period: 'Next Month', trend: 'up' },
];

export const salesPredictions = [
  { month: 'Aug 2026', predicted: 890000, lower: 820000, upper: 960000 },
  { month: 'Sep 2026', predicted: 920000, lower: 840000, upper: 1000000 },
  { month: 'Oct 2026', predicted: 980000, lower: 890000, upper: 1070000 },
  { month: 'Nov 2026', predicted: 1120000, lower: 1010000, upper: 1230000 },
  { month: 'Dec 2026', predicted: 1350000, lower: 1200000, upper: 1500000 },
];

export const aiInsights = [
  {
    id: 1,
    type: 'opportunity',
    title: 'Revenue Growth Opportunity',
    description: 'Electronics category shows consistent 15% month-over-month growth. Consider expanding product range in this category.',
    impact: 'High',
    metric: '₹2.4L potential revenue',
    icon: '📈',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low Stock Alert',
    description: '3 products are below minimum stock levels. Immediate restocking recommended to avoid stockouts.',
    impact: 'Critical',
    metric: '3 products at risk',
    icon: '⚠️',
  },
  {
    id: 3,
    type: 'trend',
    title: 'Seasonal Demand Pattern',
    description: 'Historical data suggests 25% increase in Home Appliances during monsoon season (Jul-Sep). Plan inventory accordingly.',
    impact: 'Medium',
    metric: '+25% seasonal demand',
    icon: '🌧️',
  },
  {
    id: 4,
    type: 'suggestion',
    title: 'Customer Retention Insight',
    description: 'Customers who purchase electronics are 40% more likely to return within 3 months. Consider targeted follow-up campaigns.',
    impact: 'Medium',
    metric: '40% return rate',
    icon: '🎯',
  },
  {
    id: 5,
    type: 'opportunity',
    title: 'Bundle Opportunity',
    description: 'Smartphone + Smart Watch combinations show 60% co-purchase rate. Create bundle deals for higher average order value.',
    impact: 'High',
    metric: '60% co-purchase rate',
    icon: '🔗',
  },
  {
    id: 6,
    type: 'trend',
    title: 'Price Sensitivity Analysis',
    description: 'Products priced between ₹2,000-₹5,000 have the highest conversion rate at 78%. Optimize pricing strategy for this range.',
    impact: 'Low',
    metric: '78% conversion rate',
    icon: '💰',
  },
];

export const forecastChartData = [
  { month: 'Jan', actual: 420000 },
  { month: 'Feb', actual: 380000 },
  { month: 'Mar', actual: 510000 },
  { month: 'Apr', actual: 470000 },
  { month: 'May', actual: 560000 },
  { month: 'Jun', actual: 620000 },
  { month: 'Jul', actual: 590000 },
  { month: 'Aug', actual: null, forecast: 680000 },
  { month: 'Sep', actual: null, forecast: 720000 },
  { month: 'Oct', actual: null, forecast: 780000 },
  { month: 'Nov', actual: null, forecast: 850000 },
  { month: 'Dec', actual: null, forecast: 920000 },
];

// Reports Page Data
export const reportCategories = [
  { id: 'sales', name: 'Sales Report', description: 'Complete sales analysis with trends, top products, and revenue breakdown', icon: '📊' },
  { id: 'inventory', name: 'Inventory Report', description: 'Stock levels, movement analysis, and reorder recommendations', icon: '📦' },
  { id: 'customer', name: 'Customer Report', description: 'Customer demographics, purchase patterns, and retention metrics', icon: '👥' },
  { id: 'financial', name: 'Financial Report', description: 'Revenue, profit margins, expenses, and financial projections', icon: '💹' },
  { id: 'ai-insights', name: 'AI Insights Report', description: 'Machine learning predictions, forecasts, and automated recommendations', icon: '🤖' },
  { id: 'performance', name: 'Performance Report', description: 'Business KPIs, targets vs actuals, and growth metrics', icon: '🎯' },
];

export const recentReports = [
  { id: 1, name: 'Monthly Sales Summary - July 2026', type: 'Sales Report', generatedAt: '2026-07-28 09:30', format: 'PDF', size: '2.4 MB' },
  { id: 2, name: 'Inventory Status Report', type: 'Inventory Report', generatedAt: '2026-07-27 14:15', format: 'CSV', size: '856 KB' },
  { id: 3, name: 'Customer Analytics Q2 2026', type: 'Customer Report', generatedAt: '2026-07-25 11:00', format: 'PDF', size: '3.1 MB' },
  { id: 4, name: 'Weekly Sales Trends', type: 'Sales Report', generatedAt: '2026-07-24 16:45', format: 'PDF', size: '1.8 MB' },
  { id: 5, name: 'AI Demand Forecast - August 2026', type: 'AI Insights Report', generatedAt: '2026-07-22 10:00', format: 'PDF', size: '2.7 MB' },
];

export const categories = [
  { id: 1, name: 'Electronics', description: 'Smartphones, laptops, gadgets', productCount: 42 },
  { id: 2, name: 'Home Appliances', description: 'Kitchen, cleaning, cooling', productCount: 28 },
  { id: 3, name: 'Fashion', description: 'Clothing, footwear, accessories', productCount: 65 },
  { id: 4, name: 'Groceries', description: 'Food items, daily essentials', productCount: 120 },
  { id: 5, name: 'Others', description: 'Miscellaneous products', productCount: 18 },
];

// Revenue by category for reports chart
export const revenueByCategoryMonthly = [
  { month: 'Jan', Electronics: 180000, HomeAppliances: 95000, Fashion: 85000, Groceries: 40000, Others: 20000 },
  { month: 'Feb', Electronics: 160000, HomeAppliances: 88000, Fashion: 78000, Groceries: 38000, Others: 16000 },
  { month: 'Mar', Electronics: 220000, HomeAppliances: 110000, Fashion: 100000, Groceries: 52000, Others: 28000 },
  { month: 'Apr', Electronics: 195000, HomeAppliances: 105000, Fashion: 92000, Groceries: 48000, Others: 30000 },
  { month: 'May', Electronics: 240000, HomeAppliances: 120000, Fashion: 110000, Groceries: 55000, Others: 35000 },
  { month: 'Jun', Electronics: 265000, HomeAppliances: 145000, Fashion: 118000, Groceries: 58000, Others: 34000 },
  { month: 'Jul', Electronics: 250000, HomeAppliances: 138000, Fashion: 112000, Groceries: 56000, Others: 34000 },
];

// Helper function to format currency in Indian Rupees
export const formatCurrency = (value) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  } else if (value >= 1000) {
    return `₹${value.toLocaleString('en-IN')}`;
  }
  return `₹${value}`;
};

export const formatNumber = (value) => {
  return value.toLocaleString('en-IN');
};
