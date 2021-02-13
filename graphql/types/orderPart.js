module.exports = class OrderPart {
    static resolver() {
        return {
            OrderPart: {
                product: orderPart => orderPart.getProduct()
            }
        }
    }
    static typeDefs() {
        return `
            type OrderPart {
                id: Int
                productId: Int
                quantity: Int
                createdAt: String
                updatedAt: String
                product: Product
            }
            input OrderPartInput {
                productId: Int!
                quantity: Int!
            }
        `;
    }
}
