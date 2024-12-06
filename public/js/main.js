const animeEl = document.getElementById('anime')

axios.get('http://localhost:3000/posts')
    .then(response => {
        const result = response.data
        console.log(result);

        result.data.forEach(element => {
            const { title, slug, content, image, tags } = element
            const markup = `
    <div class="col-4">
                    <div class="card">
                        <ul>
                            <li>${title}</li>
                            <li>${slug}</li>
                            <li>${content}</li>
                             <img src="./img/${image}" class="img-fluid" </img>
                            <li>${tags}</li>
                        </ul>
                    </div>
                </div>
    `
            animeEl.innerHTML += markup
        });



    })