console.log('hi');

window.onload = function () {

  // var app = new Vue({
  //   el: '#app',
  //   data: {
  //     message: 'Hello Vue!'
  //   }
  // });

  var Piece = function(name){
    this.name = name;
  }

  // var cells =  {
  //       A: [Piece('rook'), Piece('knight'), Piece('bishop'), Piece('queen'), Piece('king'), Piece('bishop'), Piece('knight'), Piece('rook')],
  //       B: [Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn')],
  //       C: [null, null, null, null, null, null, null, null],
  //       D: [null, null, null, null, null, null, null, null],
  //       E: [null, null, null, null, null, null, null, null],
  //       F: [null, null, null, null, null, null, null, null],
  //       G: [Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn')],
  //       H: [Piece('rook'), Piece('knight'), Piece('bishop'), Piece('queen'), Piece('king'), Piece('bishop'), Piece('knight'), Piece('rook')]
  //     }

  var chessBoard = new Vue({
    el: '#chessboard',
    data: {
      // cells: {
      //   A: [Piece('rook'), Piece('knight'), Piece('bishop'), Piece('queen'), Piece('king'), Piece('bishop'), Piece('knight'), Piece('rook')],
      //   B: [Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn')],
      //   // C: [null, null, null, null, null, null, null, null],
      //   // D: [null, null, null, null, null, null, null, null],
      //   // E: [null, null, null, null, null, null, null, null],
      //   // F: [null, null, null, null, null, null, null, null],
      //   G: [Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn'), Piece('pawn')],
      //   H: [Piece('rook'), Piece('knight'), Piece('bishop'), Piece('queen'), Piece('king'), Piece('bishop'), Piece('knight'), Piece('rook')]
      // }
      cells: {
        A: ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
        B: ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        C: [null, null, null, null, null, null, null, null],
        D: [null, null, null, null, null, null, null, null],
        E: [null, null, null, null, null, null, null, null],
        F: [null, null, null, null, null, null, null, null],
        G: ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        H: ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
      }
    },
    methods:{
      flattenCells: function(){
        console.log(_.flatten(_.values(this.cells)));
        return _.flatten(_.values(this.cells));
      },
      cellClass: function(num){

        if(Math.floor(num/8) % 2 == 0 || num < 8){
          console.log('even row');
          even = 'white-cell';
          odd  = 'black-cell';
        } else {
          console.log('odd row');
          even = 'black-cell';
          odd  = 'white-cell';
        }
        console.log(num, ((num % 8) % 2 == 0) ? even : odd);

        return ((num % 8) % 2 == 0) ? even : odd;
      },
      pieceClass: function(num){
        return num > 30 ? 'piece red' : 'piece blue'
      }
    }
  });

};



