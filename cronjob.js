db = connect("localhost:27017/dorbbyfullstack-dev");
db.categories.find().snapshot().forEach( function (category) {
var products = db.products.count({active: true, $or: [{maincats: {$eq: category._id}},{subcates: {$eq: category._id}},{itemcats: {$eq: category._id}},{itemsubcats: {$eq: category._id}}]});
category.productcount = products?products:0;
printjson(category);
db.categories.save(category);
});
