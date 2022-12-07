const container = document.querySelector('.container');
const emoji = document.querySelector('.emoji');
const textarea = document.querySelector('textarea');
const btn = document.querySelector('.btn');

emoji.addEventListener('click', (e) => {
    if(e.target.className.includes('emoji')) return;

    textarea.classList.add('textarea--active');
    btn.classList.add('btn--active');
})

container.addEventListener('mouseleave',() => {
    textarea.classList.remove('textarea--active');
    btn.classList.remove('btn--active');

})