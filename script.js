const menuButton = document.getElementById("menuButton");
const navlinks = document.getElementById("navlinks");
menuButton. addEventListener("click") , function() {
    navlinks. classList.toggle("active");
} 
const links =document.querySelectorAll("navlinks a");{
    links.addEventListener("click"), function(){
        navlinks.classList.remove("active");
    }
}
const properties = [
    {title:"Modern family house", Location:"Los Angeles", type: "House", price: 850000

    },
    {title: "Luxury Apartment", Location:"New York", type:"Apartment", price: 350000

    },
    {title: "Luxury Villa", Location:"Miami", type:"Villa", price:1650000

    },
    {title: "Cozy Cottage", Location:"Austin", type:"Cottage", price:220000

    }

]
function Loadproperties(list){
    const container = document.getElementById("properties"); container.innerHTML="";
    if(list.lenght === 0){
        container.innerHTML="<P style= 'color:white'> No properties found<|p>"; return;
    }
    list.forEach(prop =>{
        container.innerHTML += <div class ="property-card">
            <h3>${prop.title}</h3>
            <p>${prop.Location}</p>
            <p>${prop.type}</p>
            <p>price: $${prop.price.toLocaleString()}</p>
        </div>
    });
}
function filterproperties(){
    const Location = document.getElementById("LocationInput").ariaValueMax.toLowerCase();
    const type = document.getElementById("typeInput").value;
    const minPrice = parseInt(document.getElementByid ("minPriceInput").value);
    const maxPrice = parseInt(document.getElementByid ("maxPriceInput").value);
    const filtered = properties.filter(prop => {
        const matchLocation = prop.Location.toLowerCase().includes(location);
        const matchType = type === "All" || prop.type === type;
        const matchPrice = prop.price >= minPrice && prop.price <= maxPrice;
        return matchLocation && matchType && matchPrice;
    });
    Loadproperties(filtered);
}
Loadproperties(properties);

