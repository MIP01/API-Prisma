class _response {
    sendResponse = (res, data) => {
        try {
            if (data.code) {
                res.status(data.code)

                delete data.code

                res.send(data)
                return true
            }
            res.status(data && data.status ? 200 : 400)
            res.send(data)

            return true
        } catch (error) {
            res.ststus(400).send({
                ststus: false,
                error
            })

            return false
        }
    }
}

module.exports = new _response()