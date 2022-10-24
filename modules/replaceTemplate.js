module.exports = (template, product) => {
    let output = template.replace(/{%ProductName%}/g, product.productName);
    output = output.replace(/{%Image%}/g, product.image);
    output = output.replace(/{%Price%}/g, product.price);
    output = output.replace(/{%From%}/g, product.from);
    output = output.replace(/{%Nutrients%}/g, product.nutrients);
    output = output.replace(/{%Quantity%}/g, product.quantity);
    output = output.replace(/{%Description%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) output = output.replace(/{%Not_Organic%}/g, 'not-organic');
    return output;
};