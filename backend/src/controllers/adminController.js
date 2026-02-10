let testItems = [
    { id: 1, name: 'lääke', brand: 'merkki' },
    { id: 2, name: 'lääke2', brand: 'merkki2' },
    { id: 3, name: 'lääke3', brand: 'merkki3' }
];

// test function
const getItem = (req, res, next) => {
    res.status(200).json(testItems);
};

const createItem = (req, res, next) => {
    try {

        const { name, brand } = req.body;
        const id = testItems.length + 1;

        if ( !name || !brand ) {
            return res.status(400).json({success: false, message: 'Error! Missing parameters'});
        }

        testItems.push({ id, name, brand});

        res.status(201).json({
            success: true,
            message: 'Item created successfully',
            data: { id, name, brand }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error!'
        });
    }
};

const editItem = (req, res, next) => {
    res.status(404).json('Not implemented yet')
};

const deleteItem = (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        const index = testItems.findIndex(item => item.id === id);
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        const deletedItem = testItems.splice(index, 1)[0];

        res.status(200).json({
            success: true,
            message: 'Item removed successfully',
        });


    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Error!'
        });
    }

};

module.exports = { createItem, editItem, deleteItem, getItem };
