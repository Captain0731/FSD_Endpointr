// In-memory product data
let products = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
    { id: 2, name: 'Smartphone', price: 499.99, description: 'Latest smartphone model' }
];

exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }

    res.json(product);
};

exports.createProduct = (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        throw error;
    }

    products[productIndex] = { ...products[productIndex], ...req.body };
    res.json(products[productIndex]);
};

exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.json({ message: 'Product deleted successfully' });
};
