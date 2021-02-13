module.exports = class OrderPart {
    static typeDefs() {
        return `
            type OrderPart {
                id: Int
                productId: Int
                quantity: Int
                createdAt: String
                updatedAt: String
            }
        `;
    }
}
