// In-memory user data
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

exports.getAllUsers = (req, res) => {
    res.json(users);
};

exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    res.json(user);
};

exports.createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
};

exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(u => u.id !== id);
    res.json({ message: 'User deleted successfully' });
};
