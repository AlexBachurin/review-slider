const img = document.querySelector('.reviews__img'),
      author = document.querySelector('.reviews__author'),
      job = document.querySelector('.reviews__job'),
      text = document.querySelector('.reviews__text'),
      prevBtn = document.querySelector('.reviews__btn_prev'),
      nextBtn = document.querySelector('.reviews__btn_next');



const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('something bad happened');
    }

    return await res.json();
}


