import Swiper from './swiper-bundle.js';
import './fancybox.umd';


document.addEventListener("DOMContentLoaded",function(){
    const tabsHandlerItems = document.querySelectorAll('[data-tabs-handler]');
    const tabsFormItems = document.querySelectorAll('[data-tabs-form]');
    const deleteUser = document.querySelectorAll('.delete_user');
    const deleteFilm = document.querySelectorAll('.delete_film');
    // const submitBtn = document.querySelector('.film_submit');
    // const addForm = document.querySelector('#add__film');


    const slider__horror = new Swiper('.slider__horror', {
        slidesPerView: 5,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-horror",
            prevEl: ".swiper-button-prev",
        },
    });
    const slider__drama = new Swiper('.slider__drama', {
        slidesPerView: 5,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-drama",
            prevEl: ".swiper-button-prev",
        },
    });
    const slider__comedy = new Swiper('.slider__comedy', {
        slidesPerView: 5,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-comedy",
            prevEl: ".swiper-button-prev",
        },
    });
    const slider__historical = new Swiper('.slider__historical', {
        slidesPerView: 5,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-history",
            prevEl: ".swiper-button-prev",
        },
    });
    const slider__action = new Swiper('.slider__action', {
        slidesPerView: 5,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-action",
            prevEl: ".swiper-button-prev",
        },
    });
    const slider__sci_fi = new Swiper('.slider__sci-fi', {
        slidesPerView: 5,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-sci",
            prevEl: ".swiper-button-prev",
        },
    });
    const slider__romance = new Swiper('.slider__romance', {
        slidesPerView: 5,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-romance",
            prevEl: ".swiper-button-prev",
        },
    });

    const slider__channel = new Swiper('.slider__channel', {
        slidesPerView: 4,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-channel",
            prevEl: ".swiper-button-prev",
        },
    });
    const slider__actors = new Swiper('.slider__actors', {
        slidesPerView: 6,
        loop:true,
        spaceBetween: 30,
        navigation:{
            nextEl: ".swiper-button-next-actors",
            prevEl: ".swiper-button-prev",
        },
    });
    const gradient = [
        'linear-gradient(109.31deg, #FD093F 2.4%, #F383F1 100%)',
        'linear-gradient(114.5deg, #0FFFDA 2.22%, #3CDB77 68.84%)',
        'linear-gradient(109.31deg, #B936FF 2.4%, #57DEDA 100%)',
        'linear-gradient(109.31deg, #FD093F 2.4%, #FB1378 2.41%, #FCCB1A 100%)',
        'linear-gradient(109.31deg, #FF6472 2.4%, #FDA75D 100%)',
        'linear-gradient(110.16deg, #13547A 2.37%, #80D0C7 96.77%)',
        'linear-gradient(109.93deg, #FFF77B 2.37%, #FFBF42 50%)',
        'linear-gradient(109.31deg, #1FA2FF 2.4%, #1FA2FF 2.41%, #1F535C 97.46%)'
    ];
    const popular = document.querySelectorAll('.popular__item');
    const channels = document.querySelectorAll('.slider__channel-item');
    popular.forEach(item => {
        item.style.background = gradient[changeGradient()];
    });
    channels.forEach( item => {
        item.style.background = gradient[changeGradient()];
    });
    function changeGradient() {
        return Math.floor(Math.random() * gradient.length);
    }

    for (const tab of tabsHandlerItems){
        tab.addEventListener('click', () => {
            tabsHandlerItems.forEach(item => {
                if (tab === item){
                    item.classList.add('authorization__button-active');
                }else {
                    item.classList.remove('authorization__button-active');
                }
            });
            tabsFormItems.forEach(item => {
                if (item.dataset.tabsForm === tab.dataset.tabsHandler){
                    item.classList.remove('hidden');
                }else {
                    item.classList.add('hidden');
                }
            });
        })
    }

    deleteUser.forEach(item => {
        item.addEventListener('click', () => {
            item.parentElement.remove();
        })
    });
    deleteFilm.forEach(item => {
        item.addEventListener('click', () => {
            item.parentElement.parentElement.remove();
        })
    });






    // submitBtn.addEventListener('click', (e)=> {
    //     e.preventDefault();
    //     const obj = {};
    //     const input = document.querySelectorAll('input');
    //     const select = document.querySelector('select');
    //     obj['category'] = select.value;
    //     input.forEach(item => {
    //         let key=item.id;
    //         obj[key] = item.value
    //     });
    //
    //     let url = 'https://jsonplaceholder.typicode.com/posts';
    //
    //     fetch(url, {
    //         method: 'post',
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         },
    //         body: JSON.stringify(obj)
    //
    //     }).then(response => response.json())
    //         .then(res => console.log(res))
    //         .catch(function(err) {
    //             // Error :(
    //         });
    //
    //
    // })

});
