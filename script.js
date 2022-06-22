const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

// use let as values will change
let photosArray = []

const count = 10
const apiKey = 'yWXXjOGILXM3alhEDmtPUIFkFse-p6S7uZlY6w7zfsE'

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// helper function to set attributes in displayPhotos() function

const setAttributes = (element, attributes) => {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]
    }
}

//  create elements for links and photos and add to DOM;
// in the function below, there are two ways of setting the attributes, one of which uses the function above
const displayPhotos = () => {
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
        // put <img> inside the <a> element and then put both inside the image-container element
        item.appendChild(img)
        // imagecontainer is the parent
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

// on load
getPhotos()