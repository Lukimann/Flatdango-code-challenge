document.addEventListener('DOMContentLoaded', function () {

fetch("http://localhost:3000/films")
.then(response => response.json())
.then(data => {
    data.forEach(film => {
        const inputData = `
        <img src="${film.poster}" alt="${film.title} Poster">
       <p id="titleCase"><b>${film.title}</b></p>
        <p><li>Runtime: ${film.runtime} minutes </li></p>
        <p><li>Showtime: ${film.showtime}</li></p>
        <p><li>Description: ${film.description}</li></p>
        <p><li>Tickets Sold / Theatre Capacity: ${film.tickets_sold} / ${film.capacity}</li></p>
        <button onclick="ticketSales(${film.tickets_sold}, ${film.capacity}, ${film.title})">Buy Ticket</button>
        </li>
`;

document.querySelector('ul').insertAdjacentHTML('beforeend', inputData)

    })
})
.catch(error => console.error('error fetching data:', error))

})


function ticketSales(tickets_sold, capacity, title) {
    const remainingTickets = capacity - tickets_sold;
    if (tickets_sold === capacity) {
        console.log('The theatre is at capacity for ' + title);
    } else if (tickets_sold < capacity) {
        console.log('Remaining tickets for ' + title + ': ' + remainingTickets);
    } else {
        tickets_sold++;
        console.log('Ticket sold for ' + title + 'Tickets ' + tickets_sold);

        const ticketsInfoElement = document.querySelector(`#${title} > p > li:nth-child(5)`);
        ticketsInfoElement.textContent = `Tickets Sold / Theatre Capacity: ${tickets_sold} / ${capacity}`;
    }
}
