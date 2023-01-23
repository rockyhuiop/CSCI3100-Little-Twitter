//demo of controller
const getFood = (req, res) => {
    console.log('got food here in controller')
    return res.status(200).send("got food in controller")
}

module.exports = { getFood }