/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. */

//intercetta l'invio del form
 document.querySelector("form").addEventListener("submit", function(event){

    //previene il refresh della pagina
    event.preventDefault();

    startGame(event);
 })


 /**
 * Starts the game
 * @param {object} event Dom event
 */
function startGame(event) {
    // seleziona il livello 
    const level = event.target[0].value;
  
    //console.log(level);
    // decidere come strutturare la griglia in base al livello scelto
    //level === 'easy'
    let cells_number, cols_number;
  
    switch (level) {
      case 'easy':
        cells_number = 100;
        cols_number = 10; // 10 x 10
        break;
      case 'medium':
        cells_number = 81;
        cols_number = 9; // 9 x 9
        break;
      case 'hard':
        cells_number = 49;
        cols_number = 7; // 7 x 7
        break;
    }
    //console.log(cells_number, cols_number);
    generate_grid(cells_number, cols_number);
    handleClick(".cell","selected")
     
 }

/**
 * Generate the game grid
 * 
 * cells_number = 100, cols_number = 10
 * @param {number} cells_number The cells Numbner to generate
 * @param {number} cols_number the number of columns and rows
 */

 function generate_grid(cells_number,cols_number) {
     const gameAreaElement = document.querySelector("main .cells") 

       // pulire area di gioco
       gameAreaElement.innerHTML = ''
     
     for (let i = 1; i <= cells_number; i++) {

        // creare l'elemento della dom (cella) da inserire nell'area di gioco
        const cell = document.createElement("div")

        // appendere alla cella il numero progressivo generato nel ciclo
         cell.append(i);
         cell.classList.add('cell')

        // dimensionare la cella in base alla misura della griglia
        cell.style.width = `calc(100% / ${cols_number})`

        // appendere la calla all'area di gioco
        gameAreaElement.append(cell);
     }
 }


/*  Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. */

/**
 * Handle cell click event
 * @param {string} css_selector Css selector
 * @param {string} css_class css class name
 */

function handleClick(css_selector, css_class) {
      // 1. selezionare tutte le celle querySelectorAll
      const cells = document.querySelectorAll(css_selector)
      console.log(cells);
      
      // 2. ciclare tra gli elementi della dom
      for (let i = 0; i < cells.length; i++) {
          const cellElement = cells[i];
          //console.log(cellElement);

          // 3. attacchare l'event listener all'elemento della dom (cell)
          cellElement.addEventListener("click",function(){
              console.log(this);
              // 4. evidenziare la cella di azzurro. 
              //this.style.backgroundColor = 'cornflowerblue'
              this.classList.add(css_class)
          })
      } 
  }


/*   Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe :bomb:.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando:
 il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */

