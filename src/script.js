//get data from server(json)
const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('something bad happened');
    }

    return await res.json();
}

//set starting value to show on page
let current = 0;

window.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.reviews__img'),
        author = document.querySelector('.reviews__author'),
        job = document.querySelector('.reviews__job'),
        text = document.querySelector('.reviews__text'),
        prevBtn = document.querySelector('.reviews__btn_prev'),
        nextBtn = document.querySelector('.reviews__btn_next'),
        randomBtn = document.querySelector('.reviews__random-btn');

    //get data from server and initialize page
    getData('current.json')
        .then(data => {
            //get initial element from data and set it to the page
            setContent(data, current);
        }).catch(() => console.log('error on initialize'));

    //helper to set content into html
    const setContent = (data, current) => {
        const item = data.reviews[current];
        img.src = item.img;
        author.textContent = item.name;
        job.textContent = item.job;
        text.textContent = item.text;
    }
    //logic is simple : every click on next button we increment counter
    //on prev button we decrement counter
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        current++;
        getData('current.json')
            .then(data => {
                //check if current is equals last element of our data array,then reset it to 0
                if (current >= data.reviews.length) {
                    current = 0;
                }
                setContent(data, current)

            }).catch(() => console.log('error in next'))
    })
    //show prev
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        current--;
        getData('current.json')
            .then(data => {
                //same as next but check if current is lower then first elem, then set it to last element of data array
                if (current < 0) {
                    current = data.reviews.length - 1;
                }
                setContent(data, current);

            })
            .catch(() => console.log('error in prev'))
    })

    //show random review
    randomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        getData('current.json')
        .then(data => {
            //get random number between 0 and data array length including last elem
            current = Math.floor(Math.random() * data.reviews.length);
            setContent(data, current);
        })
        .catch(() => console.log('error in random'))
    })


})