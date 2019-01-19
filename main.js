
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var lastClick = [0,0,0];
var lastMove = 'N';
function Echiquier()
  {
    this.cases = new Array(64);
    for (var i = 0; i < 64; i++){
         this.cases[i] = new Object();
    }

     Echiquier.prototype.cell = function(i,j){
		return this.cases[i*8 + j];
  }

	this.afficher = function(id)
	{
		var table = document.getElementById(id);
		table.innerHTML = ""; 
		table.style = "margin: auto;height: 564px;width:564px;";
		for(row = 0; row<8; row++)
		{
		 	tr = document.createElement("TR");
			tr.style.height = "70px";
			for(col = 0; col<8; col++)
			{
				td = document.createElement("TD");

				td.setAttribute("onclick", "cliqueCase(" + row + ", " + col + ")");
				var c = this.cell(row, col);
				td.style.width = "70px";
				c.td = td;
				var img = getImg(c.piece);
				td.appendChild(img);
				if(c.piece.type != 'U')
					c.elt = c.piece.type;
				else 
					c.elt = false;					

				td.style.backgroundColor = (row + col)%2 == 0 ? "SeaGreen " : "LightSkyBlue";
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}
	// Blanc (crackers)
	this.cases[0].piece = new Piece('T','N');
	this.cases[1].piece = new Piece('C','N');
	this.cases[2].piece = new Piece('F','N');
	this.cases[3].piece = new Piece('D','N');
	this.cases[4].piece = new Piece('R','N');
	this.cases[5].piece = new Piece('F','N');
	this.cases[6].piece = new Piece('C','N');
	this.cases[7].piece = new Piece('T','N');
	for (var i = 8; i <= 15; i++) {
		this.cases[i].piece = new Piece('P','N');
	}
	//Initialise toutes les cases avec un Un.png
	for (var i = 16; i < 48; i++) {
		this.cases[i].piece = new Piece('U','U');
	}
	// Noir (KFC)
	this.cases[56].piece = new Piece('T','B');
	this.cases[57].piece = new Piece('C','B');
	this.cases[58].piece = new Piece('F','B');
	this.cases[59].piece = new Piece('D','B');
	this.cases[60].piece = new Piece('R','B');
	this.cases[61].piece = new Piece('F','B');
	this.cases[62].piece = new Piece('C','B');
	this.cases[63].piece = new Piece('T','B');
	for (var i = 48; i <= 55; i++) {
		this.cases[i].piece = new Piece('P','B');
	}

}

function cliqueCase(row,col){

	var bob = echiquier.cell(row,col);
	console.log(bob.piece);
	if (bob.elt && bob.td.style.backgroundColor != "red"){
		lastClick = [bob.piece,row,col];
		echiquier.afficher("échiquier");
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				var allowedmov = bob.piece.depl(echiquier,row,col,i,j);
				if (allowedmov && !(echiquier.cell(i,j).elt)){
					echiquier.cell(i,j).td.style.backgroundColor = "yellow";
				}
				else if (allowedmov && echiquier.cell(i,j).elt && echiquier.cell(i,j).piece.couleur != lastClick[0].couleur ){
					echiquier.cell(i,j).td.style.backgroundColor = "red";
				}
			}
		}
	}
	var eltcouleur = !bob.elt && lastClick[0].couleur != lastMove;
	var manger = bob.elt && lastClick[0].couleur != lastMove;
	if (bob.td.style.backgroundColor == "yellow" && eltcouleur){
		deplacementAffichage(bob,row,col);
	}
	if (bob.td.style.backgroundColor == "red" && manger ){
		if (bob.piece.type == 'R'){
			victoire(bob.piece.couleur);
		}
		deplacementAffichage(bob,row,col);
	}
}

function victoire(couleur){
	couleur = (couleur == 'B')? "noires":"blancs";
	var audio = new Audio('win.wav');
	audio.play();
	alert("Victoire des "+couleur+"!\n Rejouer ?");
	location.reload();
}

function deplacementAffichage(bob,row,col){
	if ((row == 0 && lastClick[0].couleur == 'B' && lastClick[0].type == 'P') || (row == 7 && lastClick[0].couleur == 'N' && lastClick[0].type == 'P')){
		transformation(bob);
	}
	else{
		echiquier.cell(lastClick[1],lastClick[2]).piece = new Piece('U','U');
		bob.piece = new Piece(lastClick[0].type,lastClick[0].couleur);
	};
	var audio = new Audio('move.wav');
	audio.play();
	echiquier.afficher("échiquier");
	lastMove = lastClick[0].couleur;
}

