const pasarelaController = {};

pasarelaController.crearPago = async(req, res) => {
    console.log(req.body);
    res.json({
       msg: 'Creando cargo'
    });
}

module.exports = pasarelaController;