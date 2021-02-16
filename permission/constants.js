/**
 *
 *[model name] [create/update/delete/show]
 *
 */

module.exports = {
    getCommentList: {permissions: ['comment show']},
    removeComment: {permissions: ['comment delete']},

    getDeliveryTypeById: {permissions: ['deliveryType show']},
    createDeliveryType: {permissions: ['deliveryType create']},
    updateDeliveryType: {permissions: ['deliveryType update']},
    removeDeliveryType: {permissions: ['deliveryType delete']},

    getPaymentTypeById: {permissions: ['paymentType show']},
    createPaymentType: {permissions: ['paymentType create']},
    updatePaymentType: {permissions: ['paymentType update']},
    removePaymentType: {permissions: ['paymentType delete']},

    getCategoryById: {permissions: ['category show']},
    getCategoryList: {permissions: ['category show']},
    createCategory: {permissions: ['category create']},
    updateCategory: {permissions: ['category update']},
    removeCategory: {permissions: ['category delete']},
    bulkDeleteCategory: {permissions: ['category delete']},

    addCharacteristicForCategory: {permissions: ['category create', 'characteristic create']},
    addCharacteristicsForCategory: {permissions: ['category create', 'characteristic create']},

    getCharacteristicById: {permissions: ['characteristic show']},
    getCharacteristicList: {permissions: ['characteristic show']},
    createCharacteristic: {permissions: ['characteristic create']},
    updateCharacteristic: {permissions: ['characteristic update']},
    removeCharacteristic: {permissions: ['characteristic delete']},
    bulkDeleteCharacteristic: {permissions: ['characteristic delete']},

    addValueForCharacteristic: {permissions: ['value create', 'characteristic create']},

    getDiscountById: {permissions: ['discount show']},
    getDiscountList: {permissions: ['discount show']},
    createDiscount: {permissions: ['discount create']},
    updateDiscount: {permissions: ['discount update']},
    removeDiscount: {permissions: ['discount delete']},

    getFeatureProductByProductId: {permissions: ['featureProduct show', 'product show']},
    getFeatureProductByValueId: {permissions: ['featureProduct show', 'value show']},
    getFeatureProductByCharacteristicId: {permissions: ['featureProduct show', 'characteristic show']},
    getFeatureProductList: {permissions: ['featureProduct show']},
    updateCharacteristicInProduct: {permissions: ['characteristic create', 'product update']},
    addCharacteristicToProduct: {permissions: ['characteristic create', 'product update']},
    removeCharacteristicFromProduct: {permissions: ['characteristic delete', 'product update']},

    createGallery: {permissions: ['gallery create']},
    renameGallery: {permissions: ['gallery update']},
    removeGallery: {permissions: ['gallery delete']},
    bulkAddImageToGallery: {permissions: ['gallery delete']},
    getGalleryById: {permissions: ['gallery show']},
    getGalleryList: {permissions: ['gallery show']},

    createImage: {permissions: ['image create']},
    updateImage: {permissions: ['image update']},
    removeImage: {permissions: ['image delete']},
    bulkDeleteImage: {permissions: ['image delete']},
    getImageById: {permissions: ['image show']},
    getImageList: {permissions: ['image show']},

    addImageForGallery: {permissions: ['gallery update', 'image create']},
    addImagesForGallery: {permissions: ['gallery update', 'image create']},

    getPermissionById: {permissions: ['permission show']},
    getPermissionList: {permissions: ['permission show']},
    createPermission: {permissions: ['permission create']},
    updatePermission: {permissions: ['permission update']},
    removePermission: {permissions: ['permission remove']},

    removeProduct: {permissions: ['product delete']},
    updateProduct: {permissions: ['product update']},
    createProduct: {permissions: ['product create']},
    getProductById: {permissions: ['product show']},
    getProductList: {permissions: ['product show']},

    createRole: {permissions: ['role create']},
    removeRole: {permissions: ['role delete']},
    updateRole: {permissions: ['role update']},
    getRolesList: {permissions: ['role show']},
    getRoleById: {permissions: ['role show']},

    addPermissionForRole: {permissions: ['permission create', 'role update']},
    addPermissionsForRole: {permissions: ['permission create', 'role update']},

    createValue: {permissions: ['value create']},
    updateValue: {permissions: ['value update']},
    removeValue: {permissions: ['value delete']},
    bulkDeleteValue: {permissions: ['value delete']},
    getValueById: {permissions: ['value show']},
    getValueList: {permissions: ['value show']},
}
