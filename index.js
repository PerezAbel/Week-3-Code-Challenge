let fetchedData;
 fetch("http://localhost:3000/films")
.then((result) => result.json())
.then((result2) => {
 fetchedData = result2;
 console.log('results --> ', result2);
 beginning(result2);
})
.catch((error) => console.log(error));
function buildCard(movie) {
 const parentDiv = document.createElement('div');
 parentDiv.className = 'card';
 const img = document.createElement('img');
 img.src = movie.poster;
 img.style = 'width:300px';
 const innerDiv = document.createElement('div');
 innerDiv.className = 'container';
 const h4 = document.createElement('h4');
 h4.textContent = movie.name;
 const availableTickets = movie.capacity - movie.tickets_sold;
 const p = document.createElement('p');
 p.textContent = availableTickets ? `Tickets available ${availableTickets}` : 'Tickets sold out';
 const btn = document.createElement('button');
 btn.textContent = `Buy Ticket`;
 btn.id = `${movie.id} ${movie.tickets_sold} btn`;
 btn.disabled = !availableTickets;
 const button2 = document.createElement('button');
 button2.textContent = `Delete`;
 button2.className = `${movie.id} button-delete`;
 button2.disabled = availableTickets;
 parentDiv.append(img);
 parentDiv.append(innerDiv);
 innerDiv.append(h4);
 innerDiv.append(p);
 innerDiv.append(btn);
 innerDiv.append(button2);   
 return parentDiv;
}
const beginning = (films) => {
 const mainDiv = document.createElement('div');
 mainDiv.className = 'main';
 document.body.appendChild(mainDiv);
 films.forEach(films => {
  const card = buildCard(films);
  mainDiv.append(card);
 });
};
const clickCallback = (e) => {
 e.preventDefault();
 if (e.target.getAttribute('id')) {
 const combinedIdbuy = e.target.getAttribute('id');
 const id = combinedIdbuy?.split(" ")[0];
 const tickets_sold = combinedIdbuy?.split(" ")[1];
 buyTicket(id, tickets_sold);
 }
 if (e.target.getAttribute('class')) {
  const combinedIdbuy = e.target.getAttribute('class');
  const id = combinedIdbuy?.split(" ")[0];
  deleteMovie(id);
  }
};
const buyTicket = (id, tickets_sold) => {
 fetch(`http://localhost:3000/films/${Number(id)}`, {
 method: 'PATCH',
 headers: {
  "Content-Type": "application/json"
 },
 body: JSON.stringify(
  {
   id: Number(id),
   tickets_sold: Number(tickets_sold) + 1
  }
 )
})
.then((result) => result.json())
.then((result2) => console.log(result2))
.catch((error) => console.log(error));
};
const deleteMovie = (id) => {
 fetch(`http://localhost:3000/films/${Number(id)}`, {
 method: 'DELETE',
 headers: {
  "Content-Type": "application/json"
 },
})
.then((result) => result.json())
.then((result2) => console.log(result2))
.catch((error) => console.log(error));
};
document.addEventListener('click', clickCallback);