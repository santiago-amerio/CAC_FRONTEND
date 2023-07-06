async function get_product_list(category = false) {
    const response = await fetch("https://thiagosch.pythonanywhere.com/product");
    const json = await response.json();
    return json;
}

async function get_category_list() {
    const response = await fetch("https://thiagosch.pythonanywhere.com/category");
    const json = await response.json();
    return json;
}
