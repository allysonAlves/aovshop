
const produtosURL = import.meta.env.VITE_URL_PRODUTOS;
const url_produtos = `${produtosURL}produtos.json`;
    
const GetAllProducts = async () =>{

    if(window.sessionStorage.getItem('lastGetData')){

        const lastGetTime = window.sessionStorage.getItem('lastGetData');

        if(lastGetTime < Date.now())
        {  

            return await fetchProducts();

        }else
        {
            return GetSessionProducts();
        }

    } 
    else{     
        return await fetchProducts();
    }
}

const GetProduct = async (id) =>{    
    const response = await fetch(`${produtosURL}produtos/${id}.json`);
    const result = await response.json();

    return result;
}

const GetSessionProducts = async () => {
    const response = window.sessionStorage.getItem('products')
    
    const products = JSON.parse(response);
    if(Object.values(products ?? {})[0])
    {
        return products;
    }else
    {
        window.sessionStorage.removeItem('products');
        const refresh = await fetchProducts();
        return refresh;
    }    
}

const fetchProducts = async () => {
    const response = await fetch(`${url_produtos}`);
    
    if(response.ok)
    {
        const result = await response.json();

        window.sessionStorage.setItem('lastGetData',Date.now() + 600000)
        window.sessionStorage.setItem('products', JSON.stringify(result))
        
        return result;
    }else
    {
       return Promise.reject(response);
    }
    
}

const SearchProducts = (query) =>{
    const products = GetSessionProducts();
}

export {GetAllProducts, GetProduct, SearchProducts}