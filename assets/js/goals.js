//function til det specifikke
import { myFetch } from "./helper.js";

const getGoalList = async () => {
    const data = await myFetch('https://api.mediehuset.net/sdg/goals')
    // console.log(data);
    data.items.map(function(item, key){
        const wrapper = document.createElement('div');
        wrapper.style.background = `#${item.color}`;
        wrapper.classList.add('wrapper');
        const h2 = document.createElement('h2');
        h2.innerText = item.title;
        const icon = document.createElement('div');
        icon.classList.add('icons')
        icon.innerHTML = `${item.icon}`;       
        const a = document.createElement('a');
        a.addEventListener('click', () => {
            getGoalDetails(item.id);
            document.body.classList.add('no-scroll');
        })
        a.classList.add('text')
        a.innerText = "Læs mere"
        wrapper.append(h2, icon, a);
        document.querySelector('.goalcontainer').append(wrapper);

    })
}

getGoalList();

const getGoalDetails = async (goal_id) => {
    const data = await myFetch(`https://api.mediehuset.net/sdg/goals/${goal_id}`);
    const goalmodal = document.querySelector('.goalmodal');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    goalmodal.innerHTML = "";

    const close = document.createElement('span');
    close.classList.add('close');
    close.innerHTML = '&times;';
    close.onclick = function() {
        goalmodal.classList.toggle('hidden');
        document.body.classList.remove('no-scroll');

    }
    goalmodal.classList.toggle('hidden');


if (!document.querySelector('.goalmodal .modal .close')){
    modal.prepend(close);
}
    const h2 = document.createElement('h2');
    h2.innerHTML = `${data.item.title}`;
    const h3 = document.createElement('h3');
    h3.innerHTML = `${data.item.byline}`;
    console.log(h3);
    modal.style.background = `#${data.item.color}`;
    const icon = document.createElement('div');
    icon.innerHTML = `${data.item.icon}`;
    const description = document.createElement('p');
    description.innerHTML = `${data.item.description}`;
    const image = document.createElement('img');
    image.setAttribute('src', `${data.item.image}`);
    const ul = document.createElement('ul');

    for(let i = 0; i<data.item.targets.length; i++){
        const li = document.createElement('li');
        li.innerHTML = `${data.item.targets[i].title}: ${data.item.targets[i].description}`;
        ul.append(li);
    }
    goalmodal.onclick = function(event) {
        if(event.target == goalmodal) {
        goalmodal.classList.toggle('hidden');
        document.body.classList.remove('no-scroll');
        }    
        }
    modal.append(h2, h3, icon, description, image, ul)
    goalmodal.append(modal);
    
console.log(goalmodal);
}





