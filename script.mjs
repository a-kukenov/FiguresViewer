const getData = url =>
    new Promise((resolve, reject) =>
        fetch(url)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
    )

const postData = (url, product) => {
    return new Promise((resolve, reject) =>
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
    )
}

const container = document.querySelector('.box2');
const getBut = document.querySelector('.getBut');
const sendBut = document.querySelector('.sendBut');
const shape = document.querySelector('.shape');
const color = document.querySelector('.color');

sendBut.addEventListener('click', async() => {
    try {
        await postData('http://localhost:3000/FIGURES', {shape: shape.value, color: color.value})
          .then(response => {console.log(response, 'данные успешно добавлены')})
      } 
      catch (error) {
        console.error(error)
      }
})

getBut.addEventListener('click', () => {
    getData('http://localhost:3000/FIGURES')
    .then(data => {
        data.forEach(element => {
            container.insertAdjacentHTML(
                `afterbegin`,
                `<div class="slot">
                    <div class="figure"></div>
                </div>`
            )
            const figure = document.querySelector('.figure');
            switch(element.shape){
                case 'Круг':
                    figure.style.width = '150px'
                    figure.style.height = '150px'
                    figure.style.borderRadius = '50%'
                    break
                case 'Квадрат':
                    figure.style.width = '150px'
                    figure.style.height = '150px'
                    break
                case 'Прямоугольник':
                    figure.style.height = '150px'
                    figure.style.width = '250px'
                    break
            }
            figure.style.background = element.color
        })
    })
    .catch(error => console.error(error))
})