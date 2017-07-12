console.log('hi');

window.onload = function () {

  class Piece {
    constructor(name, player){
      this.name = name;
      this.player = player;
      this.class = player == 'p1' ? 'piece blue' : 'piece red';
    }
  }

  class Pawn extends Piece {
    constructor(player) {
      super('pawn', player);
    }
  }

  class Rook extends Piece {
    constructor(player) {
      super('rook', player);
    }
  }

  class Knight extends Piece {
    constructor(player) {
      super('knight', player);
    }
  }

  class Bishop extends Piece {
    constructor(player) {
      super('bishop', player);
    }
  }

  class Queen extends Piece {
    constructor(player) {
      super('queen', player);
    }
  }

  class King extends Piece {
    constructor(player) {
      super('king', player);
    }
  }

  var chessPiece = Vue.component('chess-piece', {
    props: ['piece'],
    template: '<div v-on:click="select" :class="piece.class">{{piece.name}}</div>',
    methods: {
      select: function(event){
        $('.piece').removeClass('selected');
        $(event.target).addClass('selected');
        console.log('working');
      }
    }
  });

  var chessBoard = new Vue({
    el: '#chessboard',
    data: {
      cells: {
        A: [new Rook('p1'), new Knight('p1'), new Bishop('p1'), new Queen('p1'), new King('p1'), new Bishop('p1'), new Knight('p1'), new Rook('p1')],
        B: [new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1'), new Pawn('p1')],
        C: [null, null, null, null, null, null, null, null],
        D: [null, null, null, null, null, null, null, null],
        E: [null, null, null, null, null, null, null, null],
        F: [null, null, null, null, null, null, null, null],
        G: [new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2'), new Pawn('p2')],
        H: [new Rook('p2'), new Knight('p2'), new Bishop('p2'), new King('p2'), new Queen('p2'), new Bishop('p2'), new Knight('p2'), new Rook('p2')]
      }
    },
    components: {chessPiece: chessPiece},
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

    }
  });

};



