// Дождёмся загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Список туристических мест
    const places = [
        {
            name: "Монумент «Тыл — фронту»",
            coords: [53.4075, 58.9808],
            images: ["images/monument1.jpg", "images/monument2.jpg"],
            description: "Величественный монумент, один из главных символов города. Входит в триптих, посвященный победе в Великой Отечественной войне, вместе с монументами «Родина-мать» в Волгограде и «Воин-освободитель» в Берлине."
        },
    {
        name: "Магнитогорский металлургический комбинат",
        coords: [53.4181, 58.9776],
        images: ["images/mmk1.jpg", "images/mmk2.jpg"],
        description: "Один из крупнейших металлургических комбинатов России. Во время экскурсии можно увидеть полный цикл производства металла, от добычи руды до готовой продукции."
    },
    {
        name: "Арена «Металлург»",
        coords: [53.4069, 58.9799],
        images: ["images/arena1.jpg", "images/arena2.jpg"],
        description: "Современная ледовая арена, домашняя площадка хоккейного клуба «Металлург». Здесь проводятся матчи КХЛ и другие спортивные мероприятия."
    },
    {
        name: "Церковь Вознесения Христова",
        coords: [53.4178, 58.9997],
        images: ["images/church1.jpg", "images/church2.jpg"],
        description: "Красивый православный храм, построенный в неорусском стиле. Является архитектурной доминантой правобережной части города."
    },
    {
        name: "Магнитогорский краеведческий музей",
        coords: [53.4192, 58.9805],
        images: ["images/museum1.jpg", "images/museum2.jpg"],
        description: "Музей рассказывает об истории города и региона, от древних времен до современности. Здесь собраны уникальные экспонаты, связанные с основанием и развитием Магнитогорска."
    },
    {
        name: "Художественная галерея",
        coords: [53.4147, 58.9850],
        images: ["images/gallery1.jpg", "images/gallery2.jpg"],
        description: "В галерее представлены работы как местных художников, так и признанных мастеров. Регулярно проводятся временные выставки и культурные мероприятия."
    },
    {
        name: "Музей-квартира Бориса Ручьёва",
        coords: [53.4083, 58.9880],
        images: ["images/ruchev1.jpg", "images/ruchev2.jpg"],
        description: "Мемориальный музей известного советского поэта, связавшего свою жизнь с Магнитогорском. В квартире сохранена подлинная обстановка, личные вещи и архив поэта."
    },
    {
        name: "Парк «Лукоморье»",
        coords: [53.4115, 58.9920],
        images: ["images/lukomorie1.jpg", "images/lukomorie1.jpg"],
        description: "Современный парк отдыха с детскими площадками, зонами отдыха и развлечений. Популярное место для семейного отдыха."
    },
    {
        name: "Набережная реки Урал",
        coords: [53.4089, 58.9770],
        images: ["images/embankment2.jpg", "images/embankment2.jpg"],
        description: "Благоустроенная набережная с прогулочными зонами, скамейками и смотровыми площадками. Отсюда открывается прекрасный вид на реку и город."
    },
    {
        name: "Театр оперы и балета",
        coords: [53.4156, 58.9800],
        images: ["images/theatre1.jpg", "images/theatre2.jpg"],
        description: "Один из крупнейших музыкальных театров Урала. Здесь ставятся классические оперы и балеты, а также современные постановки."
    }
];

// Маршруты между точками (по порядку)
const routes = [
    [places[0].coords, places[2].coords],  // От монумента к арене
    [places[2].coords, places[8].coords],  // От арены к набережной
    [places[8].coords, places[4].coords],  // От набережной к краеведческому музею
    [places[4].coords, places[5].coords],  // От музея к художественной галерее
    [places[5].coords, places[9].coords],  // От галереи к театру
    [places[9].coords, places[6].coords],  // От театра к музею-квартире
    [places[6].coords, places[7].coords],  // От музея-квартиры к парку
    [places[7].coords, places[3].coords],  // От парка к церкви
    [places[3].coords, places[1].coords]   // От церкви к ММК
];

// Настройка стилей карты
const map = L.map('map', {
    center: [53.4075, 58.9808],
    zoom: 13,
    zoomControl: false // Перемещаем зум в правый верхний угол
});

// Добавляем красивый стиль карты
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO',
    maxZoom: 19
}).addTo(map);

// Добавляем элементы управления в удобные позиции
L.control.zoom({
    position: 'topright'
}).addTo(map);

L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomright'
}).addTo(map);

// Создаем кастомную иконку для маркеров
const customIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Добавление маркеров с кастомной иконкой и всплывающими подсказками
const markers = [];
places.forEach((place, idx) => {
    const marker = L.marker(place.coords, {
        icon: customIcon,
        title: place.name // Подсказка при наведении
    }).addTo(map);
    
    // Создаем красивый попап
    const popupContent = `
        <div class="custom-popup">
            <h3>${place.name}</h3>
            <p class="popup-description">${place.description.slice(0, 100)}...</p>
            <button onclick="showPlaceInfo(${idx})" class="popup-button">Подробнее</button>
        </div>
    `;
    
    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
    });
    
    marker.on('click', () => showPlaceInfo(idx));
    markers.push(marker);
});

// Отрисовка маршрутов с градиентом и анимацией
routes.forEach(route => {
    // Создаем градиентную линию маршрута
    const polyline = L.polyline(route, {
        color: '#4a90e2',
        weight: 4,
        opacity: 0.8,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: '10, 10', // Пунктирная линия
        dashOffset: '0'
    }).addTo(map);

    // Добавляем стрелки направления
    const decorator = L.polylineDecorator(polyline, {
        patterns: [
            {
                offset: '5%',
                repeat: '50%',
                symbol: L.Symbol.arrowHead({
                    pixelSize: 12,
                    polygon: false,
                    pathOptions: {
                        color: '#4a90e2',
                        fillOpacity: 1,
                        weight: 2
                    }
                })
            }
        ]
    }).addTo(map);
});

// Заполнение списка мест
const placesList = document.getElementById('places');
places.forEach((place, idx) => {
    const li = document.createElement('li');
    li.textContent = place.name;
    li.onclick = () => {
        map.setView(place.coords, 15);
        markers[idx].openPopup();
        showPlaceInfo(idx);
    };
    placesList.appendChild(li);
});

// Показ информации о месте
function showPlaceInfo(idx) {
    const info = document.getElementById('place-info');
    const place = places[idx];
    info.innerHTML = `<h3>${place.name}</h3>` +
        place.images.map(img => `<img src='${img}' alt='${place.name}'>`).join('') +
        `<p>${place.description}</p>`;
    info.classList.remove('hidden');
});
