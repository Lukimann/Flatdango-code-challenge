
document.addEventListener('DOMContentLoaded', function () {
    const movieList = document.querySelector('ul');
    let availableSlots = 0; 

    fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(data => {
            data.forEach(film => {
                const inputData = `
                    <li id="${film.title}">
                        <img src="${film.poster}" alt="${film.title} Poster">
                        <p id="titleCase"><b>${film.title}</b></p>
                        <ul>
                            <li>Runtime: ${film.runtime} minutes </li>
                            <li>Showtime: ${film.showtime}</li>
                            <li>Description: ${film.description}</li>
                            <li>Tickets Sold / Theatre Capacity: ${film.tickets_sold} / ${film.capacity}</li>
                            <li><button>Buy Ticket</button>
                        </ul>
                    </li>
                `;
                movieList.insertAdjacentHTML('beforeend', inputData);

                if (availableSlots === 0) {
                    availableSlots = film.capacity;
                }
            });

        
            const buyTicketButton = document.createElement('button');
            buyTicketButton.textContent = 'Buy Ticket';
            buyTicketButton.addEventListener('click', function () {
                
                buyTicket();
            });
            document.body.appendChild(buyTicketButton);
        })
        .catch(error => console.error('error fetching data:', error));

    function buyTicket() {
        if (availableSlots > 0) {
            availableSlots--;
            console.log('Ticket bought! Available slots: ' + availableSlots);
        } else {
            console.log('The theatre is at full capacity.');
        }
    }
});


