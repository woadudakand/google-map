function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 },
    });
  
    directionsRenderer.setMap(map);
  
    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
  
    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    
    directionsService
      .route({
        origin: {
          query: document.getElementById("start").value,
        },
        destination: {
          query: document.getElementById("end").value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        const distance = response.routes[0].legs[0].distance.value / 1000;
        const duration = response.routes[0].legs[0].duration.text;
        
        document.getElementById('showDistance').innerHTML = distance + "kilometer";
        document.getElementById('totalDistance').innerHTML = distance + "kilometer";
        document.getElementById('deliveryTime').innerHTML = duration;        
        document.querySelector('.popup').style.display = 'flex';
        console.log(distance)
        if (distance >= 2000) {
          document.getElementById('u-balance').innerHTML = 'Out of distance';
          document.getElementById('w-balance').innerHTML = 'Out of distance';
          
        } else if (distance >= 1500) {
          document.getElementById('u-balance').innerHTML = '70$';
          document.getElementById('w-balance').innerHTML = '15$';
        } else if (distance >= 500) {
          document.getElementById('u-balance').innerHTML = '60$';
          document.getElementById('w-balance').innerHTML = '15$';
        } else {
          document.getElementById('u-balance').innerHTML = '50$';
          document.getElementById('w-balance').innerHTML = '12$';
        }
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }