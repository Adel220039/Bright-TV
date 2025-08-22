const moviePapularGrid = document.querySelector('.movie-popular-grid');
const tvPapularGrid = document.querySelector('.tv-popular-grid');
const recentlyViewedContainer = document.querySelector('.recently-viewed-grid');
const ApiKey ='77ba7f3c49c3599245a4bd12128a1695' ;
const urlMovie =`https://api.themoviedb.org/3/trending/movie/day?api_key=${ApiKey}&language=en-US&page=1`; 
const urlTv =`https://api.themoviedb.org/3/trending/tv/day?api_key=${ApiKey}&language=en-US&page=1`; 
let recentlyViewedArry = JSON.parse(localStorage.getItem('recentlyViewed'))||[];

 // Clear duplicates in recently viewed array based on 'id' property
 function updateRecentlyViewed(item){
   // Add the clicked item to the recently viewed array
    if (!recentlyViewedArry.some(viewedItem => viewedItem.id === item.id)) {
      recentlyViewedArry.unshift(item); // Add to the beginning of the array
      // Limit to 10 recently viewed items
      if (recentlyViewedArry.length > 10) {
        recentlyViewedArry = recentlyViewedArry.slice(0,10); // keep the array size fixed at 10
      }
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewedArry));
    }
 }
// Fetch popular movies from TMDB API
  fetch(urlMovie)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(item => {
        const papularItem = document.createElement('a');
        papularItem.classList.add('popular-item');
        papularItem.href = `details.html?name=${item.title}&catagory=${item.media_type}`;
        const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'images/no-image.png';
        papularItem.innerHTML = `
          <img src="${imageUrl}" alt="${item.title || item.name}">
          <h3>${item.title || item.name}</h3> 
        `;
        papularItem.addEventListener('click', () => {
         updateRecentlyViewed(item);
        })
        moviePapularGrid.appendChild(papularItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));  

// Fetch popular Tv show from TMDB API
  fetch(urlTv)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(item => {
        const papularItem = document.createElement('a');
        papularItem.classList.add('popular-item');
        papularItem.href = `details.html?name=${item.title}&catagory=${item.media_type}`;

        const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'images/no-image.png';
        papularItem.innerHTML = `
          <img src="${imageUrl}" alt="${item.title || item.name}">
          <h3>${item.title || item.name}</h3>
        `;
        papularItem.addEventListener('click', () => {
          updateRecentlyViewed(item)
        })
        tvPapularGrid.appendChild(papularItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error)); 

    
// Scroll buttons functionality for both grids
  function setupScrollControlsFor(container) {
    if (!container) return;
    const parent = container.parentElement;
    if (!parent) return;
    const leftBtn = parent.querySelector('.scroll-left');
    const rightBtn = parent.querySelector('.scroll-right');
    if (!leftBtn || !rightBtn) return;

    function updateButtons() {
      if (container.scrollLeft > 0) {
        leftBtn.style.display = 'flex';
      } else {
        leftBtn.style.display = 'none';
      }
      if (container.scrollLeft + container.clientWidth < container.scrollWidth - 5) {
        rightBtn.style.display = 'flex';
      } else {
        rightBtn.style.display = 'none';
      }
    }

    container.addEventListener('scroll', updateButtons);
    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    });

    updateButtons();
    window.addEventListener('resize', updateButtons);
  }

  setupScrollControlsFor(moviePapularGrid);
  setupScrollControlsFor(tvPapularGrid);
  setupScrollControlsFor(recentlyViewedContainer);


// Search functionality using OMDB API
   const searchBtn = document.getElementById('search-button');
    searchBtn.addEventListener('click', () => {
      const searchInput = document.getElementById('search-input');
      const searchKey = searchInput.value.trim();
      const omdbapikey ='e8961e48' ;
      const url =`http://www.omdbapi.com?apikey=${omdbapikey}&s=${searchKey}`; 
      
      if(searchKey){
        fetch(url)
        .then(response =>response.json()
      .then(data =>{
        console.log(data);
      }))}
    })

// Display recently viewed items

if (recentlyViewedArry.length > 0) {
  recentlyViewedContainer.parentElement.style.display = 'block';
    recentlyViewedArry.forEach(item => {
      const papularItem = document.createElement('a');
      papularItem.classList.add('popular-item');
      papularItem.href = `details.html?name=${item.title || item.name}&catagory=${item.media_type}`;
      papularItem.innerHTML =
       `
        <img src="${item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'images/no-image.png'}" alt="${item.title || item.name}">
        <h3>${item.title || item.name}</h3>
      `;   
      recentlyViewedContainer.appendChild(papularItem);
  });
}