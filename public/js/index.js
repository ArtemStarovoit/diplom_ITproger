const mainBlock = document.querySelector("main.items");
const asideBlock = document.querySelector(".form");
let insertComments = []

async function loadData(){
    await fetch('http://localhost:3000/api/articles-items')
    .then(res => {
        return res.json()
    })
    .then(data => {
        data.forEach((item) => {
            mainBlock.innerHTML += `<div class="item">
                <img src="${item.img}">
                <h4>${item.name}</h4>
                <span>${item.anons}</span>
                <button onclick="fullText(${item.id})" type="button">Читать дальше</button>`
        });
    })
}

loadData()



async function fullText(id) {
    mainBlock.innerHTML = ''
    
    await fetch(`http://localhost:3000/api/articles-items/${id}`)
    .then(res => {
        return res.json()
    })
    .then(data  => {
        mainBlock.innerHTML += `<div class="fullInfo">
        <button onclick="back()" type="button">Вернуться ко всем статьям</button>
                <img class='head' src="${data.img}">
                <h4>${data.name}</h4>
                <span>${data.anons}</span>
                <div>${data.fullText}</div>`
                
    asideBlock.style.display = 'block'
    asideBlock.innerHTML = `<section class="comments">
                            <h3>Коментарии (<span class="coutn-comm"></span>)</h3>
                            <div id="comments">
                                Пока комментариев нет
                            </div>
                        </section>

                        <form id="commens-form" autocomplete="off">
                            <input class="input-comm" type="text" name="name" placeholder="Введите ваше имя" />
                            <textarea class="textarea-comm" name="comment" placeholder="Введите сообщение"></textarea>
                            <div id="error"></div>
                            <button type="button" class="button-comm">Отправить</button>
                        </form>`
                        

        let btnForm = document.querySelector(".button-comm");
        let idComment = 0;

        btnForm.onclick = ( () => {
            let countComments = +document.querySelector(".coutn-comm").textContent
            idComment++;
            let input = document.querySelector(".input-comm");
            let textArea = document.querySelector(".textarea-comm");
            if (input.value.length < 4) {
                document.querySelector("#error").innerHTML = "Длинна имени не менее 4 символов";
                return false;
            } else if(textArea.value.length < 10) {
                document.querySelector("#error").innerHTML = "Длинна коментария не менее 10 символов";
                return false;
            }

            document.querySelector("#error").innerHTML = "";

            if(countComments == 0) 
            document.querySelector("#comments").innerHTML = "";

            countComments++;
            document.querySelector(".coutn-comm").innerHTML = countComments;
            
            let newComment = "<div class='comment' id='block-" + idComment + "'>" + 
                "<p class='name'>" + input.value + "</p>" +
                "<p class='mess'>" + textArea.value + "</p>" +
                "</div>";
            
            
            insertComments.push({id: data.id, name: input.value, comment: textArea.value})
            
            document.querySelector("#comments")
            .insertAdjacentHTML('afterbegin', newComment);
            
            textArea.value = "";
            input.value = "";
        }
        );
    })

    let Addcommens = document.querySelector('#comments')
    
    await fetch(`http://localhost:3000/api/articles-items/comments/${id}`)
    .then(res => {
        return res.json()
    })
    .then(item => {
        document.querySelector(".coutn-comm").innerHTML = item.length;
        Addcommens.innerHTML = ""
        item.forEach((el) => {
            Addcommens.innerHTML += `
            <div class='comment' id='block-${el.id}'>
            <p class='name'>${el.name}</p>
            <p class='mess'>${el.comment}</p>
            </div>`
        }) 
        console.log(item)
    })
}

async function back() {
    const result = await fetch(`http://localhost:3000/api/articles-items`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insertComments)
    })
    insertComments = []
    mainBlock.innerHTML = ''
    asideBlock.innerHTML = ''
    asideBlock.style.display = ''
    loadData()
}