function transformation(bob){
	var userChoice = prompt("Choisis parmis ces 4 possibilitées: \nFou\nTour\nReine\nCavalier");
	echiquier.cell(lastClick[1],lastClick[2]).piece = new Piece('U','U');
	if (/(t|T)o*u*r+/.test(userChoice)){
		bob.piece = new Piece('T',lastClick[0].couleur);
	}
	else if (/(f|F)o*u+/.test(userChoice)){
		bob.piece = new Piece('F',lastClick[0].couleur);
	}
	else if (/(r|R)e?i?n*e+/.test(userChoice)){
		bob.piece = new Piece('D',lastClick[0].couleur);
	}
	else if (/(S|s)t?a?l?i?n?e+/.test(userChoice)){
		bob.piece = new Piece('S',lastClick[0].couleur);
	}
	else if (/(C|c)a+v?a?l?i?e+r+/.test(userChoice)){
		bob.piece = new Piece('C',lastClick[0].couleur);
	}
	else{
		alert("Erreur nom invalide");
		bob.piece = new Piece(lastClick[0].type,lastClick[0].couleur);		
	}
	// switch(userChoice){
	// 	case 'Fou':
	// 		bob.piece = new Piece('F',lastClick[0].couleur);
	// 		break;
	// 	case (/(t|T)our/):
	// 		bob.piece = new Piece('T',lastClick[0].couleur);
	// 		break;
	// 	case 'Reine':
	// 		bob.piece = new Piece('D',lastClick[0].couleur);
	// 		break;
	// 	case 'Staline':
	// 		bob.piece = new Piece('S',lastClick[0].couleur);
	// 		break;
	// 	default:
	// 		alert("Erreur nom invalide");
	// 		bob.piece = new Piece(lastClick[0].type,lastClick[0].couleur);
	// 		break;
	// }
}
function getImg(x){

	var img = new Image();
	switch(x.type){
		case 'P':
			img.src = "pion"+x.couleur+".png";
			return img;
		case 'T':
			img.src = "tower"+x.couleur+".png";
			return img;	
		case 'C':
			img.src = "cavalier"+x.couleur+".png";
			return img;
		case 'F':
			img.src = "fou"+x.couleur+".png";
			return img;
		case 'R':
			img.src = "roi"+x.couleur+".png";
			return img;
		case 'D':
			img.src = "reine"+x.couleur+".png";
			return img;
		case 'U':
			img.src = "Un.png";
			return img;
		case 'S':
			img.src = "staline.png";
			return img;
		default:
			img.src = "Un.png";
			return img;
	}
}

function Piece(typ,clr){
	this.type = typ;
	this.couleur = clr;
	switch(typ)
	{
		case 'C':
			this.depl = deplC;
			break;
		case 'D':
			this.depl = deplD;
			break;
		case 'F':
			this.depl = deplF;
			break;
		case 'P':
			this.depl = deplP;
			break;
		case 'R':
			this.depl = deplR;
			break;
		case 'T':
			this.depl = deplT;
			break;
	}
}

function deplR(e,xo,yo,x,y){
	var xi = Math.abs(xo - x);
	var yi = Math.abs(yo - y);
	return Math.max(xi,yi) == 1;
}


function deplD(e,xo,yo,x,y){
	return deplT(e,xo,yo,x,y) || deplF(e,xo,yo,x,y);
}
function deplT(e,xo,yo,x,y){
	return (xo == x || yo ==y) && (obstacle(e,xo,yo,x,y));
}
function deplF(e,xo,yo,x,y){
	return Math.abs(x - xo) == Math.abs(y - yo) && obstacle(e,xo,yo,x,y);
}
function deplC(e,xo,yo,x,y){
	var xi = Math.abs(xo - x);
	var yi = Math.abs(yo - y);
	if (xi == 1 && yi == 2){return true;}
	else if (xi == 2 && yi == 1){return true;}
	else return false;
}
function deplP(e,xo,yo,x,y){
	colo = e.cell(xo,yo).piece.couleur;	
	if (colo == 'B'){ // si pion blanc
		if (xo - x == 1 && Math.abs(yo -y) == 1){ //check diagonale
			try{
				var ennemie = e.cell(x,y).piece.couleur == 'N';
				if (ennemie){
					return true;
				}
			}
			catch(err){		
			}
		}
		if (xo == 6){ //position de départ pion blanc
			try{
				var ennemie = e.cell(x,y).piece.couleur == 'N';
				var ennemie2 = e.cell(x-1,y).piece.couleur == 'N';
				if (!ennemie ){
					return (xo - x == 1 || xo - x == 2) && yo == y && obstacle(e,xo,yo,x,y);	
				}
				if(ennemie2 && !ennemie){
					return (xo - x == 1) && (yo == y);
				}
			}
			catch(err){		
			}
			
		}
		else{			
			try{
				var ennemie = e.cell(x,y).piece.couleur == 'N';
				if (!ennemie){
					return xo - x == 1 && yo == y;
				}
			}
			catch(err){		
			}
			
		}
		
	}
	if (colo == 'N'){ // si pion noir
		if (x - xo == 1 && Math.abs(yo -y) == 1){ //check diagonale
			try{
				var ennemie = e.cell(x,y).piece.couleur == 'B';
				if (ennemie){
					return true;
				}
			}
			catch(err){		
			}
		}
		if (xo == 1){
			try{
				var ennemie = e.cell(x,y).piece.couleur == 'B';
				var ennemie2 = e.cell(x+1,y).piece.couleur == 'B';
				if (!ennemie ){
					return (x - xo == 1 || x - xo == 2) && yo == y && obstacle(e,xo,yo,x,y);	
				}
				if(ennemie2 && !ennemie){
					return (x - xo == 1) && (yo == y);
				}
			}
			catch(err){		
			}
			
		}
		else{			
			try{
				var ennemie = e.cell(x,y).piece.couleur == 'B';
				if (!ennemie){
					return x - xo == 1 && yo == y;
				}
			}
			catch(err){		
			}
			
		}
		
	}

}
function deselect(event){
	if(event.target.nodeName == 'BODY'){
		echiquier.afficher("échiquier");
	}
}
function obstacle(e,xo,yo,x,y){
	if (xo == x)
		dx = 0;
	else if (x > xo)
		dx = 1;
	else 
		dx = -1;
	if (yo == y)
		dy = 0;
	else if (y > yo)
		dy = 1;
	else 
		dy = -1;
	for (xp = xo + dx, yp = yo + dy; xp != x || yp != y; xp = xp + dx, yp = yp + dy){
		if(e.cell(xp,yp).elt)
			return false
	}
	return true;
}


var echiquier = new Echiquier();
echiquier.afficher("échiquier");

