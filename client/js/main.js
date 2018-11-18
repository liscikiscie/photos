function fetchPhotos() {
    // let arr = [ {
    //     thumb: 'bear'
    // } ];
    // return {
    //     then: function ( cb ) {
    //         cb(arr);
    //     }
    // }

    return fetch('http://localhost:3000/photos')
        .then(( response ) => {
            return response.json();
        })
}


function render( photos ) {
    const $area = document.getElementById('app');
    Object.assign($area.style, {
        width: '1200px', height: 'auto', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'spaceAround'
    });
    let $imgContainer = document.createElement('div');
    Object.assign($imgContainer.style, {
        width: '350px', height: 'auto', display: 'flex', flexFlow: 'row wrap', justifyContent: 'flexStart'
    });
    $area.appendChild($imgContainer);

    photos.forEach(( photo ) => {
        const $img = document.createElement('img');
        $img.setAttribute('src', photo.thumb);
        Object.assign($img.style, {
            width: '100px', height: 'auto', padding: '15px'
        });
        $img.addEventListener('click', () => {
            zoomPhoto(photo);
        });
        $imgContainer.appendChild($img);
    })
}

function zoomPhoto( photo ) {
    const $bigImgContainer = document.createElement('div');
    const $bigImg = document.createElement('img');
    const $area = document.querySelector('#app');

    removeEl();
    $bigImgContainer.classList.add('bigImgView');
    $area.appendChild($bigImgContainer);
    $bigImg.setAttribute('src', photo.image);
    $bigImgContainer.appendChild($bigImg);
    displayPhotoItems(photo);
}

function removeEl() {
    const $bigImgContainer = document.querySelector('.bigImgView');
    if ( $bigImgContainer ) {
        console.log('remove');
        $bigImgContainer.remove();
    }
}

function displayPhotoItems( photo ) {
    const templates = `
<div>
    <h1>${photo.author}</h1>
    <p>
    ${photo.tags.map(( val ) => {
        return `#${val}`;
    }).join(', ')}
    </p>
    <h2>${photo.title}</h2>
</div>`;

    const $bigImgContainer = document.querySelector('.bigImgView');
    $bigImgContainer.innerHTML += templates;

    // $bigImgContainer.appendChild(templates);

}

function addStylesToInfo( photo ) {
    const $bigImgContainer = document.querySelector('.bigImgView');
    const $author = document.querySelector('h1');
    const $tags = document.querySelector('p');
    const $title = document.querySelector('h2');
}

function setup() {
    fetchPhotos()
        .then(( photos ) => {
            console.log(photos);
            render(photos);
        })
}

window.addEventListener('DOMContentLoaded', setup);
