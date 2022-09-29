const myMap = L.map('map').setView([22.9074872, 79.07306671], 5);
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(myMap);
function generateList() {
const ul = document.querySelector('.list');
storeList.forEach((shop) => {
        const li = document.createElement('li');
        const div = document.createElement('div'); 
        const a = document.createElement('a');
        const p = document.createElement('p');
        a.addEventListener('click', () => {
                flyToStore(shop);
        });
        function flyToStore(store){
                myMap.flyTo([store.geometry.coordinates[1],store.geometry.coordinates[0]], 16, {duration:1});  
        };
        div.classList.add('shop-item');
        a.innerText = shop.properties.name;
        a.href = '#';
        p.innerText = shop.properties.address;
        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
        
});
}
generateList();
function makePopupContent(shop) {
        return `
          <div>
              <h4>${shop.properties.name}</h4>
              <p>${shop.properties.address}</p>
              <div class="phone-number">
                  <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
              </div>
          </div>
        `;
};
function onEachFeature(feature, layer){
        layer.bindPopup(makePopupContent(feature), {closeButton: false, offset: L.point(0, -2)});
};
const myIcon = L.icon({
        iconUrl: 'pizza.png',
        iconSize: [50, 60],
        
});
const shopsLayer = L.geoJSON(storeList, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature,latlng){
                return L.marker(latlng, {icon: myIcon});
        }
});
shopsLayer.addTo(myMap);
