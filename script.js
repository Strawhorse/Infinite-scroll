const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
// use let as values will change
let photosArray = []

// unsplash api
let count = 5
const apiKey = 'UNSPLASH_API_KEY_HERE'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++
    if (imagesLoaded === totalImages){
        ready = true
        // hide loader again
        loader.hidden = true;
        count = 30
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
    }
}

// helper function to set attributes in displayPhotos() function
const setAttributes = (element, attributes) => {
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//  create elements for links and photos and add to DOM;
// in the function below, there are two ways of setting the attributes, one of which uses the function above
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length
    console.log('total images: ', totalImages)
    photosArray.forEach((photo) => {
        // create an anchor element <a> to link to unsplash
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // create img for photo
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //  event listener for DOM events check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // put <img> inside the <a> element and then put both inside the image-container element
        item.appendChild(img)
        // image-container is the parent
        imageContainer.appendChild(item)
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        // console.log(photosArray)
        displayPhotos()
    } catch (error) {
        // catch error here
    }
}


// check to see if scrolling near bottom of page using DOM events
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready = false;
        getPhotos()
    }
})



// on load
getPhotos()
